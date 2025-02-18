var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _SpSectionTitle_instances, _SpSectionTitle_headingElement, _SpSectionTitle_textLinkSlotElement, _SpSectionTitle_buttonSlotElement, _SpSectionTitle_createContainer, _SpSectionTitle_createMain, _SpSectionTitle_createHeadingBlock, _SpSectionTitle_createTextLinks, _SpSectionTitle_createButtons;
import resetStyle from "@acab/reset.css?inline";
import foundationStyle from "../foundation.css?inline";
import sectionTitleStyle from "./section-title.css?inline";
const styles = new CSSStyleSheet();
styles.replaceSync(`${resetStyle} ${foundationStyle} ${sectionTitleStyle}`);
export class SpSectionTitle extends HTMLElement {
    set text(value) {
        __classPrivateFieldGet(this, _SpSectionTitle_headingElement, "f").textContent = value;
    }
    static get observedAttributes() {
        return ["text"];
    }
    constructor() {
        super();
        _SpSectionTitle_instances.add(this);
        _SpSectionTitle_headingElement.set(this, document.createElement("h2"));
        _SpSectionTitle_textLinkSlotElement.set(this, document.createElement("slot"));
        _SpSectionTitle_buttonSlotElement.set(this, document.createElement("slot"));
        this.attachShadow({ mode: "open" });
        this.shadowRoot.adoptedStyleSheets = [styles];
        __classPrivateFieldGet(this, _SpSectionTitle_textLinkSlotElement, "f").name = "text-links";
        __classPrivateFieldGet(this, _SpSectionTitle_buttonSlotElement, "f").name = "buttons";
    }
    connectedCallback() {
        this.shadowRoot.appendChild(__classPrivateFieldGet(this, _SpSectionTitle_instances, "m", _SpSectionTitle_createContainer).call(this));
        if (__classPrivateFieldGet(this, _SpSectionTitle_textLinkSlotElement, "f").assignedElements().length === 0) {
            this.shadowRoot.querySelector(".text-links")?.remove();
        }
        if (__classPrivateFieldGet(this, _SpSectionTitle_buttonSlotElement, "f").assignedElements().length === 0) {
            this.shadowRoot.querySelector(".buttons")?.remove();
        }
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if (name === "text" && oldValue !== newValue) {
            this.text = newValue;
        }
    }
}
_SpSectionTitle_headingElement = new WeakMap(), _SpSectionTitle_textLinkSlotElement = new WeakMap(), _SpSectionTitle_buttonSlotElement = new WeakMap(), _SpSectionTitle_instances = new WeakSet(), _SpSectionTitle_createContainer = function _SpSectionTitle_createContainer() {
    const container = document.createElement("div");
    container.classList.add("container");
    container.appendChild(__classPrivateFieldGet(this, _SpSectionTitle_instances, "m", _SpSectionTitle_createMain).call(this));
    container.appendChild(__classPrivateFieldGet(this, _SpSectionTitle_instances, "m", _SpSectionTitle_createButtons).call(this));
    return container;
}, _SpSectionTitle_createMain = function _SpSectionTitle_createMain() {
    const main = document.createElement("div");
    main.classList.add("main");
    main.appendChild(__classPrivateFieldGet(this, _SpSectionTitle_instances, "m", _SpSectionTitle_createHeadingBlock).call(this));
    main.appendChild(__classPrivateFieldGet(this, _SpSectionTitle_instances, "m", _SpSectionTitle_createTextLinks).call(this));
    return main;
}, _SpSectionTitle_createHeadingBlock = function _SpSectionTitle_createHeadingBlock() {
    const div = document.createElement("div");
    div.classList.add("heading");
    div.appendChild(__classPrivateFieldGet(this, _SpSectionTitle_headingElement, "f"));
    return div;
}, _SpSectionTitle_createTextLinks = function _SpSectionTitle_createTextLinks() {
    const div = document.createElement("div");
    div.classList.add("text-links");
    div.appendChild(__classPrivateFieldGet(this, _SpSectionTitle_textLinkSlotElement, "f"));
    return div;
}, _SpSectionTitle_createButtons = function _SpSectionTitle_createButtons() {
    const div = document.createElement("div");
    div.classList.add("buttons");
    div.appendChild(__classPrivateFieldGet(this, _SpSectionTitle_buttonSlotElement, "f"));
    return div;
};
if (!customElements.get("sp-section-title")) {
    customElements.define("sp-section-title", SpSectionTitle);
}
