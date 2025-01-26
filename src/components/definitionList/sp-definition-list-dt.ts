import resetStyle from "@acab/reset.css?inline";

import foundationStyle from "../foundation.css?inline";
import spDefinitionListDtStyle from "./sp-definition-list-dt.css?inline";

const styles = new CSSStyleSheet();
styles.replaceSync(
  `${resetStyle} ${foundationStyle} ${spDefinitionListDtStyle}`,
);

export class SpDefinitionListDt extends HTMLElement {
  #dtElement = document.createElement("dt");

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
      this.#dtElement.classList.add("base");
      this.#dtElement.innerHTML = this.innerHTML;
      this.shadowRoot.appendChild(this.#dtElement);
    }
  }
}

if (!customElements.get("sp-definition-list-dt")) {
  customElements.define("sp-definition-list-dt", SpDefinitionListDt);
}

declare global {
  interface HTMLElementTagNameMap {
    "sp-definition-list-dt": SpDefinitionListDt;
  }
}
