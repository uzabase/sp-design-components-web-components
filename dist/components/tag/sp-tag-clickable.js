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
var _SpTagClickable_instances, _SpTagClickable_selected, _SpTagClickable_disabled, _SpTagClickable_buttonElement, _SpTagClickable_handleClick, _SpTagClickable_render;
import "../icon/sp-icon";
import resetStyle from "@acab/reset.css?inline";
import foundationStyle from "../foundation.css?inline";
import tagClickableStyle from "./tag-clickable.css?inline";
const styles = new CSSStyleSheet();
styles.replaceSync(`${resetStyle} ${foundationStyle} ${tagClickableStyle}`);
export class SpTagClickable extends HTMLElement {
    /**
     * Returns whether the tag is currently in selected state
     */
    get selected() {
        return __classPrivateFieldGet(this, _SpTagClickable_selected, "f");
    }
    /**
     * Sets the selected state of the tag
     */
    set selected(value) {
        if (__classPrivateFieldGet(this, _SpTagClickable_selected, "f") === value)
            return;
        __classPrivateFieldSet(this, _SpTagClickable_selected, value, "f");
        if (value) {
            __classPrivateFieldGet(this, _SpTagClickable_buttonElement, "f").classList.add("isSelected");
        }
        else {
            __classPrivateFieldGet(this, _SpTagClickable_buttonElement, "f").classList.remove("isSelected");
        }
    }
    /**
     * Returns whether the tag is currently disabled
     */
    get disabled() {
        return __classPrivateFieldGet(this, _SpTagClickable_disabled, "f");
    }
    /**
     * Sets the disabled state of the tag
     */
    set disabled(value) {
        if (__classPrivateFieldGet(this, _SpTagClickable_disabled, "f") === value)
            return;
        __classPrivateFieldSet(this, _SpTagClickable_disabled, value, "f");
        if (value) {
            this.setAttribute("aria-disabled", "true");
            __classPrivateFieldGet(this, _SpTagClickable_buttonElement, "f").disabled = true;
            __classPrivateFieldGet(this, _SpTagClickable_buttonElement, "f").classList.add("isDisabled");
        }
        else {
            this.removeAttribute("aria-disabled");
            __classPrivateFieldGet(this, _SpTagClickable_buttonElement, "f").disabled = false;
            __classPrivateFieldGet(this, _SpTagClickable_buttonElement, "f").classList.remove("isDisabled");
        }
    }
    static get observedAttributes() {
        return ["selected", "disabled"];
    }
    constructor() {
        super();
        _SpTagClickable_instances.add(this);
        _SpTagClickable_selected.set(this, false);
        _SpTagClickable_disabled.set(this, false);
        _SpTagClickable_buttonElement.set(this, document.createElement("button"));
        this.attachShadow({ mode: "open" });
        this.shadowRoot.adoptedStyleSheets = [
            ...this.shadowRoot.adoptedStyleSheets,
            styles,
        ];
        this.selected = false;
        this.disabled = false;
    }
    connectedCallback() {
        __classPrivateFieldSet(this, _SpTagClickable_selected, this.hasAttribute("selected"), "f");
        __classPrivateFieldSet(this, _SpTagClickable_disabled, this.hasAttribute("disabled"), "f");
        __classPrivateFieldGet(this, _SpTagClickable_buttonElement, "f").classList.add("button");
        __classPrivateFieldGet(this, _SpTagClickable_buttonElement, "f").setAttribute("type", "button");
        __classPrivateFieldGet(this, _SpTagClickable_buttonElement, "f").addEventListener("click", __classPrivateFieldGet(this, _SpTagClickable_instances, "m", _SpTagClickable_handleClick).bind(this));
        __classPrivateFieldGet(this, _SpTagClickable_instances, "m", _SpTagClickable_render).call(this);
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue)
            return;
        switch (name) {
            case "selected":
                this.selected = newValue === "true" || newValue === "";
                break;
            case "disabled":
                this.disabled = newValue === "true" || newValue === "";
                break;
        }
    }
}
_SpTagClickable_selected = new WeakMap(), _SpTagClickable_disabled = new WeakMap(), _SpTagClickable_buttonElement = new WeakMap(), _SpTagClickable_instances = new WeakSet(), _SpTagClickable_handleClick = function _SpTagClickable_handleClick(event) {
    if (this.disabled)
        return;
    this.dispatchEvent(new CustomEvent("click", { detail: { originalEvent: event } }));
}, _SpTagClickable_render = function _SpTagClickable_render() {
    this.shadowRoot.textContent = "";
    const slotElement = document.createElement("slot");
    __classPrivateFieldGet(this, _SpTagClickable_buttonElement, "f").textContent = "";
    __classPrivateFieldGet(this, _SpTagClickable_buttonElement, "f").appendChild(slotElement);
    if (__classPrivateFieldGet(this, _SpTagClickable_disabled, "f")) {
        __classPrivateFieldGet(this, _SpTagClickable_buttonElement, "f").disabled = true;
    }
    else {
        __classPrivateFieldGet(this, _SpTagClickable_buttonElement, "f").disabled = false;
    }
    this.shadowRoot.appendChild(__classPrivateFieldGet(this, _SpTagClickable_buttonElement, "f"));
};
if (!customElements.get("sp-tag-clickable")) {
    customElements.define("sp-tag-clickable", SpTagClickable);
}
