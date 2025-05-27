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
var _SpTagLink_instances, _SpTagLink_disabled, _SpTagLink_linkElement, _SpTagLink_render;
import "../icon/sp-icon";
import resetStyle from "@acab/reset.css?inline";
import foundationStyle from "../foundation.css?inline";
import tagLinkStyle from "./tag-link.css?inline";
const styles = new CSSStyleSheet();
styles.replaceSync(`${resetStyle} ${foundationStyle} ${tagLinkStyle}`);
export class SpTagLink extends HTMLElement {
    get disabled() {
        return __classPrivateFieldGet(this, _SpTagLink_disabled, "f");
    }
    set disabled(value) {
        if (__classPrivateFieldGet(this, _SpTagLink_disabled, "f") === value)
            return;
        __classPrivateFieldSet(this, _SpTagLink_disabled, value, "f");
        if (value) {
            this.setAttribute("aria-disabled", "true");
            this.setAttribute("tabindex", "-1");
        }
        else {
            this.removeAttribute("aria-disabled");
            this.removeAttribute("tabindex");
        }
    }
    static get observedAttributes() {
        return ["href", "disabled"];
    }
    constructor() {
        super();
        _SpTagLink_instances.add(this);
        this.href = "";
        _SpTagLink_disabled.set(this, false);
        _SpTagLink_linkElement.set(this, document.createElement("a"));
        this.attachShadow({ mode: "open" });
        this.shadowRoot.adoptedStyleSheets = [
            ...this.shadowRoot.adoptedStyleSheets,
            styles,
        ];
    }
    connectedCallback() {
        __classPrivateFieldGet(this, _SpTagLink_instances, "m", _SpTagLink_render).call(this);
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue)
            return;
        switch (name) {
            case "href":
                __classPrivateFieldGet(this, _SpTagLink_linkElement, "f").setAttribute("href", newValue);
                break;
            case "disabled":
                this.disabled = newValue === "true" || newValue === "";
                break;
        }
    }
}
_SpTagLink_disabled = new WeakMap(), _SpTagLink_linkElement = new WeakMap(), _SpTagLink_instances = new WeakSet(), _SpTagLink_render = function _SpTagLink_render() {
    this.shadowRoot.textContent = "";
    __classPrivateFieldGet(this, _SpTagLink_linkElement, "f").classList.add("link");
    const slotElement = document.createElement("slot");
    __classPrivateFieldGet(this, _SpTagLink_linkElement, "f").appendChild(slotElement);
    this.shadowRoot.appendChild(__classPrivateFieldGet(this, _SpTagLink_linkElement, "f"));
};
if (!customElements.get("sp-tag-link")) {
    customElements.define("sp-tag-link", SpTagLink);
}
