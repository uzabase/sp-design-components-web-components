// @ts-ignore
import resetStyle from "@acab/reset.css?inline" assert { type: "css" };
// @ts-ignore
import foundationStyle from "../foundation.css?inline" assert { type: "css" };
// @ts-ignore
import spDefinitionListDtStyle from "./sp-definition-list-dt.css?inline" assert { type: "css" };

const styles = new CSSStyleSheet();
styles.replaceSync(
  `${resetStyle} ${foundationStyle} ${spDefinitionListDtStyle}`,
);

export class SpDefinitionListDt extends HTMLElement {
  #dtElement = document.createElement("dt");

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.adoptedStyleSheets = [
      ...this.shadowRoot.adoptedStyleSheets,
      styles,
    ];
    this.#dtElement.classList.add("base");
    this.shadowRoot.appendChild(this.#dtElement);
  }

  connectedCallback() {
    this.#dtElement.textContent = this.textContent;
  }
}

customElements.get("sp-definition-list-dt") ||
  customElements.define("sp-definition-list-dt", SpDefinitionListDt);

declare global {
  interface HTMLElementTagNameMap {
    "sp-definition-list-dt": SpDefinitionListDt;
  }
}
