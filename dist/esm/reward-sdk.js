import ht, { useState as _, useEffect as xt } from "react";
var lt = { exports: {} }, Ee = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var dt;
function mt() {
  if (dt) return Ee;
  dt = 1;
  var h = ht, O = Symbol.for("react.element"), I = Symbol.for("react.fragment"), c = Object.prototype.hasOwnProperty, K = h.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, U = { key: !0, ref: !0, __self: !0, __source: !0 };
  function Q(T, m, G) {
    var v, k = {}, A = null, Z = null;
    G !== void 0 && (A = "" + G), m.key !== void 0 && (A = "" + m.key), m.ref !== void 0 && (Z = m.ref);
    for (v in m) c.call(m, v) && !U.hasOwnProperty(v) && (k[v] = m[v]);
    if (T && T.defaultProps) for (v in m = T.defaultProps, m) k[v] === void 0 && (k[v] = m[v]);
    return { $$typeof: O, type: T, key: A, ref: Z, props: k, _owner: K.current };
  }
  return Ee.Fragment = I, Ee.jsx = Q, Ee.jsxs = Q, Ee;
}
var _e = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ft;
function wt() {
  return ft || (ft = 1, process.env.NODE_ENV !== "production" && function() {
    var h = ht, O = Symbol.for("react.element"), I = Symbol.for("react.portal"), c = Symbol.for("react.fragment"), K = Symbol.for("react.strict_mode"), U = Symbol.for("react.profiler"), Q = Symbol.for("react.provider"), T = Symbol.for("react.context"), m = Symbol.for("react.forward_ref"), G = Symbol.for("react.suspense"), v = Symbol.for("react.suspense_list"), k = Symbol.for("react.memo"), A = Symbol.for("react.lazy"), Z = Symbol.for("react.offscreen"), s = Symbol.iterator, R = "@@iterator";
    function N(e) {
      if (e === null || typeof e != "object")
        return null;
      var r = s && e[s] || e[R];
      return typeof r == "function" ? r : null;
    }
    var L = h.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function E(e) {
      {
        for (var r = arguments.length, n = new Array(r > 1 ? r - 1 : 0), i = 1; i < r; i++)
          n[i - 1] = arguments[i];
        ee("error", e, n);
      }
    }
    function ee(e, r, n) {
      {
        var i = L.ReactDebugCurrentFrame, x = i.getStackAddendum();
        x !== "" && (r += "%s", n = n.concat([x]));
        var b = n.map(function(g) {
          return String(g);
        });
        b.unshift("Warning: " + r), Function.prototype.apply.call(console[e], console, b);
      }
    }
    var Oe = !1, te = !1, ye = !1, Le = !1, Pe = !1, Ie;
    Ie = Symbol.for("react.module.reference");
    function Ae(e) {
      return !!(typeof e == "string" || typeof e == "function" || e === c || e === U || Pe || e === K || e === G || e === v || Le || e === Z || Oe || te || ye || typeof e == "object" && e !== null && (e.$$typeof === A || e.$$typeof === k || e.$$typeof === Q || e.$$typeof === T || e.$$typeof === m || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      e.$$typeof === Ie || e.getModuleId !== void 0));
    }
    function Ke(e, r, n) {
      var i = e.displayName;
      if (i)
        return i;
      var x = r.displayName || r.name || "";
      return x !== "" ? n + "(" + x + ")" : n;
    }
    function be(e) {
      return e.displayName || "Context";
    }
    function V(e) {
      if (e == null)
        return null;
      if (typeof e.tag == "number" && E("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
        return e.displayName || e.name || null;
      if (typeof e == "string")
        return e;
      switch (e) {
        case c:
          return "Fragment";
        case I:
          return "Portal";
        case U:
          return "Profiler";
        case K:
          return "StrictMode";
        case G:
          return "Suspense";
        case v:
          return "SuspenseList";
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case T:
            var r = e;
            return be(r) + ".Consumer";
          case Q:
            var n = e;
            return be(n._context) + ".Provider";
          case m:
            return Ke(e, e.render, "ForwardRef");
          case k:
            var i = e.displayName || null;
            return i !== null ? i : V(e.type) || "Memo";
          case A: {
            var x = e, b = x._payload, g = x._init;
            try {
              return V(g(b));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var M = Object.assign, q = 0, ue, Qe, re, We, ve, $e, De;
    function Fe() {
    }
    Fe.__reactDisabledLog = !0;
    function me() {
      {
        if (q === 0) {
          ue = console.log, Qe = console.info, re = console.warn, We = console.error, ve = console.group, $e = console.groupCollapsed, De = console.groupEnd;
          var e = {
            configurable: !0,
            enumerable: !0,
            value: Fe,
            writable: !0
          };
          Object.defineProperties(console, {
            info: e,
            log: e,
            warn: e,
            error: e,
            group: e,
            groupCollapsed: e,
            groupEnd: e
          });
        }
        q++;
      }
    }
    function ut() {
      {
        if (q--, q === 0) {
          var e = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: M({}, e, {
              value: ue
            }),
            info: M({}, e, {
              value: Qe
            }),
            warn: M({}, e, {
              value: re
            }),
            error: M({}, e, {
              value: We
            }),
            group: M({}, e, {
              value: ve
            }),
            groupCollapsed: M({}, e, {
              value: $e
            }),
            groupEnd: M({}, e, {
              value: De
            })
          });
        }
        q < 0 && E("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var we = L.ReactCurrentDispatcher, H;
    function u(e, r, n) {
      {
        if (H === void 0)
          try {
            throw Error();
          } catch (x) {
            var i = x.stack.trim().match(/\n( *(at )?)/);
            H = i && i[1] || "";
          }
        return `
` + H + e;
      }
    }
    var Me = !1, fe;
    {
      var Ze = typeof WeakMap == "function" ? WeakMap : Map;
      fe = new Ze();
    }
    function Ye(e, r) {
      if (!e || Me)
        return "";
      {
        var n = fe.get(e);
        if (n !== void 0)
          return n;
      }
      var i;
      Me = !0;
      var x = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var b;
      b = we.current, we.current = null, me();
      try {
        if (r) {
          var g = function() {
            throw Error();
          };
          if (Object.defineProperty(g.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(g, []);
            } catch (F) {
              i = F;
            }
            Reflect.construct(e, [], g);
          } else {
            try {
              g.call();
            } catch (F) {
              i = F;
            }
            e.call(g.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (F) {
            i = F;
          }
          e();
        }
      } catch (F) {
        if (F && i && typeof F.stack == "string") {
          for (var d = F.stack.split(`
`), $ = i.stack.split(`
`), S = d.length - 1, j = $.length - 1; S >= 1 && j >= 0 && d[S] !== $[j]; )
            j--;
          for (; S >= 1 && j >= 0; S--, j--)
            if (d[S] !== $[j]) {
              if (S !== 1 || j !== 1)
                do
                  if (S--, j--, j < 0 || d[S] !== $[j]) {
                    var B = `
` + d[S].replace(" at new ", " at ");
                    return e.displayName && B.includes("<anonymous>") && (B = B.replace("<anonymous>", e.displayName)), typeof e == "function" && fe.set(e, B), B;
                  }
                while (S >= 1 && j >= 0);
              break;
            }
        }
      } finally {
        Me = !1, we.current = b, ut(), Error.prepareStackTrace = x;
      }
      var xe = e ? e.displayName || e.name : "", de = xe ? u(xe) : "";
      return typeof e == "function" && fe.set(e, de), de;
    }
    function et(e, r, n) {
      return Ye(e, !1);
    }
    function Ue(e) {
      var r = e.prototype;
      return !!(r && r.isReactComponent);
    }
    function pe(e, r, n) {
      if (e == null)
        return "";
      if (typeof e == "function")
        return Ye(e, Ue(e));
      if (typeof e == "string")
        return u(e);
      switch (e) {
        case G:
          return u("Suspense");
        case v:
          return u("SuspenseList");
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case m:
            return et(e.render);
          case k:
            return pe(e.type, r, n);
          case A: {
            var i = e, x = i._payload, b = i._init;
            try {
              return pe(b(x), r, n);
            } catch {
            }
          }
        }
      return "";
    }
    var oe = Object.prototype.hasOwnProperty, ie = {}, ze = L.ReactDebugCurrentFrame;
    function D(e) {
      if (e) {
        var r = e._owner, n = pe(e.type, e._source, r ? r.type : null);
        ze.setExtraStackFrame(n);
      } else
        ze.setExtraStackFrame(null);
    }
    function tt(e, r, n, i, x) {
      {
        var b = Function.call.bind(oe);
        for (var g in e)
          if (b(e, g)) {
            var d = void 0;
            try {
              if (typeof e[g] != "function") {
                var $ = Error((i || "React class") + ": " + n + " type `" + g + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[g] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw $.name = "Invariant Violation", $;
              }
              d = e[g](r, g, i, n, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (S) {
              d = S;
            }
            d && !(d instanceof Error) && (D(x), E("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", i || "React class", n, g, typeof d), D(null)), d instanceof Error && !(d.message in ie) && (ie[d.message] = !0, D(x), E("Failed %s type: %s", n, d.message), D(null));
          }
      }
    }
    var rt = Array.isArray;
    function Se(e) {
      return rt(e);
    }
    function Be(e) {
      {
        var r = typeof Symbol == "function" && Symbol.toStringTag, n = r && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return n;
      }
    }
    function Te(e) {
      try {
        return Ne(e), !1;
      } catch {
        return !0;
      }
    }
    function Ne(e) {
      return "" + e;
    }
    function ke(e) {
      if (Te(e))
        return E("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Be(e)), Ne(e);
    }
    var ge = L.ReactCurrentOwner, nt = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, Ve, He;
    function Je(e) {
      if (oe.call(e, "ref")) {
        var r = Object.getOwnPropertyDescriptor(e, "ref").get;
        if (r && r.isReactWarning)
          return !1;
      }
      return e.ref !== void 0;
    }
    function t(e) {
      if (oe.call(e, "key")) {
        var r = Object.getOwnPropertyDescriptor(e, "key").get;
        if (r && r.isReactWarning)
          return !1;
      }
      return e.key !== void 0;
    }
    function o(e, r) {
      typeof e.ref == "string" && ge.current;
    }
    function l(e, r) {
      {
        var n = function() {
          Ve || (Ve = !0, E("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        n.isReactWarning = !0, Object.defineProperty(e, "key", {
          get: n,
          configurable: !0
        });
      }
    }
    function f(e, r) {
      {
        var n = function() {
          He || (He = !0, E("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        n.isReactWarning = !0, Object.defineProperty(e, "ref", {
          get: n,
          configurable: !0
        });
      }
    }
    var C = function(e, r, n, i, x, b, g) {
      var d = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: O,
        // Built-in properties that belong on the element
        type: e,
        key: r,
        ref: n,
        props: g,
        // Record the component responsible for creating this element.
        _owner: b
      };
      return d._store = {}, Object.defineProperty(d._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(d, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: i
      }), Object.defineProperty(d, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: x
      }), Object.freeze && (Object.freeze(d.props), Object.freeze(d)), d;
    };
    function w(e, r, n, i, x) {
      {
        var b, g = {}, d = null, $ = null;
        n !== void 0 && (ke(n), d = "" + n), t(r) && (ke(r.key), d = "" + r.key), Je(r) && ($ = r.ref, o(r, x));
        for (b in r)
          oe.call(r, b) && !nt.hasOwnProperty(b) && (g[b] = r[b]);
        if (e && e.defaultProps) {
          var S = e.defaultProps;
          for (b in S)
            g[b] === void 0 && (g[b] = S[b]);
        }
        if (d || $) {
          var j = typeof e == "function" ? e.displayName || e.name || "Unknown" : e;
          d && l(g, j), $ && f(g, j);
        }
        return C(e, d, $, x, i, ge.current, g);
      }
    }
    var p = L.ReactCurrentOwner, Y = L.ReactDebugCurrentFrame;
    function W(e) {
      if (e) {
        var r = e._owner, n = pe(e.type, e._source, r ? r.type : null);
        Y.setExtraStackFrame(n);
      } else
        Y.setExtraStackFrame(null);
    }
    var ne;
    ne = !1;
    function se(e) {
      return typeof e == "object" && e !== null && e.$$typeof === O;
    }
    function X() {
      {
        if (p.current) {
          var e = V(p.current.type);
          if (e)
            return `

Check the render method of \`` + e + "`.";
        }
        return "";
      }
    }
    function ae(e) {
      return "";
    }
    var J = {};
    function le(e) {
      {
        var r = X();
        if (!r) {
          var n = typeof e == "string" ? e : e.displayName || e.name;
          n && (r = `

Check the top-level render call using <` + n + ">.");
        }
        return r;
      }
    }
    function z(e, r) {
      {
        if (!e._store || e._store.validated || e.key != null)
          return;
        e._store.validated = !0;
        var n = le(r);
        if (J[n])
          return;
        J[n] = !0;
        var i = "";
        e && e._owner && e._owner !== p.current && (i = " It was passed a child from " + V(e._owner.type) + "."), W(e), E('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', n, i), W(null);
      }
    }
    function Ce(e, r) {
      {
        if (typeof e != "object")
          return;
        if (Se(e))
          for (var n = 0; n < e.length; n++) {
            var i = e[n];
            se(i) && z(i, r);
          }
        else if (se(e))
          e._store && (e._store.validated = !0);
        else if (e) {
          var x = N(e);
          if (typeof x == "function" && x !== e.entries)
            for (var b = x.call(e), g; !(g = b.next()).done; )
              se(g.value) && z(g.value, r);
        }
      }
    }
    function Ge(e) {
      {
        var r = e.type;
        if (r == null || typeof r == "string")
          return;
        var n;
        if (typeof r == "function")
          n = r.propTypes;
        else if (typeof r == "object" && (r.$$typeof === m || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        r.$$typeof === k))
          n = r.propTypes;
        else
          return;
        if (n) {
          var i = V(r);
          tt(n, e.props, "prop", i, e);
        } else if (r.PropTypes !== void 0 && !ne) {
          ne = !0;
          var x = V(r);
          E("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", x || "Unknown");
        }
        typeof r.getDefaultProps == "function" && !r.getDefaultProps.isReactClassApproved && E("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function qe(e) {
      {
        for (var r = Object.keys(e.props), n = 0; n < r.length; n++) {
          var i = r[n];
          if (i !== "children" && i !== "key") {
            W(e), E("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", i), W(null);
            break;
          }
        }
        e.ref !== null && (W(e), E("Invalid attribute `ref` supplied to `React.Fragment`."), W(null));
      }
    }
    var je = {};
    function Re(e, r, n, i, x, b) {
      {
        var g = Ae(e);
        if (!g) {
          var d = "";
          (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (d += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var $ = ae();
          $ ? d += $ : d += X();
          var S;
          e === null ? S = "null" : Se(e) ? S = "array" : e !== void 0 && e.$$typeof === O ? (S = "<" + (V(e.type) || "Unknown") + " />", d = " Did you accidentally export a JSX literal instead of a component?") : S = typeof e, E("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", S, d);
        }
        var j = w(e, r, n, x, b);
        if (j == null)
          return j;
        if (g) {
          var B = r.children;
          if (B !== void 0)
            if (i)
              if (Se(B)) {
                for (var xe = 0; xe < B.length; xe++)
                  Ce(B[xe], e);
                Object.freeze && Object.freeze(B);
              } else
                E("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              Ce(B, e);
        }
        if (oe.call(r, "key")) {
          var de = V(e), F = Object.keys(r).filter(function(vt) {
            return vt !== "key";
          }), at = F.length > 0 ? "{key: someKey, " + F.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!je[de + at]) {
            var bt = F.length > 0 ? "{" + F.join(": ..., ") + ": ...}" : "{}";
            E(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, at, de, bt, de), je[de + at] = !0;
          }
        }
        return e === c ? qe(j) : Ge(j), j;
      }
    }
    function Xe(e, r, n) {
      return Re(e, r, n, !0);
    }
    function y(e, r, n) {
      return Re(e, r, n, !1);
    }
    var P = y, he = Xe;
    _e.Fragment = c, _e.jsx = P, _e.jsxs = he;
  }()), _e;
}
process.env.NODE_ENV === "production" ? lt.exports = mt() : lt.exports = wt();
var a = lt.exports;
const St = ({
  showPreferences: h,
  skipPreferences: O,
  topicsDict: I,
  colors: c,
  formatTopicName: K,
  prefSubmitStatus: U,
  updateProfile: Q
}) => {
  const [T, m] = _({});
  xt(() => {
    h && m({ ...I });
  }, [h, I]);
  const G = (s) => {
    m((R) => ({
      ...R,
      [s]: !R[s]
    }));
  }, v = () => {
    const R = !Object.values(T).every((L) => L === !0), N = {};
    Object.keys(T).forEach((L) => {
      N[L] = R;
    }), m(N);
  }, k = Object.values(T).every((s) => s === !0), A = () => {
    const s = Object.keys(T).filter((ee) => T[ee]), R = Object.keys(I).filter((ee) => I[ee]);
    let N = !1;
    s.length !== R.length ? N = !0 : N = s.some((ee) => !R.includes(ee));
    const L = s.length === 0, E = Object.keys(T).length;
    Q({
      tempTopicsDict: T,
      allTopicsSelected: k,
      newSelectedTopics: s,
      oldSelectedTopics: R,
      noTopicsSelected: L,
      hasChanges: N,
      totalTopicsCount: E
    });
  }, Z = (s) => {
    s.target === s.currentTarget && O();
  };
  return h ? /* @__PURE__ */ a.jsx(
    "div",
    {
      style: {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1e3
      },
      onClick: Z,
      children: /* @__PURE__ */ a.jsxs("div", { style: {
        backgroundColor: c.containerBg,
        borderRadius: "8px",
        width: "95%",
        maxWidth: "600px",
        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
        animation: "fadeInUp 0.3s",
        overflow: "hidden",
        // Changed from auto to hidden for outer container
        display: "flex",
        flexDirection: "column"
      }, children: [
        /* @__PURE__ */ a.jsxs("div", { style: {
          padding: `${window.innerWidth < 480 ? "24px 16px" : "32px"} ${window.innerWidth < 480 ? "16px" : "32px"} 0`,
          overflow: "auto",
          // Scrolling happens in this inner container
          flexGrow: 1,
          maxHeight: window.innerWidth < 480 ? "calc(90vh - 100px)" : "calc(80vh - 100px)"
          // Reserve space for buttons
        }, children: [
          /* @__PURE__ */ a.jsx("style", { children: `
            @keyframes fadeInUp {
              from { opacity: 0; transform: translateY(20px); }
              to { opacity: 1; transform: translateY(0); }
            }
          ` }),
          /* @__PURE__ */ a.jsx("div", { style: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "0px"
            // Reduced from 12px to 8px to reduce space above
          }, children: /* @__PURE__ */ a.jsx("h2", { style: {
            margin: 0,
            color: c.text,
            fontSize: window.innerWidth < 480 ? "20px" : "26px",
            userSelect: "none",
            // Prevent text selection
            cursor: "default"
            // Use default cursor instead of text selection cursor
          }, children: "Your interests" }) }),
          /* @__PURE__ */ a.jsxs("div", { style: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "46px"
            // Increased from 16px to 24px to add space below
          }, children: [
            /* @__PURE__ */ a.jsx("p", { style: {
              color: c.textLight,
              margin: 0,
              fontSize: "18px",
              userSelect: "none",
              // Prevent text selection
              cursor: "default"
              // Use default cursor instead of text selection cursor
            }, children: "Select topics you're interested in" }),
            /* @__PURE__ */ a.jsxs(
              "div",
              {
                onClick: v,
                style: {
                  padding: "8px 12px",
                  borderRadius: "8px",
                  border: `1px solid ${k ? c.primary : c.border}`,
                  backgroundColor: k ? c.primaryLight : "white",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  height: "36px",
                  boxSizing: "border-box",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                  width: "140px",
                  marginLeft: "auto",
                  justifyContent: "flex-start",
                  overflow: "hidden"
                },
                children: [
                  /* @__PURE__ */ a.jsx("div", { style: {
                    width: "16px",
                    height: "16px",
                    minWidth: "16px",
                    borderRadius: "4px",
                    border: `2px solid ${k ? c.primary : c.secondary}`,
                    backgroundColor: k ? c.primary : "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    transition: "all 0.2s ease",
                    position: "relative",
                    left: "0"
                  }, children: k && /* @__PURE__ */ a.jsx("svg", { width: "10", height: "10", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ a.jsx("path", { d: "M5 13L9 17L19 7", stroke: "white", strokeWidth: "3", strokeLinecap: "round", strokeLinejoin: "round" }) }) }),
                  /* @__PURE__ */ a.jsx("span", { style: {
                    color: k ? c.primary : c.text,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    userSelect: "none",
                    flex: "0 1 auto"
                    // Don't allow text to force container to grow
                  }, children: k ? "Unselect all" : "Select all" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ a.jsx("div", { style: {
            display: "grid",
            gridTemplateColumns: window.innerWidth < 480 ? "repeat(auto-fill, minmax(130px, 1fr))" : "repeat(auto-fill, minmax(180px, 1fr))",
            gap: window.innerWidth < 480 ? "8px" : "16px",
            paddingBottom: "80px"
            // Added padding at the bottom of the grid for better scrolling experience
          }, children: Object.entries(T).map(([s, R]) => /* @__PURE__ */ a.jsxs(
            "div",
            {
              onClick: () => G(s),
              style: {
                padding: "12px 16px",
                borderRadius: "8px",
                border: `1px solid ${R ? c.primary : c.border}`,
                backgroundColor: R ? c.primaryLight : "white",
                cursor: "pointer",
                transition: "all 0.2s ease",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                height: "46px",
                boxSizing: "border-box",
                userSelect: "none"
                // Prevent text selection on double-click
              },
              children: [
                /* @__PURE__ */ a.jsx("div", { style: {
                  width: "18px",
                  height: "18px",
                  minWidth: "18px",
                  // Ensure checkbox doesn't resize
                  borderRadius: "4px",
                  border: `2px solid ${R ? c.primary : c.secondary}`,
                  backgroundColor: R ? c.primary : "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  // Prevent checkbox from shrinking
                  transition: "all 0.2s ease"
                }, children: R && /* @__PURE__ */ a.jsx("svg", { width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ a.jsx("path", { d: "M5 13L9 17L19 7", stroke: "white", strokeWidth: "3", strokeLinecap: "round", strokeLinejoin: "round" }) }) }),
                /* @__PURE__ */ a.jsx("span", { style: {
                  color: R ? c.primary : c.text,
                  fontWeight: R ? "500" : "normal",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  flex: "1",
                  userSelect: "none"
                  // Prevent text selection
                }, children: K(s) })
              ]
            },
            s
          )) }),
          U && /* @__PURE__ */ a.jsx("div", { style: {
            marginTop: "24px",
            marginBottom: "24px",
            // Add bottom margin so it's not right against the buttons
            padding: "12px 16px",
            borderRadius: "8px",
            backgroundColor: U.type === "success" ? c.successLight : c.errorLight,
            color: U.type === "success" ? c.success : c.error,
            animation: "fadeIn 0.3s"
          }, children: U.message })
        ] }),
        /* @__PURE__ */ a.jsxs("div", { style: {
          padding: (window.innerWidth < 480, "8px 24px 8px 0px"),
          marginTop: "auto",
          display: "flex",
          justifyContent: "flex-end",
          gap: "16px",
          borderTop: `1px solid ${c.border}`,
          backgroundColor: `${c.containerBg}ee`,
          // Slightly darker or different shade
          boxShadow: "0 -4px 6px rgba(255, 179, 179, 0.03)",
          // Subtle shadow for depth
          position: "relative"
          // Ensure the shadow displays correctly
        }, children: [
          /* @__PURE__ */ a.jsx(
            "button",
            {
              onClick: O,
              style: {
                padding: "10px 24px",
                backgroundColor: "white",
                color: c.text,
                border: `1px solid ${c.border}`,
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "16px",
                transition: "all 0.2s ease",
                userSelect: "none"
                // Prevent text selection
              },
              onMouseOver: (s) => {
                s.currentTarget.style.backgroundColor = c.secondary + "15", s.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.1)", s.currentTarget.style.border = `1px solid ${c.secondary}`;
              },
              onMouseOut: (s) => {
                s.currentTarget.style.backgroundColor = "white", s.currentTarget.style.boxShadow = "none", s.currentTarget.style.border = `1px solid ${c.border}`;
              },
              children: "Skip"
            }
          ),
          /* @__PURE__ */ a.jsx(
            "button",
            {
              onClick: A,
              style: {
                padding: "10px 24px",
                backgroundColor: c.primary,
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "16px",
                transition: "all 0.2s ease",
                userSelect: "none"
                // Prevent text selection
              },
              onMouseOver: (s) => {
                s.currentTarget.style.backgroundColor = "#2563eb", s.currentTarget.style.boxShadow = "0 4px 12px rgba(59, 130, 246, 0.4)";
              },
              onMouseOut: (s) => {
                s.currentTarget.style.backgroundColor = c.primary, s.currentTarget.style.boxShadow = "none";
              },
              children: "Save"
            }
          )
        ] })
      ] })
    }
  ) : null;
}, ct = "rewardSdk_sessionId", yt = "rewardSdk_languages";
let ce = null, ot = !1, it = [];
if (typeof window < "u") {
  const h = localStorage.getItem(ct);
  h && (ce = h);
}
const pt = () => {
  let h = [];
  if (navigator.languages && navigator.languages.length) {
    const O = /* @__PURE__ */ new Set();
    h = navigator.languages.map((I) => I.split("-")[0]).filter((I) => O.has(I) ? !1 : (O.add(I), !0));
  } else
    h = [navigator.language.split("-")[0]];
  return h;
}, gt = () => {
  try {
    const h = localStorage.getItem(yt);
    return h ? JSON.parse(h) : [];
  } catch (h) {
    return console.error("Error parsing stored languages:", h), [];
  }
}, st = (h) => {
  try {
    localStorage.setItem(yt, JSON.stringify(h));
  } catch (O) {
    console.error("Error storing languages:", O);
  }
}, Tt = (h = null) => (h ? (ce = h, localStorage.setItem(ct, h)) : (ce = null, localStorage.removeItem(ct)), !0), kt = () => !!ce, Ct = ({
  apiKey: h = "89b668d3f2af4e2ea9e0e44d74620b44",
  apiBaseUrl: O = "https://label-api.fly.dev/",
  taskCount: I = "3",
  customStyle: c = {},
  onRewardGranted: K,
  onClose: U
}) => {
  if (!h)
    throw new Error("RewardSdk: apiKey is required but not provided in props or environment variables");
  if (!O)
    throw new Error("API base URL is not configured in props or environment variables");
  const Q = async () => {
    if (A(!0), kt())
      await pe() || D();
    else {
      const t = Ue();
      ie(t);
    }
  }, [T, m] = _(null), [G, v] = _(!1), [k, A] = _(!0), [Z, s] = _(null), [R, N] = _({}), [L, E] = _(I), [ee, Oe] = _(!0), [te, ye] = _(!1), [Le, Pe] = _(""), [Ie, Ae] = _(0), [Ke, be] = _(0), [V, M] = _(!1), [q, ue] = _({}), [Qe, re] = _(!1), [We, ve] = _(null), [$e, De] = _(!1), Fe = ["profile", "user", "task", "name"][Math.floor(Math.random() * 4)], [me] = _(`${Fe}_${Math.random().toString(36).substring(2, 7)}`), [ut, we] = _(window.innerWidth), H = async (t, o = "GET", l = null, f = {}) => {
    const C = {
      requiresSession: !0,
      onRedirect: ie,
      setLoading: !0
    }, { requiresSession: w, onRedirect: p, setLoading: Y } = { ...C, ...f };
    try {
      Y && v(!0), s(null);
      const W = `${O}${t}`, ne = {
        Accept: "application/json",
        "Content-Type": "application/json"
      };
      w && ce && (ne["X-Session-ID"] = ce), h && (ne["X-API-KEY"] = h);
      const se = {
        method: o,
        headers: ne
      };
      l && (o === "POST" || o === "PUT") && (se.body = JSON.stringify(l));
      const X = await fetch(W, se);
      if (X.status === 307) {
        if (Y && v(!1), ot)
          return new Promise((J, le) => {
            it.push({
              endpoint: t,
              method: o,
              body: l,
              options: f,
              resolve: J,
              reject: le
            });
          });
        ot = !0;
        try {
          const J = p ? await p() : null, le = it.map((z) => H(
            z.endpoint,
            z.method,
            z.body,
            z.options
          ).then(z.resolve, z.reject));
          return it = [], await Promise.allSettled(le), J || H(t, o, l, f);
        } finally {
          ot = !1;
        }
      }
      let ae;
      try {
        ae = await X.json();
      } catch {
        ae = { detail: `API responded with status: ${X.status}` };
      }
      if (!X.ok)
        throw new Error(ae.detail || ae.error || `API responded with status: ${X.status}`);
      return ae;
    } catch (W) {
      throw s(W.message || "Failed to connect to API. Is the server running?"), W;
    } finally {
      Y && v(!1);
    }
  }, u = {
    background: "#f8fafc",
    containerBg: "#ffffff",
    primary: "#3b82f6",
    primaryLight: "#dbeafe",
    secondary: "#64748b",
    secondaryLight: "#f1f5f9",
    secondaryV: "#f0f9ff",
    success: "#10b981",
    successLight: "#d1fae5",
    error: "#ef4444",
    errorLight: "#fee2e2",
    text: "#334155",
    textLight: "#64748b",
    border: "#e2e8f0",
    warning: "#f59e0b",
    warningLight: "#fef3c7"
  }, fe = { ...{
    backgroundColor: "transparent",
    borderRadius: "8px",
    color: u.text,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    Width: "100%",
    overflowY: "auto",
    Height: "100%",
    userSelect: "none"
    // Prevent text selection for the entire component
  }, ...c }, Ze = () => {
    if (!document.getElementById("reward-sdk-responsive-styles")) {
      const t = document.createElement("style");
      t.id = "reward-sdk-responsive-styles", t.innerHTML = `
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
      `, document.head.appendChild(t);
    }
  }, Ye = () => {
    Pe("Only correct answers count"), Ae((t) => t + 1);
  }, et = () => {
    Pe(""), E((t) => Math.max(0, t - 1));
  }, Ue = () => {
    const t = pt();
    return st(t), t;
  }, pe = async () => {
    const t = gt(), o = pt();
    if (o.length !== t.length)
      return st(o), await ie(o), !0;
    for (let l = 0; l < o.length; l++)
      if (o[l] !== t[l])
        return st(o), await ie(o), !0;
    return !1;
  }, oe = () => {
    const t = Ue();
    ie(t);
  };
  xt(() => {
    window.addEventListener("languagechange", oe);
    const t = () => {
      we(window.innerWidth);
    };
    return window.addEventListener("resize", t), Ze(), Q(), () => {
      window.removeEventListener("languagechange", oe), window.removeEventListener("resize", t);
    };
  }, []);
  const ie = async (t = null) => {
    try {
      v(!0), s(null);
      const l = {
        langs: t || gt()
      }, f = `${O}identity/`, C = {
        Accept: "application/json",
        "Content-Type": "application/json"
      };
      h && (C["X-API-KEY"] = h), ce && (C["X-Session-ID"] = ce);
      const w = await fetch(f, {
        method: "POST",
        headers: C,
        body: JSON.stringify(l)
      });
      let p;
      try {
        p = await w.json();
      } catch {
        p = { detail: `API responded with status: ${w.status}` };
      }
      if (!w.ok)
        throw new Error(p.detail || p.error || `API responded with status: ${w.status}`);
      return p.session_id && p.api_topics && p.message === "new_user" ? (Tt(p.session_id), ge(p.api_topics, null), De(!0), v(!1), A(!1), M(!0), p) : p.message === "language_updated" ? (setTimeout(() => D(), 0), p) : (s("Unexpected response from identity endpoint"), v(!1), A(!1), null);
    } catch (o) {
      return s(o.message || "Failed to connect to identity endpoint"), v(!1), A(!1), null;
    }
  }, ze = (t) => {
    var C, w, p;
    if (!Array.isArray(t) || t.length === 0)
      return !1;
    const o = t[0], l = (w = (C = o == null ? void 0 : o.content) == null ? void 0 : C.image) == null ? void 0 : w.url, f = (p = o == null ? void 0 : o.task) == null ? void 0 : p.text;
    return !!(l && f);
  }, D = async (t = !1) => {
    try {
      A(!1), ye(!1);
      let o = "task/";
      t && Math.random() < 0.5 && (o += "?complexity=1");
      const l = await H(o, "GET");
      if (!ze(l)) {
        s("Failed to get a task. Please try again.");
        return;
      }
      m(l), N({}), ee && t && Oe(!1);
    } catch {
    }
  }, tt = () => {
    D(!0);
  }, rt = async (t, o, l) => {
    if (!te)
      try {
        ye(!0);
        const f = {
          task_id: t,
          track_id: l,
          solution: o
        }, C = L === 1;
        C ? (f.wrong_answers = Ie, f.total_tasks = Ke) : v(!0);
        const w = document.getElementById(me);
        w && w.value && (f.callEndPoint = w.value);
        const p = await H("solution/", "POST", f);
        be((W) => W + 1);
        const Y = C && (p == null ? void 0 : p.result) === "correct";
        if (p && p.result === "wrong") {
          Ye(), D(!0);
          return;
        } else p && p.result === "correct" && et();
        Oe(!1), Y ? (Ae(0), be(0), alert("Reward granted 🎁"), K && K()) : D();
      } catch (f) {
        N((C) => ({
          ...C,
          [t]: { status: "error", message: `Error: ${f.message}` }
        })), ye(!1);
      }
  }, Se = async () => {
    try {
      return re(!0), (await H("topics/", "GET", null, {
        requiresSession: !1,
        setLoading: !1
      })).api_topics || [];
    } catch {
      return [];
    } finally {
      re(!1);
    }
  }, Be = async () => {
    try {
      return (await H("profile/", "GET", null, { setLoading: !1 })).user_topics || [];
    } catch {
      return [];
    }
  }, Te = async (t = []) => {
    re(!0), ve(null);
    try {
      if ((await H("profile/update/", "POST", { topics: t }, { setLoading: !1 })).message === "profile_updated")
        M(!1), D();
      else
        throw new Error("Unexpected response from profile update");
    } catch (o) {
      ve({
        type: "error",
        message: `Failed to save preferences: ${o.message}`
      });
    } finally {
      re(!1);
    }
  }, Ne = (t) => {
    const {
      tempTopicsDict: o,
      allTopicsSelected: l,
      newSelectedTopics: f,
      oldSelectedTopics: C,
      noTopicsSelected: w,
      hasChanges: p,
      totalTopicsCount: Y
    } = t;
    if (!p) {
      ke();
      return;
    }
    ue(o), !l && !w ? Te(f) : l && C.length === 0 || w && C.length === Y ? (M(!1), D()) : Te(l ? [] : f);
  }, ke = () => {
    M(!1), D();
  }, ge = (t, o) => {
    if (t != null && o !== void 0 && o !== null) {
      const l = {};
      return t.forEach((f) => {
        l[f] = o.includes(f);
      }), ue(l), l;
    } else if (t != null && t.length > 0) {
      const l = {};
      return t.forEach((f) => {
        l[f] = !1;
      }), ue(l), l;
    } else if (o != null) {
      const l = { ...q };
      return Object.keys(l).forEach((f) => {
        l[f] = !1;
      }), Array.isArray(o) && o.forEach((f) => {
        f in l && (l[f] = !0);
      }), ue(l), l;
    }
    return q;
  }, nt = async () => {
    if (Object.keys(q).length === 0)
      try {
        const t = await Se(), o = await Be();
        return ge(t, o), !0;
      } catch (t) {
        return s(`Failed to update topics: ${t.message}`), !1;
      }
    if ($e)
      try {
        const t = await Be();
        ge(null, t);
      } catch (t) {
        return s(`Failed to update topics for new user: ${t.message}`), !1;
      }
    return !0;
  }, Ve = async () => {
    re(!0);
    try {
      await nt() && M(!0);
    } catch (t) {
      s(`Failed to prepare preferences: ${t.message}`);
    } finally {
      re(!1);
    }
  }, He = (t) => t.toLowerCase() === "uae" ? "UAE" : t.charAt(0).toUpperCase() + t.slice(1).replace(/-/g, " "), Je = (t, o = !1) => {
    var J, le, z, Ce, Ge, qe, je, Re, Xe;
    if (!t && !o || !o && (!t.id || !((le = (J = t.content) == null ? void 0 : J.image) != null && le.url) || !((z = t.task) != null && z.text))) return null;
    const l = (y) => !y || typeof y != "string" ? "" : y.charAt(0).toUpperCase() + y.slice(1), f = {
      // Darker background color for skeleton
      border: "#cbd5e1",
      // Darker border color for skeleton
      image: "#94a3b8"
      // Single darker color for image skeleton
    }, C = {
      backgroundColor: "transparent",
      marginBottom: "20px",
      transition: "all 0.3s ease",
      display: "flex",
      flexDirection: "row",
      // Default to row, CSS media query will handle responsiveness
      width: "100%",
      opacity: o ? "0.85" : "1",
      position: "relative",
      // Added for absolute positioning of skip button
      boxSizing: "border-box"
      // Add box-sizing to include borders in the width calculation
    }, w = 640, p = 480, Y = w / p, W = {
      width: "50%",
      // Default to half width, CSS media query will handle responsiveness
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "16px",
      boxSizing: "border-box",
      "@media (max-width: 768px)": {
        paddingRight: "0px"
        // Adjust padding to align properly on mobile
      }
    }, ne = {
      width: "50%",
      // Match left half width
      display: "flex",
      flexDirection: "column",
      padding: "16px",
      // Match left half padding
      margin: "0",
      // Remove margin to match left half
      borderRadius: "8px",
      boxSizing: "border-box",
      justifyContent: "space-between",
      // Center vertically instead of space-between
      "@media (max-width: 768px)": {
        alignSelf: "center",
        width: "100%"
      }
    }, se = {
      width: "100%",
      // 100% of the left half
      height: "auto",
      boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
      backgroundColor: (o || (Ge = (Ce = t == null ? void 0 : t.content) == null ? void 0 : Ce.image) != null && Ge.url, "transparent"),
      borderRadius: "8px",
      boxSizing: "border-box",
      aspectRatio: `${Y}`
      // Maintain aspect ratio
    }, X = {
      fontSize: "20px",
      fontWeight: "600",
      margin: "0 0 16px",
      // Remove top margin to reduce space
      padding: "16px",
      backgroundColor: o ? f.image : "transparent",
      borderRadius: "8px",
      lineHeight: "1.4",
      color: o ? "transparent" : u.text,
      letterSpacing: "0.01em",
      animation: o ? "pulse 1.5s infinite ease-in-out" : "none",
      minHeight: "80px",
      height: o ? "80px" : "auto"
    }, ae = {
      padding: "10px 20px",
      backgroundColor: u.secondaryLight,
      color: u.secondary,
      borderRadius: "30px",
      cursor: "pointer",
      border: `1px solid ${u.border}`,
      fontSize: "14px",
      fontWeight: "500",
      transition: "all 0.2s ease",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px",
      marginTop: "auto",
      marginBottom: "0",
      marginLeft: "auto",
      width: "auto",
      minWidth: "80px",
      userSelect: "none"
      // Prevent text selection
    };
    return /* @__PURE__ */ a.jsxs("div", { style: C, className: "task-container", children: [
      /* @__PURE__ */ a.jsx("div", { style: W, className: "task-left-half", children: /* @__PURE__ */ a.jsxs("div", { style: se, children: [
        !o && ((je = (qe = t.content) == null ? void 0 : qe.image) == null ? void 0 : je.url) && /* @__PURE__ */ a.jsx(
          "img",
          {
            src: t.content.image.url,
            alt: t.content.image.filename || "Task image",
            style: {
              width: "100%",
              height: "100%",
              objectFit: "contain",
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.08)"
            }
          }
        ),
        o && /* @__PURE__ */ a.jsx("div", { style: {
          width: "100%",
          height: "100%",
          aspectRatio: `${w} / ${p}`,
          backgroundColor: f.image,
          borderRadius: "8px",
          animation: "pulse 1.5s infinite ease-in-out"
        } })
      ] }) }),
      /* @__PURE__ */ a.jsxs("div", { style: ne, className: "task-right-half", children: [
        /* @__PURE__ */ a.jsxs("div", { className: "right-side-top", style: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px"
        }, children: [
          /* @__PURE__ */ a.jsx("div", { style: { flex: 1 }, children: Le && /* @__PURE__ */ a.jsxs("div", { style: {
            backgroundColor: u.warningLight,
            color: u.warning,
            // padding: '10px 20px',
            padding: "5px 20px",
            // padding: '10px 15px',
            borderRadius: "30px",
            fontWeight: "500",
            fontSize: "16px",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            border: `1px solid ${u.warning}30`,
            animation: "fadeIn 0.5s",
            maxWidth: "fit-content"
          }, children: [
            /* @__PURE__ */ a.jsx("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ a.jsx(
              "path",
              {
                d: "M12 9V14M12 19H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z",
                stroke: "currentColor",
                strokeWidth: "2",
                strokeLinecap: "round",
                strokeLinejoin: "round"
              }
            ) }),
            Le
          ] }) }),
          /* @__PURE__ */ a.jsx("div", { style: { display: "flex", justifyContent: "flex-end" }, children: L > 0 && Array.isArray(T) && /* @__PURE__ */ a.jsxs(
            "div",
            {
              style: {
                backgroundColor: u.secondaryLight,
                color: u.secondary,
                padding: "5px 15px",
                borderRadius: "30px",
                fontWeight: "500",
                fontSize: "16px",
                display: "flex",
                alignItems: "center",
                gap: "2px",
                border: `1px solid ${u.border}`,
                position: "relative",
                cursor: "pointer",
                transition: "all 0.3s ease",
                marginLeft: "auto",
                // Ensures it's always pushed to the right
                userSelect: "none"
                // Prevent text selection
              },
              onMouseEnter: (y) => {
                const P = y.currentTarget.querySelector(".tasks-tooltip");
                P && (P.style.visibility = "visible", P.style.opacity = "1");
              },
              onMouseLeave: (y) => {
                const P = y.currentTarget.querySelector(".tasks-tooltip");
                P && (P.style.visibility = "hidden", P.style.opacity = "0");
              },
              children: [
                /* @__PURE__ */ a.jsx("span", { style: {
                  backgroundColor: u.primary,
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  display: "inline-block",
                  marginRight: "8px"
                } }),
                /* @__PURE__ */ a.jsx("span", { children: L }),
                /* @__PURE__ */ a.jsxs("div", { className: "tasks-tooltip", style: {
                  visibility: "hidden",
                  opacity: 0,
                  position: "absolute",
                  bottom: "calc(100% + 10px)",
                  left: "50%",
                  transform: "translateX(-50%)",
                  backgroundColor: u.text,
                  color: "white",
                  padding: "6px 12px",
                  borderRadius: "6px",
                  fontSize: "14px",
                  whiteSpace: "nowrap",
                  zIndex: 10,
                  boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
                  transition: "all 0.3s ease"
                }, children: [
                  L === 1 ? "Task" : "Tasks",
                  " Remaining",
                  /* @__PURE__ */ a.jsx("div", { style: {
                    position: "absolute",
                    top: "100%",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: 0,
                    height: 0,
                    borderLeft: "6px solid transparent",
                    borderRight: "6px solid transparent",
                    borderTop: `6px solid ${u.text}`
                  } })
                ] })
              ]
            }
          ) })
        ] }),
        /* @__PURE__ */ a.jsxs("div", { style: {
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          flex: "1",
          minHeight: "250px"
          // Add minimum height to ensure space-between works well
        }, children: [
          /* @__PURE__ */ a.jsx("div", { style: { ...X, marginTop: "20px" }, children: o ? "" : l(((Re = t.task) == null ? void 0 : Re.text) || "") }),
          /* @__PURE__ */ a.jsxs("div", { style: {
            marginTop: "20px",
            marginBottom: "20px",
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            justifyContent: "center"
          }, children: [
            !o && /* @__PURE__ */ a.jsx(
              "input",
              {
                type: "text",
                name: me,
                id: me,
                style: {
                  position: "absolute",
                  left: "-9999px",
                  opacity: 0,
                  height: "0",
                  width: "0",
                  overflow: "hidden",
                  display: "none",
                  visibility: "hidden",
                  pointerEvents: "none"
                },
                "aria-hidden": "true",
                tabIndex: "-1"
              }
            ),
            o ? (
              // Render skeleton buttons with same dimensions as real buttons
              Array.from({ length: 4 }).map((y, P) => /* @__PURE__ */ a.jsx(
                "button",
                {
                  disabled: !0,
                  style: {
                    padding: "10px 20px",
                    backgroundColor: f.image,
                    borderRadius: "20px",
                    border: `1px solid ${f.border}`,
                    minWidth: "80px",
                    height: "38px",
                    // Match real button height
                    animation: "pulse 1.5s infinite ease-in-out",
                    cursor: "default"
                  }
                },
                `skeleton-choice-${P}`
              ))
            ) : (
              // Render actual choices with capitalized display text
              ((Xe = t.task) == null ? void 0 : Xe.choices) && t.task.choices.map((y) => {
                let P = y.value;
                t.type === "true-false" ? (y.value === "True" && (P = "Yes"), y.value === "False" && (P = "No")) : P = l(P);
                const he = {
                  padding: "10px 20px",
                  backgroundColor: te ? `${u.secondaryLight}80` : u.secondaryV,
                  color: te ? `${u.text}80` : u.text,
                  borderRadius: "20px",
                  border: `1px solid ${u.border}`,
                  transition: "all 0.2s ease",
                  fontSize: "16px",
                  fontWeight: "500",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.14)",
                  minWidth: "80px",
                  height: "38px",
                  opacity: te ? 0.7 : 1,
                  userSelect: "none"
                  // Prevent text selection
                };
                return /* @__PURE__ */ a.jsx(
                  "button",
                  {
                    onClick: () => rt(t.id, y.key, t.track_id),
                    disabled: te,
                    style: he,
                    onMouseOver: (e) => {
                      te || (e.currentTarget.style.backgroundColor = u.secondary, e.currentTarget.style.color = "white", e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.12)", e.currentTarget.style.transform = "translateY(-1px)");
                    },
                    onMouseOut: (e) => {
                      te || Object.assign(e.currentTarget.style, {
                        backgroundColor: he.backgroundColor,
                        color: he.color,
                        boxShadow: he.boxShadow,
                        transform: "translateY(0)"
                      });
                    },
                    children: P
                  },
                  y.key
                );
              })
            )
          ] })
        ] }),
        /* @__PURE__ */ a.jsx("div", { children: !o && /* @__PURE__ */ a.jsxs(
          "button",
          {
            onClick: tt,
            style: ae,
            onMouseOver: (y) => {
              y.currentTarget.style.backgroundColor = u.containerBg, y.currentTarget.style.color = "#000000", y.currentTarget.style.transform = "translateY(-2px)", y.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.08)";
            },
            onMouseOut: (y) => {
              y.currentTarget.style.backgroundColor = u.secondaryLight, y.currentTarget.style.color = u.secondary, y.currentTarget.style.transform = "translateY(0)", y.currentTarget.style.boxShadow = "none";
            },
            children: [
              "Skip",
              /* @__PURE__ */ a.jsx("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ a.jsx("path", { d: "M9 6L15 12L9 18", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }) })
            ]
          }
        ) })
      ] })
    ] }, o ? "skeleton" : t.id);
  };
  return /* @__PURE__ */ a.jsxs("div", { className: "reward-sdk-container", style: {
    ...fe,
    padding: "0px 20px 0px 20px",
    position: "relative"
  }, children: [
    /* @__PURE__ */ a.jsxs("div", { style: {
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center",
      padding: "15px 16px 5px 20px ",
      gap: "10px"
    }, children: [
      /* @__PURE__ */ a.jsx(
        "button",
        {
          onClick: Ve,
          title: "Preferences",
          style: {
            width: "32px",
            height: "32px",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: u.secondary,
            transition: "all 0.2s ease",
            backgroundColor: "#e0e0e0",
            userSelect: "none",
            fontSize: "16px",
            fontWeight: "bold"
            // Added bold font weight
          },
          onMouseOver: (t) => {
            t.currentTarget.style.color = "#000000", t.currentTarget.style.backgroundColor = "#d4d4d4", t.currentTarget.style.boxShadow = "0 2px 5px rgba(0,0,0,0.2)";
          },
          onMouseOut: (t) => {
            t.currentTarget.style.color = u.secondary, t.currentTarget.style.backgroundColor = "#e0e0e0", t.currentTarget.style.boxShadow = "none";
          },
          children: "☰"
        }
      ),
      U && /* @__PURE__ */ a.jsx(
        "button",
        {
          onClick: () => {
            window.confirm("Won't get a reward") && U();
          },
          style: {
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            backgroundColor: "#e0e0e0",
            color: u.secondary,
            border: "none",
            fontSize: "16px",
            fontWeight: "bold",
            // Changed from 'normal' to 'bold'
            cursor: "pointer",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "0",
            boxShadow: "none",
            transition: "all 0.2s ease",
            userSelect: "none"
          },
          onMouseOver: (t) => {
            t.currentTarget.style.color = "#000000", t.currentTarget.style.backgroundColor = "#d4d4d4", t.currentTarget.style.boxShadow = "0 2px 5px rgba(0,0,0,0.2)";
          },
          onMouseOut: (t) => {
            t.currentTarget.style.color = u.secondary, t.currentTarget.style.backgroundColor = "#e0e0e0", t.currentTarget.style.boxShadow = "none";
          },
          "aria-label": "Close",
          children: "✕"
        }
      )
    ] }),
    /* @__PURE__ */ a.jsx(
      St,
      {
        showPreferences: V,
        skipPreferences: ke,
        topicsDict: q,
        colors: u,
        formatTopicName: He,
        prefSubmitStatus: We,
        updateProfile: Ne
      }
    ),
    !V && /* @__PURE__ */ a.jsx(a.Fragment, { children: G && !k ? /* @__PURE__ */ a.jsx("div", { children: Je(null, !0) }) : Z ? /* @__PURE__ */ a.jsxs("div", { style: {
      padding: "40px 20px",
      textAlign: "center",
      backgroundColor: u.errorLight,
      borderRadius: "12px",
      color: u.error,
      border: `1px solid ${u.error}25`
    }, children: [
      /* @__PURE__ */ a.jsx("div", { style: { fontSize: "18px", fontWeight: "600", marginBottom: "8px" }, children: "Connection Error" }),
      /* @__PURE__ */ a.jsx("div", { children: Z }),
      /* @__PURE__ */ a.jsx(
        "button",
        {
          onClick: D,
          style: {
            marginTop: "20px",
            padding: "10px 20px",
            backgroundColor: u.error,
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "500",
            userSelect: "none"
            // Prevent text selection
          },
          children: "Retry Connection"
        }
      )
    ] }) : /* @__PURE__ */ a.jsx("div", { children: Array.isArray(T) ? /* @__PURE__ */ a.jsx(a.Fragment, { children: T.map((t) => Je(t, !1)) }) : null }) })
  ] });
};
typeof window < "u" && (window.RewardSdk || (window.RewardSdk = Ct));
export {
  Ct as RewardSdk,
  Ct as default
};
