// @ts-ignore
import resetStyle from "@acab/reset.css?inline" assert { type: "css" };
// @ts-ignore
import foundationStyle from "../foundation.css?inline" assert { type: "css" };
// @ts-ignore
import dropdownOptionStyle from "./sp-dropdown-option.css?inline" assert { type: "css" };

const styles = new CSSStyleSheet();
styles.replaceSync(`${resetStyle} ${foundationStyle} ${dropdownOptionStyle}`);

export class SpDropdownOption extends HTMLElement {
  #baseElement = document.createElement("div");

  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.adoptedStyleSheets = [...shadowRoot.adoptedStyleSheets, styles];
  }

  connectedCallback() {
    this.#baseElement.classList.add("base");
    this.#baseElement.role = "option";

    this.shadowRoot?.appendChild(this.#baseElement);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "sp-dropdown-option": SpDropdownOption;
  }
}

customElements.get("sp-dropdown-option") ||
  customElements.define("sp-dropdown-option", SpDropdownOption);
