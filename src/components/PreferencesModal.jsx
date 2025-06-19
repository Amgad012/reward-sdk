import React, { useState, useEffect } from 'react';
import { CheckmarkIcon, CloseModalIcon } from '../icons';

const PreferencesModal = ({ 
  showPreferences, 
  skipPreferences, 
  topicsDict, 
  colors, 
  formatTopicName, 
  prefSubmitStatus, 
  updateProfile 
}) => {
  // Add temporary state to track topic changes locally within the modal
  const [tempTopicsDict, setTempTopicsDict] = useState({});

  // Initialize temporary state whenever the modal opens or topicsDict changes
  useEffect(() => {
    if (showPreferences) {
      setTempTopicsDict({...topicsDict});
    }
  }, [showPreferences, topicsDict]);

  // Local topic toggle handler that only updates the temporary state
  const handleLocalTopicToggle = (topic) => {
    setTempTopicsDict(prev => ({
      ...prev,
      [topic]: !prev[topic]
    }));
  };

  // Function to handle "Select All" toggle
  const handleSelectAll = () => {
    // Check if all topics are currently selected
    const allSelected = Object.values(tempTopicsDict).every(value => value === true);
    
    // Toggle all topics to the opposite state
    const newState = !allSelected;
    const updatedTopics = {};
    
    Object.keys(tempTopicsDict).forEach(topic => {
      updatedTopics[topic] = newState;
    });
    
    setTempTopicsDict(updatedTopics);
  };

  // Calculate if all topics are currently selected for the "Select All" checkbox state
  const allTopicsSelected = Object.values(tempTopicsDict).every(value => value === true);

  // Function to handle save with temporary state
  const handleSave = () => {
    // Calculate all the values needed by the parent component
    const newSelectedTopics = Object.keys(tempTopicsDict).filter(topic => tempTopicsDict[topic]);
    const oldSelectedTopics = Object.keys(topicsDict).filter(topic => topicsDict[topic]);
    
    // Simplified check for changes - compare selected topics arrays
    let hasChanges = false;
    
    // Check if lengths are different (quick way to detect changes)
    if (newSelectedTopics.length !== oldSelectedTopics.length) {
      hasChanges = true;
    } else {
      // If same length, check if every topic in newSelectedTopics exists in oldSelectedTopics
      hasChanges = newSelectedTopics.some(topic => !oldSelectedTopics.includes(topic));
    }
    
    const noTopicsSelected = newSelectedTopics.length === 0;
    const totalTopicsCount = Object.keys(tempTopicsDict).length;
    
    // Pass all calculated values to the parent component
    updateProfile({
      tempTopicsDict,
      allTopicsSelected,
      newSelectedTopics,
      oldSelectedTopics,
      noTopicsSelected,
      hasChanges,
      totalTopicsCount
    });
  };

  // Function to handle click outside modal - same behavior as skip button
  const handleClickOutside = (e) => {
    // If clicking on the overlay background (not the modal content)
    if (e.target === e.currentTarget) {
      skipPreferences();
    }
  };

  if (!showPreferences) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000
      }}
      onClick={handleClickOutside}
    >
      <div style={{
        backgroundColor: colors.containerBg,
        borderRadius: '8px',
        width: '95%',
        maxWidth: '600px',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
        animation: 'fadeInUp 0.3s',
        overflow: 'hidden', // Changed from auto to hidden for outer container
        display: 'flex',
        flexDirection: 'column'
      }}>
        <div style={{
          padding: `${window.innerWidth < 480 ? '24px 16px' : '32px'} ${window.innerWidth < 480 ? '16px' : '32px'} 0`,
          overflow: 'auto', // Scrolling happens in this inner container
          flexGrow: 1,
          maxHeight: window.innerWidth < 480 ? 'calc(90vh - 100px)' : 'calc(80vh - 100px)', // Reserve space for buttons
        }}>
          <style>{`
            @keyframes fadeInUp {
              from { opacity: 0; transform: translateY(20px); }
              to { opacity: 1; transform: translateY(0); }
            }
          `}</style>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            marginBottom: '0px' // Reduced from 12px to 8px to reduce space above
          }}>
            <h2 style={{
              margin: 0,
              color: colors.text,
              fontSize: window.innerWidth < 480 ? '20px' : '26px',
              userSelect: 'none', // Prevent text selection
              cursor: 'default' // Use default cursor instead of text selection cursor
            }}>Your interests</h2>

            {/* 
            // Add close button in the top right with hover effect
            <button
              onClick={skipPreferences}
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: '8px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease',
              }}
              onMouseOver={(e) => {
                // Using a darker shade by mixing secondary with secondaryLight
                e.currentTarget.style.backgroundColor = colors.secondary + '20'; // Adding 20% opacity
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >              {/* Commented out for now, but using proper component
              <CloseModalIcon />
            </button>
            */}
          </div>

          {/* Restructured layout for description and Select All button */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            marginBottom: '46px' // Increased from 16px to 24px to add space below
          }}>
            <p style={{ 
              color: colors.textLight, 
              margin: 0,
              fontSize: '18px',
              userSelect: 'none', // Prevent text selection
              cursor: 'default' // Use default cursor instead of text selection cursor
            }}>
              Select topics you're interested in
            </p>

            {/* Select All button moved to right */}
            <div
              onClick={handleSelectAll}
              style={{
                padding: '8px 12px',
                borderRadius: '8px',
                border: `1px solid ${allTopicsSelected ? colors.primary : colors.border}`,
                backgroundColor: allTopicsSelected ? colors.primaryLight : 'white',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                height: '36px',
                boxSizing: 'border-box',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                width: '140px',
                marginLeft: 'auto',
                justifyContent: 'flex-start',
                overflow: 'hidden',
              }}
            >
              <div style={{
                width: '16px',
                height: '16px',
                minWidth: '16px',
                borderRadius: '4px',
                border: `2px solid ${allTopicsSelected ? colors.primary : colors.secondary}`,
                backgroundColor: allTopicsSelected ? colors.primary : 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                transition: 'all 0.2s ease',
                position: 'relative',
                left: '0',
              }}>                {allTopicsSelected && (
                  <CheckmarkIcon width={10} height={10} />
                )}
              </div>
              <span style={{
                color: allTopicsSelected ? colors.primary : colors.text,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                userSelect: 'none',
                flex: '0 1 auto', // Don't allow text to force container to grow
              }}>
                {allTopicsSelected ? "Unselect all" : "Select all"}
              </span>
            </div>
          </div>

          {/* Update the topics grid to use tempTopicsDict instead of topicsDict */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: window.innerWidth < 480 ? 'repeat(auto-fill, minmax(130px, 1fr))' : 'repeat(auto-fill, minmax(180px, 1fr))',
            gap: window.innerWidth < 480 ? '8px' : '16px',
            paddingBottom: '80px' // Added padding at the bottom of the grid for better scrolling experience
          }}>
            {Object.entries(tempTopicsDict).map(([topic, isSelected]) => (
              <div
                key={topic}
                onClick={() => handleLocalTopicToggle(topic)}
                style={{
                  padding: '12px 16px',
                  borderRadius: '8px',
                  border: `1px solid ${isSelected ? colors.primary : colors.border}`,
                  backgroundColor: isSelected ? colors.primaryLight : 'white',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  height: '46px',
                  boxSizing: 'border-box',
                  userSelect: 'none' // Prevent text selection on double-click
                }}
              >
                <div style={{
                  width: '18px',
                  height: '18px',
                  minWidth: '18px', // Ensure checkbox doesn't resize
                  borderRadius: '4px',
                  border: `2px solid ${isSelected ? colors.primary : colors.secondary}`,
                  backgroundColor: isSelected ? colors.primary : 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0, // Prevent checkbox from shrinking
                  transition: 'all 0.2s ease',
                }}>                  {isSelected && (
                    <CheckmarkIcon />
                  )}
                </div>
                <span style={{
                  color: isSelected ? colors.primary : colors.text,
                  fontWeight: isSelected ? '500' : 'normal',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  flex: '1',
                  userSelect: 'none' // Prevent text selection
                }}>
                  {formatTopicName(topic)}
                </span>
              </div>
            ))}
          </div>

          {/* Status message */}
          {prefSubmitStatus && (
            <div style={{
              marginTop: '24px',
              marginBottom: '24px', // Add bottom margin so it's not right against the buttons
              padding: '12px 16px',
              borderRadius: '8px',
              backgroundColor: prefSubmitStatus.type === 'success' ? colors.successLight : colors.errorLight,
              color: prefSubmitStatus.type === 'success' ? colors.success : colors.error,
              animation: 'fadeIn 0.3s'
            }}>
              {prefSubmitStatus.message}
            </div>
          )}
        </div>
        
        {/* Button actions with sticky positioning */}
        <div style={{ 
          padding: window.innerWidth < 480 ? '8px 24px 8px 0px' : '8px 24px 8px 0px',
          marginTop: 'auto',
          display: 'flex', 
          justifyContent: 'flex-end', 
          gap: '16px',
          borderTop: `1px solid ${colors.border}`,
          backgroundColor:`${colors.containerBg}ee`, // Slightly darker or different shade
          boxShadow: '0 -4px 6px rgba(255, 179, 179, 0.03)', // Subtle shadow for depth
          position: 'relative', // Ensure the shadow displays correctly
        }}>
          <button
            onClick={skipPreferences}
            style={{
              padding: '10px 24px',
              backgroundColor: 'white',
              color: colors.text,
              border: `1px solid ${colors.border}`,
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '16px',
              transition: 'all 0.2s ease',
              userSelect: 'none', // Prevent text selection
            }}
            onMouseOver={(e) => {
              // Using a darker shade for skip button hover
              e.currentTarget.style.backgroundColor = colors.secondary + '15'; // Adding 15% opacity
              // e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
              // Add a more prominent border on hover
              e.currentTarget.style.border = `1px solid ${colors.secondary}`;
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'white';
              // e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
              // Restore the original border
              e.currentTarget.style.border = `1px solid ${colors.border}`;
            }}
          >
            Skip
          </button>
          <button
            onClick={handleSave}
            style={{
              padding: '10px 24px',
              backgroundColor: colors.primary,
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '16px',
              transition: 'all 0.2s ease',
              userSelect: 'none', // Prevent text selection
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#2563eb'; // Darker shade of blue
              // e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.4)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = colors.primary;
              // e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreferencesModal;
