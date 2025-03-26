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
        this.shadowRoot.adoptedStyleSheets = [
            ...this.shadowRoot.adoptedStyleSheets,
            styles,
        ];
    }
    connectedCallback() {
        super.connectedCallback();
        this.icon = "arrow_down";
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
if (!customElements.get("sp-dropdown-action-button")) {
    customElements.define("sp-dropdown-action-button", SpDropdownActionButton);
}
