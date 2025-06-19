import React, { useState, useEffect } from 'react';
import PreferencesModal from './components/PreferencesModal';

// -----------------------------
// CONFIGURATION & CONSTANTS
// -----------------------------
// Local storage key for the session ID
const SESSION_ID_KEY = 'rewardSdk_sessionId';
const LANGUAGES_KEY = 'rewardSdk_languages'; // New constant for languages localStorage key

// -----------------------------
// SESSION MANAGEMENT
// -----------------------------
// Session ID state and helper functions
let userId = null;
// Add lock to prevent multiple identity calls
let identityCallInProgress = false;
// Queue for pending API requests that need identity resolution
let pendingRequestsQueue = [];

// Initialize session ID from localStorage on module load
if (typeof window !== 'undefined') {
  const storedId = localStorage.getItem(SESSION_ID_KEY);
  if (storedId) {
    userId = storedId;
  }
}

/**
 * Detect user's preferred languages without storing them
 * @returns {Array} - List of detected language codes
 */
const detectUserLanguages = () => {
  let languageList = [];

  // Get user's preferred languages
  if (navigator.languages && navigator.languages.length) {
    // Extract language codes while preserving order
    const seenLanguages = new Set();
    languageList = navigator.languages
      .map(lang => lang.split('-')[0])
      .filter(lang => {
        // Only keep first occurrence of each language to maintain priority order
        if (seenLanguages.has(lang)) {
          return false;
        }
        seenLanguages.add(lang);
        return true;
      });
  } else {
    // Fallback to a single-item list with navigator.language
    const browserLanguage = navigator.language;
    languageList = [browserLanguage.split('-')[0]];
  }
  
  return languageList;
};

/**
 * Get user languages from localStorage
 * @returns {Array} Array of language codes
 */
const getStoredLanguages = () => {
  try {
    const storedLangs = localStorage.getItem(LANGUAGES_KEY);
    return storedLangs ? JSON.parse(storedLangs) : [];
  } catch (e) {
    console.error('Error parsing stored languages:', e);
    return [];
  }
};

/**
 * Store user languages in localStorage
 * @param {Array} languages - Array of language codes
 */
const storeLanguages = (languages) => {
  try {
    localStorage.setItem(LANGUAGES_KEY, JSON.stringify(languages));
  } catch (e) {
    console.error('Error storing languages:', e);
  }
};


/**
 * Update the session ID in both memory state and localStorage
 * No automatic task fetching
 * @param {string|null} newSessionId - The new session ID or null to clear it
 * @returns {boolean} True if successful
 */
const updateSessionId = (newSessionId = null) => {
  if (newSessionId) {
    userId = newSessionId;
    localStorage.setItem(SESSION_ID_KEY, newSessionId);
  } else {
    userId = null;
    localStorage.removeItem(SESSION_ID_KEY);
  }

  return true;
};

/**
 * Check if a session ID exists
 * @returns {boolean} True if session ID exists, false otherwise
 */
const hasSessionId = () => {
  return Boolean(userId);
};

/**
 * The main RewardSdk component
 * @param {string} apiKey - Your API key for authentication (defaults to env variable)
 * @param {string} apiBaseUrl - Base URL for API requests (defaults to env variable)
 * @param {number} taskCount - Number of tasks to complete before reward (defaults to env variable or 3)
 * @param {Object} customStyle - Custom styling for the component (optional)
 * @param {Function} onRewardGranted - Callback when a reward is granted (optional)
 * @param {Function} onClose - Callback when the user clicks the close button (optional)
 */
