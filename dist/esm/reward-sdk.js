import hr, { useState as O, useEffect as yr } from "react";
var lr = { exports: {} }, Ee = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var dr;
function wr() {
  if (dr) return Ee;
  dr = 1;
  var c = hr, y = Symbol.for("react.element"), P = Symbol.for("react.fragment"), u = Object.prototype.hasOwnProperty, K = c.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, Y = { key: !0, ref: !0, __self: !0, __source: !0 };
  function Q(k, w, G) {
    var m, j = {}, A = null, Z = null;
    G !== void 0 && (A = "" + G), w.key !== void 0 && (A = "" + w.key), w.ref !== void 0 && (Z = w.ref);
    for (m in w) u.call(w, m) && !Y.hasOwnProperty(m) && (j[m] = w[m]);
    if (k && k.defaultProps) for (m in w = k.defaultProps, w) j[m] === void 0 && (j[m] = w[m]);
    return { $$typeof: y, type: k, key: A, ref: Z, props: j, _owner: K.current };
  }
  return Ee.Fragment = P, Ee.jsx = Q, Ee.jsxs = Q, Ee;
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
var fr;
function Sr() {
  return fr || (fr = 1, process.env.NODE_ENV !== "production" && function() {
    var c = hr, y = Symbol.for("react.element"), P = Symbol.for("react.portal"), u = Symbol.for("react.fragment"), K = Symbol.for("react.strict_mode"), Y = Symbol.for("react.profiler"), Q = Symbol.for("react.provider"), k = Symbol.for("react.context"), w = Symbol.for("react.forward_ref"), G = Symbol.for("react.suspense"), m = Symbol.for("react.suspense_list"), j = Symbol.for("react.memo"), A = Symbol.for("react.lazy"), Z = Symbol.for("react.offscreen"), s = Symbol.iterator, E = "@@iterator";
    function N(e) {
      if (e === null || typeof e != "object")
        return null;
      var t = s && e[s] || e[E];
      return typeof t == "function" ? t : null;
    }
    var L = c.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function _(e) {
      {
        for (var t = arguments.length, a = new Array(t > 1 ? t - 1 : 0), i = 1; i < t; i++)
          a[i - 1] = arguments[i];
        ee("error", e, a);
      }
    }
    function ee(e, t, a) {
      {
        var i = L.ReactDebugCurrentFrame, h = i.getStackAddendum();
        h !== "" && (t += "%s", a = a.concat([h]));
        var b = a.map(function(x) {
          return String(x);
        });
        b.unshift("Warning: " + t), Function.prototype.apply.call(console[e], console, b);
      }
    }
    var Oe = !1, re = !1, ye = !1, Le = !1, Ie = !1, Pe;
    Pe = Symbol.for("react.module.reference");
    function Ae(e) {
      return !!(typeof e == "string" || typeof e == "function" || e === u || e === Y || Ie || e === K || e === G || e === m || Le || e === Z || Oe || re || ye || typeof e == "object" && e !== null && (e.$$typeof === A || e.$$typeof === j || e.$$typeof === Q || e.$$typeof === k || e.$$typeof === w || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      e.$$typeof === Pe || e.getModuleId !== void 0));
    }
    function Ke(e, t, a) {
      var i = e.displayName;
      if (i)
        return i;
      var h = t.displayName || t.name || "";
      return h !== "" ? a + "(" + h + ")" : a;
    }
    function ve(e) {
      return e.displayName || "Context";
    }
    function V(e) {
      if (e == null)
        return null;
      if (typeof e.tag == "number" && _("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
        return e.displayName || e.name || null;
      if (typeof e == "string")
        return e;
      switch (e) {
        case u:
          return "Fragment";
        case P:
          return "Portal";
        case Y:
          return "Profiler";
        case K:
          return "StrictMode";
        case G:
          return "Suspense";
        case m:
          return "SuspenseList";
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case k:
            var t = e;
            return ve(t) + ".Consumer";
          case Q:
            var a = e;
            return ve(a._context) + ".Provider";
          case w:
            return Ke(e, e.render, "ForwardRef");
          case j:
            var i = e.displayName || null;
            return i !== null ? i : V(e.type) || "Memo";
          case A: {
            var h = e, b = h._payload, x = h._init;
            try {
              return V(x(b));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var M = Object.assign, q = 0, ue, Qe, te, $e, be, We, De;
    function Fe() {
    }
    Fe.__reactDisabledLog = !0;
    function me() {
      {
        if (q === 0) {
          ue = console.log, Qe = console.info, te = console.warn, $e = console.error, be = console.group, We = console.groupCollapsed, De = console.groupEnd;
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
    function ur() {
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
              value: te
            }),
            error: M({}, e, {
              value: $e
            }),
            group: M({}, e, {
              value: be
            }),
            groupCollapsed: M({}, e, {
              value: We
            }),
            groupEnd: M({}, e, {
              value: De
            })
          });
        }
        q < 0 && _("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var we = L.ReactCurrentDispatcher, H;
    function d(e, t, a) {
      {
        if (H === void 0)
          try {
            throw Error();
          } catch (h) {
            var i = h.stack.trim().match(/\n( *(at )?)/);
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
    function ze(e, t) {
      if (!e || Me)
        return "";
      {
        var a = fe.get(e);
        if (a !== void 0)
          return a;
      }
      var i;
      Me = !0;
      var h = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var b;
      b = we.current, we.current = null, me();
      try {
        if (t) {
          var x = function() {
            throw Error();
          };
          if (Object.defineProperty(x.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(x, []);
            } catch (F) {
              i = F;
            }
            Reflect.construct(e, [], x);
          } else {
            try {
              x.call();
            } catch (F) {
              i = F;
            }
            e.call(x.prototype);
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
          for (var f = F.stack.split(`
`), W = i.stack.split(`
`), T = f.length - 1, R = W.length - 1; T >= 1 && R >= 0 && f[T] !== W[R]; )
            R--;
          for (; T >= 1 && R >= 0; T--, R--)
            if (f[T] !== W[R]) {
              if (T !== 1 || R !== 1)
                do
                  if (T--, R--, R < 0 || f[T] !== W[R]) {
                    var B = `
` + f[T].replace(" at new ", " at ");
                    return e.displayName && B.includes("<anonymous>") && (B = B.replace("<anonymous>", e.displayName)), typeof e == "function" && fe.set(e, B), B;
                  }
                while (T >= 1 && R >= 0);
              break;
            }
        }
      } finally {
        Me = !1, we.current = b, ur(), Error.prepareStackTrace = h;
      }
      var he = e ? e.displayName || e.name : "", de = he ? d(he) : "";
      return typeof e == "function" && fe.set(e, de), de;
    }
    function er(e, t, a) {
      return ze(e, !1);
    }
    function Ye(e) {
      var t = e.prototype;
      return !!(t && t.isReactComponent);
    }
    function pe(e, t, a) {
      if (e == null)
        return "";
      if (typeof e == "function")
        return ze(e, Ye(e));
      if (typeof e == "string")
        return d(e);
      switch (e) {
        case G:
          return d("Suspense");
        case m:
          return d("SuspenseList");
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case w:
            return er(e.render);
          case j:
            return pe(e.type, t, a);
          case A: {
            var i = e, h = i._payload, b = i._init;
            try {
              return pe(b(h), t, a);
            } catch {
            }
          }
        }
      return "";
    }
    var oe = Object.prototype.hasOwnProperty, ie = {}, Ue = L.ReactDebugCurrentFrame;
    function D(e) {
      if (e) {
        var t = e._owner, a = pe(e.type, e._source, t ? t.type : null);
        Ue.setExtraStackFrame(a);
      } else
        Ue.setExtraStackFrame(null);
    }
    function rr(e, t, a, i, h) {
      {
        var b = Function.call.bind(oe);
        for (var x in e)
          if (b(e, x)) {
            var f = void 0;
            try {
              if (typeof e[x] != "function") {
                var W = Error((i || "React class") + ": " + a + " type `" + x + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[x] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw W.name = "Invariant Violation", W;
              }
              f = e[x](t, x, i, a, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (T) {
              f = T;
            }
            f && !(f instanceof Error) && (D(h), _("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", i || "React class", a, x, typeof f), D(null)), f instanceof Error && !(f.message in ie) && (ie[f.message] = !0, D(h), _("Failed %s type: %s", a, f.message), D(null));
          }
      }
    }
    var tr = Array.isArray;
    function Se(e) {
      return tr(e);
    }
    function Be(e) {
      {
        var t = typeof Symbol == "function" && Symbol.toStringTag, a = t && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return a;
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
        return _("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Be(e)), Ne(e);
    }
    var ge = L.ReactCurrentOwner, nr = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, Ve, He;
    function Je(e) {
      if (oe.call(e, "ref")) {
        var t = Object.getOwnPropertyDescriptor(e, "ref").get;
        if (t && t.isReactWarning)
          return !1;
      }
      return e.ref !== void 0;
    }
    function r(e) {
      if (oe.call(e, "key")) {
        var t = Object.getOwnPropertyDescriptor(e, "key").get;
        if (t && t.isReactWarning)
          return !1;
      }
      return e.key !== void 0;
    }
    function o(e, t) {
      typeof e.ref == "string" && ge.current;
    }
    function l(e, t) {
      {
        var a = function() {
          Ve || (Ve = !0, _("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", t));
        };
        a.isReactWarning = !0, Object.defineProperty(e, "key", {
          get: a,
          configurable: !0
        });
      }
    }
    function p(e, t) {
      {
        var a = function() {
          He || (He = !0, _("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", t));
        };
        a.isReactWarning = !0, Object.defineProperty(e, "ref", {
          get: a,
          configurable: !0
        });
      }
    }
    var C = function(e, t, a, i, h, b, x) {
      var f = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: y,
        // Built-in properties that belong on the element
        type: e,
        key: t,
        ref: a,
        props: x,
        // Record the component responsible for creating this element.
        _owner: b
      };
      return f._store = {}, Object.defineProperty(f._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(f, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: i
      }), Object.defineProperty(f, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: h
      }), Object.freeze && (Object.freeze(f.props), Object.freeze(f)), f;
    };
    function S(e, t, a, i, h) {
      {
        var b, x = {}, f = null, W = null;
        a !== void 0 && (ke(a), f = "" + a), r(t) && (ke(t.key), f = "" + t.key), Je(t) && (W = t.ref, o(t, h));
        for (b in t)
          oe.call(t, b) && !nr.hasOwnProperty(b) && (x[b] = t[b]);
        if (e && e.defaultProps) {
          var T = e.defaultProps;
          for (b in T)
            x[b] === void 0 && (x[b] = T[b]);
        }
        if (f || W) {
          var R = typeof e == "function" ? e.displayName || e.name || "Unknown" : e;
          f && l(x, R), W && p(x, R);
        }
        return C(e, f, W, h, i, ge.current, x);
      }
    }
    var g = L.ReactCurrentOwner, z = L.ReactDebugCurrentFrame;
    function $(e) {
      if (e) {
        var t = e._owner, a = pe(e.type, e._source, t ? t.type : null);
        z.setExtraStackFrame(a);
      } else
        z.setExtraStackFrame(null);
    }
    var ne;
    ne = !1;
    function se(e) {
      return typeof e == "object" && e !== null && e.$$typeof === y;
    }
    function X() {
      {
        if (g.current) {
          var e = V(g.current.type);
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
        var t = X();
        if (!t) {
          var a = typeof e == "string" ? e : e.displayName || e.name;
          a && (t = `

Check the top-level render call using <` + a + ">.");
        }
        return t;
      }
    }
    function U(e, t) {
      {
        if (!e._store || e._store.validated || e.key != null)
          return;
        e._store.validated = !0;
        var a = le(t);
        if (J[a])
          return;
        J[a] = !0;
        var i = "";
        e && e._owner && e._owner !== g.current && (i = " It was passed a child from " + V(e._owner.type) + "."), $(e), _('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', a, i), $(null);
      }
    }
    function je(e, t) {
      {
        if (typeof e != "object")
          return;
        if (Se(e))
          for (var a = 0; a < e.length; a++) {
            var i = e[a];
            se(i) && U(i, t);
          }
        else if (se(e))
          e._store && (e._store.validated = !0);
        else if (e) {
          var h = N(e);
          if (typeof h == "function" && h !== e.entries)
            for (var b = h.call(e), x; !(x = b.next()).done; )
              se(x.value) && U(x.value, t);
        }
      }
    }
    function Ge(e) {
      {
        var t = e.type;
        if (t == null || typeof t == "string")
          return;
        var a;
        if (typeof t == "function")
          a = t.propTypes;
        else if (typeof t == "object" && (t.$$typeof === w || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        t.$$typeof === j))
          a = t.propTypes;
        else
          return;
        if (a) {
          var i = V(t);
          rr(a, e.props, "prop", i, e);
        } else if (t.PropTypes !== void 0 && !ne) {
          ne = !0;
          var h = V(t);
          _("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", h || "Unknown");
        }
        typeof t.getDefaultProps == "function" && !t.getDefaultProps.isReactClassApproved && _("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function qe(e) {
      {
        for (var t = Object.keys(e.props), a = 0; a < t.length; a++) {
          var i = t[a];
          if (i !== "children" && i !== "key") {
            $(e), _("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", i), $(null);
            break;
          }
        }
        e.ref !== null && ($(e), _("Invalid attribute `ref` supplied to `React.Fragment`."), $(null));
      }
    }
    var Ce = {};
    function Re(e, t, a, i, h, b) {
      {
        var x = Ae(e);
        if (!x) {
          var f = "";
          (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (f += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var W = ae();
          W ? f += W : f += X();
          var T;
          e === null ? T = "null" : Se(e) ? T = "array" : e !== void 0 && e.$$typeof === y ? (T = "<" + (V(e.type) || "Unknown") + " />", f = " Did you accidentally export a JSX literal instead of a component?") : T = typeof e, _("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", T, f);
        }
        var R = S(e, t, a, h, b);
        if (R == null)
          return R;
        if (x) {
          var B = t.children;
          if (B !== void 0)
            if (i)
              if (Se(B)) {
                for (var he = 0; he < B.length; he++)
                  je(B[he], e);
                Object.freeze && Object.freeze(B);
              } else
                _("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              je(B, e);
        }
        if (oe.call(t, "key")) {
          var de = V(e), F = Object.keys(t).filter(function(mr) {
            return mr !== "key";
          }), ar = F.length > 0 ? "{key: someKey, " + F.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!Ce[de + ar]) {
            var br = F.length > 0 ? "{" + F.join(": ..., ") + ": ...}" : "{}";
            _(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, ar, de, br, de), Ce[de + ar] = !0;
          }
        }
        return e === u ? qe(R) : Ge(R), R;
      }
    }
    function Xe(e, t, a) {
      return Re(e, t, a, !0);
    }
    function v(e, t, a) {
      return Re(e, t, a, !1);
    }
    var I = v, xe = Xe;
    _e.Fragment = u, _e.jsx = I, _e.jsxs = xe;
  }()), _e;
}
process.env.NODE_ENV === "production" ? lr.exports = wr() : lr.exports = Sr();
var n = lr.exports;
const Tr = ({ width: c = 18, height: y = 18 }) => /* @__PURE__ */ n.jsx("svg", { width: c, height: y, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ n.jsx(
  "path",
  {
    d: "M12 9V14M12 19H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }
) }), kr = ({ width: c = 14, height: y = 14 }) => /* @__PURE__ */ n.jsx("svg", { width: c, height: y, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ n.jsx("path", { d: "M9 6L15 12L9 18", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }) }), jr = ({ width: c = 15, height: y = 15 }) => /* @__PURE__ */ n.jsx(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 448 512",
    width: c,
    height: y,
    fill: "currentColor",
    children: /* @__PURE__ */ n.jsx("path", { d: "M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z" })
  }
), Cr = ({ width: c = 16, height: y = 16 }) => /* @__PURE__ */ n.jsx(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 384 512",
    width: c,
    height: y,
    fill: "currentColor",
    children: /* @__PURE__ */ n.jsx("path", { d: "M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" })
  }
), pr = ({ width: c = 12, height: y = 12 }) => /* @__PURE__ */ n.jsx("svg", { width: c, height: y, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ n.jsx("path", { d: "M5 13L9 17L19 7", stroke: "white", strokeWidth: "3", strokeLinecap: "round", strokeLinejoin: "round" }) }), Rr = ({
  showPreferences: c,
  skipPreferences: y,
  topicsDict: P,
  colors: u,
  formatTopicName: K,
  prefSubmitStatus: Y,
  updateProfile: Q
}) => {
  const [k, w] = O({});
  yr(() => {
    c && w({ ...P });
  }, [c, P]);
  const G = (s) => {
    w((E) => ({
      ...E,
      [s]: !E[s]
    }));
  }, m = () => {
    const E = !Object.values(k).every((L) => L === !0), N = {};
    Object.keys(k).forEach((L) => {
      N[L] = E;
    }), w(N);
  }, j = Object.values(k).every((s) => s === !0), A = () => {
    const s = Object.keys(k).filter((ee) => k[ee]), E = Object.keys(P).filter((ee) => P[ee]);
    let N = !1;
    s.length !== E.length ? N = !0 : N = s.some((ee) => !E.includes(ee));
    const L = s.length === 0, _ = Object.keys(k).length;
    Q({
      tempTopicsDict: k,
      allTopicsSelected: j,
      newSelectedTopics: s,
      oldSelectedTopics: E,
      noTopicsSelected: L,
      hasChanges: N,
      totalTopicsCount: _
    });
  }, Z = (s) => {
    s.target === s.currentTarget && y();
  };
  return c ? /* @__PURE__ */ n.jsx(
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
      children: /* @__PURE__ */ n.jsxs("div", { style: {
        backgroundColor: u.containerBg,
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
        /* @__PURE__ */ n.jsxs("div", { style: {
          padding: `${window.innerWidth < 480 ? "24px 16px" : "32px"} ${window.innerWidth < 480 ? "16px" : "32px"} 0`,
          overflow: "auto",
          // Scrolling happens in this inner container
          flexGrow: 1,
          maxHeight: window.innerWidth < 480 ? "calc(90vh - 100px)" : "calc(80vh - 100px)"
          // Reserve space for buttons
        }, children: [
          /* @__PURE__ */ n.jsx("style", { children: `
            @keyframes fadeInUp {
              from { opacity: 0; transform: translateY(20px); }
              to { opacity: 1; transform: translateY(0); }
            }
          ` }),
          /* @__PURE__ */ n.jsx("div", { style: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "0px"
            // Reduced from 12px to 8px to reduce space above
          }, children: /* @__PURE__ */ n.jsx("h2", { style: {
            margin: 0,
            color: u.text,
            fontSize: window.innerWidth < 480 ? "20px" : "26px",
            userSelect: "none",
            // Prevent text selection
            cursor: "default"
            // Use default cursor instead of text selection cursor
          }, children: "Your interests" }) }),
          /* @__PURE__ */ n.jsxs("div", { style: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "46px"
            // Increased from 16px to 24px to add space below
          }, children: [
            /* @__PURE__ */ n.jsx("p", { style: {
              color: u.textLight,
              margin: 0,
              fontSize: "18px",
              userSelect: "none",
              // Prevent text selection
              cursor: "default"
              // Use default cursor instead of text selection cursor
            }, children: "Select topics you're interested in" }),
            /* @__PURE__ */ n.jsxs(
              "div",
              {
                onClick: m,
                style: {
                  padding: "8px 12px",
                  borderRadius: "8px",
                  border: `1px solid ${j ? u.primary : u.border}`,
                  backgroundColor: j ? u.primaryLight : "white",
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
                  /* @__PURE__ */ n.jsxs("div", { style: {
                    width: "16px",
                    height: "16px",
                    minWidth: "16px",
                    borderRadius: "4px",
                    border: `2px solid ${j ? u.primary : u.secondary}`,
                    backgroundColor: j ? u.primary : "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    transition: "all 0.2s ease",
                    position: "relative",
                    left: "0"
                  }, children: [
                    "                ",
                    j && /* @__PURE__ */ n.jsx(pr, { width: 10, height: 10 })
                  ] }),
                  /* @__PURE__ */ n.jsx("span", { style: {
                    color: j ? u.primary : u.text,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    userSelect: "none",
                    flex: "0 1 auto"
                    // Don't allow text to force container to grow
                  }, children: j ? "Unselect all" : "Select all" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ n.jsx("div", { style: {
            display: "grid",
            gridTemplateColumns: window.innerWidth < 480 ? "repeat(auto-fill, minmax(130px, 1fr))" : "repeat(auto-fill, minmax(180px, 1fr))",
            gap: window.innerWidth < 480 ? "8px" : "16px",
            paddingBottom: "80px"
            // Added padding at the bottom of the grid for better scrolling experience
          }, children: Object.entries(k).map(([s, E]) => /* @__PURE__ */ n.jsxs(
            "div",
            {
              onClick: () => G(s),
              style: {
                padding: "12px 16px",
                borderRadius: "8px",
                border: `1px solid ${E ? u.primary : u.border}`,
                backgroundColor: E ? u.primaryLight : "white",
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
                /* @__PURE__ */ n.jsxs("div", { style: {
                  width: "18px",
                  height: "18px",
                  minWidth: "18px",
                  // Ensure checkbox doesn't resize
                  borderRadius: "4px",
                  border: `2px solid ${E ? u.primary : u.secondary}`,
                  backgroundColor: E ? u.primary : "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  // Prevent checkbox from shrinking
                  transition: "all 0.2s ease"
                }, children: [
                  "                  ",
                  E && /* @__PURE__ */ n.jsx(pr, {})
                ] }),
                /* @__PURE__ */ n.jsx("span", { style: {
                  color: E ? u.primary : u.text,
                  fontWeight: E ? "500" : "normal",
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
          Y && /* @__PURE__ */ n.jsx("div", { style: {
            marginTop: "24px",
            marginBottom: "24px",
            // Add bottom margin so it's not right against the buttons
            padding: "12px 16px",
            borderRadius: "8px",
            backgroundColor: Y.type === "success" ? u.successLight : u.errorLight,
            color: Y.type === "success" ? u.success : u.error,
            animation: "fadeIn 0.3s"
          }, children: Y.message })
        ] }),
        /* @__PURE__ */ n.jsxs("div", { style: {
          padding: (window.innerWidth < 480, "8px 24px 8px 0px"),
          marginTop: "auto",
          display: "flex",
          justifyContent: "flex-end",
          gap: "16px",
          borderTop: `1px solid ${u.border}`,
          backgroundColor: `${u.containerBg}ee`,
          // Slightly darker or different shade
          boxShadow: "0 -4px 6px rgba(255, 179, 179, 0.03)",
          // Subtle shadow for depth
          position: "relative"
          // Ensure the shadow displays correctly
        }, children: [
          /* @__PURE__ */ n.jsx(
            "button",
            {
              onClick: y,
              style: {
                padding: "10px 24px",
                backgroundColor: "white",
                color: u.text,
                border: `1px solid ${u.border}`,
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "16px",
                transition: "all 0.2s ease",
                userSelect: "none"
                // Prevent text selection
              },
              onMouseOver: (s) => {
                s.currentTarget.style.backgroundColor = u.secondary + "15", s.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.1)", s.currentTarget.style.border = `1px solid ${u.secondary}`;
              },
              onMouseOut: (s) => {
                s.currentTarget.style.backgroundColor = "white", s.currentTarget.style.boxShadow = "none", s.currentTarget.style.border = `1px solid ${u.border}`;
              },
              children: "Skip"
            }
          ),
          /* @__PURE__ */ n.jsx(
            "button",
            {
              onClick: A,
              style: {
                padding: "10px 24px",
                backgroundColor: u.primary,
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
                s.currentTarget.style.backgroundColor = u.primary, s.currentTarget.style.boxShadow = "none";
              },
              children: "Save"
            }
          )
        ] })
      ] })
    }
  ) : null;
}, cr = "rewardSdk_sessionId", vr = "rewardSdk_languages";
let ce = null, or = !1, ir = [];
if (typeof window < "u") {
  const c = localStorage.getItem(cr);
  c && (ce = c);
}
const gr = () => {
  let c = [];
  if (navigator.languages && navigator.languages.length) {
    const y = /* @__PURE__ */ new Set();
    c = navigator.languages.map((P) => P.split("-")[0]).filter((P) => y.has(P) ? !1 : (y.add(P), !0));
  } else
    c = [navigator.language.split("-")[0]];
  return c;
}, xr = () => {
  try {
    const c = localStorage.getItem(vr);
    return c ? JSON.parse(c) : [];
  } catch (c) {
    return console.error("Error parsing stored languages:", c), [];
  }
}, sr = (c) => {
  try {
    localStorage.setItem(vr, JSON.stringify(c));
  } catch (y) {
    console.error("Error storing languages:", y);
  }
}, Er = (c = null) => (c ? (ce = c, localStorage.setItem(cr, c)) : (ce = null, localStorage.removeItem(cr)), !0), _r = () => !!ce, Or = ({
  apiKey: c = "89b668d3f2af4e2ea9e0e44d74620b44",
  apiBaseUrl: y = "https://label-api.fly.dev/",
  taskCount: P = "3",
  customStyle: u = {},
  onRewardGranted: K,
  onClose: Y
}) => {
  if (!c)
    throw new Error("RewardSdk: apiKey is required but not provided in props or environment variables");
  if (!y)
    throw new Error("API base URL is not configured in props or environment variables");
  const Q = async () => {
    if (A(!0), _r())
      await pe() || D();
    else {
      const r = Ye();
      ie(r);
    }
  }, [k, w] = O(null), [G, m] = O(!1), [j, A] = O(!0), [Z, s] = O(null), [E, N] = O({}), [L, _] = O(P), [ee, Oe] = O(!0), [re, ye] = O(!1), [Le, Ie] = O(""), [Pe, Ae] = O(0), [Ke, ve] = O(0), [V, M] = O(!1), [q, ue] = O({}), [Qe, te] = O(!1), [$e, be] = O(null), [We, De] = O(!1), Fe = ["profile", "user", "task", "name"][Math.floor(Math.random() * 4)], [me] = O(`${Fe}_${Math.random().toString(36).substring(2, 7)}`), [ur, we] = O(window.innerWidth), H = async (r, o = "GET", l = null, p = {}) => {
    const C = {
      requiresSession: !0,
      onRedirect: ie,
      setLoading: !0
    }, { requiresSession: S, onRedirect: g, setLoading: z } = { ...C, ...p };
    try {
      z && m(!0), s(null);
      const $ = `${y}${r}`, ne = {
        Accept: "application/json",
        "Content-Type": "application/json"
      };
      S && ce && (ne["X-Session-ID"] = ce), c && (ne["X-API-KEY"] = c);
      const se = {
        method: o,
        headers: ne
      };
      l && (o === "POST" || o === "PUT") && (se.body = JSON.stringify(l));
      const X = await fetch($, se);
      if (X.status === 307) {
        if (z && m(!1), or)
          return new Promise((J, le) => {
            ir.push({
              endpoint: r,
              method: o,
              body: l,
              options: p,
              resolve: J,
              reject: le
            });
          });
        or = !0;
        try {
          const J = g ? await g() : null, le = ir.map((U) => H(
            U.endpoint,
            U.method,
            U.body,
            U.options
          ).then(U.resolve, U.reject));
          return ir = [], await Promise.allSettled(le), J || H(r, o, l, p);
        } finally {
          or = !1;
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
    } catch ($) {
      throw s($.message || "Failed to connect to API. Is the server running?"), $;
    } finally {
      z && m(!1);
    }
  }, d = {
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
    color: d.text,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    Width: "100%",
    overflowY: "auto",
    Height: "100%",
    userSelect: "none"
    // Prevent text selection for the entire component
  }, ...u }, Ze = () => {
    if (!document.getElementById("reward-sdk-responsive-styles")) {
      const r = document.createElement("style");
      r.id = "reward-sdk-responsive-styles", r.innerHTML = `
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
      `, document.head.appendChild(r);
    }
  }, ze = () => {
    Ie("Only correct answers count"), Ae((r) => r + 1);
  }, er = () => {
    Ie(""), _((r) => Math.max(0, r - 1));
  }, Ye = () => {
    const r = gr();
    return sr(r), r;
  }, pe = async () => {
    const r = xr(), o = gr();
    if (o.length !== r.length)
      return sr(o), await ie(o), !0;
    for (let l = 0; l < o.length; l++)
      if (o[l] !== r[l])
        return sr(o), await ie(o), !0;
    return !1;
  }, oe = () => {
    const r = Ye();
    ie(r);
  };
  yr(() => {
    window.addEventListener("languagechange", oe);
    const r = () => {
      we(window.innerWidth);
    };
    return window.addEventListener("resize", r), Ze(), Q(), () => {
      window.removeEventListener("languagechange", oe), window.removeEventListener("resize", r);
    };
  }, []);
  const ie = async (r = null) => {
    try {
      m(!0), s(null);
      const l = {
        langs: r || xr()
      }, p = `${y}identity/`, C = {
        Accept: "application/json",
        "Content-Type": "application/json"
      };
      c && (C["X-API-KEY"] = c), ce && (C["X-Session-ID"] = ce);
      const S = await fetch(p, {
        method: "POST",
        headers: C,
        body: JSON.stringify(l)
      });
      let g;
      try {
        g = await S.json();
      } catch {
        g = { detail: `API responded with status: ${S.status}` };
      }
      if (!S.ok)
        throw new Error(g.detail || g.error || `API responded with status: ${S.status}`);
      return g.session_id && g.api_topics && g.message === "new_user" ? (Er(g.session_id), ge(g.api_topics, null), De(!0), m(!1), A(!1), M(!0), g) : g.message === "language_updated" ? (setTimeout(() => D(), 0), g) : (s("Unexpected response from identity endpoint"), m(!1), A(!1), null);
    } catch (o) {
      return s(o.message || "Failed to connect to identity endpoint"), m(!1), A(!1), null;
    }
  }, Ue = (r) => {
    var C, S, g;
    if (!Array.isArray(r) || r.length === 0)
      return !1;
    const o = r[0], l = (S = (C = o == null ? void 0 : o.content) == null ? void 0 : C.image) == null ? void 0 : S.url, p = (g = o == null ? void 0 : o.task) == null ? void 0 : g.text;
    return !!(l && p);
  }, D = async (r = !1) => {
    try {
      A(!1), ye(!1);
      let o = "task/";
      r && Math.random() < 0.5 && (o += "?complexity=1");
      const l = await H(o, "GET");
      if (!Ue(l)) {
        s("Failed to get a task. Please try again.");
        return;
      }
      w(l), N({}), ee && r && Oe(!1);
    } catch {
    }
  }, rr = () => {
    D(!0);
  }, tr = async (r, o, l) => {
    if (!re)
      try {
        ye(!0);
        const p = {
          task_id: r,
          track_id: l,
          solution: o
        }, C = L === 1;
        C ? (p.wrong_answers = Pe, p.total_tasks = Ke) : m(!0);
        const S = document.getElementById(me);
        S && S.value && (p.callEndPoint = S.value);
        const g = await H("solution/", "POST", p);
        ve(($) => $ + 1);
        const z = C && (g == null ? void 0 : g.result) === "correct";
        if (g && g.result === "wrong") {
          ze(), D(!0);
          return;
        } else g && g.result === "correct" && er();
        Oe(!1), z ? (Ae(0), ve(0), alert("Reward granted 🎁"), K && K()) : D();
      } catch (p) {
        N((C) => ({
          ...C,
          [r]: { status: "error", message: `Error: ${p.message}` }
        })), ye(!1);
      }
  }, Se = async () => {
    try {
      return te(!0), (await H("topics/", "GET", null, {
        requiresSession: !1,
        setLoading: !1
      })).api_topics || [];
    } catch {
      return [];
    } finally {
      te(!1);
    }
  }, Be = async () => {
    try {
      return (await H("profile/", "GET", null, { setLoading: !1 })).user_topics || [];
    } catch {
      return [];
    }
  }, Te = async (r = []) => {
    te(!0), be(null);
    try {
      if ((await H("profile/update/", "POST", { topics: r }, { setLoading: !1 })).message === "profile_updated")
        M(!1), D();
      else
        throw new Error("Unexpected response from profile update");
    } catch (o) {
      be({
        type: "error",
        message: `Failed to save preferences: ${o.message}`
      });
    } finally {
      te(!1);
    }
  }, Ne = (r) => {
    const {
      tempTopicsDict: o,
      allTopicsSelected: l,
      newSelectedTopics: p,
      oldSelectedTopics: C,
      noTopicsSelected: S,
      hasChanges: g,
      totalTopicsCount: z
    } = r;
    if (!g) {
      ke();
      return;
    }
    ue(o), !l && !S ? Te(p) : l && C.length === 0 || S && C.length === z ? (M(!1), D()) : Te(l ? [] : p);
  }, ke = () => {
    M(!1), D();
  }, ge = (r, o) => {
    if (r != null && o !== void 0 && o !== null) {
      const l = {};
      return r.forEach((p) => {
        l[p] = o.includes(p);
      }), ue(l), l;
    } else if (r != null && r.length > 0) {
      const l = {};
      return r.forEach((p) => {
        l[p] = !1;
      }), ue(l), l;
    } else if (o != null) {
      const l = { ...q };
      return Object.keys(l).forEach((p) => {
        l[p] = !1;
      }), Array.isArray(o) && o.forEach((p) => {
        p in l && (l[p] = !0);
      }), ue(l), l;
    }
    return q;
  }, nr = async () => {
    if (Object.keys(q).length === 0)
      try {
        const r = await Se(), o = await Be();
        return ge(r, o), !0;
      } catch (r) {
        return s(`Failed to update topics: ${r.message}`), !1;
      }
    if (We)
      try {
        const r = await Be();
        ge(null, r);
      } catch (r) {
        return s(`Failed to update topics for new user: ${r.message}`), !1;
      }
    return !0;
  }, Ve = async () => {
    te(!0);
    try {
      await nr() && M(!0);
    } catch (r) {
      s(`Failed to prepare preferences: ${r.message}`);
    } finally {
      te(!1);
    }
  }, He = (r) => r.toLowerCase() === "uae" ? "UAE" : r.charAt(0).toUpperCase() + r.slice(1).replace(/-/g, " "), Je = (r, o = !1) => {
    var J, le, U, je, Ge, qe, Ce, Re, Xe;
    if (!r && !o || !o && (!r.id || !((le = (J = r.content) == null ? void 0 : J.image) != null && le.url) || !((U = r.task) != null && U.text))) return null;
    const l = (v) => !v || typeof v != "string" ? "" : v.charAt(0).toUpperCase() + v.slice(1), p = {
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
    }, S = 640, g = 480, z = S / g, $ = {
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
      backgroundColor: (o || (Ge = (je = r == null ? void 0 : r.content) == null ? void 0 : je.image) != null && Ge.url, "transparent"),
      borderRadius: "8px",
      boxSizing: "border-box",
      aspectRatio: `${z}`
      // Maintain aspect ratio
    }, X = {
      fontSize: "20px",
      fontWeight: "600",
      margin: "0 0 16px",
      // Remove top margin to reduce space
      padding: "16px",
      backgroundColor: o ? p.image : "transparent",
      borderRadius: "8px",
      lineHeight: "1.4",
      color: o ? "transparent" : d.text,
      letterSpacing: "0.01em",
      animation: o ? "pulse 1.5s infinite ease-in-out" : "none",
      minHeight: "80px",
      height: o ? "80px" : "auto"
    }, ae = {
      padding: "10px 20px",
      backgroundColor: d.secondaryLight,
      color: d.secondary,
      borderRadius: "30px",
      cursor: "pointer",
      border: `1px solid ${d.border}`,
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
    return /* @__PURE__ */ n.jsxs("div", { style: C, className: "task-container", children: [
      /* @__PURE__ */ n.jsx("div", { style: $, className: "task-left-half", children: /* @__PURE__ */ n.jsxs("div", { style: se, children: [
        !o && ((Ce = (qe = r.content) == null ? void 0 : qe.image) == null ? void 0 : Ce.url) && /* @__PURE__ */ n.jsx(
          "img",
          {
            src: r.content.image.url,
            alt: r.content.image.filename || "Task image",
            style: {
              width: "100%",
              height: "100%",
              objectFit: "contain",
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.08)"
            }
          }
        ),
        o && /* @__PURE__ */ n.jsx("div", { style: {
          width: "100%",
          height: "100%",
          aspectRatio: `${S} / ${g}`,
          backgroundColor: p.image,
          borderRadius: "8px",
          animation: "pulse 1.5s infinite ease-in-out"
        } })
      ] }) }),
      /* @__PURE__ */ n.jsxs("div", { style: ne, className: "task-right-half", children: [
        /* @__PURE__ */ n.jsxs("div", { className: "right-side-top", style: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px"
        }, children: [
          /* @__PURE__ */ n.jsx("div", { style: { flex: 1 }, children: Le && /* @__PURE__ */ n.jsxs("div", { style: {
            backgroundColor: d.warningLight,
            color: d.warning,
            // padding: '10px 20px',
            padding: "5px 20px",
            // padding: '10px 15px',
            borderRadius: "30px",
            fontWeight: "500",
            fontSize: "16px",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            border: `1px solid ${d.warning}30`,
            animation: "fadeIn 0.5s",
            maxWidth: "fit-content"
          }, children: [
            /* @__PURE__ */ n.jsx(Tr, {}),
            Le
          ] }) }),
          /* @__PURE__ */ n.jsx("div", { style: { display: "flex", justifyContent: "flex-end" }, children: L > 0 && Array.isArray(k) && /* @__PURE__ */ n.jsxs(
            "div",
            {
              style: {
                backgroundColor: d.secondaryLight,
                color: d.secondary,
                padding: "5px 15px",
                borderRadius: "30px",
                fontWeight: "500",
                fontSize: "16px",
                display: "flex",
                alignItems: "center",
                gap: "2px",
                border: `1px solid ${d.border}`,
                position: "relative",
                cursor: "pointer",
                transition: "all 0.3s ease",
                marginLeft: "auto",
                // Ensures it's always pushed to the right
                userSelect: "none"
                // Prevent text selection
              },
              onMouseEnter: (v) => {
                const I = v.currentTarget.querySelector(".tasks-tooltip");
                I && (I.style.visibility = "visible", I.style.opacity = "1");
              },
              onMouseLeave: (v) => {
                const I = v.currentTarget.querySelector(".tasks-tooltip");
                I && (I.style.visibility = "hidden", I.style.opacity = "0");
              },
              children: [
                /* @__PURE__ */ n.jsx("span", { style: {
                  backgroundColor: d.primary,
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  display: "inline-block",
                  marginRight: "8px"
                } }),
                /* @__PURE__ */ n.jsx("span", { children: L }),
                /* @__PURE__ */ n.jsxs("div", { className: "tasks-tooltip", style: {
                  visibility: "hidden",
                  opacity: 0,
                  position: "absolute",
                  bottom: "calc(100% + 10px)",
                  left: "50%",
                  transform: "translateX(-50%)",
                  backgroundColor: d.text,
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
                  /* @__PURE__ */ n.jsx("div", { style: {
                    position: "absolute",
                    top: "100%",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: 0,
                    height: 0,
                    borderLeft: "6px solid transparent",
                    borderRight: "6px solid transparent",
                    borderTop: `6px solid ${d.text}`
                  } })
                ] })
              ]
            }
          ) })
        ] }),
        /* @__PURE__ */ n.jsxs("div", { style: {
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          flex: "1",
          minHeight: "250px"
          // Add minimum height to ensure space-between works well
        }, children: [
          /* @__PURE__ */ n.jsx("div", { style: { ...X, marginTop: "20px" }, children: o ? "" : l(((Re = r.task) == null ? void 0 : Re.text) || "") }),
          /* @__PURE__ */ n.jsxs("div", { style: {
            marginTop: "20px",
            marginBottom: "20px",
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            justifyContent: "center"
          }, children: [
            !o && /* @__PURE__ */ n.jsx(
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
              Array.from({ length: 4 }).map((v, I) => /* @__PURE__ */ n.jsx(
                "button",
                {
                  disabled: !0,
                  style: {
                    padding: "10px 20px",
                    backgroundColor: p.image,
                    borderRadius: "20px",
                    border: `1px solid ${p.border}`,
                    minWidth: "80px",
                    height: "38px",
                    // Match real button height
                    animation: "pulse 1.5s infinite ease-in-out",
                    cursor: "default"
                  }
                },
                `skeleton-choice-${I}`
              ))
            ) : (
              // Render actual choices with capitalized display text
              ((Xe = r.task) == null ? void 0 : Xe.choices) && r.task.choices.map((v) => {
                let I = v.value;
                r.type === "true-false" ? (v.value === "True" && (I = "Yes"), v.value === "False" && (I = "No")) : I = l(I);
                const xe = {
                  padding: "10px 20px",
                  backgroundColor: re ? `${d.secondaryLight}80` : d.secondaryV,
                  color: re ? `${d.text}80` : d.text,
                  borderRadius: "20px",
                  border: `1px solid ${d.border}`,
                  transition: "all 0.2s ease",
                  fontSize: "16px",
                  fontWeight: "500",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.14)",
                  minWidth: "80px",
                  height: "38px",
                  opacity: re ? 0.7 : 1,
                  userSelect: "none"
                  // Prevent text selection
                };
                return /* @__PURE__ */ n.jsx(
                  "button",
                  {
                    onClick: () => tr(r.id, v.key, r.track_id),
                    disabled: re,
                    style: xe,
                    onMouseOver: (e) => {
                      re || (e.currentTarget.style.backgroundColor = d.secondary, e.currentTarget.style.color = "white", e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.12)", e.currentTarget.style.transform = "translateY(-1px)");
                    },
                    onMouseOut: (e) => {
                      re || Object.assign(e.currentTarget.style, {
                        backgroundColor: xe.backgroundColor,
                        color: xe.color,
                        boxShadow: xe.boxShadow,
                        transform: "translateY(0)"
                      });
                    },
                    children: I
                  },
                  v.key
                );
              })
            )
          ] })
        ] }),
        /* @__PURE__ */ n.jsx("div", { children: !o && /* @__PURE__ */ n.jsxs(
          "button",
          {
            onClick: rr,
            style: ae,
            onMouseOver: (v) => {
              v.currentTarget.style.backgroundColor = d.containerBg, v.currentTarget.style.color = "#000000", v.currentTarget.style.transform = "translateY(-2px)", v.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.08)";
            },
            onMouseOut: (v) => {
              v.currentTarget.style.backgroundColor = d.secondaryLight, v.currentTarget.style.color = d.secondary, v.currentTarget.style.transform = "translateY(0)", v.currentTarget.style.boxShadow = "none";
            },
            children: [
              "Skip",
              /* @__PURE__ */ n.jsx(kr, {})
            ]
          }
        ) })
      ] })
    ] }, o ? "skeleton" : r.id);
  };
  return /* @__PURE__ */ n.jsxs("div", { className: "reward-sdk-container", style: {
    ...fe,
    padding: "0px 20px 0px 20px",
    position: "relative"
  }, children: [
    /* @__PURE__ */ n.jsxs("div", { style: {
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center",
      padding: "15px 16px 5px 20px ",
      gap: "10px"
    }, children: [
      /* @__PURE__ */ n.jsx(
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
            color: d.secondary,
            transition: "all 0.2s ease",
            backgroundColor: "#e0e0e0",
            userSelect: "none",
            fontSize: "16px"
            // fontWeight: 'bold', // Added bold font weight
          },
          onMouseOver: (r) => {
            r.currentTarget.style.color = "#000000", r.currentTarget.style.backgroundColor = "#d4d4d4", r.currentTarget.style.boxShadow = "0 2px 5px rgba(0,0,0,0.2)";
          },
          onMouseOut: (r) => {
            r.currentTarget.style.color = d.secondary, r.currentTarget.style.backgroundColor = "#e0e0e0", r.currentTarget.style.boxShadow = "none";
          },
          children: /* @__PURE__ */ n.jsx(jr, {})
        }
      ),
      Y && /* @__PURE__ */ n.jsx(
        "button",
        {
          onClick: () => {
            window.confirm("Won't get a reward") && Y();
          },
          style: {
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            backgroundColor: "#e0e0e0",
            color: d.secondary,
            border: "none",
            fontSize: "16px",
            // fontWeight: 'bold', // Changed from 'normal' to 'bold'
            cursor: "pointer",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "0",
            boxShadow: "none",
            transition: "all 0.2s ease",
            userSelect: "none"
          },
          onMouseOver: (r) => {
            r.currentTarget.style.color = "#000000", r.currentTarget.style.backgroundColor = "#d4d4d4", r.currentTarget.style.boxShadow = "0 2px 5px rgba(0,0,0,0.2)";
          },
          onMouseOut: (r) => {
            r.currentTarget.style.color = d.secondary, r.currentTarget.style.backgroundColor = "#e0e0e0", r.currentTarget.style.boxShadow = "none";
          },
          "aria-label": "Close",
          children: /* @__PURE__ */ n.jsx(Cr, {})
        }
      )
    ] }),
    /* @__PURE__ */ n.jsx(
      Rr,
      {
        showPreferences: V,
        skipPreferences: ke,
        topicsDict: q,
        colors: d,
        formatTopicName: He,
        prefSubmitStatus: $e,
        updateProfile: Ne
      }
    ),
    !V && /* @__PURE__ */ n.jsx(n.Fragment, { children: G && !j ? /* @__PURE__ */ n.jsx("div", { children: Je(null, !0) }) : Z ? /* @__PURE__ */ n.jsxs("div", { style: {
      padding: "40px 20px",
      textAlign: "center",
      backgroundColor: d.errorLight,
      borderRadius: "12px",
      color: d.error,
      border: `1px solid ${d.error}25`
    }, children: [
      /* @__PURE__ */ n.jsx("div", { style: { fontSize: "18px", fontWeight: "600", marginBottom: "8px" }, children: "Connection Error" }),
      /* @__PURE__ */ n.jsx("div", { children: Z }),
      /* @__PURE__ */ n.jsx(
        "button",
        {
          onClick: D,
          style: {
            marginTop: "20px",
            padding: "10px 20px",
            backgroundColor: d.error,
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
    ] }) : /* @__PURE__ */ n.jsx("div", { children: Array.isArray(k) ? /* @__PURE__ */ n.jsx(n.Fragment, { children: k.map((r) => Je(r, !1)) }) : null }) })
  ] });
};
typeof window < "u" && (window.RewardSdk || (window.RewardSdk = Or));
export {
  Or as RewardSdk,
  Or as default
};
