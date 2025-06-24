import "../icon/sp-icon";

import buttonStyle from "../button/button.css?inline";
import { SpButton } from "../button/sp-button";
import { makeStyleSheet } from "../styles";
import dropdownActionButtonStyle from "./dropdown-action-button.css?inline";

export class SpDropdownActionButton extends SpButton {
  constructor() {
    super();

    this.shadowRoot!.adoptedStyleSheets = [
      ...this.shadowRoot!.adoptedStyleSheets,
      makeStyleSheet(buttonStyle, dropdownActionButtonStyle),
    ];
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.#setupIcon();
  }

  #setupIcon() {
    this.icon = "arrow_down";
  }

  setAriaHasPopup(value: string) {
    this.buttonElement.setAttribute("aria-haspopup", value);
  }

  setAriaExpanded(value: string) {
    this.buttonElement.setAttribute("aria-expanded", value);
  }

  setAriaControls(value: string) {
    this.buttonElement.setAttribute("aria-controls", value);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "sp-dropdown-action-button": SpDropdownActionButton;
  }
}

if (!customElements.get("sp-dropdown-action-button")) {
  customElements.define("sp-dropdown-action-button", SpDropdownActionButton);
}
