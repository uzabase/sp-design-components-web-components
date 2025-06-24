import { makeStyleSheet } from "../styles";
import spDefinitionListDtStyle from "./sp-definition-list-dt.css?inline";

export class SpDefinitionListDt extends HTMLElement {
  #dtElement = document.createElement("dt");

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.shadowRoot!.adoptedStyleSheets = [
      ...this.shadowRoot!.adoptedStyleSheets,
      makeStyleSheet(spDefinitionListDtStyle),
    ];

    this.#dtElement.classList.add("base");
    this.#dtElement.innerHTML = this.innerHTML;
    this.shadowRoot!.appendChild(this.#dtElement);
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
