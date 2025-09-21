var ut = (o) => {
  throw TypeError(o);
};
var K = (o, t, e) => t.has(o) || ut("Cannot " + e);
var s = (o, t, e) => (K(o, t, "read from private field"), e ? e.call(o) : t.get(o)), x = (o, t, e) => t.has(o) ? ut("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(o) : t.set(o, e), _ = (o, t, e, i) => (K(o, t, "write to private field"), i ? i.call(o, e) : t.set(o, e), e), n = (o, t, e) => (K(o, t, "access private method"), e);
var L = function(o, t, e, i) {
  if (e === "a" && !i) throw new TypeError("Private accessor was defined without a getter");
  if (typeof t == "function" ? o !== t || !i : !t.has(o)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return e === "m" ? i : e === "a" ? i.call(o) : i ? i.value : t.get(o);
}, V = function(o, t, e, i, r) {
  if (i === "m") throw new TypeError("Private method is not writable");
  if (i === "a" && !r) throw new TypeError("Private accessor was defined without a setter");
  if (typeof t == "function" ? o !== t || !r : !t.has(o)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return i === "a" ? r.call(o, e) : r ? r.value = e : t.set(o, e), e;
}, G, W, F, j, T, B, P, tt;
const Bt = ["default", "destructive"], Pt = ["outline", "fill", "text"], It = ["medium", "large", "xLarge", "width160", "width80"];
function Dt(o) {
  return Bt.some((t) => t === o);
}
function Ut(o) {
  return Pt.some((t) => t === o);
}
function qt(o) {
  return It.some((t) => t === o);
}
class Gt extends HTMLElement {
  get loading() {
    return L(this, W, "f");
  }
  set loading(t) {
    const e = this.buttonElement;
    V(this, W, t, "f"), t ? e.classList.add("isLoading") : e.classList.remove("isLoading"), L(this, G, "m", tt).call(this);
  }
  get selected() {
    return L(this, F, "f");
  }
  set selected(t) {
    const e = this.buttonElement;
    V(this, F, t, "f"), t ? e.classList.add("isSelected") : e.classList.remove("isSelected");
  }
  get disabled() {
    return L(this, j, "f");
  }
  set disabled(t) {
    const e = this.buttonElement;
    V(this, j, t, "f"), t ? e.classList.add("isDisable") : e.classList.remove("isDisable"), L(this, G, "m", tt).call(this);
  }
  get type() {
    return L(this, T, "f");
  }
  set type(t) {
    const e = this.buttonElement, i = {
      default: "type__default",
      destructive: "type__destructive"
    };
    e.classList.remove(i[L(this, T, "f")]), e.classList.add(i[t]), V(this, T, t, "f");
  }
  get appearance() {
    return L(this, B, "f");
  }
  set appearance(t) {
    const e = this.buttonElement, i = {
      outline: "appearance__outline",
      fill: "appearance__fill",
      text: "appearance__text"
    };
    e.classList.remove(i[L(this, B, "f")]), e.classList.add(i[t]), V(this, B, t, "f");
  }
  get size() {
    return L(this, P, "f");
  }
  set size(t) {
    const e = this.buttonElement, i = {
      medium: "size__medium",
      large: "size__large",
      xLarge: "size__xLarge",
      width160: "size__width160",
      width80: "size__width80"
    };
    e.classList.remove(i[L(this, P, "f")]), e.classList.add(i[t]), V(this, P, t, "f");
  }
  static get observedAttributes() {
    return ["loading", "selected", "disabled", "type", "appearance", "size"];
  }
  constructor() {
    super(), G.add(this), W.set(this, !1), F.set(this, !1), j.set(this, !1), T.set(this, "default"), B.set(this, "outline"), P.set(this, "medium"), this.buttonElement = document.createElement("button"), this.textElement = document.createElement("span"), this.attachShadow({ mode: "open" }), this.buttonElement.classList.add("base"), this.textElement.classList.add("base__text"), this.loading = !1, this.selected = !1, this.disabled = !1, this.type = "default", this.appearance = "outline", this.size = "medium";
  }
  connectedCallback() {
    const t = document.createElement("slot");
    this.textElement.appendChild(t), this.buttonElement.appendChild(this.textElement), this.shadowRoot.appendChild(this.buttonElement);
  }
  attributeChangedCallback(t, e, i) {
    if (e !== i)
      switch (t) {
        case "loading":
          this.loading = i === "true" || i === "";
          break;
        case "selected":
          this.selected = i === "true" || i === "";
          break;
        case "disabled":
          this.disabled = i === "true" || i === "";
          break;
        case "type":
          Dt(i) ? this.type = i : (console.warn(`${i}は無効なtype属性です。`), this.type = "default");
          break;
        case "appearance":
          Ut(i) ? this.appearance = i : (console.warn(`${i}は無効なappearance属性です。`), this.appearance = "outline");
          break;
        case "size":
          qt(i) ? this.size = i : (console.warn(`${i}は無効なsize属性です。`), this.size = "medium");
          break;
      }
  }
}
W = /* @__PURE__ */ new WeakMap(), F = /* @__PURE__ */ new WeakMap(), j = /* @__PURE__ */ new WeakMap(), T = /* @__PURE__ */ new WeakMap(), B = /* @__PURE__ */ new WeakMap(), P = /* @__PURE__ */ new WeakMap(), G = /* @__PURE__ */ new WeakSet(), tt = function() {
  this.buttonElement.disabled = this.disabled || this.loading;
};
var b = function(o, t, e, i) {
  if (e === "a" && !i) throw new TypeError("Private accessor was defined without a getter");
  if (typeof t == "function" ? o !== t || !i : !t.has(o)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return e === "m" ? i : e === "a" ? i.call(o) : i ? i.value : t.get(o);
}, et, u, xt;
class Lt extends HTMLElement {
  get value() {
    return b(this, u, "f").value;
  }
  set value(t) {
    b(this, u, "f").value = t;
  }
  set name(t) {
    this.setAttribute("name", t), b(this, u, "f").name = t;
  }
  get checked() {
    return b(this, u, "f").checked;
  }
  set checked(t) {
    t ? this.setAttribute("checked", "") : this.removeAttribute("checked"), b(this, u, "f").checked = t, this.internals.setFormValue(t ? this.value : null);
  }
  get indeterminate() {
    return b(this, u, "f").indeterminate;
  }
  set indeterminate(t) {
    b(this, u, "f").indeterminate = t;
  }
  set disabled(t) {
    b(this, u, "f").disabled = t;
  }
  static get observedAttributes() {
    return ["value", "name", "checked", "indeterminate", "disabled"];
  }
  constructor() {
    super(), et.add(this), u.set(this, document.createElement("input")), this.attachShadow({ mode: "open" }), this.internals = this.attachInternals();
  }
  connectedCallback() {
    const t = document.createElement("label"), e = document.createElement("span");
    t.classList.add("base"), e.classList.add("checkmark"), b(this, u, "f").setAttribute("type", "checkbox"), b(this, u, "f").classList.add("input"), b(this, u, "f").addEventListener("change", () => b(this, et, "m", xt).call(this)), e.appendChild(b(this, u, "f")), t.appendChild(e), this.shadowRoot.appendChild(t);
  }
  attributeChangedCallback(t, e, i) {
    if (e !== i)
      switch (t) {
        case "value":
          this.value = i;
          break;
        case "name":
          this.name = i;
          break;
        case "checked":
          this.checked = i === "true" || i === "";
          break;
        case "indeterminate":
          this.indeterminate = i === "true" || i === "";
          break;
        case "disabled":
          this.disabled = i === "true" || i === "";
          break;
      }
  }
  formResetCallback() {
    this.checked = !1;
  }
}
u = /* @__PURE__ */ new WeakMap(), et = /* @__PURE__ */ new WeakSet(), xt = function() {
  this.dispatchEvent(new CustomEvent("change", {
    bubbles: !0,
    composed: !0,
    detail: {
      checked: this.checked,
      indeterminate: this.indeterminate
    }
  }));
};
Lt.formAssociated = !0;
var f = function(o, t, e, i) {
  if (e === "a" && !i) throw new TypeError("Private accessor was defined without a getter");
  if (typeof t == "function" ? o !== t || !i : !t.has(o)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return e === "m" ? i : e === "a" ? i.call(o) : i ? i.value : t.get(o);
}, it, p, Ct;
class nt extends HTMLElement {
  get value() {
    return f(this, p, "f").value;
  }
  set value(t) {
    f(this, p, "f").value = t;
  }
  set name(t) {
    this.setAttribute("name", t), f(this, p, "f").name = t;
  }
  get checked() {
    return f(this, p, "f").checked;
  }
  set checked(t) {
    t ? this.setAttribute("checked", "") : this.removeAttribute("checked"), f(this, p, "f").checked = t, this.internals.setFormValue(t ? this.value : null);
  }
  get indeterminate() {
    return f(this, p, "f").indeterminate;
  }
  set indeterminate(t) {
    f(this, p, "f").indeterminate = t;
  }
  set disabled(t) {
    f(this, p, "f").disabled = t;
  }
  static get observedAttributes() {
    return ["value", "name", "checked", "indeterminate", "disabled"];
  }
  constructor() {
    super(), it.add(this), p.set(this, document.createElement("input")), this.attachShadow({ mode: "open" }), this.internals = this.attachInternals();
  }
  connectedCallback() {
    const t = document.createElement("label"), e = document.createElement("span");
    t.classList.add("base"), e.classList.add("checkmark"), f(this, p, "f").setAttribute("type", "checkbox"), f(this, p, "f").classList.add("input"), f(this, p, "f").addEventListener("change", () => f(this, it, "m", Ct).call(this));
    const i = document.createElement("div");
    i.classList.add("text");
    const r = document.createElement("slot");
    i.appendChild(r), e.appendChild(f(this, p, "f")), t.appendChild(e), t.appendChild(i), this.shadowRoot.appendChild(t);
  }
  attributeChangedCallback(t, e, i) {
    if (e !== i)
      switch (t) {
        case "value":
          this.value = i;
          break;
        case "name":
          this.name = i;
          break;
        case "checked":
          this.checked = i === "true" || i === "";
          break;
        case "indeterminate":
          this.indeterminate = i === "true" || i === "";
          break;
        case "disabled":
          this.disabled = i === "true" || i === "";
          break;
      }
  }
  formResetCallback() {
    this.checked = !1;
  }
}
p = /* @__PURE__ */ new WeakMap(), it = /* @__PURE__ */ new WeakSet(), Ct = function() {
  this.dispatchEvent(new CustomEvent("change", {
    bubbles: !0,
    composed: !0,
    detail: {
      checked: this.checked,
      indeterminate: this.indeterminate
    }
  }));
};
nt.formAssociated = !0;
var k = function(o, t, e, i) {
  if (e === "a" && !i) throw new TypeError("Private accessor was defined without a getter");
  if (typeof t == "function" ? o !== t || !i : !t.has(o)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return e === "m" ? i : e === "a" ? i.call(o) : i ? i.value : t.get(o);
}, Wt = function(o, t, e, i, r) {
  if (i === "m") throw new TypeError("Private method is not writable");
  if (i === "a" && !r) throw new TypeError("Private accessor was defined without a setter");
  if (typeof t == "function" ? o !== t || !r : !t.has(o)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return i === "a" ? r.call(o, e) : r ? r.value = e : t.set(o, e), e;
}, I, y;
const Ft = ["small", "medium"];
function jt(o) {
  return Ft.some((t) => t === o);
}
class Nt extends HTMLElement {
  set type(t) {
    k(this, y, "f").innerHTML = t in this.paths ? this.paths[t] : "";
  }
  set text(t) {
    k(this, y, "f").setAttribute("aria-label", t);
  }
  get size() {
    return k(this, I, "f");
  }
  set size(t) {
    const e = {
      small: "size__small",
      medium: "size__medium"
    };
    k(this, y, "f").classList.remove(e[k(this, I, "f")]), k(this, y, "f").classList.add(e[t]), Wt(this, I, t, "f");
  }
  static get observedAttributes() {
    return ["type", "text", "size"];
  }
  constructor() {
    super(), I.set(this, "medium"), y.set(this, document.createElementNS("http://www.w3.org/2000/svg", "svg")), this.paths = {}, this.attachShadow({ mode: "open" }), this.size = "medium";
  }
  connectedCallback() {
    k(this, y, "f").setAttribute("role", "img"), k(this, y, "f").setAttribute("viewBox", "0 0 24 24"), k(this, y, "f").classList.add("icon"), this.shadowRoot.appendChild(k(this, y, "f"));
  }
  attributeChangedCallback(t, e, i) {
    if (e !== i)
      switch (t) {
        case "type":
          this.type = i;
          break;
        case "text":
          this.text = i;
          break;
        case "size":
          jt(i) ? this.size = i : (console.warn(`${i}は無効なsize属性です。`), this.size = "medium");
          break;
      }
  }
}
I = /* @__PURE__ */ new WeakMap(), y = /* @__PURE__ */ new WeakMap();
var d = function(o, t, e, i) {
  if (e === "a" && !i) throw new TypeError("Private accessor was defined without a getter");
  if (typeof t == "function" ? o !== t || !i : !t.has(o)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return e === "m" ? i : e === "a" ? i.call(o) : i ? i.value : t.get(o);
}, N = function(o, t, e, i, r) {
  if (i === "m") throw new TypeError("Private method is not writable");
  if (i === "a" && !r) throw new TypeError("Private accessor was defined without a setter");
  if (typeof t == "function" ? o !== t || !r : !t.has(o)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return i === "a" ? r.call(o, e) : r ? r.value = e : t.set(o, e), e;
}, q, O, Y, J, H, Z, ot, pt;
const Ot = ["horizontal", "vertical"];
function Yt(o) {
  return Ot.some((t) => t === o);
}
class ct extends HTMLElement {
  get name() {
    return d(this, O, "f");
  }
  set name(t) {
    d(this, Z, "f").map((e) => e.setAttribute("name", t)), this.setAttribute("name", t), N(this, O, t, "f");
  }
  set direction(t) {
    const e = t === "vertical" ? "vertical" : "horizontal";
    d(this, H, "f").classList.remove(d(this, Y, "f")), d(this, H, "f").classList.add(e), N(this, Y, e, "f");
  }
  get data() {
    return d(this, J, "f");
  }
  set data(t) {
    N(this, J, t, "f"), d(this, q, "m", ot).call(this);
  }
  static get observedAttributes() {
    return ["name", "direction", "json-data"];
  }
  constructor() {
    super(), q.add(this), O.set(this, ""), Y.set(this, "horizontal"), J.set(this, []), H.set(this, document.createElement("ul")), Z.set(this, []), this.attachShadow({ mode: "open" }), this.internals = this.attachInternals(), this.direction = "horizontal";
  }
  connectedCallback() {
    d(this, H, "f").classList.add("base"), d(this, H, "f").setAttribute("role", "radiogroup"), this.shadowRoot.appendChild(d(this, H, "f")), d(this, q, "m", ot).call(this);
  }
  attributeChangedCallback(t, e, i) {
    if (e !== i)
      switch (t) {
        case "name":
          this.name = i;
          break;
        case "direction":
          Yt(i) ? this.direction = i : this.direction = "horizontal";
          break;
        case "json-data":
          i === null ? this.data = [] : this.data = JSON.parse(i);
          break;
      }
  }
  formResetCallback() {
    d(this, Z, "f").map((t) => t.checked = !1), this.internals.setFormValue(null);
  }
}
O = /* @__PURE__ */ new WeakMap(), Y = /* @__PURE__ */ new WeakMap(), J = /* @__PURE__ */ new WeakMap(), H = /* @__PURE__ */ new WeakMap(), Z = /* @__PURE__ */ new WeakMap(), q = /* @__PURE__ */ new WeakSet(), ot = function() {
  d(this, H, "f").innerHTML = "", N(this, Z, [], "f"), this.data.map((t, e) => {
    const i = document.createElement("li"), r = document.createElement("input"), h = document.createElement("span"), R = document.createElement("label"), z = document.createElement("span"), ht = t.value || "on";
    i.classList.add("item"), r.setAttribute("type", "radio"), r.setAttribute("value", ht), this.name !== "" && r.setAttribute("name", this.name), r.setAttribute("id", "radioButton" + e), r.checked = t.checked ?? !1, r.disabled = t.disabled ?? !1, t.checked && this.internals.setFormValue(ht), r.classList.add("input"), r.addEventListener("change", (Tt) => d(this, q, "m", pt).call(this, Tt)), d(this, Z, "f").push(r), h.classList.add("radio"), R.classList.add("text"), R.setAttribute("for", "radioButton" + e), R.setAttribute("aria-labeledby", "radioButtonLabel" + e), z.setAttribute("aria-hidden", "true"), z.setAttribute("id", "radioButtonLabel" + e), z.classList.add("text-inner"), z.innerText = t.text, h.appendChild(r), i.appendChild(h), R.appendChild(z), i.appendChild(R), d(this, H, "f").appendChild(i);
  });
}, pt = function(t) {
  const e = t.currentTarget.value;
  this.internals.setFormValue(e), this.dispatchEvent(new CustomEvent("change", {
    bubbles: !0,
    composed: !0,
    detail: {
      value: e
    }
  }));
};
ct.formAssociated = !0;
const Jt = ":host{flex-grow:0;flex-shrink:0;display:inline-block;line-height:0;vertical-align:middle}.icon{display:inline-block;fill:currentcolor}.size__small{width:16px;height:16px}.size__medium{width:24px;height:24px}", kt = {
  arrow_down: '<path d="M12 16.99L4 8.98999L5.06 7.92999L12 14.87L18.94 7.92999L20 8.98999L12 16.99Z"/>',
  arrow_down_link: '<path d="M11.98 20.03L18.42 13.6L17.36 12.53L12.73 17.16V4.04001H11.23V17.16L6.59 12.53L5.59 13.6L11.98 20.03Z"/>',
  arrow_left: '<path d="M14.99 20L7 12L14.99 4L16.05 5.06L9.12 12L16.05 18.94L14.99 20Z"/>',
  arrow_left_link: '<path d="M4.01 12.01L10.44 18.45L11.51 17.39L6.88 12.76H20V11.26H6.88L11.51 6.62L10.44 5.62L4.01 12.01Z"/>',
  arrow_right: '<path d="M9.01996 20L7.95996 18.94L14.89 12L7.95996 5.06001L9.01996 4L17.01 12L9.01996 20Z"/>',
  arrow_right_link: '<path d="M20 12.01L13.57 18.45L12.5 17.39L17.13 12.76H4.01001V11.26H17.13L12.5 6.62L13.57 5.62L20 12.01Z"/>',
  arrow_up: '<path d="M18.94 16.05L12 9.10999L5.06 16.05L4 14.99L12 6.98999L20 14.99L18.94 16.05Z"/>',
  arrow_up_link: '<path d="M12.03 4.04L5.59 10.47L6.65 11.54L11.28 6.91L11.28 20.03H12.78L12.78 6.91L17.42 11.54L18.42 10.47L12.03 4.04Z"/>',
  bookmark: '<path d="M16.5 15.5V18.57L12.66 16.66L11.99 16.32L11.32 16.66L7.5 18.57V4.5H16.5V14H18V4L17 3H7L6 4V21L11.99 18L18 21V15.5H16.5Z"/>',
  calendar: '<path d="M20.01 15.5V6.00999L19.01 5.00999H15.76V3.5H14.26V5.00999H9.76V3.5H8.26V5.00999H5L4 6.00999V19.5L5 20.5H19L20 19.5V17H18.5V19H5.5V10.25H18.5V15.5H20.01ZM5.51 8.75V6.50999H18.51V8.75H5.51ZM9.27 16.5H7.77V15H9.26L9.27 16.5ZM9.27 13.24H7.77V11.74H9.26L9.27 13.24ZM13.01 13.24H11.51V11.74H13.01V13.24Z"/>',
  check: '<path d="M10 17.98L4 11.98L5.06 10.92L10 15.86L18.94 6.92004L20 7.98004L10 17.98Z"/>',
  check_bold: '<path d="M10.3313 16.9023L6.3 12.9716L7.69649 11.54L10.3313 14.1093L16.3 8.28999L17.6965 9.72163L10.3313 16.9023Z"/>',
  clear: '<path d="M17.79 16.76C18.86 15.46 19.5 13.81 19.5 12C19.5 7.86 16.14 4.5 12 4.5C7.86 4.5 4.5 7.86 4.5 12C4.5 16.14 7.86 19.5 12 19.5C13.79 19.5 15.44 18.87 16.73 17.81L17.8 18.88C16.23 20.2 14.21 21 12 21C7.03 21 3 16.97 3 12C3 7.03 7.03 3 12 3C16.97 3 21 7.03 21 12C21 14.22 20.19 16.25 18.86 17.82L17.8 16.76H17.79ZM9.04 16.04L12 13.08L14.97 16.05L16.03 14.99L13.06 12.02L16.02 9.06L14.96 8L12 10.96L9.03 7.99L7.97 9.05L10.94 12.02L7.98 14.98L9.04 16.04Z"/>',
  close: '<path d="M13.3 12.2L18.4 17.3L17.3 18.4L12.2 13.3L7.10001 18.4L6 17.3L11.1 12.2L6 7.1L7.10001 6L12.2 11.1L17.3 6L18.4 7.1L13.3 12.2Z"/>',
  copy: '<path d="M16.8 21H4V6.3H5.5V19.5H16.7V21H16.8ZM19.5 12.3V9.3H14.2V3.5H8.5V16.5H19.5V13.7H21V17L20 18H8L7 17V3L8 2H16L21 7V12.2H19.5V12.3ZM19.5 7.8V7.6L15.7 3.8V7.7H19.5V7.8Z"/>',
  create: '<path d="M19 12V20L18 21H4L3 20V6L4 5H12V6.5H4.5V19.5H17.5V12H19ZM17.9 9.8L17.4 9.3L15.4 7.3L9.5 13V14.5H11L15.7 9.8L16.8 10.9L11.6 16H8V12.4L17.3 3L21 6.6L17.9 9.8ZM16.3 6.1L17.8 7.6L18.8 6.6L17.3 5.1L16.3 6.1Z"/>',
  delete: '<path d="M15.5 6.27V4L14.5 3H9.5L8.5 4V6.26H3.5V7.78H4.7L6.36 20.03L7.36 21.03H16.64L17.64 20.03L18 17.46H16.47L16.19 19.52H7.81L6.22 7.78H17.78L16.67 15.97H18.19L19.3 7.78H20.5V6.28L15.5 6.27ZM14 6.27H10V4.52H14V6.27ZM9.47 15.96L9 10.59H9.15H10.51L11 15.96H9.47ZM14.85 10.57H15L14.53 15.94H13L13.46 10.55L14.85 10.57Z"/>',
  doublearrow_down: '<path d="M11.9599 18L4.02991 11.65L4.96991 10.48L11.9699 16.06L18.9699 10.48L19.9099 11.65L11.9599 18ZM19.8799 7.17L18.9399 6L11.9399 11.59L4.93991 6L3.99991 7.17L11.9299 13.51L19.8799 7.17Z"/>',
  doublearrow_left: '<path d="M7.81001 12.01L12.5 19.2L11.25 20.02L6.01001 12.01L11.24 4.01001L12.49 4.83001L7.81001 12.01ZM17.5 4.84001L16.24 4.01001L11.01 12.01L16.23 20.01L17.49 19.19L12.81 12.01L17.5 4.84001Z"/>',
  doublearrow_right: '<path d="M18.01 12.01L12.79 20.01L11.53 19.19L16.22 12.01L11.53 4.83001L12.79 4.01001L18.01 12.01ZM7.79004 4.01001L6.54004 4.83001L11.23 12.01L6.54004 19.19L7.79004 20.01L13.02 12.01L7.79004 4.01001Z"/>',
  download: '<path d="M19.5 15V19.07L18.57 20H5.48999L4.48999 19V15H5.99999V18.5H18V15H19.5ZM16.5 11.53L15.44 10.47L12.72 13.19V4H11.22V13.19L8.52999 10.47L7.46999 11.53L12 16.06L16.5 11.53Z"/>',
  drag: '<path d="M10.5 18H9V16H10.5V18ZM10.5 11H9V13H10.5V11ZM10.5 6H9V8H10.5V6ZM15 18H13.5V16H15V18ZM15 11H13.5V13H15V11ZM15 6H13.5V8H15V6Z"/>',
  edit: '<path d="M16.93 3.5H15.52L3.52 15.5V20.5H8.47L10.47 18.5L9.36 17.44L7.81 18.99H4.98V16.16L12.98 8.16L15.82 10.99L10.47 16.38L11.47 17.44L20.47 8.44V7.04L16.93 3.5ZM16.85 9.95L14.01 7.13L16.22 4.91L19.06 7.74L16.85 9.95Z"/>',
  error: '<path d="M17.8 18.88C16.1772 20.2486 14.1229 20.9995 12 21C9.61305 21 7.32386 20.0518 5.63603 18.364C3.9482 16.6761 3 14.3869 3 12C3 9.61305 3.9482 7.32387 5.63603 5.63605C7.32386 3.94822 9.61305 3 12 3C14.3869 3 16.6761 3.94822 18.364 5.63605C20.0518 7.32387 21 9.61305 21 12C20.9986 14.1322 20.2402 16.1948 18.86 17.82L17.79 16.75C18.8977 15.4152 19.5027 13.7345 19.5 12C19.5 10.0109 18.7098 8.10322 17.3033 6.6967C15.8968 5.29018 13.9891 4.5 12 4.5C10.0109 4.5 8.10322 5.29018 6.6967 6.6967C5.29018 8.10322 4.5 10.0109 4.5 12C4.50265 13.9883 5.29367 15.8944 6.69962 17.3004C8.10557 18.7063 10.0117 19.4974 12 19.5C13.7243 19.4987 15.3953 18.9017 16.73 17.81L17.8 18.88ZM11.2 7.72V14.09H12.8V7.72H11.2ZM11.2 15.21V16.72H12.8V15.22L11.2 15.21Z"/>',
  folder: '<path d="M10.99 7L10 5H4L3 6V18L4 19H20L21 18V15.49H19.5V17.5H4.5V6.5H9.06L10.05 8.5H19.5V13.99H21V8L20 7H10.99Z"/>',
  help: '<path d="M13.6146 9.35105H10.8603V9.81442H8.82689V8.88768L9.95958 7.755H14.0784L15.2111 8.88768V11.5134L14.0784 12.6331H12.3789V14.1392H10.7833V12.1568L11.903 11.0371H13.6146V9.35105ZM12.3539 15.2589V16.7649H10.7574V15.2589H12.3539ZM16.7297 17.8139C15.4382 18.8665 13.7922 19.5 12 19.5C7.8645 19.5 4.5 16.1355 4.5 11.9999C4.5 7.86447 7.8645 4.49999 12 4.49999C16.1355 4.49999 19.5 7.86447 19.5 11.9999C19.5 13.8042 18.8591 15.4615 17.7936 16.7567L18.8577 17.8208C20.1914 16.251 21 14.2212 21 11.9999C21 7.02939 16.9706 3 12 3C7.02942 3 3 7.02939 3 11.9999C3 16.9705 7.02942 21 12 21C14.2092 21 16.2298 20.2011 17.796 18.8801L16.7297 17.8139Z"/>',
  kebab_menu: '<path d="M13 5.5V8H11V5.5H13ZM11 13.2505H13V10.7505H11V13.2505ZM11 18.4961H13V15.9961H11V18.4961Z"/>',
  like: '<path d="M20 9.5H12.8L15.08 4L14.08 3H10.5L6.5 10H6H4L3 11V20L4 21H6H7.5V19.5V11.27L7.8 10.74L11.37 4.5H13.25L11.41 8.92L10.55 11H12.8H19.5V13.05L15.2 19.5H9V21H16L21 13.5V10.5L20 9.5ZM6 19.5H4.5V11.5H6V19.5Z"/>',
  list: '<path d="M6 7.5H4V6H6V7.5ZM6 11.25H4V12.75H6V11.25ZM6 16.5H4V18H6V16.5ZM20 6H8V7.5H20V6ZM20 11.25H8V12.75H20V11.25ZM20 16.5H8V18H20V16.5Z"/>',
  location: '<path d="M11.98 8.07001C12.1757 8.07001 12.3694 8.10856 12.5502 8.18344C12.731 8.25832 12.8952 8.36805 13.0336 8.50641C13.1719 8.64477 13.2817 8.80903 13.3566 8.98981C13.4315 9.17058 13.47 9.36433 13.47 9.56C13.47 9.9561 13.3133 10.3361 13.0342 10.6172C12.7551 10.8982 12.3761 11.0574 11.98 11.06C11.5822 11.06 11.2006 10.902 10.9193 10.6207C10.638 10.3394 10.48 9.95782 10.48 9.56C10.4826 9.16391 10.6419 8.78494 10.9229 8.5058C11.2039 8.22665 11.5839 8.07 11.98 8.07001ZM11.98 6.57001C11.1844 6.57001 10.4213 6.88609 9.85866 7.4487C9.29605 8.01131 8.98 8.77436 8.98 9.57001C8.98 10.3657 9.29605 11.1287 9.85866 11.6913C10.4213 12.254 11.1844 12.57 11.98 12.57C12.7756 12.57 13.5387 12.254 14.1013 11.6913C14.6639 11.1287 14.98 10.3657 14.98 9.57001C14.98 8.77436 14.6639 8.01131 14.1013 7.4487C13.5387 6.88609 12.7756 6.57001 11.98 6.57001ZM18.48 9.5C18.48 7.77609 17.7952 6.1228 16.5762 4.90381C15.3572 3.68482 13.7039 3 11.98 3C10.2561 3 8.60279 3.68482 7.38381 4.90381C6.16482 6.1228 5.48 7.77609 5.48 9.5C5.48 9.59 5.48 9.68002 5.48 9.77002C5.6 14.16 9.28 18.77 11.98 21C13.4158 19.7945 14.6838 18.4021 15.75 16.86L14.67 15.78C13.8887 16.9447 12.9871 18.024 11.98 19C9.6 16.74 7.32 13.25 6.98 10.22V9.71002V9.5C6.98 8.17392 7.5068 6.90216 8.44448 5.96448C9.38216 5.0268 10.6539 4.5 11.98 4.5C13.3061 4.5 14.5778 5.0268 15.5155 5.96448C16.4532 6.90216 16.98 8.17392 16.98 9.5V10.16C16.781 11.6783 16.2776 13.1409 15.5 14.46L16.61 15.57C17.7106 13.8223 18.3632 11.8302 18.51 9.77002C18.515 9.68009 18.515 9.58993 18.51 9.5H18.48Z"/>',
  lock: '<path d="M11.25 16.42V14.67C11.093 14.5552 10.9657 14.4046 10.8787 14.2307C10.7917 14.0567 10.7476 13.8645 10.75 13.67C10.75 13.4569 10.8045 13.2474 10.9082 13.0613C11.012 12.8752 11.1616 12.7187 11.3428 12.6067C11.5241 12.4947 11.731 12.4308 11.9438 12.4213C12.1567 12.4117 12.3684 12.4567 12.559 12.552C12.7496 12.6473 12.9127 12.7897 13.0327 12.9657C13.1528 13.1417 13.2258 13.3455 13.2449 13.5577C13.2641 13.7699 13.2287 13.9835 13.142 14.1782C13.0554 14.3729 12.9205 14.5422 12.75 14.67V16.44L11.25 16.42ZM18.5 15.42V9.97H5.5V18.97H18.5V16.97H20V19.5L19 20.5H5L4 19.5V9.5L5 8.5H7C7 7.17392 7.5268 5.90214 8.46448 4.96446C9.40216 4.02678 10.6739 3.5 12 3.5C13.3261 3.5 14.5979 4.02678 15.5355 4.96446C16.4732 5.90214 17 7.17392 17 8.5H19L20 9.5V15.5L18.5 15.42ZM15.5 8.42C15.5 7.49347 15.1326 6.60474 14.4784 5.94865C13.8242 5.29256 12.9365 4.92265 12.01 4.92C11.0835 4.92265 10.1958 5.29256 9.5416 5.94865C8.88738 6.60474 8.52 7.49347 8.52 8.42H15.52H15.5Z"/>',
  mail: '<path d="M21 14.24V6L20 5H4L3 6V18L4 19H20L21 18V15.75H19.5V17.5H4.5V8.82001L12 14.56L19.5 8.82001V14.25L21 14.24ZM12 12.66L4.5 6.92V6.49001H19.5V6.92L12 12.66Z"/>',
  menu: '<path d="M20 7.5H4V6H20V7.5ZM20 11H4V12.5H20V11ZM20 16H4V17.5H20V16Z"/>',
  my_speeda: '<path d="M16.78 8.88C16.4728 7.69939 15.7832 6.6538 14.8189 5.9066C13.8546 5.1594 12.6699 4.75268 11.45 4.75C9.98508 4.75265 8.58107 5.33644 7.54616 6.37323C6.51124 7.41002 5.92999 8.81508 5.92999 10.28V10.45L5.18999 13.64H7.11V17.09H11.11V20.75H9.61V18.6H6.54999L5.54999 17.6V15.14H4.28999L3.5 14.35L4.5 10.19C4.51582 8.3439 5.26029 6.5788 6.57133 5.27899C7.88238 3.97919 9.65383 3.24993 11.5 3.25C13.1059 3.26714 14.657 3.83594 15.8933 4.86101C17.1296 5.88608 17.9758 7.30507 18.29 8.88H16.78ZM16.97 16.88V20.78H18.47V16.88H16.97ZM12.54 12.2L11.07 9.05H9.73V14.26H10.86V11.26L11.97 13.63H13.12L14.22 11.27V14.27H15.35V9.06H14.01L12.54 12.2ZM19.23 10.29L18.13 12.63L17.05 10.29H15.8L17.52 13.95L17.39 14.21H16.87V15.44H18.04L20.47 10.23L19.23 10.29Z"/>',
  notification: '<path d="M18 13.55V12.55H16.5V14.17L16.94 14.61L18.49 16.16V17.05H5.5V16.17L7.05 14.55L7.49 14.11V10.55C7.49 9.35295 7.96484 8.20478 8.81034 7.35741C9.65584 6.51003 10.803 6.03265 12 6.03C13.1962 6.03528 14.3418 6.51351 15.1868 7.36032C16.0317 8.20713 16.5074 9.35376 16.51 10.55V11.04H18V10.55C18.0112 9.07899 17.4816 7.65511 16.5119 6.54893C15.5422 5.44276 14.1998 4.73139 12.74 4.55V3H11.24V4.55C9.78379 4.73591 8.44627 5.44923 7.48061 6.55495C6.51496 7.66066 5.98818 9.08203 6 10.55V13.55L4 15.55V17.55L5 18.55H9.05C9.17746 19.2394 9.5423 19.8623 10.0812 20.3107C10.6201 20.7591 11.299 21.0046 12 21.0046C12.701 21.0046 13.3799 20.7591 13.9188 20.3107C14.4577 19.8623 14.8225 19.2394 14.95 18.55H19L20 17.55V15.55L18 13.55ZM12 19.55C11.6909 19.5477 11.3899 19.4506 11.1377 19.2717C10.8856 19.0929 10.6944 18.841 10.59 18.55H13.41C13.3056 18.841 13.1144 19.0929 12.8623 19.2717C12.6101 19.4506 12.3091 19.5477 12 19.55Z"/>',
  open_in_new: '<path d="M4 15.24V6.5L5 5.5H11V6.99H5.5V15.23L4 15.24ZM17 12.99V18.49H5.5V16.74H4V18.99L5 19.99H17.5L18.5 18.99V12.99H17ZM13.59 3.99V5.49H17.44L9.44 13.49L10.5 14.55L18.5 6.55V10.4H20V3.99H13.59Z"/>',
  operator: '<path d="M12 3C10.1185 3.00119 8.31053 3.73078 6.95518 5.0358C5.59983 6.34081 4.80236 8.11989 4.73 10H3V16.55L4 17.55H8V10.05H6.25C6.3225 8.70739 6.8616 7.43225 7.7742 6.44482C8.68681 5.45739 9.9156 4.81967 11.2484 4.64181C12.5811 4.46395 13.9341 4.75712 15.0737 5.47068C16.2133 6.18424 17.068 7.27338 17.49 8.55H19.04C18.6572 6.97037 17.7553 5.56489 16.4789 4.55862C15.2025 3.55236 13.6254 3.00353 12 3ZM6.5 16H4.5V11.55H6.5V16ZM16 10V16.93L14.25 19.55H13V18.75H9V21H15L17.43 17.55H20L21 16.55V10.05L16 10ZM19.5 16H17.5V11.55H19.5V16Z"/>',
  opinion: '<path d="M20.01 16.98H7.01001L3.01001 19.98V5.98001L4.01001 4.98001H20.01L21.01 5.98001V12.23H19.51V6.48001H4.51001V16.98L6.51001 15.48H19.51V13.73H21.01V15.98L20.01 16.98ZM17.51 8.74001H6.51001V10.24H17.51V8.74001ZM14.51 11.74H6.51001V13.24H14.51V11.74Z"/>',
  people: '<path d="M15.8501 9.27C15.3042 9.27 14.7706 9.10813 14.3167 8.80486C13.8628 8.50159 13.5091 8.07053 13.3002 7.56621C13.0913 7.06188 13.0366 6.50694 13.1431 5.97155C13.2496 5.43616 13.5125 4.94438 13.8985 4.55839C14.2845 4.17239 14.7762 3.90953 15.3116 3.80303C15.847 3.69654 16.402 3.7512 16.9063 3.96009C17.4106 4.16899 17.8417 4.52275 18.1449 4.97663C18.4482 5.43051 18.6101 5.96412 18.6101 6.51C18.6074 7.24119 18.3158 7.94168 17.7988 8.45871C17.2818 8.97574 16.5813 9.26737 15.8501 9.27ZM15.8501 5.27C15.6009 5.27 15.3573 5.3439 15.1501 5.48235C14.9429 5.6208 14.7814 5.81759 14.686 6.04782C14.5906 6.27805 14.5657 6.5314 14.6143 6.77582C14.6629 7.02023 14.7829 7.24474 14.9591 7.42096C15.1353 7.59717 15.3598 7.71717 15.6043 7.76579C15.8487 7.81441 16.102 7.78946 16.3323 7.69409C16.5625 7.59872 16.7593 7.43723 16.8977 7.23002C17.0362 7.02281 17.1101 6.77921 17.1101 6.53C17.1127 6.36286 17.0821 6.19686 17.02 6.04168C16.9578 5.88649 16.8654 5.74522 16.7482 5.62609C16.6309 5.50696 16.4911 5.41236 16.3369 5.34779C16.1827 5.28322 16.0172 5.24998 15.8501 5.25V5.27ZM8.66008 6.27C8.98797 6.27001 9.30851 6.36712 9.58128 6.54908C9.85404 6.73105 10.0668 6.98972 10.1927 7.29246C10.3187 7.5952 10.3521 7.92846 10.2889 8.25019C10.2256 8.57192 10.0685 8.86772 9.83737 9.10027C9.60621 9.33282 9.31136 9.4917 8.99002 9.55688C8.66867 9.62205 8.33522 9.5906 8.03172 9.46649C7.72823 9.34238 7.46829 9.13117 7.28469 8.85951C7.10109 8.58784 7.00205 8.26789 7.00008 7.94C7.00008 7.49974 7.17497 7.07751 7.48628 6.7662C7.79759 6.45489 8.21982 6.28 8.66008 6.28V6.27ZM8.66008 4.78C8.03509 4.78 7.42414 4.96533 6.90448 5.31256C6.38482 5.65978 5.97979 6.15331 5.74062 6.73072C5.50145 7.30814 5.43887 7.94351 5.5608 8.55649C5.68273 9.16947 5.98369 9.73252 6.42562 10.1745C6.86756 10.6164 7.43061 10.9174 8.04359 11.0393C8.65657 11.1612 9.29194 11.0986 9.86936 10.8595C10.4468 10.6203 10.9403 10.2153 11.2875 9.6956C11.6347 9.17594 11.8201 8.56499 11.8201 7.94C11.824 7.52251 11.7452 7.10836 11.5882 6.72151C11.4312 6.33465 11.199 5.98274 10.9052 5.68613C10.6114 5.38951 10.2617 5.15406 9.87633 4.99338C9.49097 4.8327 9.07759 4.77998 8.66008 4.78ZM12.8201 17.75V18.75H4.50008V17.44C4.50008 16.3367 4.93836 15.2786 5.71852 14.4984C6.49867 13.7183 7.55678 13.28 8.66008 13.28C9.56189 13.2789 10.4396 13.5709 11.1611 14.112C11.8825 14.6531 12.4086 15.414 12.6601 16.28H14.2001C13.9415 15.0015 13.2485 13.8518 12.2387 13.0261C11.2289 12.2004 9.96449 11.7495 8.66008 11.75C7.91427 11.75 7.17581 11.8974 6.48714 12.1837C5.79847 12.47 5.17318 12.8896 4.64721 13.4184C4.12124 13.9471 3.70495 14.5746 3.42228 15.2648C3.13961 15.955 2.99613 16.6942 3.00008 17.44V19.25L4.00008 20.25H13.3301L14.3301 19.25V17.75H12.8201ZM15.8201 10.04C14.5511 10.0588 13.335 10.551 12.4101 11.42L13.4601 12.47C14.1214 11.8904 14.9707 11.5706 15.8501 11.57C16.8173 11.5726 17.7442 11.958 18.4281 12.642C19.112 13.3259 19.4974 14.2528 19.5001 15.22V16.28H15.8201V17.75H20.0001L21.0001 16.75V15.15C20.9817 13.7963 20.431 12.5043 19.4672 11.5536C18.5033 10.6028 17.2039 10.0699 15.8501 10.07L15.8201 10.04Z"/>',
  person: '<path d="M12 5.01C12.481 5.00999 12.9424 5.20037 13.2834 5.53952C13.6244 5.87868 13.8174 6.33904 13.82 6.82C13.82 7.30269 13.6283 7.76562 13.2869 8.10693C12.9456 8.44825 12.4827 8.64 12 8.64C11.5173 8.64 11.0544 8.44825 10.7131 8.10693C10.3717 7.76562 10.18 7.30269 10.18 6.82C10.1826 6.33904 10.3756 5.87868 10.7166 5.53952C11.0576 5.20037 11.519 5.00999 12 5.01ZM12 3.5C11.1195 3.5 10.275 3.84978 9.6524 4.4724C9.02978 5.09503 8.67999 5.93948 8.67999 6.82C8.67999 7.70052 9.02978 8.54497 9.6524 9.16759C10.275 9.79021 11.1195 10.14 12 10.14C12.8805 10.14 13.725 9.79021 14.3476 9.16759C14.9702 8.54497 15.32 7.70052 15.32 6.82C15.32 5.93948 14.9702 5.09503 14.3476 4.4724C13.725 3.84978 12.8805 3.5 12 3.5ZM18.25 17.73H16.75V19H7.25V17.4C7.25 16.7762 7.37286 16.1585 7.61157 15.5823C7.85028 15.006 8.20016 14.4823 8.64124 14.0412C9.08231 13.6002 9.60595 13.2503 10.1823 13.0116C10.7585 12.7729 11.3762 12.65 12 12.65C13.0534 12.6547 14.0754 13.0088 14.906 13.6566C15.7366 14.3044 16.3289 15.2095 16.59 16.23H18.14C17.8659 14.8019 17.1031 13.5138 15.9827 12.5868C14.8623 11.6598 13.4542 11.1518 12 11.15C10.3424 11.15 8.75268 11.8085 7.58058 12.9806C6.40848 14.1527 5.75 15.7424 5.75 17.4V19.5L6.75 20.5H17.25L18.25 19.5V17.73Z"/>',
  pib: '<path d="M16.74 9.74001H9.74002V8.24001H16.74V9.74001ZM15.74 12.97V11.47H9.74002V12.97H15.74ZM20.5 15.25V5L19.5 4H6.01001L5.01001 5V8.25H3.5V9.75H5.01001V14.25H3.5V15.75H5.01001V19L6.01001 20H19.5L20.5 19V16.75H19V18.5H6.51001V15.75H7.51001V14.25H6.51001V9.75H7.51001V8.25H6.51001V5.5H19V15.25H20.5Z"/>',
  plus: '<path d="M20 11.2H12.8V4H11.3V11.2H4V12.7H11.3V20H12.8V12.7H20V11.2Z"/>',
  search: '<path d="M21 19.9199L19.94 20.9799L15.22 16.2599L14.15 15.1899C15.2728 14.3186 16.0498 13.0769 16.3426 11.6861C16.6354 10.2954 16.425 8.84583 15.7489 7.5957C15.0728 6.34556 13.9749 5.37602 12.6507 4.85978C11.3265 4.34354 9.8621 4.31411 8.51825 4.77675C7.1744 5.23938 6.03842 6.16404 5.31264 7.386C4.58686 8.60797 4.31842 10.0479 4.55513 11.4493C4.79185 12.8507 5.51835 14.1226 6.60522 15.0384C7.69209 15.9541 9.06876 16.4544 10.49 16.4499C11.2906 16.4535 12.0834 16.2936 12.82 15.9799L13.94 17.0999C12.2959 17.954 10.3934 18.1676 8.60089 17.6993C6.80838 17.2309 5.25346 16.114 4.23728 14.5649C3.22111 13.0158 2.81599 11.1446 3.1004 9.31391C3.38481 7.48319 4.33851 5.82316 5.77678 4.65533C7.21504 3.48751 9.03553 2.895 10.8856 2.99256C12.7357 3.09013 14.4838 3.87082 15.7913 5.18343C17.0988 6.49605 17.8726 8.24718 17.9629 10.0977C18.0531 11.9481 17.4535 13.7663 16.28 15.1999L21 19.9199Z"/>',
  settings: '<path d="M12 8.40001C11.5272 8.40132 11.0594 8.49574 10.6231 8.67787C10.1868 8.86 9.7907 9.12627 9.45734 9.46149C9.12398 9.79671 8.85991 10.1943 8.6802 10.6316C8.5005 11.0689 8.40868 11.5373 8.41 12.01C8.40868 12.4828 8.5005 12.9512 8.6802 13.3884C8.85991 13.8257 9.12398 14.2233 9.45734 14.5585C9.7907 14.8937 10.1868 15.16 10.6231 15.3422C11.0594 15.5243 11.5272 15.6187 12 15.62C12.4728 15.6187 12.9406 15.5243 13.3769 15.3422C13.8132 15.16 14.2093 14.8937 14.5427 14.5585C14.876 14.2233 15.1401 13.8257 15.3198 13.3884C15.4995 12.9512 15.5913 12.4828 15.59 12.01C15.5913 11.5373 15.4995 11.0689 15.3198 10.6316C15.1401 10.1943 14.876 9.79671 14.5427 9.46149C14.2093 9.12627 13.8132 8.86 13.3769 8.67787C12.9406 8.49574 12.4728 8.40132 12 8.40001ZM12 14.12C11.4439 14.1147 10.9123 13.8901 10.5209 13.495C10.1295 13.0998 9.90998 12.5662 9.91 12.01C9.90998 11.4539 10.1295 10.9202 10.5209 10.525C10.9123 10.1299 11.4439 9.90528 12 9.90001C12.5561 9.90528 13.0877 10.1299 13.4791 10.525C13.8705 10.9202 14.09 11.4539 14.09 12.01C14.09 12.5662 13.8705 13.0998 13.4791 13.495C13.0877 13.8901 12.5561 14.1147 12 14.12ZM20.28 13.68L20.64 15.04L18.94 18.04L17.59 18.4L16.42 17.73L15.34 16.65L15.5 16.54L16.29 15.92L17.17 16.43L17.9 16.85L19.09 14.77L18.37 14.35L17.49 13.85L17.63 12.85C17.667 12.5882 17.687 12.3244 17.69 12.06C17.687 11.7957 17.667 11.5318 17.63 11.27L17.49 10.27L18.37 9.77001L19.09 9.35001L17.9 7.27001L17.17 7.69001L16.29 8.20001L15.5 7.58001C15.0849 7.25038 14.6232 6.98416 14.13 6.79001L13.2 6.41001V4.51001H10.8V6.36001L9.87 6.74001C9.37678 6.93415 8.91509 7.20039 8.5 7.53001L7.71 8.15001L6.83 7.64001L6.1 7.22001L4.91 9.30001L5.63 9.72001L6.51 10.22L6.37 11.22C6.33304 11.4818 6.313 11.7457 6.31 12.01C6.313 12.2744 6.33304 12.5382 6.37 12.8L6.51 13.8L5.63 14.3L4.91 14.72L6.1 16.8L6.83 16.38L7.71 15.87L8.5 16.49C8.91509 16.8196 9.37678 17.0859 9.87 17.28L10.8 17.66V19.51H13.2V17.66L13.97 17.35L15.1 18.46C14.96 18.52 14.84 18.6 14.7 18.66V19.99L13.7 20.99H10.3L9.3 19.99V18.68C8.68598 18.4222 8.10786 18.086 7.58 17.68L6.42 18.35L5.06 17.99L3.36 14.99L3.72 13.62L4.88 12.95C4.83578 12.6185 4.8124 12.2845 4.81 11.95C4.8124 11.6155 4.83578 11.2816 4.88 10.95L3.72 10.28L3.36 8.91001L5.05 5.97001L6.42 5.60001L7.58 6.27001C8.10522 5.86005 8.68388 5.52362 9.3 5.27001V4.01001L10.3 3.01001H13.7L14.7 4.01001V5.35001C15.3161 5.60362 15.8948 5.94005 16.42 6.35001L17.58 5.68001L18.95 6.05001L20.64 8.99001L20.28 10.35L19.12 11.03C19.1642 11.3616 19.1876 11.6955 19.19 12.03C19.1876 12.3645 19.1642 12.6985 19.12 13.03L20.28 13.68Z"/>',
  sort: '<path d="M11.5906 5.62264C11.7885 5.32578 12.2247 5.32578 12.4226 5.62264L15.4884 10.2212C15.7099 10.5535 15.4717 10.9986 15.0723 10.9986H8.94084C8.54149 10.9986 8.3033 10.5535 8.52482 10.2212L11.5906 5.62264ZM12.4226 18.3746C12.2247 18.6714 11.7885 18.6714 11.5906 18.3746L8.52481 13.7759C8.3033 13.4437 8.54149 12.9986 8.94084 12.9986H15.0723C15.4717 12.9986 15.7099 13.4437 15.4884 13.7759L12.4226 18.3746Z"/>',
  sort_down: '<path d="M12.5038 15.7328C12.2641 16.0891 11.7357 16.0891 11.496 15.7328L7.78265 10.213C7.51434 9.81422 7.80286 9.28 8.28656 9.28L15.7133 9.28C16.197 9.28 16.4855 9.81422 16.2172 10.2131L12.5038 15.7328Z"/>',
  sort_up: '<path d="M11.4962 8.26725C11.7359 7.91092 12.2643 7.91092 12.504 8.26725L16.2173 13.7869C16.4857 14.1858 16.1971 14.72 15.7134 14.72H8.28672C7.80301 14.72 7.5145 14.1858 7.78281 13.7869L11.4962 8.26725Z"/>',
  toggle_arrow_down: '<path d="M12.424 15.3216C12.2282 15.6349 11.7718 15.6349 11.576 15.3216L7.47813 8.765C7.26999 8.43197 7.50941 8 7.90213 8L16.0979 8C16.4906 8 16.73 8.43198 16.5219 8.765L12.424 15.3216Z"/>',
  toggle_arrow_right: '<path d="M15.3216 11.576C15.6349 11.7718 15.6349 12.2282 15.3216 12.424L8.765 16.5219C8.43198 16.73 8 16.4906 8 16.0979L8 7.90212C8 7.50941 8.43198 7.26998 8.765 7.47812L15.3216 11.576Z"/>',
  zip: '<path d="M21 18L20 19H4L3 18V6L4 5H10L11 7H20L21 8V14H19.5V8.50999H10.05L9.04999 6.50999H4.48999V17.51H19.49V15.51H21V18ZM9 11.5H7.5V12.5H9V11.5ZM10.5 12.5V13.5H9V12.5H10.5ZM9 13.5V14.5H7.5V13.5H9ZM10.5 14.5V15.5H9V14.5H10.5ZM9 15.5V16.5H7.5V15.5H9ZM10.5 16.5V17.5H9V16.5H10.5Z"/>'
};
function mt(o) {
  return Object.hasOwnProperty.call(kt, o);
}
const yt = new CSSStyleSheet();
yt.replaceSync(Jt);
class lt extends Nt {
  constructor() {
    super(), this.paths = { ...kt, "": "" }, this.shadowRoot.adoptedStyleSheets = [
      ...this.shadowRoot.adoptedStyleSheets,
      yt
    ];
  }
  /**
   * アイコンのタイプ
   * デザインシステムのアイコンタイプを指定した場合はそのタイプを設定し、それ以外を指定した場合は表示しません
   *
   * 指定可能なアイコンタイプ：
   * - arrow_down
   * - arrow_down_link
   * - arrow_left
   * - arrow_left_link
   * - arrow_right
   * - arrow_right_link
   * - arrow_up
   * - arrow_up_link
   * - bookmark
   * - calendar
   * - check
   * - check_bold
   * - clear
   * - close
   * - copy
   * - create
   * - delete
   * - doublearrow_down
   * - doublearrow_left
   * - doublearrow_right
   * - download
   * - drag
   * - edit
   * - error
   * - folder
   * - help
   * - kebab_menu
   * - like
   * - list
   * - location
   * - lock
   * - mail
   * - menu
   * - my_speeda
   * - notification
   * - open_in_new
   * - operator
   * - opinion
   * - people
   * - person
   * - pib
   * - plus
   * - search
   * - settings
   * - sort
   * - sort_down
   * - sort_up
   * - toggle_arrow_down
   * - toggle_arrow_right
   * - zip
   *
   * @attribute
   * @type {string}
   */
  set type(t) {
    super.type = mt(t) ? t : "";
  }
  attributeChangedCallback(t, e, i) {
    if (t === "type") {
      const r = mt(i) ? i : "";
      super.attributeChangedCallback(t, e, r);
    } else
      super.attributeChangedCallback(t, e, i);
  }
}
customElements.get("sp-icon") || customElements.define("sp-icon", lt);
const Qt = '*,*:before,*:after{box-sizing:border-box}html,body,div,span,applet,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,address,big,cite,code,del,dfn,em,img,ins,kbd,q,s,samp,small,strike,strong,sub,sup,tt,var,b,u,i,center,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td,article,aside,canvas,details,embed,figure,figcaption,footer,header,hgroup,menu,nav,output,ruby,section,summary,time,mark,audio,video{margin:0;padding:0;border:0;font-size:100%;font:inherit;vertical-align:baseline}article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section{display:block}[hidden]:not([hidden=until-found]){display:none!important}body,article,p,span,div,li,td,th,dt,dd,h1,h2,h3,h4,h5,h6{overflow-wrap:anywhere;line-break:strict}body{line-height:1;-webkit-text-size-adjust:100%;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}li{list-style:none}blockquote,q{quotes:none}blockquote:before,blockquote:after,q:before,q:after{content:"";content:none}table{border-collapse:collapse;border-spacing:0}a{text-decoration:none;color:inherit}button{all:unset;box-sizing:border-box}button,label,select,summary,[role=button],[role=option]{cursor:pointer}button,input,select,textarea{margin:0;font-family:inherit;font-size:100%}button,input{overflow:visible}button,select{text-transform:none}button,[type=button],[type=reset],[type=submit]{-webkit-appearance:button}button::-moz-focus-inner,[type=button]::-moz-focus-inner,[type=reset]::-moz-focus-inner,[type=submit]::-moz-focus-inner{border-style:none;padding:0}@media (prefers-reduced-motion: reduce){*{animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important;scroll-behavior:auto!important}}input[type=text],input[type=email],input[type=password],input[type=search],input[type=tel],input[type=url],input[type=number],textarea{-webkit-appearance:none}a,button,input,select,textarea{touch-action:manipulation}:focus{outline:auto;outline-offset:2px}:focus:not(:focus-visible){outline:0}:focus-visible{outline:auto;outline-offset:2px}img{max-width:100%;height:auto}', Xt = ':host{--font-family-zh: Arial, YakuHanJPs, "PingFang SC", "Microsoft YaHei", "PingFang TC", Microsoft JhengHei, sans-serif;--font-family-ja: Arial, YakuHanJPs, Hiragino Sans, Hiragino Kaku Gothic ProN, Meiryo, Noto Sans JP, sans-serif;--color-semantic-text-weak: #6f6f6f;--color-semantic-text-text-link: #404fbf;--color-semantic-text-semi-weak: #363636;--color-semantic-text-required: #ca3232;--color-semantic-text-regular: #191919;--color-semantic-text-placeholder: #6f6f6f;--color-semantic-text-inverse: #ffffff;--color-semantic-text-error: #ca3232;--color-semantic-text-disabled: #cbcbcb;--color-semantic-text-destructive: #ca3232;--color-semantic-text-current: #404fbf;--color-semantic-text-button-text-hover: #191919;--color-semantic-text-button-text-focus: #191919;--color-semantic-text-button-text-destructive-hover: #ca3232;--color-semantic-text-button-text-destructive-focus: #ca3232;--color-semantic-text-button-text-destructive-default: #ca3232;--color-semantic-text-button-text-default: #191919;--color-semantic-text-button-selected-hover: #ffffff;--color-semantic-text-button-selected: #ffffff;--color-semantic-text-button-outline-hover: #6f6f6f;--color-semantic-text-button-outline-focus: #6f6f6f;--color-semantic-text-button-outline-destructive-hover: #da7070;--color-semantic-text-button-outline-destructive-focus: #da7070;--color-semantic-text-button-outline-destructive-default: #ca3232;--color-semantic-text-button-outline-default: #191919;--color-semantic-text-button-loading: #cbcbcb;--color-semantic-text-button-fill-hover: #ffffff;--color-semantic-text-button-fill-focus: #ffffff;--color-semantic-text-button-fill-destructive-hover: #ffffff;--color-semantic-text-button-fill-destructive-focus: #ffffff;--color-semantic-text-button-fill-destructive-default: #ffffff;--color-semantic-text-button-fill-default: #ffffff;--color-semantic-text-button-disabled: #cbcbcb;--color-semantic-surface-warning-3: #f9e8b3;--color-semantic-surface-warning-1: #fdf7e6;--color-semantic-surface-success-3: #bad4c3;--color-semantic-surface-success-1: #e8f1eb;--color-semantic-surface-selected-hover: #5361c5;--color-semantic-surface-selected-focus: #404fbf;--color-semantic-surface-selected: #404fbf;--color-semantic-surface-regular-9: #191919;--color-semantic-surface-regular-8: #282828;--color-semantic-surface-regular-7: #363636;--color-semantic-surface-regular-6: #cbcbcb;--color-semantic-surface-regular-5: #e5e5e5;--color-semantic-surface-regular-4: #ededed;--color-semantic-surface-regular-3: #f5f5f5;--color-semantic-surface-regular-2: #f8f8f8;--color-semantic-surface-regular-1: #ffffff;--color-semantic-surface-information-3: #c4d7ec;--color-semantic-surface-information-1: #ebf2f9;--color-semantic-surface-error-3: #efc2c2;--color-semantic-surface-error-1: #faebeb;--color-semantic-surface-checked-hover: #d9dcf2;--color-semantic-surface-checked: #ecedf9;--color-semantic-surface-check-disabled: #ededed;--color-semantic-surface-button-text-hover: #f5f5f5;--color-semantic-surface-button-text-focus: #f5f5f5;--color-semantic-surface-button-text-destructive-hover: #f4d6d6;--color-semantic-surface-button-text-destructive-focus: #f4d6d6;--color-semantic-surface-button-text-destructive-default: rgba(202, 50, 50, 0);--color-semantic-surface-button-text-default: rgba(25, 25, 25, 0);--color-semantic-surface-button-selected-hover: #5361c5;--color-semantic-surface-button-selected: #404fbf;--color-semantic-surface-button-outline-hover: rgba(25, 25, 25, 0);--color-semantic-surface-button-outline-focus: rgba(25, 25, 25, 0);--color-semantic-surface-button-outline-destructive-hover: rgba(218, 112, 112, 0);--color-semantic-surface-button-outline-destructive-focus: rgba(218, 112, 112, 0);--color-semantic-surface-button-outline-destructive-default: rgba(202, 50, 50, 0);--color-semantic-surface-button-outline-default: rgba(25, 25, 25, 0);--color-semantic-surface-button-loading: #f8f8f8;--color-semantic-surface-button-fill-hover: #363636;--color-semantic-surface-button-fill-focus: #363636;--color-semantic-surface-button-fill-destructive-hover: #d55b5b;--color-semantic-surface-button-fill-destructive-focus: #d55b5b;--color-semantic-surface-button-fill-destructive-default: #ca3232;--color-semantic-surface-button-fill-default: #191919;--color-semantic-surface-button-disabled: #f8f8f8;--color-semantic-surface-temp-tag-yellow: #fdf7e6;--color-semantic-surface-temp-tag-red: #faebeb;--color-semantic-surface-temp-tag-marine: #ebf2f9;--color-semantic-surface-temp-tag-green: #e8f1eb;--color-semantic-surface-temp-tag-gray: #f8f8f8;--color-semantic-surface-temp-tag-darkyellow: #eab100;--color-semantic-surface-temp-tag-darkred: #ca3232;--color-semantic-surface-temp-tag-darkmarine: #3978bf;--color-semantic-surface-temp-tag-darkgreen: #1a7037;--color-semantic-highlight-text: #ffe7ec;--color-semantic-highlight-focus-ring-error: #f7e0e0;--color-semantic-highlight-focus-ring-default: #e2e5f5;--color-semantic-elevation-sort: rgba(25, 25, 25, .2);--color-semantic-elevation-regular: rgba(25, 25, 25, .2);--color-semantic-elevation-modal: rgba(25, 25, 25, .2);--color-semantic-chart-single-8: #d6e3ff;--color-semantic-chart-single-7: #c6d7ff;--color-semantic-chart-single-6: #b6ccff;--color-semantic-chart-single-5: #a5c0ff;--color-semantic-chart-single-4: #95b5ff;--color-semantic-chart-single-3: #85aaff;--color-semantic-chart-single-2: #749eff;--color-semantic-chart-single-1: #5c8dff;--color-semantic-chart-multi-line-9: #df8484;--color-semantic-chart-multi-line-8: #b3308a;--color-semantic-chart-multi-line-7: #404fbf;--color-semantic-chart-multi-line-6: #3978bf;--color-semantic-chart-multi-line-5: #248a6a;--color-semantic-chart-multi-line-4: #a9ad2f;--color-semantic-chart-multi-line-3: #eab100;--color-semantic-chart-multi-line-2: #b38732;--color-semantic-chart-multi-line-16: #d183b9;--color-semantic-chart-multi-line-15: #8c95d9;--color-semantic-chart-multi-line-14: #88aed9;--color-semantic-chart-multi-line-13: #7cb9a6;--color-semantic-chart-multi-line-12: #cbce82;--color-semantic-chart-multi-line-11: #f2d066;--color-semantic-chart-multi-line-10: #d1b784;--color-semantic-chart-multi-line-1: #ca3232;--color-semantic-chart-multi-fill-9: #cc9ee3;--color-semantic-chart-multi-fill-8: #e59999;--color-semantic-chart-multi-fill-7: #dead9c;--color-semantic-chart-multi-fill-6: #d9c399;--color-semantic-chart-multi-fill-5: #e6e197;--color-semantic-chart-multi-fill-4: #b0ce94;--color-semantic-chart-multi-fill-38: #d1c5e8;--color-semantic-chart-multi-fill-37: #e8c1dc;--color-semantic-chart-multi-fill-36: #edc6c1;--color-semantic-chart-multi-fill-35: #e5d4c0;--color-semantic-chart-multi-fill-34: #f9e8b3;--color-semantic-chart-multi-fill-33: #e5e6c1;--color-semantic-chart-multi-fill-32: #c3daba;--color-semantic-chart-multi-fill-31: #bddcd2;--color-semantic-chart-multi-fill-30: #bedbe2;--color-semantic-chart-multi-fill-3: #8db89b;--color-semantic-chart-multi-fill-29: #c6caec;--color-semantic-chart-multi-fill-28: #e0c5ee;--color-semantic-chart-multi-fill-27: #efc2c2;--color-semantic-chart-multi-fill-26: #ebcec4;--color-semantic-chart-multi-fill-25: #e8dbc2;--color-semantic-chart-multi-fill-24: #f0edc1;--color-semantic-chart-multi-fill-23: #cfe1bf;--color-semantic-chart-multi-fill-22: #bad4c3;--color-semantic-chart-multi-fill-21: #c0e5e3;--color-semantic-chart-multi-fill-20: #c4d7ec;--color-semantic-chart-multi-fill-2: #96d4d1;--color-semantic-chart-multi-fill-19: #b29ed9;--color-semantic-chart-multi-fill-18: #d998c5;--color-semantic-chart-multi-fill-17: #e1a098;--color-semantic-chart-multi-fill-16: #d4b797;--color-semantic-chart-multi-fill-15: #f5d880;--color-semantic-chart-multi-fill-14: #d4d697;--color-semantic-chart-multi-fill-13: #9bc28c;--color-semantic-chart-multi-fill-12: #92c5b5;--color-semantic-chart-multi-fill-11: #93c4cf;--color-semantic-chart-multi-fill-10: #a0a7df;--color-semantic-chart-multi-fill-1: #9cbcdf;--color-semantic-chart-heatmap-4: #dee8ff;--color-semantic-chart-heatmap-3: #bed1ff;--color-semantic-chart-heatmap-2: #9dbbff;--color-semantic-chart-heatmap-1: #7da4ff;--color-semantic-brand-default: #ff5e83;--color-semantic-border-warning: #eab100;--color-semantic-border-success: #1a7037;--color-semantic-border-strong: #191919;--color-semantic-border-semi-weak: #ededed;--color-semantic-border-semi-strong: #363636;--color-semantic-border-selected-hover: #5361c5;--color-semantic-border-selected: #404fbf;--color-semantic-border-regular: #e5e5e5;--color-semantic-border-inverse: #ffffff;--color-semantic-border-information: #3978bf;--color-semantic-border-focus: #404fbf;--color-semantic-border-error: #ca3232;--color-semantic-border-check-unchecked: #cbcbcb;--color-semantic-border-button-text-hover: #f5f5f5;--color-semantic-border-button-text-focus: #f5f5f5;--color-semantic-border-button-text-destructive-hover: #f4d6d6;--color-semantic-border-button-text-destructive-focus: #f4d6d6;--color-semantic-border-button-text-destructive-default: rgba(202, 50, 50, 0);--color-semantic-border-button-text-default: rgba(25, 25, 25, 0);--color-semantic-border-button-selected-hover: #5361c5;--color-semantic-border-button-selected: #404fbf;--color-semantic-border-button-outline-hover: #6f6f6f;--color-semantic-border-button-outline-focus: #6f6f6f;--color-semantic-border-button-outline-destructive-hover: #da7070;--color-semantic-border-button-outline-destructive-focus: #da7070;--color-semantic-border-button-outline-destructive-default: #ca3232;--color-semantic-border-button-outline-default: #191919;--color-semantic-border-button-loading: #e5e5e5;--color-semantic-border-button-fill-hover: #363636;--color-semantic-border-button-fill-focus: #363636;--color-semantic-border-button-fill-destructive-hover: #d55b5b;--color-semantic-border-button-fill-destructive-focus: #d55b5b;--color-semantic-border-button-fill-destructive-default: #ca3232;--color-semantic-border-button-fill-default: #191919;--color-semantic-border-button-disabled: #e5e5e5;--color-semantic-border-temp-tag-yellow: #f7e099;--color-semantic-border-temp-tag-red: #eaadad;--color-semantic-border-temp-tag-marine: #b0c9e5;--color-semantic-border-temp-tag-green: #a3c6af;--color-semantic-border-temp-tag-gray: #e5e5e5;--color-semantic-border-temp-tag-darkyellow: #a47c00;--color-semantic-border-temp-tag-darkred: #8d2323;--color-semantic-border-temp-tag-darkmarine: #285486;--color-semantic-border-temp-tag-darkgreen: #124e27;--color-semantic-background-default: #f8f8f8;--color-primitive-yellow-60: #f2d066;--color-primitive-yellow-50: #f5d880;--color-primitive-yellow-40: #f7e099;--color-primitive-yellow-30: #f9e8b3;--color-primitive-yellow-130: #a47c00;--color-primitive-yellow-100: #eab100;--color-primitive-yellow-10: #fdf7e6;--color-primitive-white: #ffffff;--color-primitive-viridian-60: #7cb9a6;--color-primitive-viridian-50: #92c5b5;--color-primitive-viridian-30: #bddcd2;--color-primitive-viridian-100: #248a6a;--color-primitive-violet-50: #b29ed9;--color-primitive-violet-30: #d1c5e8;--color-primitive-turquoise-50: #93c4cf;--color-primitive-turquoise-30: #bedbe2;--color-primitive-tomato-80: #d55b5b;--color-primitive-tomato-70: #da7070;--color-primitive-tomato-60: #df8484;--color-primitive-tomato-50: #e59999;--color-primitive-tomato-40: #eaadad;--color-primitive-tomato-30: #efc2c2;--color-primitive-tomato-20: #f4d6d6;--color-primitive-tomato-15: #f7e0e0;--color-primitive-tomato-130: #8d2323;--color-primitive-tomato-100: #ca3232;--color-primitive-tomato-10: #faebeb;--color-primitive-terracotta-50: #e1a098;--color-primitive-terracotta-30: #edc6c1;--color-primitive-sky-85: #749eff;--color-primitive-sky-80: #7da4ff;--color-primitive-sky-75: #85aaff;--color-primitive-sky-65: #95b5ff;--color-primitive-sky-60: #9dbbff;--color-primitive-sky-55: #a5c0ff;--color-primitive-sky-45: #b6ccff;--color-primitive-sky-40: #bed1ff;--color-primitive-sky-35: #c6d7ff;--color-primitive-sky-25: #d6e3ff;--color-primitive-sky-20: #dee8ff;--color-primitive-sky-100: #5c8dff;--color-primitive-purple-50: #cc9ee3;--color-primitive-purple-30: #e0c5ee;--color-primitive-plum-60: #d183b9;--color-primitive-plum-50: #d998c5;--color-primitive-plum-30: #e8c1dc;--color-primitive-plum-100: #b3308a;--color-primitive-pink-15: #ffe7ec;--color-primitive-pink-100: #ff5e83;--color-primitive-neutral-90: #282828;--color-primitive-neutral-80: #363636;--color-primitive-neutral-70: #6f6f6f;--color-primitive-neutral-50: #cbcbcb;--color-primitive-neutral-40: #e5e5e5;--color-primitive-neutral-30: #ededed;--color-primitive-neutral-20: #f5f5f5;--color-primitive-neutral-100: #191919;--color-primitive-neutral-10: #f8f8f8;--color-primitive-marine-60: #88aed9;--color-primitive-marine-50: #9cbcdf;--color-primitive-marine-40: #b0c9e5;--color-primitive-marine-30: #c4d7ec;--color-primitive-marine-130: #285486;--color-primitive-marine-100: #3978bf;--color-primitive-marine-10: #ebf2f9;--color-primitive-lime-60: #cbce82;--color-primitive-lime-50: #d4d697;--color-primitive-lime-30: #e5e6c1;--color-primitive-lime-100: #a9ad2f;--color-primitive-lemon-50: #e6e197;--color-primitive-lemon-30: #f0edc1;--color-primitive-leaf-50: #b0ce94;--color-primitive-leaf-30: #cfe1bf;--color-primitive-green-50: #8db89b;--color-primitive-green-40: #a3c6af;--color-primitive-green-30: #bad4c3;--color-primitive-green-130: #124e27;--color-primitive-green-100: #1a7037;--color-primitive-green-10: #e8f1eb;--color-primitive-emerald-50: #96d4d1;--color-primitive-emerald-30: #c0e5e3;--color-primitive-cork-60: #d1b784;--color-primitive-cork-50: #d9c399;--color-primitive-cork-30: #e8dbc2;--color-primitive-cork-100: #b38732;--color-primitive-brown-50: #dead9c;--color-primitive-brown-30: #ebcec4;--color-primitive-blue-90: #5361c5;--color-primitive-blue-60: #8c95d9;--color-primitive-blue-50: #a0a7df;--color-primitive-blue-30: #c6caec;--color-primitive-blue-20: #d9dcf2;--color-primitive-blue-15: #e2e5f5;--color-primitive-blue-100: #404fbf;--color-primitive-blue-10: #ecedf9;--color-primitive-bamboo-50: #9bc28c;--color-primitive-bamboo-30: #c3daba;--color-primitive-amber-50: #d4b797;--color-primitive-amber-30: #e5d4c0}:host,*{overflow-wrap:break-word;min-width:0}:host{font-family:var(--font-family-ja)}:host:lang(zh){font-family:var(--font-family-zh)}button{box-sizing:border-box}';
function l(...o) {
  const t = new CSSStyleSheet();
  return t.replaceSync(
    `${Qt} ${Xt} ${o.join(" ")}`
  ), t;
}
const Et = ':host{--icon-color: var(--color-semantic-text-button-outline-default);--padding-inline: 16px;display:inline-block;max-width:100%}.base{display:inline-flex;align-items:center;justify-content:center;column-gap:4px;color:var(--color-semantic-text-button-outline-default);border-radius:5px;border:1px solid transparent;background-color:transparent;min-height:28px;max-width:100%;padding-inline:var(--padding-inline);position:relative;overflow:hidden;cursor:pointer}.base__text{font-size:10px;font-weight:700;line-height:1}.type__default.appearance__outline{border-color:var(--color-semantic-border-button-outline-default)}.type__default.appearance__outline:hover:not(:disabled){--icon-color: var(--color-semantic-text-button-outline-hover);border-color:var(--color-semantic-border-button-outline-hover);color:var(--color-semantic-text-button-outline-hover)}.type__default.appearance__outline:focus-visible:not(:is(:disabled,.isSelected)){--icon-color: var(--color-semantic-text-button-outline-focus);border-color:var(--color-semantic-border-button-outline-focus);color:var(--color-semantic-text-button-outline-focus)}.type__default.appearance__fill{--icon-color: var(--color-semantic-text-button-fill-default);border-color:var(--color-semantic-border-button-fill-default);background-color:var(--color-semantic-surface-button-fill-default);color:var(--color-semantic-text-button-fill-default)}.type__default.appearance__fill:hover:not(:disabled){border-color:var(--color-semantic-border-button-fill-hover);background-color:var(--color-semantic-surface-button-fill-hover)}.type__default.appearance__fill:focus-visible:not(:is(:disabled,.isSelected)){border-color:var(--color-semantic-border-button-fill-focus);background-color:var(--color-semantic-surface-button-fill-focus)}.type__default.appearance__text{border-color:var(--color-semantic-border-button-text-default);background-color:var(--color-semantic-surface-button-text-default)}.type__default.appearance__text:hover:not(:disabled){border-color:var(--color-semantic-border-button-text-hover);background-color:var(--color-semantic-surface-button-text-hover)}.type__default.appearance__text:focus-visible:not(:is(:disabled,.isSelected)){border-color:var(--color-semantic-border-button-text-focus);background-color:var(--color-semantic-surface-button-text-focus)}.type__default.isSelected{--icon-color: var(--color-semantic-text-button-selected);border-color:var(--color-semantic-border-button-selected);background-color:var(--color-semantic-surface-button-selected);color:var(--color-semantic-text-button-selected)}.type__default.isSelected:hover:not(:disabled){--icon-color: var(--color-semantic-text-button-selected);border-color:var(--color-semantic-border-button-selected-hover);background-color:var(--color-semantic-surface-button-selected-hover);color:var(--color-semantic-text-button-selected)}.type__destructive.appearance__outline{--icon-color: var(--color-semantic-text-button-outline-destructive-default);border-color:var(--color-semantic-border-button-outline-destructive-default);color:var(--color-semantic-text-button-outline-destructive-default)}.type__destructive.appearance__outline:hover:not(:disabled){--icon-color: var(--color-semantic-text-button-outline-destructive-hover);border-color:var(--color-semantic-border-button-outline-destructive-hover);color:var(--color-semantic-text-button-outline-destructive-hover)}.type__destructive.appearance__outline:focus-visible:not(:disabled){--icon-color: var(--color-semantic-text-button-outline-destructive-focus);border-color:var(--color-semantic-border-button-outline-destructive-focus);color:var(--color-semantic-text-button-outline-destructive-focus)}.type__destructive.appearance__fill{--icon-color: var(--color-semantic-text-button-fill-destructive-default);border-color:var(--color-semantic-border-button-fill-destructive-default);background-color:var( --color-semantic-surface-button-fill-destructive-default );color:var(--color-semantic-text-button-fill-destructive-default)}.type__destructive.appearance__fill:hover:not(:disabled){border-color:var(--color-semantic-border-button-fill-destructive-hover);background-color:var(--color-semantic-surface-button-fill-destructive-hover)}.type__destructive.appearance__fill:focus-visible:not(:disabled){border-color:var(--color-semantic-border-button-fill-destructive-focus);background-color:var(--color-semantic-surface-button-fill-destructive-focus)}.type__destructive.appearance__text{--icon-color: var(--color-semantic-text-button-text-destructive-default);border-color:transparent;background-color:transparent;color:var(--color-semantic-text-button-text-destructive-default)}.type__destructive.appearance__text:hover:not(:disabled){border-color:var(--color-semantic-border-button-text-destructive-hover);background-color:var(--color-semantic-surface-button-text-destructive-hover)}.type__destructive.appearance__text:focus-visible:not(:disabled){border-color:var(--color-semantic-border-button-text-destructive-focus);background-color:var(--color-semantic-surface-button-text-destructive-focus)}:is(.type__default,.type__destructive):disabled{--icon-color: var(--color-semantic-text-button-disabled);border-color:var(--color-semantic-border-button-disabled);background-color:var(--color-semantic-surface-button-disabled);color:var(--color-semantic-text-button-disabled);cursor:not-allowed}:is(.type__default,.type__destructive).isLoading{border-color:var(--color-semantic-border-button-loading);background-color:var(--color-semantic-surface-button-loading)}:is(.type__default,.type__destructive).isLoading:before{content:"";display:block;background:transparent url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAJcEhZcwAALEsAACxLAaU9lqkAAAMAUExURUdwTP///8jIyLi4uLGxsUdHR9LS0vHx8by8vKSkpNnZ2b6+vpSUlLe3t+Dg4N/f37Ozs/X19W5ubvj4+CMjI8/Pz+/v78bGxqampp+fnzIyMufn59HR0a+vr+Xl5dbW1tbW1sHBwezs7MLCwvDw8JCQkJubm6mpqZiYmO7u7rW1tdvb29/f32VlZfb29szMzPDw8Ovr65OTk/Dw8KGhoZ2dnYeHh/Ly8tfX19TU1Nzc3Pr6+qmpqcrKysnJyYqKioyMjIODg5KSkpeXl1tbW+bm5uvr66ysrL+/v46Ojvz8/CMjI8TExMjIyIODg4GBgYaGhisrK4+Pj6CgoDw8PM/Pz6enp+Li4hsbG0xMTK2trYmJiYSEhICAgI6OjoiIiJqamq+vrykpKa2trVRUVNPT04ODg2FhYcPDwxkZGVpaWlhYWCkpKTExMSYmJp2dnY2NjSUlJSMjIzs7O0xMTJubm3l5eb+/v6urqyMjI0RERCgoKKenp3Jycqmpqa6urnh4eG1tbUxMTHFxcWhoaMzMzEBAQEBAQLe3t1ZWVpiYmEpKSqqqqm1tbXR0dJWVlWVlZSEhIWFhYSMjI5iYmJCQkKysrIuLi4CAgGtrazk5OWtra3x8fHl5eVBQUFFRURwcHLm5uYWFhS8vL2ZmZlVVVVFRUaampszMzDg4OHd3dzU1NUZGRtfX13V1dYqKisnJyXh4eLm5uXJyckVFRZeXl3Jycp+fnzs7OzIyMh4eHkhISERERIODg8TExCkpKTY2NoqKioyMjJ2dnYiIiIWFhWNjY09baWKUV+SEe0xGWUVXdUpKSkRERFdXV3V1dU5OTkBAQFlZWWlpaXFxcWtrayEhIUxMTGVlZW1tbT4+Ph4eHi0tLS8vL3h4eGFhYV5eXisrK3p6ehoaGjc3NzU1NTMzMyYmJnx8fH5+flJSUlBQUDw8PEJCQjo6OmNjY3Nzc1xcXCkpKR8fHzk5ORwcHDExMVRUVCQkJGBgYCgoKGdnZ29vb1VVVXt7e1paWtg57TgAAADLdFJOUwABB4yc/lkEhrdLgdaQOUCYBx8JEGETcbLBIC9doTRUUX0lehzdyK7OIZVHPBAQZh4oDRm8xfEWTi1EC6pqaOrm+trR7zErpnTfDf52bvf+9G9tpN8ZFTf+EKXt9v7i7cpjjzw/IEtwEf6AUO/ffxjk/t+g4LavR2vvr0BSL5aNv19w399hf19rv1ofJN+AyN9Qj8Bz0KjoD5+Pj+BwzqDPLJfP7u+QQk1g7zBQJmA7PUA+nzBAYDBf7p+/wNhfUN+urauFxs/+0H/4BcBv2gAABJ1JREFUWMPtlWdck1cUxjESA0gihIjILkUNIywpDWAFSwpFbCvTCgqCQilQqXuvKo66V7F7t3bvvecnQIMiiBiCoCEGVAgyxGrPue9LBmRcPrcPP76c+3v+9znn3vvGxuZ/mZVoQ+r3ry1vfXIMz9nZhcMbrfvw0XVarfbm462tAIidHeJ6f4jLKOxL1/WnpJzTai8AYQgw3d/flUdpL1OplvWfMwS4IiAgwI8G8cvy7m4EIOHCTZyBCwDAHxbgFx7uF2Jt+4KWlm4gLIMWdADswB8DhCd6ePhbDOH+ZlNTExBuqVRsglYWMB0DJCZ6POTtwbHgf+riRQAAQdWPPZAZOAOA7QD98wTeHPP+3l4CaIEppPQfLTjsLrKxGQMZQmCEjN9bIAie52zOf+VKLxvhVtlSkeEaLzaMAQiCgydMEJjMIPr1MgAYQlnqyPXZfqQB8McECUxN8oW2y0AgGQpEpnbghLH+mCCH6JHL7/W0tSECMqSaG1Ims3+Qg4M0c8QAMnp6ekiG7zaYP6bYYOKXSn2lw5vY2XHtGhAA8YGli1Icg9v7+vr4DGvCvQMAhJBq+aoW4vbgH+drfBIrGjsYxAprbyWa2EHGETIaQYDIcLcG4EnR7unpOc4wwi65vJEgvrX+XD8i9okVEwsNius7O+WgxgyaD4YPsYeGnjSocTtRcvkuGkB0BdpDZ1boe1hSXV1NEHtpABx0PwDSX6ZnuNWozh/pvpknwfwISH8O67lcgthJB/gUzJNAa3SVH7iMPqQDFE4imvOzrrKyCtzw/yUdoHgOo5m6ShWr+XQAzr2sDAD18FdVT/vLcw8rXaGeFS1gPCtd4TQr2hbsUOPt9ICV6Nac1uylA2TaMXpYV3lFA7qq0ZTSAV4fS2S3W1d59SpR3zt0gDV8Ph8J+fqrjO6+f/r20AF2BwYGAoP/uf4x9YEdRTXFYienQBR/n640/21019TUltAAFtva2joBZKxBbU8NqrZWRgPY4mWLclprUCsl9rt3u56gCJCU7eWFjMUGRYkM3ODvkkms+bM2zyAEry1G5RJ0dymVyiPWAGunTZvxXFJ2tle+UVkiI/aBgWYrTWx0cwMCIJKyjBdKutA+0Nx8fYkl/z57e3sGsXHYikSmJPbrDW9tMu//ZlUkS9icNXytVMn4GxoGzXbx7H2TJ0dGIsHt3ZGrR4b8Z+qeF5qyRxxbNBUJkME+38S65G/Wf6aubv82E9sfTBBPBUIkZEiPMLWD8NCQ//zt29u/NkpxIu24o2OCGCJghvQs0y0KDw0ODqIfAGdvnNp6oGgT3KsTwqI/f4vPnfIgQ4AM6eXmhiTcwQQ4D/4bpxSKS+3t6sdmLYjKi4vPTQZCghgz/FFu/piEO5gGzkIABNxRqxfOWjA3J67y6WQmgnhRermliyJ5kW2ABbQvxARROZXQA0ZIEB+LsHLXt+1nAQqF4g60gAmi8iqZHhxXfWX9uQoPYAdkBJfa1SwgLh56mHIwLYLqmyf8YvtQB2oY4qNzo2AI8bnHKe1EH69+3xCQl5P8e9Eo7ESfvbx660sI+OmvN9I+Ga37P6V/ARSAhtS32QauAAAAAElFTkSuQmCC) no-repeat 50% 50%;background-size:16px 16px;animation:1s linear infinite loading;transform-origin:center center;width:100%;height:100%;z-index:2;position:absolute;left:0;top:0;border-radius:5px}@keyframes loading{0%{transform:rotate(0)}to{transform:rotate(360deg)}}:is(.type__default,.type__destructive).isLoading:hover{cursor:not-allowed;border-color:var(--color-semantic-border-button-loading)}:is(.type__default,.type__destructive).isLoading .base__text{visibility:hidden}:is(.type__default,.type__destructive).isLoading .base__icon{visibility:hidden}.type__default.size__large{--padding-inline: 24px;column-gap:8px;min-height:32px;font-size:12px}.type__default.size__xLarge{--padding-inline: 40px;column-gap:8px;min-height:40px;font-size:12px}.size__width80{--padding-inline: 4px;width:80px}.size__width160{--padding-inline: 4px;width:160px}';
class wt extends Gt {
  #e = "";
  #i = new lt();
  /**
   * ボタンに表示するアイコン名
   * 指定しない場合はアイコンを表示しません
   *
   * @attribute
   * @type {string}
   */
  get icon() {
    return this.#e;
  }
  set icon(t) {
    !this.#e && t ? (this.#t(), this.#s(t)) : t === "" ? this.#o() : this.#s(t), this.#e = t;
  }
  static get observedAttributes() {
    return [...super.observedAttributes, "icon"];
  }
  constructor() {
    super(), this.shadowRoot.adoptedStyleSheets = [
      ...this.shadowRoot.adoptedStyleSheets,
      l(Et)
    ], this.#i.classList.add("base__icon"), this.#i.size = "small";
  }
  attributeChangedCallback(t, e, i) {
    if (e !== i)
      switch (super.attributeChangedCallback(t, e, i), t) {
        case "icon":
          this.icon = i;
          break;
      }
  }
  #t() {
    this.buttonElement.prepend(this.#i);
  }
  #o() {
    this.#i.remove();
  }
  #s(t) {
    this.#i.type = t;
  }
}
customElements.get("sp-button") || customElements.define("sp-button", wt);
const Kt = ":host{display:inline-block}.base:has(.input:focus-visible){outline:2px solid var(--color-semantic-text-regular);outline-offset:2px}.base:hover .checkmark:has(:not(.input:disabled)):before{background-color:var(--color-semantic-surface-regular-3)}.base:hover .checkmark:has(:is(.input:checked,.input:indeterminate)):has(:not(.input:disabled)):before{background-color:var(--color-semantic-surface-selected-hover);border-color:var(--color-semantic-border-selected-hover)}", dt = '.checkmark{flex-grow:0;flex-shrink:0;display:inline-flex;padding-block:4px;padding-inline:4px;cursor:pointer}.checkmark:before{content:"";display:inline-block;width:16px;height:16px;background:var(--color-semantic-surface-regular-1) 50% 50% no-repeat;border:1px solid var(--color-semantic-border-check-unchecked);border-radius:2px}.checkmark:has(.input:focus-visible):before{border-color:var(--color-semantic-border-focus);box-shadow:0 0 0 3px var(--color-semantic-highlight-focus-ring-default)}.checkmark:has(:is(.input:checked,.input:indeterminate)):before{background-color:var(--color-semantic-surface-selected);border-color:var(--color-semantic-border-selected)}.checkmark:has(.input:checked):before{background-image:url(data:image/svg+xml;charset=utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%228%22%20height%3D%227%22%20fill%3D%22none%22%3E%3Cpath%20stroke%3D%22%23fff%22%20stroke-width%3D%221.5%22%20d%3D%22m1%203%202%202%204-4%22%2F%3E%3C%2Fsvg%3E)}.checkmark:has(.input:indeterminate):before{background-image:url(data:image/svg+xml;charset=utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%228%22%20height%3D%222%22%20fill%3D%22none%22%3E%3Cpath%20fill%3D%22%23fff%22%20d%3D%22M0%200h8v2H0z%22%2F%3E%3C%2Fsvg%3E)}.checkmark:has(.input:disabled){cursor:not-allowed}.checkmark:has(:is(.input:disabled)):before{background-color:var(--color-semantic-surface-check-disabled);border-color:var(--color-semantic-border-regular)}.checkmark .input{position:absolute;z-index:-1;opacity:0}';
class $t extends Lt {
  constructor() {
    super(), this.shadowRoot.adoptedStyleSheets = [
      ...this.shadowRoot.adoptedStyleSheets,
      l(dt, Kt)
    ];
  }
}
customElements.get("sp-checkbox") || customElements.define("sp-checkbox", $t);
const te = ":host{display:block}.base{display:flex;align-items:flex-start;justify-content:flex-start;padding-block:1px;cursor:pointer}.base:has(input:disabled){cursor:not-allowed}.base:has(.input:focus-visible){outline:2px solid var(--color-semantic-text-regular);outline-offset:2px}.base:has(input):not(:has(input:disabled)):hover{background:var(--color-semantic-surface-regular-3)}.base:has(input:checked):not(:has(input:disabled)){background:var(--color-semantic-surface-checked)}.base:has(input:checked):not(:has(input:disabled)):hover{background:var(--color-semantic-surface-checked-hover)}.text{padding-block-start:2.5px;color:var(--color-semantic-text-regular);font-size:12px;line-height:1.6}.base:has(input:disabled) .text{color:var(--color-semantic-text-disabled)}";
class ee extends nt {
  constructor() {
    super(), this.shadowRoot.adoptedStyleSheets = [
      ...this.shadowRoot.adoptedStyleSheets,
      l(dt, te)
    ];
  }
}
customElements.get("sp-checkbox-list") || customElements.define("sp-checkbox-list", ee);
const ie = ":host{display:inline-block;max-width:100%}.base{display:inline-flex;align-items:flex-start;justify-content:flex-start;max-width:100%;cursor:pointer}.base:has(.input:focus-visible){outline:2px solid var(--color-semantic-text-regular);outline-offset:2px}.base:has(.input:disabled){cursor:not-allowed}.text{padding-block-start:2.5px;color:var(--color-semantic-text-regular);font-size:12px;line-height:1.6}.base:has(.input:disabled) .text{color:var(--color-semantic-text-disabled)}.base:hover .checkmark:has(:not(.input:disabled)):before{background-color:var(--color-semantic-surface-regular-3)}.base:hover .checkmark:has(:is(.input:checked,.input:indeterminate)):has(:not(.input:disabled)):before{background-color:var(--color-semantic-surface-selected-hover);border-color:var(--color-semantic-border-selected-hover)}";
class oe extends nt {
  constructor() {
    super(), this.shadowRoot.adoptedStyleSheets = [
      ...this.shadowRoot.adoptedStyleSheets,
      l(dt, ie)
    ];
  }
}
customElements.get("sp-checkbox-text") || customElements.define("sp-checkbox-text", oe);
const se = ".base{display:grid;grid-template-columns:160px 1fr;gap:16px 8px}";
class re extends HTMLElement {
  #e = document.createElement("dl");
  #i = document.createElement("slot");
  constructor() {
    super(), this.attachShadow({ mode: "open" });
  }
  connectedCallback() {
    this.shadowRoot.adoptedStyleSheets = [
      ...this.shadowRoot.adoptedStyleSheets,
      l(se)
    ], this.#e.classList.add("base"), this.#e.appendChild(this.#i), this.shadowRoot.appendChild(this.#e);
  }
}
customElements.get("sp-definition-list") || customElements.define("sp-definition-list", re);
const ae = ".base{padding:4.5px 0;color:var(--color-semantic-text-body-regular);font-size:12px;font-weight:400;line-height:1.6}";
class ne extends HTMLElement {
  #e = document.createElement("dd");
  constructor() {
    super(), this.attachShadow({ mode: "open" });
  }
  connectedCallback() {
    this.shadowRoot.adoptedStyleSheets = [
      ...this.shadowRoot.adoptedStyleSheets,
      l(ae)
    ], this.#e.classList.add("base"), this.#e.innerHTML = this.innerHTML, this.shadowRoot.appendChild(this.#e);
  }
}
customElements.get("sp-definition-list-dd") || customElements.define("sp-definition-list-dd", ne);
const ce = ".base{padding:4.5px 0;color:var(--color-semantic-text-body-regular);font-size:12px;font-weight:700;line-height:1.6}";
class le extends HTMLElement {
  #e = document.createElement("dt");
  constructor() {
    super(), this.attachShadow({ mode: "open" });
  }
  connectedCallback() {
    this.shadowRoot.adoptedStyleSheets = [
      ...this.shadowRoot.adoptedStyleSheets,
      l(ce)
    ], this.#e.classList.add("base"), this.#e.innerHTML = this.innerHTML, this.shadowRoot.appendChild(this.#e);
  }
}
customElements.get("sp-definition-list-dt") || customElements.define("sp-definition-list-dt", le);
const de = ".base{min-width:80px;width:100%;flex-direction:row-reverse}";
class he extends wt {
  constructor() {
    super(), this.shadowRoot.adoptedStyleSheets = [
      ...this.shadowRoot.adoptedStyleSheets,
      l(Et, de)
    ];
  }
  connectedCallback() {
    super.connectedCallback(), this.#e();
  }
  #e() {
    this.icon = "arrow_down";
  }
  setAriaHasPopup(t) {
    this.buttonElement.setAttribute("aria-haspopup", t);
  }
  setAriaExpanded(t) {
    this.buttonElement.setAttribute("aria-expanded", t);
  }
  setAriaControls(t) {
    this.buttonElement.setAttribute("aria-controls", t);
  }
}
customElements.get("sp-dropdown-action-button") || customElements.define("sp-dropdown-action-button", he);
const ue = ".action{display:block;width:100%;min-height:26px;padding-inline:8px;padding-block:3.5px;background:none;border:0;color:var(--color-semantic-text-regular);font-size:12px;text-align:left;line-height:1.6}.action:hover,.action:focus{background:var(--color-semantic-surface-regular-3)}.base{margin:0}";
class pe extends HTMLElement {
  constructor() {
    super(), this.attachShadow({ mode: "open" }), this.shadowRoot.adoptedStyleSheets = [
      ...this.shadowRoot.adoptedStyleSheets,
      l(ue)
    ];
  }
  connectedCallback() {
    const t = document.createElement("div"), e = document.createElement("button"), i = document.createElement("slot");
    this.#e(), this.#i(t, e), this.#t(t, e, i), this.shadowRoot.appendChild(t);
  }
  #e() {
    this.role = "menuitem";
  }
  #i(t, e) {
    t.classList.add("base"), e.classList.add("action");
  }
  #t(t, e, i) {
    e.appendChild(i), t.appendChild(e);
  }
}
customElements.get("sp-dropdown-action-item") || customElements.define("sp-dropdown-action-item", pe);
const me = ".base{position:relative}.menu{position:absolute;top:100%;left:0;margin-block-start:8px;padding-block:8px;background:var(--color-semantic-surface-regular-1);border:1px solid var(--color-semantic-border-regular);border-radius:5px;box-shadow:0 3px 12px 0 var(--color-semantic-elevation-regular)}.menu.position__left{left:0;right:auto}.menu.position__right{left:auto;right:0}", be = ["left", "right"];
function fe(o) {
  return be.some((t) => t === o);
}
function ge() {
  return `sp-dropdown-action-menu-${Math.random().toString(32).substring(2)}`;
}
class ve extends HTMLElement {
  #e = document.createElement("div");
  #i = document.createElement("sp-dropdown-action-button");
  #t = document.createElement("div");
  #o = document.createElement("slot");
  #s = [];
  #r = ge();
  #a = !1;
  #n = !1;
  #l = "left";
  #c = this.#w.bind(this);
  /**
   * ドロップダウンボタンのラベルテキスト
   *
   * @attribute
   * @type {string}
   */
  set label(t) {
    this.#i.textContent = t, this.#p();
  }
  /**
   * ドロップダウンメニューの開閉状態
   *
   * @attribute
   * @type {boolean}
   * @default false
   */
  get open() {
    return this.#a;
  }
  set open(t) {
    this.#a = t, t ? this.#i.setAttribute("selected", "") : this.#i.removeAttribute("selected"), this.#E();
  }
  /**
   * ドロップダウンの無効状態
   *
   * @attribute
   * @type {boolean}
   * @default false
   */
  get disabled() {
    return this.#n;
  }
  set disabled(t) {
    this.#n = t, this.#i.disabled = t, this.#E();
  }
  /**
   * ドロップダウンメニューの表示位置（"left" または "right"）
   * - "left": 左寄せ
   * - "right": 右寄せ
   *
   * @attribute
   * @type {"left"|"right"}
   * @default "left"
   */
  get position() {
    return this.#l;
  }
  set position(t) {
    t === "left" ? (this.#t.classList.add("position__left"), this.#t.classList.remove("position__right")) : (this.#t.classList.add("position__right"), this.#t.classList.remove("position__left")), this.#l = t;
  }
  static get observedAttributes() {
    return ["label", "open", "disabled", "position"];
  }
  constructor() {
    super(), this.attachShadow({ mode: "open" }), this.shadowRoot.adoptedStyleSheets = [
      ...this.shadowRoot.adoptedStyleSheets,
      l(me)
    ], this.open = !1, this.disabled = !1, this.position = "left";
  }
  connectedCallback() {
    this.#d(), this.#h(), this.#u(), this.#x(), this.shadowRoot.appendChild(this.#e), this.#L(), this.#p();
  }
  #d() {
    this.#i.setAttribute("part", "button"), this.#i.addEventListener(
      "click",
      this.#b.bind(this)
    );
  }
  #h() {
    this.#t.classList.add("menu"), this.#t.role = "menu", this.#t.appendChild(this.#o);
  }
  #u() {
    this.#e.appendChild(this.#i), this.#e.appendChild(this.#t), this.#e.classList.add("base");
  }
  #x() {
    this.#o.addEventListener(
      "slotchange",
      this.#f.bind(this)
    ), window.addEventListener("click", this.#c);
  }
  #L() {
    this.#i.setAriaHasPopup("true"), this.#i.setAriaControls(this.#r), this.#t.setAttribute("id", this.#r), this.#v();
  }
  #p() {
    const t = this.#i.offsetWidth;
    this.#t.style.minWidth = `${t}px`;
  }
  disconnectedCallback() {
    this.#s.forEach((t) => {
      t.removeEventListener(
        "click",
        this.#g.bind(this)
      );
    }), this.#o.removeEventListener(
      "slotchange",
      this.#f.bind(this)
    ), window.removeEventListener("click", this.#c);
  }
  attributeChangedCallback(t, e, i) {
    e !== i && (t === "label" && this.#m(i), t === "open" && this.#C(i), t === "disabled" && this.#k(i), t === "position" && this.#y(i));
  }
  #m(t) {
    this.label = t;
  }
  #C(t) {
    this.open = t === "true" || t === "";
  }
  #k(t) {
    this.disabled = t === "true" || t === "";
  }
  #y(t) {
    fe(t) ? this.position = t : (console.warn(`${t}は無効なposition属性です。`), this.position = "left");
  }
  #b(t) {
    t.stopPropagation(), this.open = !this.open, this.#v();
  }
  #f() {
    this.#s = this.#o.assignedElements().filter((t) => t instanceof HTMLElement), this.#s.forEach((t) => {
      t.addEventListener("click", this.#g.bind(this));
    });
  }
  #g(t) {
    t.stopPropagation(), this.open = !1, this.#v();
  }
  #w(t) {
    t.stopPropagation(), this.contains(t.target) || (this.open = !1, this.#v());
  }
  #E() {
    this.#t.style.display = this.open && !this.disabled ? "block" : "none";
  }
  #v() {
    this.#i.setAriaExpanded(this.open ? "true" : "false");
  }
}
customElements.get("sp-dropdown-action") || customElements.define("sp-dropdown-action", ve);
const xe = ".base{position:relative}.dialog{position:absolute;z-index:1;min-width:560px;margin-block-start:8px;padding:24px;background:var(--color-semantic-surface-regular-1);border:1px solid var(--color-semantic-border-semi-weak);border-radius:5px;box-shadow:0 3px 12px 0 var(--color-semantic-elevation-regular);font-size:12px;line-height:1.6}.dialog.position__left{left:0;right:auto}.dialog.position__right{left:auto;right:0}", Le = ["left", "right"];
function Ce(o) {
  return Le.some((t) => t === o);
}
class ke extends HTMLElement {
  #e = document.createElement("div");
  #i = document.createElement("sp-button");
  #t = document.createElement("div");
  #o = document.createElement("slot");
  #s = !1;
  #r = !1;
  #a = "left";
  #n = this.#c.bind(this);
  /**
   * ドロップダウンボタンのラベルテキスト
   *
   * @attribute
   * @type {string}
   */
  set label(t) {
    this.#i.textContent = t;
  }
  /**
   * ドロップダウンダイアログの開閉状態
   *
   * @attribute
   * @type {boolean}
   * @default false
   */
  get open() {
    return this.#s;
  }
  set open(t) {
    this.#s = t, t ? this.#i.setAttribute("selected", "") : this.#i.removeAttribute("selected"), this.#d();
  }
  /**
   * ドロップダウンの無効状態
   *
   * @attribute
   * @type {boolean}
   * @default false
   */
  get disabled() {
    return this.#r;
  }
  set disabled(t) {
    this.#r = t, this.#i.disabled = t, this.#d();
  }
  /**
   * ドロップダウンダイアログの表示位置（"left" または "right"）
   * - "left": 左寄せ
   * - "right": 右寄せ
   *
   * @attribute
   * @type {"left"|"right"}
   * @default "left"
   */
  get position() {
    return this.#a;
  }
  set position(t) {
    t === "left" ? (this.#t.classList.add("position__left"), this.#t.classList.remove("position__right")) : (this.#t.classList.add("position__right"), this.#t.classList.remove("position__left")), this.#a = t;
  }
  static get observedAttributes() {
    return ["label", "open", "disabled", "position"];
  }
  constructor() {
    super(), this.attachShadow({ mode: "open" }), this.shadowRoot.adoptedStyleSheets = [
      ...this.shadowRoot.adoptedStyleSheets,
      l(xe)
    ], this.open = !1, this.disabled = !1, this.position = "left";
  }
  connectedCallback() {
    this.#i.setAttribute("part", "button"), this.#i.addEventListener(
      "click",
      this.#l.bind(this)
    ), this.#e.appendChild(this.#i), this.#t.classList.add("dialog"), this.#t.role = "dialog", this.#t.appendChild(this.#o), window.addEventListener("click", this.#n), this.#e.appendChild(this.#t), this.#e.classList.add("base"), this.shadowRoot.appendChild(this.#e);
  }
  disconnectedCallback() {
    window.removeEventListener("click", this.#n);
  }
  attributeChangedCallback(t, e, i) {
    if (e !== i)
      switch (t) {
        case "label":
          this.label = i;
          break;
        case "open":
          this.open = i === "true" || i === "";
          break;
        case "disabled":
          this.disabled = i === "true" || i === "";
          break;
        case "position":
          Ce(i) ? this.position = i : (console.warn(`${i}は無効なposition属性です。`), this.position = "left");
      }
  }
  #l(t) {
    t.stopPropagation(), this.open = !this.open;
  }
  #c(t) {
    t.stopPropagation(), this.contains(t.target) || (this.open = !1);
  }
  #d() {
    this.#t.style.display = this.open && !this.disabled ? "block" : "none";
  }
}
customElements.get("sp-dropdown-dialog") || customElements.define("sp-dropdown-dialog", ke);
const ye = ':host{display:block}.container{display:flex;justify-content:space-between;align-items:center;gap:16px}.main{display:flex;align-items:center;gap:16px}.heading{display:flex;align-items:center;gap:8px}.text-links{display:flex;flex-shrink:0;align-items:center;gap:16px}.buttons{display:flex;flex-shrink:0;align-items:center;gap:8px}h3{margin-block:3px;padding-inline-start:8px;font-size:14px;font-weight:700;line-height:1.6;position:relative}h3:before{content:"";position:absolute;left:0;top:50%;transform:translateY(-50%);width:2px;height:calc(100% - 2.4px);background-color:var(--color-semantic-surface-regular-6)}';
class Ee extends HTMLElement {
  #e = document.createElement("h3");
  #i = document.createElement("slot");
  #t = document.createElement("slot");
  constructor() {
    super(), this.attachShadow({ mode: "open" }), this.shadowRoot.adoptedStyleSheets = [
      ...this.shadowRoot.adoptedStyleSheets,
      l(ye)
    ], this.#i.name = "text-links", this.#t.name = "buttons";
  }
  connectedCallback() {
    this.shadowRoot.appendChild(this.#o()), this.#i.assignedElements().length === 0 && this.shadowRoot.querySelector(".text-links")?.remove(), this.#t.assignedElements().length === 0 && this.shadowRoot.querySelector(".buttons")?.remove();
  }
  #o() {
    const t = document.createElement("div");
    return t.classList.add("container"), t.appendChild(this.#s()), t.appendChild(this.#n()), t;
  }
  #s() {
    const t = document.createElement("div");
    return t.classList.add("main"), t.appendChild(this.#r()), t.appendChild(this.#a()), t;
  }
  #r() {
    const t = document.createElement("slot");
    this.#e.appendChild(t);
    const e = document.createElement("div");
    return e.classList.add("heading"), e.appendChild(this.#e), e;
  }
  #a() {
    const t = document.createElement("div");
    return t.classList.add("text-links"), t.appendChild(this.#i), t;
  }
  #n() {
    const t = document.createElement("div");
    return t.classList.add("buttons"), t.appendChild(this.#t), t;
  }
}
customElements.get("sp-element-title") || customElements.define("sp-element-title", Ee);
const we = ".label{display:inline-block;cursor:default;font-size:12px;font-weight:700;line-height:1.6;color:var(--color-semantic-text-regular);padding-block:5px 4px}.required{color:var(--color-semantic-text-required);margin-inline-start:4px}";
class He extends HTMLElement {
  #e = document.createElement("label");
  #i = document.createElement("slot");
  #t = document.createElement("span");
  #o = !1;
  static get observedAttributes() {
    return ["required"];
  }
  get required() {
    return this.#o;
  }
  set required(t) {
    t !== this.#o && (this.#o = t, this.#r());
  }
  constructor() {
    super(), this.attachShadow({ mode: "open" }), this.shadowRoot.adoptedStyleSheets = [
      ...this.shadowRoot.adoptedStyleSheets,
      l(we)
    ], this.#s();
  }
  #s() {
    this.#e.classList.add("label"), this.#e.appendChild(this.#i), this.#t.classList.add("required"), this.#t.textContent = "*", this.#t.setAttribute("aria-hidden", "true");
  }
  connectedCallback() {
    this.shadowRoot.appendChild(this.#e);
  }
  attributeChangedCallback(t, e, i) {
    e !== i && t === "required" && (this.required = i === "" || i === "true");
  }
  #r() {
    this.#o ? this.#e.appendChild(this.#t) : this.#t.remove();
  }
}
customElements.get("sp-label") || customElements.define("sp-label", He);
const _e = ".base{color:var(--color-semantic-text-error);font-size:12px;font-weight:700;line-height:1.6}";
class Se extends HTMLElement {
  #e = document.createElement("div");
  #i = document.createElement("slot");
  static get observedAttributes() {
    return ["id"];
  }
  constructor() {
    super(), this.attachShadow({ mode: "open" }), this.shadowRoot.adoptedStyleSheets = [
      ...this.shadowRoot.adoptedStyleSheets,
      l(_e)
    ], this.#t();
  }
  #t() {
    this.#e.classList.add("base"), this.#e.setAttribute("role", "alert"), this.#e.appendChild(this.#i);
  }
  connectedCallback() {
    this.shadowRoot.appendChild(this.#e);
  }
  attributeChangedCallback(t, e, i) {
    e !== i && t === "id" && this.#o(i);
  }
  #o(t) {
    t ? this.#e.setAttribute("id", t) : this.#e.removeAttribute("id");
  }
}
customElements.get("sp-error-text") || customElements.define("sp-error-text", Se);
const Ae = ".base{display:inline-block;font-size:12px;font-weight:400;line-height:1.6;color:var(--color-semantic-text-weak)}.current-count.limit-reached{color:var(--color-semantic-text-regular);font-weight:700}.current-count.limit-exceeded{color:var(--color-semantic-text-error);font-weight:700}";
class Ve extends HTMLElement {
  #e = document.createElement("div");
  #i = document.createElement("span");
  #t = document.createElement("span");
  #o = document.createElement("span");
  static get observedAttributes() {
    return ["current", "max"];
  }
  get current() {
    return Number(this.getAttribute("current")) || 0;
  }
  set current(t) {
    this.setAttribute("current", String(t));
  }
  get max() {
    return Number(this.getAttribute("max")) || 0;
  }
  set max(t) {
    this.setAttribute("max", String(t));
  }
  constructor() {
    super(), this.attachShadow({ mode: "open" }), this.shadowRoot.adoptedStyleSheets = [
      ...this.shadowRoot.adoptedStyleSheets,
      l(Ae)
    ], this.#s();
  }
  #s() {
    this.#e.classList.add("base"), this.#i.classList.add("current-count"), this.#t.classList.add("separator"), this.#t.textContent = "/", this.#o.classList.add("max-count"), this.#e.appendChild(this.#i), this.#e.appendChild(this.#t), this.#e.appendChild(this.#o), this.shadowRoot.appendChild(this.#e);
  }
  connectedCallback() {
    this.#r("current"), this.#r("max"), this.#n(), this.#l(), this.#c();
  }
  #r(t) {
    const e = this.getAttribute(t);
    this.#a(e) || this.setAttribute(t, "0");
  }
  #a(t) {
    if (t === null) return !0;
    const e = Number(t);
    return !isNaN(e) && e >= 0;
  }
  attributeChangedCallback(t, e, i) {
    if (e !== i) {
      if (t === "current") {
        if (!this.#a(i))
          return;
        this.#n(), this.#c();
      } else if (t === "max") {
        if (!this.#a(i))
          return;
        this.#l(), this.#c();
      }
    }
  }
  #n() {
    this.#i.textContent = String(this.current).padStart(2, "0");
  }
  #l() {
    this.#o.textContent = String(this.max).padStart(2, "0");
  }
  #c() {
    this.#i.classList.remove("limit-reached", "limit-exceeded"), this.current === this.max ? this.#i.classList.add("limit-reached") : this.current > this.max && this.#i.classList.add("limit-exceeded");
  }
}
customElements.get("sp-character-counter") || customElements.define("sp-character-counter", Ve);
const Me = ".text-field{display:block;width:100%;background-color:var(--color-semantic-surface-regular-1);border:1px solid var(--color-semantic-border-regular);border-radius:2px;padding-inline:8px;padding-block:4px 3px;font-size:12px;font-weight:400;line-height:1.6}.text-field::placeholder{color:var(--color-semantic-text-placeholder)}.text-field:focus-visible{outline:none;border-color:var(--color-semantic-border-focus);box-shadow:0 0 0 3px var(--color-semantic-highlight-focus-ring-default)}.text-field:disabled{color:var(--color-semantic-text-disabled);background:var(--color-semantic-surface-regular-4)}.text-field[aria-invalid=true]{border-color:var(--color-semantic-border-error)}.text-field[aria-invalid=true]:focus-visible{box-shadow:0 0 0 3px var(--color-semantic-highlight-focus-ring-error)}.wrapper{display:flex}.wrapper[data-orientation=vertical]{flex-direction:column}.wrapper[data-orientation=horizontal]{gap:8px}.wrapper[data-orientation=horizontal] .label-wrapper{flex-shrink:0;width:160px}.container{position:relative;display:block;width:100%}.info{display:flex;align-items:flex-start;justify-content:space-between;gap:8px}.info>*{margin-block-start:4px}.info sp-error-text{display:block}.info sp-error-text:not(:last-of-type){margin-block-end:2px}.info .error-container{flex:1;display:none;flex-direction:column}.info .character-counter{margin-inline-start:auto}";
var E, c, S, A, m, C, g, w, v, a, Ht, _t, St, D, M, At, Vt, Mt, rt, Zt, Rt, U, zt, Q, at;
const X = class X extends HTMLElement {
  constructor() {
    super();
    x(this, a);
    x(this, E, document.createElement("div"));
    x(this, c, document.createElement("input"));
    x(this, S, document.createElement("div"));
    x(this, A, document.createElement("slot"));
    x(this, m, document.createElement("div"));
    x(this, C, document.createElement(
      "sp-character-counter"
    ));
    x(this, g, null);
    x(this, w, null);
    x(this, v);
    this.attachShadow({ mode: "open" }), this.shadowRoot.adoptedStyleSheets = [
      ...this.shadowRoot.adoptedStyleSheets,
      l(Me)
    ], this.internals = this.attachInternals(), n(this, a, Ht).call(this), n(this, a, _t).call(this), n(this, a, St).call(this), n(this, a, At).call(this), n(this, a, Vt).call(this), n(this, a, U).call(this), n(this, a, Q).call(this), n(this, a, at).call(this);
  }
  get value() {
    return s(this, c).value;
  }
  set value(e) {
    s(this, c).value = e, this.internals.setFormValue(e), n(this, a, M).call(this);
  }
  get name() {
    return s(this, c).name;
  }
  set name(e) {
    this.setAttribute("name", e), s(this, c).name = e;
  }
  get disabled() {
    return s(this, c).disabled;
  }
  set disabled(e) {
    e ? this.setAttribute("disabled", "") : this.removeAttribute("disabled"), s(this, c).disabled = e;
  }
  get required() {
    return s(this, c).required;
  }
  set required(e) {
    e ? this.setAttribute("required", "") : this.removeAttribute("required"), s(this, c).required = e;
  }
  get characterLimit() {
    return s(this, v);
  }
  set characterLimit(e) {
    _(this, v, e), e === void 0 ? this.removeAttribute("character-limit") : this.setAttribute("character-limit", String(e)), n(this, a, M).call(this), n(this, a, D).call(this);
  }
  get placeholder() {
    return s(this, c).placeholder;
  }
  set placeholder(e) {
    this.setAttribute("placeholder", e), s(this, c).placeholder = e;
  }
  get type() {
    return s(this, c).type;
  }
  set type(e) {
    this.setAttribute("type", e), s(this, c).type = e;
  }
  get autocomplete() {
    return s(this, c).autocomplete;
  }
  set autocomplete(e) {
    this.setAttribute("autocomplete", e), s(this, c).setAttribute("autocomplete", e);
  }
  get label() {
    return this.getAttribute("label") || "";
  }
  set label(e) {
    e ? this.setAttribute("label", e) : this.removeAttribute("label"), n(this, a, U).call(this);
  }
  get orientation() {
    return this.getAttribute("orientation") === "horizontal" ? "horizontal" : "vertical";
  }
  set orientation(e) {
    e === "horizontal" || e === "vertical" ? this.setAttribute("orientation", e) : this.removeAttribute("orientation"), n(this, a, Q).call(this);
  }
  static get observedAttributes() {
    return [
      "value",
      "placeholder",
      "disabled",
      "character-limit",
      "name",
      "required",
      "type",
      "autocomplete",
      "label",
      "orientation"
    ];
  }
  attributeChangedCallback(e, i, r) {
    if (i !== r)
      if (e === "value")
        this.value = r || "";
      else if (e === "placeholder")
        this.placeholder = r || "";
      else if (e === "disabled")
        this.disabled = r === "" || r === "true";
      else if (e === "character-limit") {
        if (!r)
          _(this, v, void 0);
        else {
          const h = parseInt(r);
          if (h <= 0) {
            console.error(
              `Invalid character-limit: ${h}. Must be greater than 0.`
            );
            return;
          }
          _(this, v, h);
        }
        n(this, a, M).call(this), n(this, a, D).call(this);
      } else e === "name" ? this.name = r || "" : e === "required" ? (this.required = r === "" || r === "true", n(this, a, U).call(this)) : e === "type" ? this.type = r || "text" : e === "autocomplete" ? this.autocomplete = r || "" : e === "label" ? n(this, a, U).call(this) : e === "orientation" && n(this, a, Q).call(this);
  }
  connectedCallback() {
    this.setAttribute("role", "group");
    for (const e of X.observedAttributes) {
      const i = this.getAttribute(e);
      i !== null && this.attributeChangedCallback(e, "", i);
    }
    n(this, a, D).call(this);
  }
};
E = new WeakMap(), c = new WeakMap(), S = new WeakMap(), A = new WeakMap(), m = new WeakMap(), C = new WeakMap(), g = new WeakMap(), w = new WeakMap(), v = new WeakMap(), a = new WeakSet(), Ht = function() {
  s(this, A).name = "error-text", s(this, m).classList.add("error-container"), s(this, m).setAttribute("role", "alert"), s(this, m).setAttribute("aria-live", "polite"), s(this, m).id = n(this, a, Mt).call(this), s(this, m).appendChild(s(this, A));
}, _t = function() {
  s(this, c).classList.add("text-field"), s(this, c).type = "text", s(this, c).setAttribute(
    "aria-describedby",
    s(this, m).id
  ), s(this, E).classList.add("wrapper"), s(this, S).classList.add("container"), s(this, S).appendChild(s(this, c)), s(this, E).appendChild(s(this, S)), this.shadowRoot.appendChild(s(this, E));
}, St = function() {
  s(this, C).classList.add("character-counter");
  const e = document.createElement("div");
  e.classList.add("info"), e.appendChild(s(this, m)), e.appendChild(s(this, C)), s(this, E).appendChild(e), n(this, a, D).call(this);
}, D = function() {
  if (!s(this, C)) return;
  s(this, v) !== void 0 && s(this, v) > 0 ? (s(this, C).style.display = "inline-block", n(this, a, M).call(this)) : s(this, C).style.display = "none";
}, M = function() {
  if (!s(this, C) || s(this, v) === void 0 || s(this, v) <= 0)
    return;
  const e = this.value.length, i = s(this, v);
  s(this, C).setAttribute("current", String(e)), s(this, C).setAttribute("max", String(i));
}, At = function() {
  s(this, c).addEventListener("input", (e) => {
    const i = new Event("input", {
      bubbles: e.bubbles,
      cancelable: e.cancelable
    });
    this.dispatchEvent(i);
  }), s(this, c).addEventListener("input", () => {
    this.value = s(this, c).value, n(this, a, M).call(this);
  });
}, Vt = function() {
  s(this, A).addEventListener("slotchange", () => {
    n(this, a, rt).call(this);
  }), n(this, a, rt).call(this);
}, Mt = function() {
  return `error-${Math.random().toString(36).substring(2, 11)}`;
}, rt = function() {
  s(this, A).assignedElements().length > 0 ? (s(this, c).setAttribute("aria-invalid", "true"), n(this, a, Zt).call(this)) : (s(this, c).removeAttribute("aria-invalid"), n(this, a, Rt).call(this));
}, Zt = function() {
  s(this, m) && (s(this, m).style.display = "flex");
}, Rt = function() {
  s(this, m) && (s(this, m).style.display = "none");
}, U = function() {
  const e = this.getAttribute("label");
  e ? (s(this, g) || (_(this, w, document.createElement("div")), s(this, w).classList.add("label-wrapper"), _(this, g, document.createElement("sp-label")), s(this, w).appendChild(s(this, g)), s(this, E) && s(this, S) && s(this, E).insertBefore(s(this, w), s(this, S)), n(this, a, zt).call(this)), s(this, g).textContent = e, s(this, c).setAttribute("aria-label", e), this.required ? s(this, g).setAttribute("required", "") : s(this, g).removeAttribute("required")) : s(this, w) && (s(this, c).removeAttribute("aria-label"), s(this, w).remove(), _(this, w, null), _(this, g, null)), n(this, a, at).call(this);
}, zt = function() {
  s(this, g) && s(this, g).addEventListener("click", (e) => {
    this.disabled || e.defaultPrevented || s(this, c).focus();
  });
}, Q = function() {
  const e = this.orientation;
  s(this, E).setAttribute("data-orientation", e);
}, at = function() {
  const e = this.label;
  e ? this.setAttribute("aria-label", e) : this.removeAttribute("aria-label");
}, X.formAssociated = !0;
let st = X;
customElements.get("sp-text-field") || customElements.define("sp-text-field", st);
const Ze = ".base{display:flex;justify-content:space-between;border:1px solid;border-radius:5px;padding-block:8px;padding-inline:16px;box-shadow:0 3px 12px 0 var(--color-semantic-elevation-regular)}.body{display:flex}.icon{margin-inline-end:8px;display:inline-block;flex-shrink:0;width:24px;height:24px}.base.type__error{border-color:var(--color-semantic-border-error);background-color:var(--color-semantic-surface-error-1)}.base.type__information{border-color:var(--color-semantic-border-information);background-color:var(--color-semantic-surface-information-1)}.base.type__success{border-color:var(--color-semantic-border-success);background-color:var(--color-semantic-surface-success-1)}.base.type__warning{border-color:var(--color-semantic-border-warning);background-color:var(--color-semantic-surface-warning-1)}.content{font-size:12px;line-height:1.6;padding-block:2.5px;color:var(--color-semantic-text-regular)}.action{padding-inline-start:16px;margin-block:auto;flex-shrink:0}.close{border-radius:100%;display:flex;align-items:center;justify-content:center}.base.type__error .close:hover{background-color:var(--color-semantic-surface-error-3)}.base.type__information .close:hover{background-color:var(--color-semantic-surface-information-3)}.base.type__success .close:hover{background-color:var(--color-semantic-surface-success-3)}.base.type__warning .close:hover{background-color:var(--color-semantic-surface-warning-3)}", Re = ["error", "warning", "information", "success"];
function ze(o) {
  return Re.some((t) => t === o);
}
const bt = {
  error: "type__error",
  warning: "type__warning",
  information: "type__information",
  success: "type__success"
}, ft = {
  error: '<path fill-rule="evenodd" clip-rule="evenodd" d="M2.58 18.8574L11.3416 3.99902H12.6459L21.4075 18.8574L20.7554 19.999H3.23212L2.58 18.8574ZM11.2 9.5V14.5H12.8V9.5H11.2ZM11.2 16V17.5H12.8V16H11.2Z" fill="#CA3232"></path>',
  information: '<path fill-rule="evenodd" clip-rule="evenodd" d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21ZM11.2 7.71997V9.49997H12.8V7.71997H11.2ZM10.5 16.2V16.72H13.5V16.2L12.8 16V11H10.5V11.8L11.2 12V16L10.5 16.2Z" fill="#3978BF"></path>',
  success: '<path fill-rule="evenodd" clip-rule="evenodd" d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21ZM15.5303 10.5303L14.4697 9.46967L11 12.9393L9.53033 11.4697L8.46967 12.5303L10.4697 14.5303L11 15.0607L11.5303 14.5303L15.5303 10.5303Z" fill="#1A7037"></path>',
  warning: '<path fill-rule="evenodd" clip-rule="evenodd" d="M2.58 18.8574L11.3416 3.99902H12.6459L21.4075 18.8574L20.7554 19.999H3.23212L2.58 18.8574ZM11.2 9.5V14.5H12.8V9.5H11.2ZM11.2 16V17.5H12.8V16H11.2Z" fill="#EAB100"></path>'
}, Te = {
  error: "エラー",
  warning: "警告",
  information: "情報",
  success: "成功"
};
class Be extends HTMLElement {
  #e = "information";
  #i = document.createElement("div");
  #t = document.createElement("div");
  #o = document.createElement("div");
  #s = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  /**
   * 通知の種類（"error"、"warning"、"information"、または "success"）
   * - "error": エラーメッセージ
   * - "warning": 警告メッセージ
   * - "information": 情報メッセージ
   * - "success": 成功メッセージ
   *
   * @attribute
   * @type {"error"|"warning"|"information"|"success"}
   * @default "information"
   */
  get type() {
    return this.#e;
  }
  set type(t) {
    this.#i.classList.remove(bt[this.#e]), this.#i.classList.add(bt[t]), this.#s.innerHTML = ft[t], this.#e = t;
  }
  static get observedAttributes() {
    return ["type"];
  }
  constructor() {
    super(), this.attachShadow({ mode: "open" }), this.shadowRoot.adoptedStyleSheets = [
      ...this.shadowRoot.adoptedStyleSheets,
      l(Ze)
    ], this.type = "information";
  }
  connectedCallback() {
    this.#r(), this.#a(), this.#n();
    const t = this.#l();
    this.#c(t), this.#d(), this.#h(), this.shadowRoot.appendChild(this.#i);
  }
  #r() {
    this.#i.classList.add("base");
  }
  #a() {
    this.#t.classList.add("body"), this.#t.setAttribute("role", "alert");
  }
  #n() {
    this.#s.setAttribute("role", "img"), this.#s.setAttribute("viewBox", "0 0 24 24"), this.#s.setAttribute("aria-hidden", "false"), this.#s.setAttribute("aria-label", Te[this.type]), this.#s.classList.add("icon"), this.#s.innerHTML = ft[this.type];
  }
  #l() {
    const t = document.createElement("div");
    t.classList.add("content");
    const e = document.createElement("slot");
    return t.appendChild(e), t;
  }
  #c(t) {
    this.#t.appendChild(this.#s), this.#t.appendChild(t);
  }
  #d() {
    this.#o.classList.add("action");
    const t = new lt();
    t.type = "close", t.setAttribute("aria-hidden", "true");
    const e = document.createElement("button");
    e.classList.add("close"), e.setAttribute("aria-label", "閉じる"), e.addEventListener("click", () => {
      this.dispatchEvent(new CustomEvent("close"));
    }), e.appendChild(t), this.#o.appendChild(e);
  }
  #h() {
    this.#i.appendChild(this.#t), this.#i.appendChild(this.#o);
  }
  attributeChangedCallback(t, e, i) {
    e !== i && t === "type" && this.#u(i);
  }
  #u(t) {
    ze(t) ? this.type = t : (console.warn(`${t}は無効なtype属性です。`), this.type = "information");
  }
}
customElements.get("sp-notification-bar") || customElements.define("sp-notification-bar", Be);
const Pe = ".base{display:flex;gap:8px;border:1px solid;border-radius:5px;padding-block:8px;padding-inline:16px}.icon{display:inline-block;flex-shrink:0;width:24px;height:24px}.base.type__error{border-color:var(--color-semantic-border-error);background-color:var(--color-semantic-surface-error-1)}.base.type__information{border-color:var(--color-semantic-border-information);background-color:var(--color-semantic-surface-information-1)}.base.type__success{border-color:var(--color-semantic-border-success);background-color:var(--color-semantic-surface-success-1)}.base.type__warning{border-color:var(--color-semantic-border-warning);background-color:var(--color-semantic-surface-warning-1)}.content{font-size:12px;line-height:1.6;padding-block:2.5px;color:var(--color-semantic-text-regular)}", Ie = ["error", "warning", "information", "success"];
function De(o) {
  return Ie.some((t) => t === o);
}
const Ue = {
  error: "エラー",
  warning: "警告",
  information: "情報",
  success: "成功"
}, gt = {
  error: "type__error",
  warning: "type__warning",
  information: "type__information",
  success: "type__success"
}, vt = {
  error: '<path fill-rule="evenodd" clip-rule="evenodd" d="M2.58 18.8574L11.3416 3.99902H12.6459L21.4075 18.8574L20.7554 19.999H3.23212L2.58 18.8574ZM11.2 9.5V14.5H12.8V9.5H11.2ZM11.2 16V17.5H12.8V16H11.2Z" fill="#CA3232"></path>',
  information: '<path fill-rule="evenodd" clip-rule="evenodd" d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21ZM11.2 7.71997V9.49997H12.8V7.71997H11.2ZM10.5 16.2V16.72H13.5V16.2L12.8 16V11H10.5V11.8L11.2 12V16L10.5 16.2Z" fill="#3978BF"></path>',
  success: '<path fill-rule="evenodd" clip-rule="evenodd" d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21ZM15.5303 10.5303L14.4697 9.46967L11 12.9393L9.53033 11.4697L8.46967 12.5303L10.4697 14.5303L11 15.0607L11.5303 14.5303L15.5303 10.5303Z" fill="#1A7037"></path>',
  warning: '<path fill-rule="evenodd" clip-rule="evenodd" d="M2.58 18.8574L11.3416 3.99902H12.6459L21.4075 18.8574L20.7554 19.999H3.23212L2.58 18.8574ZM11.2 9.5V14.5H12.8V9.5H11.2ZM11.2 16V17.5H12.8V16H11.2Z" fill="#EAB100"></path>'
};
class qe extends HTMLElement {
  #e = "information";
  #i = document.createElement("div");
  #t = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  /**
   * 通知の種類（"error"、"warning"、"information"、または "success"）
   * - "error": エラーメッセージ
   * - "warning": 警告メッセージ
   * - "information": 情報メッセージ
   * - "success": 成功メッセージ
   *
   * @attribute
   * @type {"error"|"warning"|"information"|"success"}
   * @default "information"
   */
  get type() {
    return this.#e;
  }
  set type(t) {
    this.#i.classList.remove(gt[this.#e]), this.#i.classList.add(gt[t]), this.#t.innerHTML = vt[t], this.#e = t;
  }
  static get observedAttributes() {
    return ["type"];
  }
  constructor() {
    super(), this.attachShadow({ mode: "open" }), this.shadowRoot.adoptedStyleSheets = [
      ...this.shadowRoot.adoptedStyleSheets,
      l(Pe)
    ], this.type = "information";
  }
  connectedCallback() {
    this.#o(), this.#s();
    const t = this.#r();
    this.#a(t), this.shadowRoot.appendChild(this.#i);
  }
  #o() {
    this.#i.classList.add("base");
  }
  #s() {
    this.#t.setAttribute("role", "img"), this.#t.setAttribute("viewBox", "0 0 24 24"), this.#t.setAttribute("aria-hidden", "false"), this.#t.setAttribute("aria-label", Ue[this.type]), this.#t.classList.add("icon"), this.#t.innerHTML = vt[this.type];
  }
  #r() {
    const t = document.createElement("div");
    t.classList.add("content");
    const e = document.createElement("slot");
    return t.appendChild(e), t;
  }
  #a(t) {
    this.#i.appendChild(this.#t), this.#i.appendChild(t);
  }
  attributeChangedCallback(t, e, i) {
    e !== i && t === "type" && this.#n(i);
  }
  #n(t) {
    De(t) ? this.type = t : (console.warn(`${t}は無効なtype属性です。`), this.type = "information");
  }
}
customElements.get("sp-notification-message") || customElements.define("sp-notification-message", qe);
const Ge = ".page-group{display:inline-flex}.page,.previous,.next,.first,.last{display:grid;place-content:center;border-radius:2px;padding-block:.5px;color:var(--color-semantic-text-regular);font-size:12px;line-height:1.6}.page{padding-inline:6px}.previous,.next,.first,.last{padding-inline:8px}.previous:disabled,.next:disabled,.first:disabled,.last:disabled{color:var(--color-semantic-text-disabled)}.page:focus,.previous:focus,.next:focus,.first:focus,.last:focus{background-color:var(--color-semantic-surface-regular-3);outline:none}.page:hover:enabled,.previous:hover:enabled,.next:hover:enabled,.first:hover:enabled,.last:hover:enabled{background-color:var(--color-semantic-surface-regular-3)}.page.selected,.previous.selected,.next.selected,.first.selected,.last.selected{color:var(--color-semantic-text-current);background-color:var(--color-semantic-surface-regular-3);font-weight:700}", $ = 10, We = 4;
class Fe extends HTMLElement {
  #e = 1;
  #i = 1;
  #t = document.createElement("nav");
  #o = document.createElement("ul");
  #s = [];
  /**
   * 総ページ数
   *
   * @attribute
   * @type {number}
   * @default 1
   */
  get total() {
    return this.#e;
  }
  set total(t) {
    this.#e = t;
  }
  /**
   * 現在選択されているページ番号
   *
   * @attribute
   * @type {number}
   * @default 1
   */
  get selected() {
    return this.#i;
  }
  set selected(t) {
    this.#i = t;
  }
  static get observedAttributes() {
    return ["total", "selected"];
  }
  constructor() {
    super(), this.attachShadow({ mode: "open" }), this.shadowRoot.adoptedStyleSheets = [
      ...this.shadowRoot.adoptedStyleSheets,
      l(Ge)
    ];
  }
  connectedCallback() {
    this.#r(), this.#l();
  }
  #r() {
    this.#o.classList.add("page-group"), this.#t.appendChild(this.#o), this.shadowRoot.appendChild(this.#t);
  }
  attributeChangedCallback(t, e, i) {
    e !== i && (t === "total" && this.#a(i), t === "selected" && this.#n(i));
  }
  #a(t) {
    const e = Number(t);
    !Number.isNaN(e) && Number.isInteger(e) && e > 0 ? this.total = e : (console.warn(`${t}は無効なtotal属性です。`), this.total = 1), this.#l();
  }
  #n(t) {
    const e = Number(t);
    !Number.isNaN(e) && Number.isInteger(e) && e > 0 && e <= this.total ? this.selected = e : (console.warn(`${t}は無効なselected属性です。`), this.selected = 1), this.#b();
  }
  #l() {
    this.#o.innerHTML = "", this.#s = [], this.#c().map((e) => this.#u(e)).forEach((e) => this.#o.appendChild(e));
  }
  #c() {
    return [
      { type: "first", text: "最初へ", targetPage: 1 },
      {
        type: "previous",
        text: "前へ",
        targetPage: Math.max(1, this.selected - 1)
      },
      ...this.#d(),
      {
        type: "next",
        text: "次へ",
        targetPage: Math.min(this.total, this.selected + 1)
      },
      { type: "last", text: "最後へ", targetPage: this.total }
    ];
  }
  #d() {
    const { firstVisiblePage: t, lastVisiblePage: e } = this.#h();
    return Array.from(
      { length: e - t + 1 },
      (i, r) => {
        const h = t + r;
        return {
          type: "page",
          text: String(h),
          targetPage: h
        };
      }
    );
  }
  #h() {
    let t = Math.max(1, this.selected - We);
    t + $ - 1 > this.total && (t = Math.max(1, this.total - $ + 1));
    const e = Math.min(
      this.total,
      t + $ - 1
    );
    return { firstVisiblePage: t, lastVisiblePage: e };
  }
  #u({ type: t, text: e, targetPage: i }) {
    const r = this.#x(t, e, i);
    this.#s.push(r);
    const h = document.createElement("li");
    return h.appendChild(r), h;
  }
  #x(t, e, i) {
    const r = document.createElement("button");
    r.textContent = e, r.classList.add(t), t === "page" && this.#L(r, i);
    const h = this.#p(t);
    return r.disabled = h, r.onclick = () => this.#m(i), r;
  }
  #L(t, e) {
    t.setAttribute("aria-label", `${e}ページ目へ`), e === this.selected && (t.classList.add("selected"), t.setAttribute("aria-current", "page"));
  }
  #p(t) {
    return t === "first" || t === "previous" ? this.selected === 1 : t === "next" || t === "last" ? this.selected === this.total : !1;
  }
  #m(t) {
    this.#C(t) || (this.#k(t), this.#y(t), this.#b());
  }
  #C(t) {
    return t === this.selected || t < 1 || t > this.total;
  }
  #k(t) {
    this.selected = t, this.setAttribute("selected", String(t));
  }
  #y(t) {
    this.dispatchEvent(
      new CustomEvent("change", {
        detail: { page: t }
      })
    );
  }
  #b() {
    const t = this.#c();
    this.#s.forEach((e, i) => {
      const r = t[i];
      e.classList.contains("page") && this.#f(e, r), this.#g(e, r);
    });
  }
  #f(t, e) {
    t.textContent = e.text;
    const i = e.targetPage === this.selected;
    t.classList.toggle("selected", i), t.setAttribute("aria-label", `${e.targetPage}ページ目へ`), i ? t.setAttribute("aria-current", "page") : t.removeAttribute("aria-current");
  }
  #g(t, e) {
    const i = this.#p(e.type);
    t.disabled = i, t.onclick = () => this.#m(e.targetPage);
  }
}
customElements.get("sp-pagination") || customElements.define("sp-pagination", Fe);
const je = ':host{display:inline-block;max-width:100%}.base{display:flex;flex-wrap:wrap;gap:8px}.base:has(:focus-visible){outline:auto}.base.horizontal{flex-direction:row}.base.vertical{flex-direction:column}.item{display:inline-flex;justify-content:flex-start;align-items:flex-start}.text{color:var(--color-semantic-text-regular);font-size:12px;line-height:1.6;padding-block:2.5px;cursor:pointer}.input{position:absolute;left:0;top:0;opacity:0;width:100%;height:100%;cursor:pointer}.radio{position:relative;flex-grow:0;flex-shrink:0;display:inline-flex;padding-block:4px;padding-inline:4px}.radio:before{content:"";display:inline-block;width:16px;height:16px;background:var(--color-semantic-surface-regular-1) 50% 50% no-repeat;border:1px solid var(--color-semantic-border-check-unchecked);border-radius:50%}.radio:has(.input:focus-visible):before{outline:auto;outline-offset:4px;border-color:var(--color-semantic-border-focus);box-shadow:0 0 0 3px var(--color-semantic-highlight-focus-ring-default)}.radio:has(.input:checked):before{background-color:var(--color-semantic-surface-regular-1);border-width:4px}.radio:has(.input:checked:not(:disabled)):before{border-color:var(--color-semantic-border-selected)}.item:has(.input:disabled) :is(.input,.text){cursor:not-allowed}.item:has(.input:disabled) .text{color:var(--color-semantic-text-disabled)}.item .radio:has(.input:disabled):before{background-color:var(--color-semantic-surface-check-disabled);border-color:var(--color-semantic-border-regular)}.item .radio:has(.input:checked:disabled):before{background-color:var(--color-semantic-surface-regular-1)}.item:has(:is(.input:hover,.text:hover)):not(:has(:is(.input:checked,.input:disabled))) .radio:before{background-color:var(--color-semantic-surface-regular-3)}.item:has(.input:checked:hover:not(:disabled)) .radio:before,.item:has(.input:checked:not(:disabled)):has(.text:hover) .radio:before{border-color:var(--color-semantic-border-selected-hover)}';
class Ne extends ct {
  constructor() {
    super(), this.shadowRoot.adoptedStyleSheets = [
      ...this.shadowRoot.adoptedStyleSheets,
      l(je)
    ];
  }
}
customElements.get("sp-radio-button-text-group") || customElements.define("sp-radio-button-text-group", Ne);
const Oe = ":host{display:block}.container{display:flex;justify-content:space-between;align-items:center;gap:16px}.main{display:flex;align-items:center;gap:16px}.heading{display:flex;align-items:center;gap:8px}.text-links{display:flex;flex-shrink:0;align-items:center;gap:16px}.buttons{display:flex;flex-shrink:0;align-items:center;gap:8px}h2{margin-block:3px;font-size:14px;font-weight:700;line-height:1.6;position:relative}";
class Ye extends HTMLElement {
  #e = document.createElement("h2");
  #i = document.createElement("slot");
  #t = document.createElement("slot");
  /**
   * セクションタイトルのテキスト
   *
   * @attribute
   * @type {string}
   */
  set text(t) {
    this.#e.textContent = t;
  }
  static get observedAttributes() {
    return ["text"];
  }
  constructor() {
    super(), this.attachShadow({ mode: "open" }), this.shadowRoot.adoptedStyleSheets = [
      ...this.shadowRoot.adoptedStyleSheets,
      l(Oe)
    ], this.#i.name = "text-links", this.#t.name = "buttons";
  }
  connectedCallback() {
    this.shadowRoot.appendChild(this.#o()), this.#i.assignedElements().length === 0 && this.shadowRoot.querySelector(".text-links")?.remove(), this.#t.assignedElements().length === 0 && this.shadowRoot.querySelector(".buttons")?.remove();
  }
  attributeChangedCallback(t, e, i) {
    t === "text" && e !== i && (this.text = i);
  }
  #o() {
    const t = document.createElement("div");
    return t.classList.add("container"), t.appendChild(this.#s()), t.appendChild(this.#n()), t;
  }
  #s() {
    const t = document.createElement("div");
    return t.classList.add("main"), t.appendChild(this.#r()), t.appendChild(this.#a()), t;
  }
  #r() {
    const t = document.createElement("div");
    return t.classList.add("heading"), t.appendChild(this.#e), t;
  }
  #a() {
    const t = document.createElement("div");
    return t.classList.add("text-links"), t.appendChild(this.#i), t;
  }
  #n() {
    const t = document.createElement("div");
    return t.classList.add("buttons"), t.appendChild(this.#t), t;
  }
}
customElements.get("sp-section-title") || customElements.define("sp-section-title", Ye);
const Je = ":host{display:inline-block;max-width:100%;line-height:0;vertical-align:middle}.base{display:inline-flex;max-width:100%}.item{flex:1 0 80px;position:relative;display:flex;align-items:stretch;min-width:80px}.radio{position:absolute;z-index:-1;width:100%;height:100%}.input{width:100%;height:100%;opacity:0}.text{flex-grow:1;display:flex;align-items:center;justify-content:center;padding-block:8px;padding-inline:8px;background-color:var(--color-semantic-surface-regular-2);border:1px solid var(--color-semantic-border-regular);border-right:none;color:var(--color-semantic-text-weak);font-size:10px;line-height:1.6;text-align:center}.text:hover{background-color:var(--color-semantic-surface-regular-4)}.item:first-child .text{border-radius:5px 0 0 5px}.item:last-child .text{border-radius:0 5px 5px 0;border-right:1px solid var(--color-semantic-border-regular)}.item:has(.input:focus-visible) .text{outline:auto;outline-offset:-4px;background-color:var(--color-semantic-surface-regular-4)}.item:has(.input:checked) .text{background-color:var(--color-semantic-surface-selected);border-color:var(--color-semantic-border-selected);color:var(--color-semantic-text-inverse);font-weight:700;cursor:default}.item:has(.input:disabled) .text{background-color:var(--color-semantic-surface-regular-2);color:var(--color-semantic-text-disabled);cursor:not-allowed}";
class Qe extends ct {
  constructor() {
    super(), this.shadowRoot.adoptedStyleSheets = [
      ...this.shadowRoot.adoptedStyleSheets,
      l(Je)
    ];
  }
}
customElements.get("sp-segmented-control") || customElements.define("sp-segmented-control", Qe);
const Xe = ".button{display:inline-flex;align-items:center;font-size:12px;border-radius:2px;line-height:1.6;padding-block:.5px;padding-inline:8px;white-space:nowrap;box-sizing:border-box;border:1px solid;justify-content:center;background-color:var(--color-semantic-surface-regular-2);border-color:var(--color-semantic-border-regular);color:var(--color-semantic-text-regular)}.button:hover{background-color:var(--color-semantic-surface-regular-4)}:host([selected]) .button{font-weight:700;color:var(--color-semantic-text-inverse);background-color:var(--color-semantic-surface-selected);border-color:var(--color-semantic-border-selected)}:host([disabled]){pointer-events:none}:host([disabled]) .button{background-color:var(--color-semantic-surface-regular-2);border-color:var(--color-semantic-border-regular);color:var(--color-semantic-text-disabled);cursor:default}:host([selected]) .button:hover{background-color:var(--color-semantic-surface-selected-hover);border-color:var(--color-semantic-border-selected-hover)}";
class Ke extends HTMLElement {
  #e = !1;
  #i = !1;
  #t = document.createElement("button");
  /**
   * タグの選択状態
   *
   * @attribute
   * @type {boolean}
   * @default false
   */
  get selected() {
    return this.#e;
  }
  set selected(t) {
    this.#e !== t && (this.#e = t, t ? this.#t.classList.add("isSelected") : this.#t.classList.remove("isSelected"));
  }
  /**
   * タグの無効状態
   *
   * @attribute
   * @type {boolean}
   * @default false
   */
  get disabled() {
    return this.#i;
  }
  set disabled(t) {
    this.#i !== t && (this.#i = t, t ? (this.setAttribute("aria-disabled", "true"), this.#t.disabled = !0, this.#t.classList.add("isDisabled")) : (this.removeAttribute("aria-disabled"), this.#t.disabled = !1, this.#t.classList.remove("isDisabled")));
  }
  static get observedAttributes() {
    return ["selected", "disabled"];
  }
  constructor() {
    super(), this.attachShadow({ mode: "open" }), this.shadowRoot.adoptedStyleSheets = [
      ...this.shadowRoot.adoptedStyleSheets,
      l(Xe)
    ], this.selected = !1, this.disabled = !1;
  }
  connectedCallback() {
    this.#e = this.hasAttribute("selected"), this.#i = this.hasAttribute("disabled"), this.#t.classList.add("button"), this.#t.setAttribute("type", "button"), this.#t.addEventListener("click", this.#o.bind(this)), this.#s();
  }
  attributeChangedCallback(t, e, i) {
    if (e !== i)
      switch (t) {
        case "selected":
          this.selected = i === "true" || i === "";
          break;
        case "disabled":
          this.disabled = i === "true" || i === "";
          break;
      }
  }
  #o(t) {
    this.disabled || this.dispatchEvent(
      new CustomEvent("click", { detail: { originalEvent: t } })
    );
  }
  #s() {
    this.shadowRoot.textContent = "";
    const t = document.createElement("slot");
    this.#t.textContent = "", this.#t.appendChild(t), this.#i ? this.#t.disabled = !0 : this.#t.disabled = !1, this.shadowRoot.appendChild(this.#t);
  }
}
customElements.get("sp-tag-clickable") || customElements.define("sp-tag-clickable", Ke);
const $e = ".link{display:inline-flex;align-items:center;font-size:12px;border-radius:2px;line-height:1.6;padding-block:.5px;padding-inline:8px;white-space:nowrap;box-sizing:border-box;border:1px solid;justify-content:center;text-decoration:none;background-color:var(--color-semantic-surface-regular-2);border-color:var(--color-semantic-border-regular);color:var(--color-semantic-text-text-link)}.link:hover{background-color:var(--color-semantic-surface-regular-4)}.link:focus{background-color:var(--color-semantic-surface-regular-4)}:host([disabled]){pointer-events:none}:host([disabled]) .link{background-color:var(--color-semantic-surface-regular-2);border-color:var(--color-semantic-border-regular);color:var(--color-semantic-text-disabled)}";
class ti extends HTMLElement {
  constructor() {
    super(), this.href = "", this.#e = !1, this.#i = document.createElement("a"), this.attachShadow({ mode: "open" }), this.shadowRoot.adoptedStyleSheets = [
      ...this.shadowRoot.adoptedStyleSheets,
      l($e)
    ];
  }
  #e;
  #i;
  /**
   * タグの無効状態
   *
   * @attribute
   * @type {boolean}
   * @default false
   */
  get disabled() {
    return this.#e;
  }
  set disabled(t) {
    this.#e !== t && (this.#e = t, t ? (this.setAttribute("aria-disabled", "true"), this.setAttribute("tabindex", "-1")) : (this.removeAttribute("aria-disabled"), this.removeAttribute("tabindex")));
  }
  static get observedAttributes() {
    return ["href", "disabled"];
  }
  connectedCallback() {
    this.#t();
  }
  attributeChangedCallback(t, e, i) {
    if (e !== i)
      switch (t) {
        case "href":
          this.#i.setAttribute("href", i);
          break;
        case "disabled":
          this.disabled = i === "true" || i === "";
          break;
      }
  }
  #t() {
    this.shadowRoot.textContent = "", this.#i.classList.add("link");
    const t = document.createElement("slot");
    this.#i.appendChild(t), this.shadowRoot.appendChild(this.#i);
  }
}
customElements.get("sp-tag-link") || customElements.define("sp-tag-link", ti);
const ei = ".base{display:inline-flex;align-items:center;font-size:12px;border-radius:2px;line-height:1.6;padding-block:.5px;padding-inline:8px;white-space:nowrap;box-sizing:border-box;border:1px solid;justify-content:center}.type__gray{background-color:var(--color-semantic-surface-temp-tag-gray);border-color:var(--color-semantic-border-temp-tag-gray);color:var(--color-semantic-text-regular)}.type__green.light{background-color:var(--color-semantic-surface-temp-tag-green);border-color:var(--color-semantic-border-temp-tag-green);color:var(--color-semantic-text-success)}.type__green:not(.light){background-color:var(--color-semantic-surface-temp-tag-darkgreen);border-color:var(--color-semantic-border-temp-tag-darkgreen);color:var(--color-semantic-text-inverse)}.type__red.light{background-color:var(--color-semantic-surface-temp-tag-red);border-color:var(--color-semantic-border-temp-tag-red);color:var(--color-semantic-text-danger)}.type__red:not(.light){background-color:var(--color-semantic-surface-temp-tag-darkred);border-color:var(--color-semantic-border-temp-tag-darkred);color:var(--color-semantic-text-inverse)}.type__yellow.light{background-color:var(--color-semantic-surface-temp-tag-yellow);border-color:var(--color-semantic-border-temp-tag-yellow);color:var(--color-semantic-text-warning)}.type__yellow:not(.light){background-color:var(--color-semantic-surface-temp-tag-darkyellow);border-color:var(--color-semantic-border-temp-tag-darkyellow);color:var(--color-semantic-text-inverse)}.type__blue.light{background-color:var(--color-semantic-surface-temp-tag-marine);border-color:var(--color-semantic-border-temp-tag-marine);color:var(--color-semantic-text-marine)}.type__blue:not(.light){background-color:var(--color-semantic-surface-temp-tag-darkmarine);border-color:var(--color-semantic-border-temp-tag-darkmarine);color:var(--color-semantic-text-inverse)}";
class ii extends HTMLElement {
  #e = "gray";
  #i = !0;
  #t = document.createElement("div");
  /**
   * タグの色の種類（"gray"、"green"、"red"、"yellow"、または "blue"）
   * - "gray": グレー
   * - "green": グリーン
   * - "red": レッド
   * - "yellow": イエロー
   * - "blue": ブルー
   *
   * @attribute
   * @type {"gray"|"green"|"red"|"yellow"|"blue"}
   * @default "gray"
   */
  get type() {
    return this.#e;
  }
  set type(t) {
    this.#e !== t && (this.#t.classList.remove(`type__${this.#e}`), this.#r(t) ? (this.#e = t, this.#t.classList.add(`type__${t}`), this.light = this.hasAttribute("light")) : (console.warn(`${t}は無効なtype属性です。`), this.#e = "gray", this.#t.classList.add("type__gray")));
  }
  /**
   * ライトモードの有効状態（※grayカラーはライトモードのみ）
   *
   * @attribute
   * @type {boolean}
   * @default true
   */
  get light() {
    return this.#i;
  }
  set light(t) {
    this.#i !== t && (t ? this.#t.classList.add("light") : this.#t.classList.remove("light"), this.#i = t, t ? this.setAttribute("light", "") : this.removeAttribute("light"));
  }
  static get observedAttributes() {
    return ["type", "light"];
  }
  constructor() {
    super(), this.attachShadow({ mode: "open" }), this.shadowRoot.adoptedStyleSheets = [
      ...this.shadowRoot.adoptedStyleSheets,
      l(ei)
    ];
  }
  connectedCallback() {
    this.#e = this.#o(), this.#i = this.#s(), this.#a();
  }
  attributeChangedCallback(t, e, i) {
    if (e !== i)
      switch (t) {
        case "type":
          this.type = i;
          break;
        case "light":
          this.light = i === "true" || i === "";
          break;
      }
  }
  #o() {
    const t = this.getAttribute("type");
    return this.#r(t) ? t : "gray";
  }
  #s() {
    return this.#e === "gray" ? !0 : this.hasAttribute("light");
  }
  #r(t) {
    return t === "gray" || t === "green" || t === "red" || t === "yellow" || t === "blue";
  }
  #a() {
    this.shadowRoot.textContent = "", this.#t.classList.add("base"), this.#t.classList.add(`type__${this.#e}`), this.#i && this.#t.classList.add("light");
    const t = document.createElement("slot");
    this.#t.appendChild(t), this.shadowRoot.appendChild(this.#t);
  }
}
customElements.get("sp-tag-liquid") || customElements.define("sp-tag-liquid", ii);
const oi = ".base{display:inline-flex;vertical-align:middle;align-items:center;font-size:12px;border-radius:2px;line-height:1.6;padding-block:.5px;padding-inline:8px;white-space:nowrap;box-sizing:border-box;border:1px solid;justify-content:center;gap:4px;background-color:var(--color-semantic-surface-regular-2);border-color:var(--color-semantic-border-regular)}.base:hover{background-color:var(--color-semantic-surface-regular-4)}.label{color:var(--color-semantic-text-regular)}.remove{color:var(--color-primitive-neutral-100);display:flex;align-items:center;justify-content:center}.drag-icon{display:flex;align-items:center;justify-content:center;color:var(--color-semantic-text-regular);cursor:grab;margin-right:2px}.drag-icon:active{cursor:grabbing}.base.dragging{opacity:.8;box-shadow:0 2px 4px #0003}:host([disabled]) .base{background-color:var(--color-semantic-surface-regular-2);border-color:var(--color-semantic-border-regular)}:host([disabled]) .label{color:var(--color-semantic-text-disabled)}:host([disabled]) .remove{color:var(--color-semantic-text-disabled)}:host([disabled]) .drag-icon{color:var(--color-semantic-text-disabled);cursor:default}";
class si extends HTMLElement {
  #e = !1;
  #i = !1;
  #t = document.createElement("button");
  #o = null;
  #s = 0;
  #r = 0;
  #a = !1;
  /**
   * タグの無効状態
   *
   * @attribute
   * @type {boolean}
   * @default false
   */
  get disabled() {
    return this.#e;
  }
  set disabled(t) {
    this.#e !== t && (this.#e = t, this.#t.disabled = t, this.#d());
  }
  /**
   * タグのドラッグ可能状態
   *
   * @attribute
   * @type {boolean}
   * @default false
   */
  get draggable() {
    return this.#i;
  }
  set draggable(t) {
    this.#i !== t && (this.#i = t, this.#d());
  }
  static get observedAttributes() {
    return ["disabled", "draggable"];
  }
  constructor() {
    super(), this.attachShadow({ mode: "open" }), this.shadowRoot.adoptedStyleSheets = [
      ...this.shadowRoot.adoptedStyleSheets,
      l(oi)
    ], this.disabled = !1;
  }
  connectedCallback() {
    this.#t.classList.add("remove"), this.#t.setAttribute("aria-label", "削除"), this.#t.setAttribute("type", "button");
    const t = document.createElement("sp-icon");
    t.size = "small", t.type = "close", t.setAttribute("aria-hidden", "true"), this.#t.appendChild(t), this.#t.addEventListener(
      "click",
      () => this.dispatchEvent(new CustomEvent("remove"))
    ), this.#d();
  }
  attributeChangedCallback(t, e, i) {
    if (e !== i)
      switch (t) {
        case "disabled":
          this.disabled = i === "true" || i === "";
          break;
        case "draggable":
          this.draggable = i === "true" || i === "";
          break;
      }
  }
  #n = (t) => {
    if (this.#e) return;
    this.#a = !0, this.#s = t.clientX, this.#r = t.clientY;
    const e = this.shadowRoot?.querySelector(".base");
    e && e.classList.add("dragging"), this.dispatchEvent(
      new CustomEvent("dragstart", {
        detail: { x: t.clientX, y: t.clientY }
      })
    ), document.addEventListener("mousemove", this.#l), document.addEventListener("mouseup", this.#c), t.preventDefault();
  };
  #l = (t) => {
    if (!this.#a) return;
    const e = t.clientX - this.#s, i = t.clientY - this.#r;
    this.dispatchEvent(
      new CustomEvent("drag", {
        detail: {
          x: t.clientX,
          y: t.clientY,
          deltaX: e,
          deltaY: i
        }
      })
    );
  };
  #c = (t) => {
    if (!this.#a) return;
    this.#a = !1;
    const e = this.shadowRoot?.querySelector(".base");
    e && e.classList.remove("dragging"), this.dispatchEvent(
      new CustomEvent("dragend", {
        detail: { x: t.clientX, y: t.clientY }
      })
    ), document.removeEventListener("mousemove", this.#l), document.removeEventListener("mouseup", this.#c);
  };
  disconnectedCallback() {
    this.#o && this.#o.removeEventListener("mousedown", this.#n), document.removeEventListener("mousemove", this.#l), document.removeEventListener("mouseup", this.#c);
  }
  #d() {
    this.shadowRoot.textContent = "";
    const t = document.createElement("div");
    t.classList.add("base"), t.setAttribute("role", "tag"), this.#i && (this.#o = document.createElement("sp-icon"), this.#o.setAttribute("type", "drag"), this.#o.setAttribute("size", "small"), this.#o.setAttribute("aria-hidden", "true"), this.#o.classList.add("drag-icon"), this.#o.style.cursor = this.#e ? "default" : "grab", this.#o.setAttribute("role", "button"), this.#o.setAttribute("aria-label", "ドラッグハンドル"), this.#e || this.#o.addEventListener("mousedown", this.#n), t.appendChild(this.#o));
    const e = document.createElement("span");
    e.classList.add("label");
    const i = document.createElement("slot");
    e.appendChild(i), t.appendChild(e), t.appendChild(this.#t), this.shadowRoot.appendChild(t);
  }
}
customElements.get("sp-tag-removable") || customElements.define("sp-tag-removable", si);
export {
  wt as SpButton,
  $t as SpCheckbox,
  ee as SpCheckboxList,
  oe as SpCheckboxText,
  re as SpDefinitionList,
  ne as SpDefinitionListDd,
  le as SpDefinitionListDt,
  ve as SpDropdownAction,
  pe as SpDropdownActionItem,
  ke as SpDropdownDialog,
  Ee as SpElementTitle,
  lt as SpIcon,
  He as SpLabel,
  Be as SpNotificationBar,
  qe as SpNotificationMessage,
  Fe as SpPagination,
  Ne as SpRadioButtonTextGroup,
  Ye as SpSectionTitle,
  Qe as SpSegmentedControl,
  Ke as SpTagClickable,
  ti as SpTagLink,
  ii as SpTagLiquid,
  si as SpTagRemovable,
  st as SpTextField
};
