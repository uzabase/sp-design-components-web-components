var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _SpDropdownActionItem_instances, _SpDropdownActionItem_setupRoleAttribute, _SpDropdownActionItem_setupElements, _SpDropdownActionItem_assembleElements;
import foundationStyle from "../foundation.css?inline";
import dropdownActionItemStyle from "./dropdown-action-item.css?inline";
const styles = new CSSStyleSheet();
styles.replaceSync(`${foundationStyle} ${dropdownActionItemStyle}`);
export class SpDropdownActionItem extends HTMLElement {
    constructor() {
        super();
        _SpDropdownActionItem_instances.add(this);
        this.attachShadow({ mode: "open" });
        this.shadowRoot.adoptedStyleSheets = [
            ...this.shadowRoot.adoptedStyleSheets,
            styles,
        ];
    }
    connectedCallback() {
        const baseElement = document.createElement("div");
        const buttonElement = document.createElement("button");
        const slotElement = document.createElement("slot");
        __classPrivateFieldGet(this, _SpDropdownActionItem_instances, "m", _SpDropdownActionItem_setupRoleAttribute).call(this);
        __classPrivateFieldGet(this, _SpDropdownActionItem_instances, "m", _SpDropdownActionItem_setupElements).call(this, baseElement, buttonElement);
        __classPrivateFieldGet(this, _SpDropdownActionItem_instances, "m", _SpDropdownActionItem_assembleElements).call(this, baseElement, buttonElement, slotElement);
        this.shadowRoot.appendChild(baseElement);
    }
}
_SpDropdownActionItem_instances = new WeakSet(), _SpDropdownActionItem_setupRoleAttribute = function _SpDropdownActionItem_setupRoleAttribute() {
    this.role = "menuitem";
}, _SpDropdownActionItem_setupElements = function _SpDropdownActionItem_setupElements(baseElement, buttonElement) {
    baseElement.classList.add("base");
    buttonElement.classList.add("action");
}, _SpDropdownActionItem_assembleElements = function _SpDropdownActionItem_assembleElements(baseElement, buttonElement, slotElement) {
    buttonElement.appendChild(slotElement);
    baseElement.appendChild(buttonElement);
};
if (!customElements.get("sp-dropdown-action-item")) {
    customElements.define("sp-dropdown-action-item", SpDropdownActionItem);
}
