var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _SpDropdownActionButton_instances, _SpDropdownActionButton_setupIcon;
import "../icon/sp-icon";
import buttonStyle from "../button/button.css?inline";
import { SpButton } from "../button/sp-button";
import foundationStyle from "../foundation.css?inline";
import dropdownActionButtonStyle from "./dropdown-action-button.css?inline";
const styles = new CSSStyleSheet();
styles.replaceSync(`${foundationStyle} ${buttonStyle} ${dropdownActionButtonStyle}`);
export class SpDropdownActionButton extends SpButton {
    constructor() {
        super();
        _SpDropdownActionButton_instances.add(this);
        this.shadowRoot.adoptedStyleSheets = [
            ...this.shadowRoot.adoptedStyleSheets,
            styles,
        ];
    }
    connectedCallback() {
        super.connectedCallback();
        __classPrivateFieldGet(this, _SpDropdownActionButton_instances, "m", _SpDropdownActionButton_setupIcon).call(this);
    }
    setAriaHasPopup(value) {
        this.buttonElement.setAttribute("aria-haspopup", value);
    }
    setAriaExpanded(value) {
        this.buttonElement.setAttribute("aria-expanded", value);
    }
    setAriaControls(value) {
        this.buttonElement.setAttribute("aria-controls", value);
    }
}
_SpDropdownActionButton_instances = new WeakSet(), _SpDropdownActionButton_setupIcon = function _SpDropdownActionButton_setupIcon() {
    this.icon = "arrow_down";
};
if (!customElements.get("sp-dropdown-action-button")) {
    customElements.define("sp-dropdown-action-button", SpDropdownActionButton);
}
