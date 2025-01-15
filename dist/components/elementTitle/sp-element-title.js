var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _SpElementTitle_instances, _SpElementTitle_headingElement, _SpElementTitle_textLinkSlotElement, _SpElementTitle_buttonSlotElement, _SpElementTitle_createContainer, _SpElementTitle_createMain, _SpElementTitle_createHeadingBlock, _SpElementTitle_createTextLinks, _SpElementTitle_createButtons;
import resetStyle from "@acab/reset.css?inline";
import foundationStyle from "../foundation.css?inline";
import elementTitleStyle from "./element-title.css?inline";
const styles = new CSSStyleSheet();
styles.replaceSync(`${resetStyle} ${foundationStyle} ${elementTitleStyle}`);
export class SpElementTitle extends HTMLElement {
    set text(value) {
        __classPrivateFieldGet(this, _SpElementTitle_headingElement, "f").textContent = value;
    }
    static get observedAttributes() {
        return ["text"];
    }
    constructor() {
        super();
        _SpElementTitle_instances.add(this);
        _SpElementTitle_headingElement.set(this, document.createElement("h3"));
        _SpElementTitle_textLinkSlotElement.set(this, document.createElement("slot"));
        _SpElementTitle_buttonSlotElement.set(this, document.createElement("slot"));
        this.attachShadow({ mode: "open" });
        this.shadowRoot.adoptedStyleSheets = [styles];
        __classPrivateFieldGet(this, _SpElementTitle_textLinkSlotElement, "f").name = "text-links";
        __classPrivateFieldGet(this, _SpElementTitle_buttonSlotElement, "f").name = "buttons";
    }
    connectedCallback() {
        this.shadowRoot.appendChild(__classPrivateFieldGet(this, _SpElementTitle_instances, "m", _SpElementTitle_createContainer).call(this));
        if (__classPrivateFieldGet(this, _SpElementTitle_textLinkSlotElement, "f").assignedElements().length === 0) {
            this.shadowRoot.querySelector(".text-links")?.remove();
        }
        if (__classPrivateFieldGet(this, _SpElementTitle_buttonSlotElement, "f").assignedElements().length === 0) {
            this.shadowRoot.querySelector(".buttons")?.remove();
        }
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if (name === "text" && oldValue !== newValue) {
            this.text = newValue;
        }
    }
}
_SpElementTitle_headingElement = new WeakMap(), _SpElementTitle_textLinkSlotElement = new WeakMap(), _SpElementTitle_buttonSlotElement = new WeakMap(), _SpElementTitle_instances = new WeakSet(), _SpElementTitle_createContainer = function _SpElementTitle_createContainer() {
    const container = document.createElement("div");
    container.classList.add("container");
    container.appendChild(__classPrivateFieldGet(this, _SpElementTitle_instances, "m", _SpElementTitle_createMain).call(this));
    container.appendChild(__classPrivateFieldGet(this, _SpElementTitle_instances, "m", _SpElementTitle_createButtons).call(this));
    return container;
}, _SpElementTitle_createMain = function _SpElementTitle_createMain() {
    const main = document.createElement("div");
    main.classList.add("main");
    main.appendChild(__classPrivateFieldGet(this, _SpElementTitle_instances, "m", _SpElementTitle_createHeadingBlock).call(this));
    main.appendChild(__classPrivateFieldGet(this, _SpElementTitle_instances, "m", _SpElementTitle_createTextLinks).call(this));
    return main;
}, _SpElementTitle_createHeadingBlock = function _SpElementTitle_createHeadingBlock() {
    const div = document.createElement("div");
    div.classList.add("heading");
    div.appendChild(__classPrivateFieldGet(this, _SpElementTitle_headingElement, "f"));
    return div;
}, _SpElementTitle_createTextLinks = function _SpElementTitle_createTextLinks() {
    const div = document.createElement("div");
    div.classList.add("text-links");
    div.appendChild(__classPrivateFieldGet(this, _SpElementTitle_textLinkSlotElement, "f"));
    return div;
}, _SpElementTitle_createButtons = function _SpElementTitle_createButtons() {
    const div = document.createElement("div");
    div.classList.add("buttons");
    div.appendChild(__classPrivateFieldGet(this, _SpElementTitle_buttonSlotElement, "f"));
    return div;
};
if (!customElements.get("sp-element-title")) {
    customElements.define("sp-element-title", SpElementTitle);
}
