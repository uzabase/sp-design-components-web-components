import resetStyle from "@acab/reset.css?inline";

import foundationStyle from "../foundation.css?inline";
import spDefinitionListDdStyle from "./sp-definition-list-dd.css?inline";

const styles = new CSSStyleSheet();
styles.replaceSync(
  `${resetStyle} ${foundationStyle} ${spDefinitionListDdStyle}`,
);

export class SpDefinitionListDd extends HTMLElement {
  #ddElement = document.createElement("dd");

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
      this.#ddElement.classList.add("base");
      this.#ddElement.innerHTML = this.innerHTML;
      this.shadowRoot.appendChild(this.#ddElement);
    }
  }
}

if (!customElements.get("sp-definition-list-dd")) {
  customElements.define("sp-definition-list-dd", SpDefinitionListDd);
}

declare global {
  interface HTMLElementTagNameMap {
    "sp-definition-list-dd": SpDefinitionListDd;
  }
}
