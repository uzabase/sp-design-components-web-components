import { SpButton } from "../button/sp-button";
// @ts-ignore
import foundationStyle from "../foundation.css?inline" assert { type: "css" };
// @ts-ignore
import buttonStyle from "../button/button.css?inline" assert { type: "css" };
// @ts-ignore
import dropdownActionButtonStyle from "./dropdown-action-button.css?inline" assert { type: "css" };
import "../icon/sp-icon";
const styles = new CSSStyleSheet();
styles.replaceSync(`${foundationStyle} ${buttonStyle} ${dropdownActionButtonStyle}`);
export class SpDropdownActionButton extends SpButton {
    constructor() {
        super();
        if (this.shadowRoot) {
            this.shadowRoot.adoptedStyleSheets = [
                ...this.shadowRoot.adoptedStyleSheets,
                styles,
            ];
        }
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
customElements.get("sp-dropdown-action-button") ||
    customElements.define("sp-dropdown-action-button", SpDropdownActionButton);
