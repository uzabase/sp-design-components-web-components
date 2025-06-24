import { makeStyleSheet } from "../styles";
import spDefinitionListDdStyle from "./sp-definition-list-dd.css?inline";

export class SpDefinitionListDd extends HTMLElement {
  #ddElement = document.createElement("dd");

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.shadowRoot!.adoptedStyleSheets = [
      ...this.shadowRoot!.adoptedStyleSheets,
      makeStyleSheet(spDefinitionListDdStyle),
    ];

    this.#ddElement.classList.add("base");
    this.#ddElement.innerHTML = this.innerHTML;

    this.shadowRoot!.appendChild(this.#ddElement);
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
