var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _SpTagLiquid_instances, _SpTagLiquid_type, _SpTagLiquid_light, _SpTagLiquid_baseElement, _SpTagLiquid_getInitialTypeValue, _SpTagLiquid_getInitialLightValue, _SpTagLiquid_isValidType, _SpTagLiquid_render;
import resetStyle from "@acab/reset.css?inline";
import foundationStyle from "../foundation.css?inline";
import tagLiquidStyle from "./tag-liquid.css?inline";
const styles = new CSSStyleSheet();
styles.replaceSync(`${resetStyle} ${foundationStyle} ${tagLiquidStyle}`);
export class SpTagLiquid extends HTMLElement {
    get type() {
        return __classPrivateFieldGet(this, _SpTagLiquid_type, "f");
    }
    set type(value) {
        if (__classPrivateFieldGet(this, _SpTagLiquid_type, "f") === value)
            return;
        __classPrivateFieldGet(this, _SpTagLiquid_baseElement, "f").classList.remove(`type__${__classPrivateFieldGet(this, _SpTagLiquid_type, "f")}`);
        if (__classPrivateFieldGet(this, _SpTagLiquid_instances, "m", _SpTagLiquid_isValidType).call(this, value)) {
            __classPrivateFieldSet(this, _SpTagLiquid_type, value, "f");
            __classPrivateFieldGet(this, _SpTagLiquid_baseElement, "f").classList.add(`type__${value}`);
            this.light = this.hasAttribute("light");
        }
        else {
            console.warn(`${value}は無効なtype属性です。`);
            __classPrivateFieldSet(this, _SpTagLiquid_type, "gray", "f");
            __classPrivateFieldGet(this, _SpTagLiquid_baseElement, "f").classList.add(`type__gray`);
        }
    }
    get light() {
        return __classPrivateFieldGet(this, _SpTagLiquid_light, "f");
    }
    set light(value) {
        if (__classPrivateFieldGet(this, _SpTagLiquid_light, "f") === value)
            return;
        if (value) {
            __classPrivateFieldGet(this, _SpTagLiquid_baseElement, "f").classList.add("light");
        }
        else {
            __classPrivateFieldGet(this, _SpTagLiquid_baseElement, "f").classList.remove("light");
        }
        __classPrivateFieldSet(this, _SpTagLiquid_light, value, "f");
        if (value) {
            this.setAttribute("light", "");
        }
        else {
            this.removeAttribute("light");
        }
    }
    static get observedAttributes() {
        return ["type", "light"];
    }
    constructor() {
        super();
        _SpTagLiquid_instances.add(this);
        _SpTagLiquid_type.set(this, "gray");
        _SpTagLiquid_light.set(this, true);
        _SpTagLiquid_baseElement.set(this, document.createElement("div"));
        this.attachShadow({ mode: "open" });
        this.shadowRoot.adoptedStyleSheets = [
            ...this.shadowRoot.adoptedStyleSheets,
            styles,
        ];
    }
    connectedCallback() {
        __classPrivateFieldSet(this, _SpTagLiquid_type, __classPrivateFieldGet(this, _SpTagLiquid_instances, "m", _SpTagLiquid_getInitialTypeValue).call(this), "f");
        __classPrivateFieldSet(this, _SpTagLiquid_light, __classPrivateFieldGet(this, _SpTagLiquid_instances, "m", _SpTagLiquid_getInitialLightValue).call(this), "f");
        __classPrivateFieldGet(this, _SpTagLiquid_instances, "m", _SpTagLiquid_render).call(this);
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue)
            return;
        switch (name) {
            case "type":
                this.type = newValue;
                break;
            case "light":
                this.light = newValue === "true" || newValue === "";
                break;
        }
    }
}
_SpTagLiquid_type = new WeakMap(), _SpTagLiquid_light = new WeakMap(), _SpTagLiquid_baseElement = new WeakMap(), _SpTagLiquid_instances = new WeakSet(), _SpTagLiquid_getInitialTypeValue = function _SpTagLiquid_getInitialTypeValue() {
    const type = this.getAttribute("type");
    return __classPrivateFieldGet(this, _SpTagLiquid_instances, "m", _SpTagLiquid_isValidType).call(this, type) ? type : "gray";
}, _SpTagLiquid_getInitialLightValue = function _SpTagLiquid_getInitialLightValue() {
    if (__classPrivateFieldGet(this, _SpTagLiquid_type, "f") === "gray") {
        return true;
    }
    return this.hasAttribute("light");
}, _SpTagLiquid_isValidType = function _SpTagLiquid_isValidType(type) {
    return (type === "gray" ||
        type === "green" ||
        type === "red" ||
        type === "yellow" ||
        type === "blue");
}, _SpTagLiquid_render = function _SpTagLiquid_render() {
    this.shadowRoot.textContent = "";
    __classPrivateFieldGet(this, _SpTagLiquid_baseElement, "f").classList.add("base");
    __classPrivateFieldGet(this, _SpTagLiquid_baseElement, "f").classList.add(`type__${__classPrivateFieldGet(this, _SpTagLiquid_type, "f")}`);
    if (__classPrivateFieldGet(this, _SpTagLiquid_light, "f")) {
        __classPrivateFieldGet(this, _SpTagLiquid_baseElement, "f").classList.add("light");
    }
    const slotElement = document.createElement("slot");
    __classPrivateFieldGet(this, _SpTagLiquid_baseElement, "f").appendChild(slotElement);
    this.shadowRoot.appendChild(__classPrivateFieldGet(this, _SpTagLiquid_baseElement, "f"));
};
if (!customElements.get("sp-tag-liquid")) {
    customElements.define("sp-tag-liquid", SpTagLiquid);
}