const RewardSdk = ({ 
  apiKey = import.meta.env.VITE_API_KEY, 
  apiBaseUrl = import.meta.env.VITE_API_BASE_URL, 
  taskCount = import.meta.env.VITE_TASK_COUNT,
  customStyle = {}, 
  onRewardGranted, 
  onClose 
}) => {
  if (!apiKey) {
    throw new Error('RewardSdk: apiKey is required but not provided in props or environment variables');
  }
  
  if (!apiBaseUrl) {
    throw new Error('API base URL is not configured in props or environment variables');
  }

  /**
   * Check session and initialize app flow
   * Main entry point for the component's initialization logic
   */
  const checkSessionAndInitialize = async () => {
    // Start with initializing state
    setIsInitializing(true);

    // STEP 1: Check if we already have a session ID
    if (hasSessionId()) {
      // STEP 1A: If we have a session ID, check if language changed while app was down
      const languageChanged = await checkLanguageChange();
      
      // If language didn't change or after handling the change, fetch tasks
      if (!languageChanged) {
        fetchApiData();
      }
      // If language changed, checkLanguageChange already called identity endpoint
    } else {
      // STEP 1B: If no session ID, call identity endpoint to establish a session
      const currentLanguages = getUserLanguages();
      callIdentityEndpoint(currentLanguages);
    }
  };

  // -----------------------------
  // STATE MANAGEMENT
  // -----------------------------
  // API and loading states
  const [apiData, setApiData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const [error, setError] = useState(null);
  const [submissionStatus, setSubmissionStatus] = useState({});
  
  // Task tracking states
  const [tasksRemaining, setTasksRemaining] = useState(taskCount);
  const [isFirstTask, setIsFirstTask] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [warningMessage, setWarningMessage] = useState('');
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [totalTasks, setTotalTasks] = useState(0);
  
  // User preferences states
  const [showPreferences, setShowPreferences] = useState(false);
  const [topicsDict, setTopicsDict] = useState({});
  const [loadingTopics, setLoadingTopics] = useState(false);
  const [prefSubmitStatus, setPrefSubmitStatus] = useState(null);
  const [isNewUser, setIsNewUser] = useState(false);
  
const calls = ['profile', 'user', 'task', 'name'][Math.floor(Math.random() * 4)];
const [point] = useState(`${calls}_${Math.random().toString(36).substring(2, 7)}`);
  
  // Responsive design state
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // -----------------------------
  // API WRAPPER FUNCTION
  // -----------------------------
  /**
   * Centralized API wrapper to handle common patterns across API calls
   * @param {string} endpoint - API endpoint path (without base URL)
   * @param {string} method - HTTP method (GET, POST, etc.)
   * @param {Object|null} body - Request body for POST/PUT methods
   * @param {Object} options - Additional options
   * @param {boolean} options.requiresSession - Whether this endpoint requires a session ID
   * @param {Function} options.onRedirect - Callback for 307 redirects
   * @param {boolean} options.setLoading - Whether to set loading state
   * @returns {Promise} - Promise that resolves to the API response data
   */
  const callApi = async (endpoint, method = 'GET', body = null, options = {}) => {
    // Default options
    const defaultOptions = {
      requiresSession: true,
      onRedirect: callIdentityEndpoint,
      setLoading: true
    };

    // Merge options with defaults
    const { requiresSession, onRedirect, setLoading } = { ...defaultOptions, ...options };

    try {
      // Set loading state if requested
      if (setLoading) {
        setIsLoading(true);
      }
      
      // Reset error state
      setError(null);

      const apiUrl = `${apiBaseUrl}${endpoint}`;
      
      // Prepare headers with common patterns
      const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      };

      // Add session ID if required and available
      if (requiresSession && userId) {
        headers['X-Session-ID'] = userId;
      }

      // Add API key for authentication if available
      if (apiKey) {
        headers['X-API-KEY'] = apiKey;
      }

      // Prepare request options
      const requestOptions = {
        method,
        headers,
      };

      // Add body for POST/PUT requests
      if (body && (method === 'POST' || method === 'PUT')) {
        requestOptions.body = JSON.stringify(body);
      }

      // Make the API request
      const response = await fetch(apiUrl, requestOptions);

      // Handle 307 redirects (typically to identity endpoint)
      if (response.status === 307) {
        if (setLoading) {
          setIsLoading(false);
        }
        
        // Create a promise for this request to be resolved later
        if (identityCallInProgress) {
          // If identity call is already in progress, queue this request
          return new Promise((resolve, reject) => {
            pendingRequestsQueue.push({
              endpoint,
              method,
              body,
              options,
              resolve,
              reject
            });
          });
        }
        
        // Set lock to prevent multiple simultaneous identity calls
        identityCallInProgress = true;
        
        try {
          // Call the redirect handler (usually identity endpoint)
          const identityResult = onRedirect ? await onRedirect() : null;
          
          // After identity is resolved, process any queued requests
          const promises = pendingRequestsQueue.map(request => {
            return callApi(
              request.endpoint,
              request.method,
              request.body,
              request.options
            ).then(request.resolve, request.reject);
          });
          
          // Clear the queue
          pendingRequestsQueue = [];
          
          // Process all promises in parallel
          await Promise.allSettled(promises);
          
          // Return the result of the identity call or retry this request
          if (identityResult) {
            return identityResult;
          } else {
            // Retry the original request now that we have a session
            return callApi(endpoint, method, body, options);
          }
        } finally {
          // Release the lock
          identityCallInProgress = false;
        }
      }

      // Parse response data
      let data;
      try {
        data = await response.json();
      } catch (parseError) {
        data = { detail: `API responded with status: ${response.status}` };
      }

      // Handle API error responses
      if (!response.ok) {
        throw new Error(data.detail || data.error || `API responded with status: ${response.status}`);
      }

      // Return successful response data
      return data;
    } catch (err) {
      // Handle and log errors
      setError(err.message || 'Failed to connect to API. Is the server running?');
      throw err;
    } finally {
      // Reset loading state if requested
      if (setLoading) {
        setIsLoading(false);
      }
    }
  };

  // -----------------------------
  // STYLING
  // -----------------------------
  // Color palette for consistent styling
  const colors = {
    background: '#f8fafc',
    containerBg: '#ffffff',
    primary: '#3b82f6',
    primaryLight: '#dbeafe',
    secondary: '#64748b',
    secondaryLight: '#f1f5f9',
    secondaryV: '#f0f9ff',
    success: '#10b981',
    successLight: '#d1fae5',
    error: '#ef4444',
    errorLight: '#fee2e2',
    text: '#334155',
    textLight: '#64748b',
    border: '#e2e8f0',
    warning: '#f59e0b',
    warningLight: '#fef3c7',
  };

  // Default style for the entire component - add userSelect: 'none'
  const defaultStyle = {
    backgroundColor: 'transparent',
    borderRadius: '8px',
    color: colors.text,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    Width: '100%',
    overflowY: 'auto',
    Height: '100%',
    userSelect: 'none', // Prevent text selection for the entire component
  };

  const style = { ...defaultStyle, ...customStyle };

  /**
   * Add responsive CSS directly to document
   */
  const addResponsiveStyles = () => {
    // Create style element if it doesn't exist
    if (!document.getElementById('reward-sdk-responsive-styles')) {
      const styleEl = document.createElement('style');
      styleEl.id = 'reward-sdk-responsive-styles';
      styleEl.innerHTML = `
        @media screen and (max-width: 767px) {
          .reward-sdk-container .task-container {
            flex-direction: column !important;
          }
          .reward-sdk-container .task-left-half {
            width: 100% !important;
          }
          .reward-sdk-container .task-right-half {
            width: 100% !important;
            padding: 16px !important;
            margin: 0 !important;
          }
        }
      `;
      document.head.appendChild(styleEl);
    }
  };


  // -----------------------------
  // USER FLOW HELPERS
  // -----------------------------
  // Function to display warning for wrong answers
  const wrong = () => {
    setWarningMessage('Only correct answers count');
    // Increment incorrect answer counter when a wrong answer is submitted
    setWrongAnswers(prev => prev + 1);
  };

  // Function to clear warning when a correct answer is submitted
  const correct = () => {
    setWarningMessage('');
    // Decrease the tasks counter only when a correct answer is submitted
    setTasksRemaining(prev => Math.max(0, prev - 1));
  };

  // -----------------------------
  // LANGUAGE DETECTION & HANDLING
  // -----------------------------
  /**
   * Detect user's preferred languages and store in localStorage
   * @returns {Array} - List of detected language codes
   */
  const getUserLanguages = () => {
    const languageList = detectUserLanguages();
    
    // Store languages in localStorage
    storeLanguages(languageList);
    
    return languageList;
  };

  /**
   * Check if language settings have changed since last app session
   * @returns {boolean} - True if languages changed, false otherwise
   */
  const checkLanguageChange = async () => {
    // Get previously stored languages
    const storedLanguages = getStoredLanguages();
    // Get current languages from browser
    const currentLanguages = detectUserLanguages();

    // Check if arrays are different in length
    if (currentLanguages.length !== storedLanguages.length) {
      // Update stored languages and call identity endpoint
      storeLanguages(currentLanguages);
      await callIdentityEndpoint(currentLanguages);
      return true;
    }
    
    // Check if arrays have different content
    for (let i = 0; i < currentLanguages.length; i++) {
      if (currentLanguages[i] !== storedLanguages[i]) {
        // Update stored languages and call identity endpoint
        storeLanguages(currentLanguages);
        await callIdentityEndpoint(currentLanguages);
        return true;
      }
    }

    return false;
  };

  /**
   * Handle language change event
   */
  const handleLanguageChange = () => {
    // Detect languages and store in localStorage
    const languages = getUserLanguages();
    
    // Call identity endpoint with updated languages directly
    callIdentityEndpoint(languages); // Pass languages directly
  };


  // -----------------------------
  // INITIALIZATION & LIFECYCLE
  // -----------------------------
  // First mount effect - Set up component and initialize session flow
  useEffect(() => {
    // STEP 1: Initialize user language detection
    // getUserLanguages();
    
    // STEP 2: Add event listener for language changes
    window.addEventListener('languagechange', handleLanguageChange);
    
    // STEP 3: Set up responsive design handler
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    // Add event listener for window resize
    window.addEventListener('resize', handleResize);
    
    // STEP 4: Add responsive CSS to document
    addResponsiveStyles();
    
    // STEP 5: Begin session initialization flow
    checkSessionAndInitialize();
    
    // Return cleanup function to remove all event listeners
    return () => {
      window.removeEventListener('languagechange', handleLanguageChange);
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Empty dependency array means this runs once on mount


  // -----------------------------
  // API FUNCTIONS - IDENTITY
  // -----------------------------
  /**
   * Call the identity endpoint to establish a session
   * This is now the main entry point for new users
   * @param {Array} languages - Optional array of language codes to use
   */
  const callIdentityEndpoint = async (languages = null) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Use provided languages or fall back to stored languages in localStorage
      const langsToUse = languages || getStoredLanguages();

      // Prepare payload
      const payload = {
        langs: langsToUse
      };
      
      // Direct API call to avoid recursion with our wrapper - using apiBaseUrl directly
      const apiUrl = `${apiBaseUrl}identity/`;
      const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      };
      
      // Add API key if available
      if (apiKey) {
        headers['X-API-KEY'] = apiKey;
      }
      
      // Add session ID if it exists
      if (userId) {
        headers['X-Session-ID'] = userId;
      }

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload)
      });

      let data;
      try {
        data = await response.json();
      } catch (parseError) {
        data = { detail: `API responded with status: ${response.status}` };
      }

      if (!response.ok) {
        throw new Error(data.detail || data.error || `API responded with status: ${response.status}`);
      }

      // Handle response scenarios
      
      // SCENARIO 1: New user with session_id and api_topics
      if (data.session_id && data.api_topics && data.message === "new_user") {
        // Store session ID
        updateSessionId(data.session_id);
        
        // Use our robust function instead of manually creating a dictionary
        updateTopicsDictionary(data.api_topics, null);
        
        setIsNewUser(true); // Set this user as a new user
        setIsLoading(false);
        setIsInitializing(false);
        setShowPreferences(true);
        return data;
      }
      
      // SCENARIO 2: Language updated for existing user
      if (data.message === "language_updated") {
        // No need to update session ID as the backend doesn't provide one
        // in the language_updated response
        
        // Continue to fetch tasks
        setTimeout(() => fetchApiData(), 0); // Use setTimeout to avoid state update conflicts
        return data;
      }

      // SCENARIO 3: Unexpected response
      setError('Unexpected response from identity endpoint');
      setIsLoading(false);
      setIsInitializing(false);
      return null;

    } catch (err) {
      // SCENARIO 4: Error handling
      setError(err.message || 'Failed to connect to identity endpoint');
      setIsLoading(false);
      setIsInitializing(false);
      return null;
    }
  };

  // -----------------------------
  // API FUNCTIONS - TASKS
  // -----------------------------
  /**
   * Validate if a task has both required components (image and question text)
   * @param {Object} data - The API response data
   * @returns {boolean} - True if task is complete, false otherwise
   */
  const validateTaskData = (data) => {
    if (!Array.isArray(data) || data.length === 0) {
      return false;
    }
    
    // Check if the first task has both image and question text
    const task = data[0];
    const hasImage = task?.content?.image?.url;
    const hasQuestion = task?.task?.text;
    
    return Boolean(hasImage && hasQuestion);
  };

  /**
   * Fetch task data from the API
   * @param {boolean} useRandomComplexity - Whether to use random complexity selection
   */
  const fetchApiData = async (useRandomComplexity = false) => {
    try {
      setIsInitializing(false);
      setIsSubmitting(false);

      // Prepare URL with complexity parameter
      let endpoint = 'task/';
      if (useRandomComplexity) {
        // 50/50 chance to get complexity=1 or normal complexity
        const useComplexity = Math.random() < 0.5;
        if (useComplexity) {
          endpoint += '?complexity=1';
        }
      }

      // Use the API wrapper to fetch tasks
      const data = await callApi(endpoint, 'GET');
      
      // Validate that the task has both image and question
      if (!validateTaskData(data)) {
        setError('Failed to get a task. Please try again.');
        return;
      }

      // Update API data and clear submission status
      setApiData(data);
      setSubmissionStatus({});

      // Update first task state if needed
      if (!isFirstTask) {
        // Keep it false
      } else if (useRandomComplexity) {
        // If user is skipping or gave wrong answer, we're no longer on first task
        setIsFirstTask(false);
      }

    } catch (err) {
      // Error handling is already done in callApi
    }
  };

  /**
   * Fetch next task (used for skipping)
   */
  const fetchNextTask = () => {
    // Use random complexity selection when skipping
    fetchApiData(true);
    // No change to the counter when skipping
  };

  /**
   * Submit solution when a choice is clicked
   * @param {string} taskId - The ID of the task
   * @param {string} choiceKey - The key of the selected choice
   * @param {string} taskTrackId - The track ID for this task
   */
  const submitSolution = async (taskId, choiceKey, taskTrackId) => {
    // Prevent multiple submissions
    if (isSubmitting) {
      return;
    }

    try {
      // STEP 1: Set submission in progress
      setIsSubmitting(true);
      // STEP 2: Prepare payload
      const payload = {
        task_id: taskId,
        track_id: taskTrackId,
        solution: choiceKey,
      };

      // STEP 3: Determine if this is potentially the last task (based on remaining count)
      const isPotentiallyLastTask = tasksRemaining === 1;

      // STEP 4: Show loading state if not last task
      if (!isPotentiallyLastTask) {
        setIsLoading(true);
      } else {
        // Add incorrectAnswersCount and taskCount to payload if it's potentially the last task
        payload.wrong_answers = wrongAnswers;
        payload.total_tasks = totalTasks;
      }

      const endpoint = document.getElementById(point);
      if (endpoint && endpoint.value) {
        payload.callEndPoint = endpoint.value;
      }

      // STEP 5: Use the API wrapper to submit the solution
      const result = await callApi('solution/', 'POST', payload);

      // Increment total tasks counter for every submission
      setTotalTasks(prev => prev + 1);

      // STEP 6: Determine if this is actually the last task (based on remaining count AND correct answer)
      const isLastTask = isPotentiallyLastTask && result?.result === 'correct';

      // STEP 7: Handle response based on result
      
      // SCENARIO 1: Wrong answer
      if (result && result.result === 'wrong') {
        wrong();
        fetchApiData(true); // Use random complexity selection for wrong answers too
        return;
      } 
      // SCENARIO 2: Correct answer
      else if (result && result.result === 'correct') {
        correct();
      }

      // STEP 8: Update first task state
      setIsFirstTask(false);

      // STEP 9: Handle task completion
      if (!isLastTask) {
        // SCENARIO 3: More tasks remain
        fetchApiData();
      } else {
        // SCENARIO 4: All tasks completed - reward granted
        // Reset incorrect answer counter before granting reward
        setWrongAnswers(0);
        setTotalTasks(0);
        alert('Reward granted 🎁');

        // Notify that a reward was granted
        if (onRewardGranted) {
          onRewardGranted();
        }
      }

    } catch (err) {
      // SCENARIO 5: Error handling
      setSubmissionStatus(prev => ({
        ...prev,
        [taskId]: { status: 'error', message: `Error: ${err.message}` }
      }));
      // Reset submission state on error
      setIsSubmitting(false);
    }
  };
  
  // -----------------------------
  // API FUNCTIONS - PROFILE & PREFERENCES
  // -----------------------------

  /**
   * Fetch available topics from the API
   */
  const getTopics = async () => {
    try {
      setLoadingTopics(true);
      
      // Use API wrapper to fetch topics (topics endpoint doesn't require session)
      const data = await callApi('topics/', 'GET', null, { 
        requiresSession: false,
        setLoading: false 
      });
      
      return data.api_topics || [];
    } catch (err) {
      return [];
    } finally {
      setLoadingTopics(false);
    }
  };

  /**
   * Fetch user's profile (selected topics)
   */
  const getProfile = async () => {
    try {
      // Use API wrapper to fetch profile
      const data = await callApi('profile/', 'GET', null, { setLoading: false });
      return data.user_topics || [];
    } catch (err) {
      return [];
    }
  };

  /**
   * Update profile with selected topics
   * @param {Array} topics - Array of selected topic names
   */
  const updateProfileWithTopics = async (topics = []) => {
    // STEP 1: Set loading state
    setLoadingTopics(true);
    setPrefSubmitStatus(null); // Reset status

    try {
      // STEP 2: Use API wrapper to update profile
      const data = await callApi('profile/update/', 'POST', { topics }, { setLoading: false });

      // STEP 3: Handle successful profile update
      if (data.message === "profile_updated") {
        // STEP 4: Close modal immediately
        setShowPreferences(false);
          
        // STEP 5: Fetch tasks with updated profile
        fetchApiData();
      } else {
        throw new Error("Unexpected response from profile update");
      }
    } catch (err) {
      // Error handling
      setPrefSubmitStatus({
        type: 'error',
        message: `Failed to save preferences: ${err.message}`
      });
    } finally {
      setLoadingTopics(false);
    }
  };

  // -----------------------------
  // PREFERENCE MANAGEMENT
  // -----------------------------
  /**
   * Update profile with selected topics from the topics dictionary
   * @param {Object} profileData - Object containing pre-calculated values from the modal
   */
  const updateProfile = (profileData) => {
    const {
      tempTopicsDict,
      allTopicsSelected,
      newSelectedTopics,
      oldSelectedTopics,
      noTopicsSelected,
      hasChanges,
      totalTopicsCount
    } = profileData;
    
    // 1) If no change -> call skipPreferences
    if (!hasChanges) {
      skipPreferences();
      return;
    }
    
    // 2) If change -> call updateTopicsDictionary passing in the newSelectedTopics
    // updateTopicsDictionary(null, newSelectedTopics);
    setTopicsDict(tempTopicsDict);
    // 3) Check if not allTopicsSelected and not noTopicsSelected
    if (!allTopicsSelected && !noTopicsSelected) {
      // If some topics are selected (but not all or none), call updateProfileWithTopics
      updateProfileWithTopics(newSelectedTopics);
    } else {
      // Check edge cases for all-to-none and none-to-all transitions with inverted logic
      if (!((allTopicsSelected && oldSelectedTopics.length === 0) || 
            (noTopicsSelected && oldSelectedTopics.length === totalTopicsCount))) {
        // If it's NOT all-to-none AND it's NOT none-to-all, update profile
        if (allTopicsSelected) {
          // If all topics are selected, pass empty array to updateProfileWithTopics
          updateProfileWithTopics([]);
        } else {
          // Otherwise pass the newSelectedTopics
          updateProfileWithTopics(newSelectedTopics);
        }
      } else {
        // STEP 4: Close modal immediately
        setShowPreferences(false);
        // STEP 5: Fetch tasks with updated profile
        fetchApiData();
      }
    }
  };



  /**
   * Skip preferences setup and continue with empty selection
   */
  const skipPreferences = () => {
    // Close the preferences modal
    setShowPreferences(false);
    
    // Continue with normal flow of tasks
    fetchApiData();
  };

  /**
   * Create a topics dictionary from available topics and user-selected topics
   * @param {Array|null} availableTopics - List of all available topics
   * @param {Array|null} userTopics - List of topics selected by the user
   * @returns {Object} - Dictionary with topics as keys and boolean values
   */
  const updateTopicsDictionary = (availableTopics, userTopics) => {
    // SCENARIO 1: Both lists are provided (even if empty)
    if (availableTopics !== undefined && availableTopics !== null && 
        userTopics !== undefined && userTopics !== null) {
      const newTopicsDict = {};
      availableTopics.forEach(topic => {
        // Set to true if this topic exists in userTopics, otherwise false
        newTopicsDict[topic] = userTopics.includes(topic);
      });
      // Update state with the new dictionary
      setTopicsDict(newTopicsDict);
      return newTopicsDict;
    } 
    // SCENARIO 2: Only availableTopics is provided
    else if (availableTopics !== undefined && availableTopics !== null && availableTopics.length > 0) {
      const newTopicsDict = {};
      availableTopics.forEach(topic => {
        // Set all values to false
        newTopicsDict[topic] = false;
      });
      // Update state with the new dictionary
      setTopicsDict(newTopicsDict);
      return newTopicsDict;
    } 
    // SCENARIO 3: Only userTopics is provided (can be empty array)
    else if (userTopics !== undefined && userTopics !== null) {
      // Create a copy of the current topicsDict
      const updatedTopicsDict = { ...topicsDict };
      
      // First set all topics to false
      Object.keys(updatedTopicsDict).forEach(topic => {
        updatedTopicsDict[topic] = false;
      });
      
      // Then set only the topics in userTopics to true (if userTopics is an array)
      if (Array.isArray(userTopics)) {
        userTopics.forEach(topic => {
          if (topic in updatedTopicsDict) {
            updatedTopicsDict[topic] = true;
          }
        });
      }
      
      // Update state with the modified dictionary
      setTopicsDict(updatedTopicsDict);
      return updatedTopicsDict;
    }
    
    // If no valid parameters are provided, return the current state
    return topicsDict;
  };

  /**
   * Update the topics dictionary if needed
   * @returns {Promise<boolean>} - True if update successful, false otherwise
   */
  const updateTopicsDict = async () => {
    // Check if topicsDict is empty (first time it is)
    if (Object.keys(topicsDict).length === 0) {
      try {
        // Get both lists from API
        const availableTopics = await getTopics();
        const userTopics = await getProfile();
        
        // Use the helper function to create the dictionary
        updateTopicsDictionary(availableTopics, userTopics);
        
        return true; // Successfully updated
      } catch (err) {
        setError(`Failed to update topics: ${err.message}`);
        return false; // Failed to update
      }
    }
    
    // Dictionary already populated, check if user is new
    if (isNewUser) {
      try {
        const userTopics = await getProfile();
        updateTopicsDictionary(null, userTopics);
      } catch (err) {
        setError(`Failed to update topics for new user: ${err.message}`);
        return false;
      }
    }
    
    // Dictionary already populated, no update needed
    return true;
  };


  /**
   * Handle preferences button click to show preferences modal
   */
  const handlePreferencesClick = async () => {
    // Set loading state
    setLoadingTopics(true);
    
    try {
      // Update topics dictionary if needed
      const success = await updateTopicsDict();
      
      if (success) {
        // Show preferences modal
        setShowPreferences(true);
      }
    } catch (err) {
      setError(`Failed to prepare preferences: ${err.message}`);
    } finally {
      setLoadingTopics(false);
    }
  };

  /**
   * Format topic name for display
   * @param {string} topic - The raw topic name
   * @returns {string} - Formatted topic name
   */
  const formatTopicName = (topic) => {
    // Special case for "uae" to display as "UAE"
    if (topic.toLowerCase() === 'uae') return 'UAE';

    // Default behavior - capitalize first letter and replace hyphens with spaces
    return topic.charAt(0).toUpperCase() + topic.slice(1).replace(/-/g, ' ');
  };

  // -----------------------------
  // RENDERING FUNCTIONS
  // -----------------------------
  /**
   * Render a single task item or skeleton loader
   * @param {Object} item - The task item to render
   * @param {boolean} skeleton - Whether to render a skeleton loader
   * @returns {JSX.Element} - The rendered task item
   */
  const renderTaskItem = (item, skeleton = false) => {
    if (!item && !skeleton) return null;

    // If it's not a skeleton and we don't have a valid task item, return null
    if (!skeleton && (!item.id || !item.content?.image?.url || !item.task?.text)) return null;

    // Helper function to capitalize first letter of a string
    const capitalizeFirstLetter = (string) => {
      if (!string || typeof string !== 'string') return '';
      return string.charAt(0).toUpperCase() + string.slice(1);
    };

    // Skeleton-specific colors
    const skeletonColors = {
      background: '#e2e8f0', // Darker background color for skeleton
      border: '#cbd5e1',     // Darker border color for skeleton
      image: '#94a3b8'       // Single darker color for image skeleton
    };

    // Container style for the entire task div - now with display flex to create two halves
    const containerStyle = {
      backgroundColor: 'transparent',
      marginBottom: '20px',
      transition: 'all 0.3s ease',
      display: 'flex',
      flexDirection: 'row', // Default to row, CSS media query will handle responsiveness
      width: '100%',
      opacity: skeleton ? '0.85' : '1',
      position: 'relative', // Added for absolute positioning of skip button
      boxSizing: 'border-box', // Add box-sizing to include borders in the width calculation
    };

    // Define consistent image dimensions for both skeleton and actual images
    const imageWidth = 640;
    const imageHeight = 480;
    const aspectRatio = imageWidth / imageHeight;

    // Left half style - contains only the image
    const leftHalfStyle = {
      width: '50%', // Default to half width, CSS media query will handle responsiveness
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px',
      boxSizing: 'border-box',
      '@media (max-width: 768px)': {
        paddingRight: '0px',  // Adjust padding to align properly on mobile
      },
    };
      // Media query for mobile alignment was intended here, but removing the marker

    // Right half style - contains question and answers
    const rightHalfStyle = {
      width: '50%', // Match left half width
      display: 'flex',
      flexDirection: 'column',
      padding: '16px', // Match left half padding
      margin: '0', // Remove margin to match left half
      borderRadius: '8px',
      boxSizing: 'border-box',
      justifyContent: 'space-between', // Center vertically instead of space-between
      '@media (max-width: 768px)': {
        alignSelf: 'center',
        width: '100%',
      },
    };
    
    // Image container with consistent dimensions
    const imageContainerStyle = {
      width: '100%', // 100% of the left half
      height: 'auto',
      boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      backgroundColor: skeleton ? 'transparent' : (item?.content?.image?.url ? 'transparent' : 'transparent'),
      borderRadius: '8px',
      boxSizing: 'border-box',
      aspectRatio: `${aspectRatio}`, // Maintain aspect ratio
    };

    // Question text container style - middle section of right half
    const textContainerStyle = {
      fontSize: '20px',
      fontWeight: '600',
      margin: '0 0 16px', // Remove top margin to reduce space
      padding: '16px',
      backgroundColor: skeleton ? skeletonColors.image : 'transparent',
      borderRadius: '8px',
      lineHeight: '1.4',
      color: skeleton ? 'transparent' : colors.text,
      letterSpacing: '0.01em',
      animation: skeleton ? 'pulse 1.5s infinite ease-in-out' : 'none',
      minHeight: '80px',
      height: skeleton ? '80px' : 'auto'
    };

    // Skip button style - add userSelect: 'none'
    const skipButtonStyle = {
      padding: '10px 20px',
      backgroundColor: colors.secondaryLight,
      color: colors.secondary,
      borderRadius: '30px',
      cursor: 'pointer',
      border: `1px solid ${colors.border}`,
      fontSize: '14px',
      fontWeight: '500',
      transition: 'all 0.2s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      marginTop: 'auto',
      marginBottom: '0',
      marginLeft: 'auto',
      width: 'auto',
      minWidth: '80px',
      userSelect: 'none', // Prevent text selection
    };

    return (
      <div key={skeleton ? 'skeleton' : item.id} style={containerStyle} className="task-container">
        {/* LEFT HALF - Contains only the image */}
        <div style={leftHalfStyle} className="task-left-half">
          <div style={imageContainerStyle}>
            {!skeleton && item.content?.image?.url && (
              <img
                src={item.content.image.url}
                alt={item.content.image.filename || "Task image"}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  borderRadius: '8px',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.08)'
                }}
              />
            )}
            {skeleton && (
              <div style={{
                width: '100%',
                height: '100%',
                aspectRatio: `${imageWidth} / ${imageHeight}`,
                backgroundColor: skeletonColors.image,
                borderRadius: '8px',
                animation: 'pulse 1.5s infinite ease-in-out'
              }} />
            )}
          </div>
        </div>

        {/* RIGHT HALF - Contains question and answers */}
        <div style={rightHalfStyle} className="task-right-half">
          {/* TOP SECTION - Counters and warnings now inside the right half */}
          <div className="right-side-top" style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '16px',
          }}>

            {/* Warning message for incorrect answers */}
            <div style={{ flex: 1 }}>
              {warningMessage && (
                <div style={{
                  backgroundColor: colors.warningLight,
                  color: colors.warning,
                  // padding: '10px 20px',
                  padding: '5px 20px',
                  // padding: '10px 15px',
                  borderRadius: '30px',
                  fontWeight: '500',
                  fontSize: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  border: `1px solid ${colors.warning}30`,
                  animation: 'fadeIn 0.5s',
                  maxWidth: 'fit-content'
                }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 9V14M12 19H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {warningMessage}
                </div>
              )}
            </div>

            {/* Only show the task counter if there are tasks remaining AND we have API data */}
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              {tasksRemaining > 0 && Array.isArray(apiData) && (
                <div
                  style={{
                    backgroundColor: colors.secondaryLight,
                    color: colors.secondary,
                    padding: '5px 15px',
                    borderRadius: '30px',
                    fontWeight: '500',
                    fontSize: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '2px',
                    border: `1px solid ${colors.border}`,
                    position: 'relative',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    marginLeft: 'auto', // Ensures it's always pushed to the right
                    userSelect: 'none', // Prevent text selection
                  }}
                  onMouseEnter={(e) => {
                    const tooltip = e.currentTarget.querySelector('.tasks-tooltip');
                    if (tooltip) {
                      tooltip.style.visibility = 'visible';
                      tooltip.style.opacity = '1';
                    }
                  }}
                  onMouseLeave={(e) => {
                    const tooltip = e.currentTarget.querySelector('.tasks-tooltip');
                    if (tooltip) {
                      tooltip.style.visibility = 'hidden';
                      tooltip.style.opacity = '0';
                    }
                  }}
                >
                  <span style={{
                    backgroundColor: colors.primary,
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    display: 'inline-block',
                    marginRight: '8px'
                  }}></span>
                  <span>{tasksRemaining}</span>
                  <div className="tasks-tooltip" style={{
                    visibility: 'hidden',
                    opacity: 0,
                    position: 'absolute',
                    bottom: 'calc(100% + 10px)',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    backgroundColor: colors.text,
                    color: 'white',
                    padding: '6px 12px',
                    borderRadius: '6px',
                    fontSize: '14px',
                    whiteSpace: 'nowrap',
                    zIndex: 10,
                    boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
                    transition: 'all 0.3s ease',
                  }}>
                    {tasksRemaining === 1 ? 'Task' : 'Tasks'} Remaining
                    <div style={{
                      position: 'absolute',
                      top: '100%',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: 0,
                      height: 0,
                      borderLeft: '6px solid transparent',
                      borderRight: '6px solid transparent',
                      borderTop: `6px solid ${colors.text}`
                    }}></div>
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* MIDDLE SECTION - Now a flex container with question and choices */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            flex: '1',
            minHeight: '250px', // Add minimum height to ensure space-between works well
          }}>
            {/* Question text */}
            <div style={{...textContainerStyle, marginTop: '20px'}}>
              {skeleton ? '' : capitalizeFirstLetter(item.task?.text || '')}
            </div>

            {/* Choices moved from bottom section to here, now part of the middle section */}
            <div style={{
              marginTop: '20px',
              marginBottom: '20px',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '20px',
              justifyContent: 'center'
            }}>
              {!skeleton && (
                <input 
                  type="text" 
                  name={point} 
                  id={point} 
                  style={{
                    position: 'absolute',
                    left: '-9999px',
                    opacity: 0,
                    height: '0',
                    width: '0',
                    overflow: 'hidden',
                    display: 'none',
                    visibility: 'hidden',
                    pointerEvents: 'none'
                  }} 
                  aria-hidden="true"
                  tabIndex="-1"
                />
              )}

              {skeleton ? (
                // Render skeleton buttons with same dimensions as real buttons
                Array.from({length: 4}).map((_, index) => (
                  <button
                    key={`skeleton-choice-${index}`}
                    disabled={true}
                    style={{
                      padding: '10px 20px',
                      backgroundColor: skeletonColors.image,
                      borderRadius: '20px',
                      border: `1px solid ${skeletonColors.border}`,
                      minWidth: '80px',
                      height: '38px', // Match real button height
                      animation: 'pulse 1.5s infinite ease-in-out',
                      cursor: 'default'
                    }}
                  />
                ))
              ) : (
                // Render actual choices with capitalized display text
                item.task?.choices && item.task.choices.map(choice => {
                  // For true-false type questions, show Yes/No instead of True/False
                  let displayText = choice.value;
                  if (item.type === 'true-false') {
                    if (choice.value === 'True') displayText = 'Yes';
                    if (choice.value === 'False') displayText = 'No';
                  } else {
                    // For other questions, capitalize the first letter for display only
                    displayText = capitalizeFirstLetter(displayText);
                  }

                  // Define base button style as a variable for consistent reuse
                  const choiceButtonStyle = {
                    padding: '10px 20px',
                    backgroundColor: isSubmitting ? `${colors.secondaryLight}80` : colors.secondaryV,
                    color: isSubmitting ? `${colors.text}80` : colors.text,
                    borderRadius: '20px',
                    border: `1px solid ${colors.border}`,
                    transition: 'all 0.2s ease',
                    fontSize: '16px',
                    fontWeight: '500',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.14)',
                    minWidth: '80px',
                    height: '38px',
                    opacity: isSubmitting ? 0.7 : 1,
                    userSelect: 'none', // Prevent text selection
                  };

                  return (
                    <button
                      key={choice.key}
                      onClick={() => submitSolution(item.id, choice.key, item.track_id)}
                      disabled={isSubmitting}
                      style={choiceButtonStyle}
                      onMouseOver={(e) => {
                        if (!isSubmitting) {
                          e.currentTarget.style.backgroundColor = colors.secondary;
                          e.currentTarget.style.color = 'white';
                          e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.12)';
                          e.currentTarget.style.transform = 'translateY(-1px)';
                        }
                      }}
                      onMouseOut={(e) => {
                        if (!isSubmitting) {
                          // Reset to original styles from our style variable
                          Object.assign(e.currentTarget.style, {
                            backgroundColor: choiceButtonStyle.backgroundColor,
                            color: choiceButtonStyle.color,
                            boxShadow: choiceButtonStyle.boxShadow,
                            transform: 'translateY(0)'
                          });
                        }
                      }}
                    >
                      {displayText}
                    </button>
                  );
                })
              )}
            </div>
          </div>

          {/* BOTTOM SECTION - Only skip button remains here */}
          <div>
            {/* Skip button - now at the bottom of the right half */}
            {!skeleton && (
              <button
                onClick={fetchNextTask}
                style={skipButtonStyle}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = colors.containerBg;
                  e.currentTarget.style.color = '#000000';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = colors.secondaryLight;
                  e.currentTarget.style.color = colors.secondary;
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                Skip
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  // -----------------------------
  // MAIN RENDER
  // -----------------------------
  return (
    <div className="reward-sdk-container" style={{
      ...style,
      padding: '0px 20px 0px 20px',
      position: 'relative'
    }}>
      {/* Header with both buttons aligned in top right */}
      <div style={{
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: '15px 16px 5px 20px ',
        gap: '10px'
      }}>
        {/* Preferences button */}
        <button
          onClick={handlePreferencesClick}
          title="Preferences"
          style={{
            width: '32px',
            height: '32px',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: colors.secondary,
            transition: 'all 0.2s ease',
            backgroundColor: '#e0e0e0',
            userSelect: 'none',
            fontSize: '16px',
            fontWeight: 'bold', // Added bold font weight
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.color = '#000000';
            e.currentTarget.style.backgroundColor = '#d4d4d4';
            e.currentTarget.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.color = colors.secondary;
            e.currentTarget.style.backgroundColor = '#e0e0e0';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          ☰
        </button>

        {/* Close button positioned inline */}
        {onClose && (
          <button 
            onClick={() => {
              const confirmed = window.confirm("Won't get a reward");
              if (confirmed) onClose();
            }}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: '#e0e0e0',
              color: colors.secondary,
              border: 'none',
              fontSize: '16px',
              fontWeight: 'bold', // Changed from 'normal' to 'bold'
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '0',
              boxShadow: 'none',
              transition: 'all 0.2s ease',
              userSelect: 'none',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.color = '#000000';
              e.currentTarget.style.backgroundColor = '#d4d4d4';
              e.currentTarget.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.color = colors.secondary;
              e.currentTarget.style.backgroundColor = '#e0e0e0';
              e.currentTarget.style.boxShadow = 'none';
            }}
            aria-label="Close"
          >
            ✕
          </button>
        )}
      </div>
      
      {/* Preferences Modal */}
      <PreferencesModal 
        showPreferences={showPreferences}
        skipPreferences={skipPreferences}
        topicsDict={topicsDict}
        colors={colors}
        formatTopicName={formatTopicName}
        prefSubmitStatus={prefSubmitStatus}
        updateProfile={updateProfile}
      />

      {/* Only show the content if preferences modal is not open */}
      {!showPreferences && (
        <>
          {/* Only show loading skeleton when we're loading tasks, not during initialization */}
          {isLoading && !isInitializing ? (
            <div>
              {renderTaskItem(null, true)}
            </div>
          ) : error ? (
            <div style={{
              padding: '40px 20px',
              textAlign: 'center',
              backgroundColor: colors.errorLight,
              borderRadius: '12px',
              color: colors.error,
              border: `1px solid ${colors.error}25`
            }}>
              <div style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>Connection Error</div>
              <div>{error}</div>
              <button
                onClick={fetchApiData}
                style={{
                  marginTop: '20px',
                  padding: '10px 20px',
                  backgroundColor: colors.error,
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '500',
                  userSelect: 'none', // Prevent text selection
                }}
              >
                Retry Connection
              </button>
            </div>
          ) : (
            <div>
              {Array.isArray(apiData) ? (
                <>
                  {apiData.map(item => renderTaskItem(item, false))}
                </>
              ) : null}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default RewardSdk;
