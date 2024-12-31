import resetStyle from "@acab/reset.css?inline";

import foundationStyle from "../foundation.css?inline";
import spDefinitionListStyle from "./sp-definition-list.css?inline";

const styles = new CSSStyleSheet();
styles.replaceSync(`${resetStyle} ${foundationStyle} ${spDefinitionListStyle}`);

export class SpDefinitionList extends HTMLElement {
  #dlElement = document.createElement("dl");
  #slotElement = document.createElement("slot");

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    if (this.shadowRoot) {
      this.shadowRoot.adoptedStyleSheets = [
        ...this.shadowRoot.adoptedStyleSheets,
        styles,
      ];
      this.#dlElement.classList.add("base");
      this.#dlElement.appendChild(this.#slotElement);
      this.shadowRoot.appendChild(this.#dlElement);
    }
  }
}

if (!customElements.get("sp-definition-list")) {
  customElements.define("sp-definition-list", SpDefinitionList);
}

declare global {
  interface HTMLElementTagNameMap {
    "sp-definition-list": SpDefinitionList;
  }
}
