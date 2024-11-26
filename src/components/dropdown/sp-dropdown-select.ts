// @ts-ignore
import resetStyle from "@acab/reset.css?inline" assert { type: "css" };
// @ts-ignore
import foundationStyle from "../foundation.css?inline" assert { type: "css" };
// @ts-ignore
import dropdownSelectStyle from "./sp-dropdown-select.css?inline" assert { type: "css" };

const styles = new CSSStyleSheet();
styles.replaceSync(`${resetStyle} ${foundationStyle} ${dropdownSelectStyle}`);

class SpDropdownSelect extends HTMLElement {
  #baseElement = document.createElement("input");

  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.adoptedStyleSheets = [...shadowRoot.adoptedStyleSheets, styles];
  }

  connectedCallback() {
    this.#baseElement.classList.add("base");
    
    this.shadowRoot?.appendChild(this.#baseElement);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "sp-dropdown-select": SpDropdownSelect;
  }
}

customElements.get("sp-dropdown-select") ||
  customElements.define("sp-dropdown-select", SpDropdownSelect);
