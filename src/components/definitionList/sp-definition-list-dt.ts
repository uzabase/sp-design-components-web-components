// @ts-ignore
import foundationStyle from "../foundation.css?inline" assert { type: "css" };
// @ts-ignore
import spDefinitionListDtStyle from "./sp-definition-list-dt.css?inline" assert { type: "css" };

const styles = new CSSStyleSheet();
styles.replaceSync(`${foundationStyle} ${spDefinitionListDtStyle}`);

export class SpDefinitionListDt extends HTMLElement {
  #dtElement = document.createElement("dt");

  set text(value: string) {
    this.#dtElement.innerText = value;
  }

  static get observedAttributes() {
    return ["text"];
  }

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

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) return;
    switch (name) {
      case "text":
        this.text = newValue;
        break;
    }
  }
}

customElements.get("sp-definition-list-dt") ||
  customElements.define("sp-definition-list-dt", SpDefinitionListDt);

declare global {
  interface HTMLElementTagNameMap {
    "sp-definition-list-dt": SpDefinitionListDt;
  }
}
