import foundationStyle from "../foundation.css?inline";
import dropdownActionItemStyle from "./dropdown-action-item.css?inline";

const styles = new CSSStyleSheet();
styles.replaceSync(`${foundationStyle} ${dropdownActionItemStyle}`);

export class SpDropdownActionItem extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot!.adoptedStyleSheets = [
      ...this.shadowRoot!.adoptedStyleSheets,
      styles,
    ];
  }

  connectedCallback() {
    const baseElement = document.createElement("div");
    const buttonElement = document.createElement("button");
    const slotElement = document.createElement("slot");

    this.role = "menuitem";
    baseElement.classList.add("base");
    buttonElement.classList.add("action");

    buttonElement.appendChild(slotElement);
    baseElement.appendChild(buttonElement);
    this.shadowRoot!.appendChild(baseElement);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "sp-dropdown-action-item": SpDropdownActionItem;
  }
}

if (!customElements.get("sp-dropdown-action-item")) {
  customElements.define("sp-dropdown-action-item", SpDropdownActionItem);
}
