// @ts-ignore
import foundationStyle from "../foundation.css?inline" assert { type: "css" };
// @ts-ignore
import spDefinitionListDdStyle from "./sp-definition-list-dd.css?inline" assert { type: "css" };

const styles = new CSSStyleSheet();
styles.replaceSync(`${foundationStyle} ${spDefinitionListDdStyle}`);

export class SpDefinitionListDd extends HTMLElement {
  #ddElement = document.createElement("dd");

  set text(value: string) {
    this.#ddElement.innerText = value;
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
    this.#ddElement.classList.add("base");
    this.shadowRoot.appendChild(this.#ddElement);
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

customElements.get("sp-definition-list-dd") ||
  customElements.define("sp-definition-list-dd", SpDefinitionListDd);

declare global {
  interface HTMLElementTagNameMap {
    "sp-definition-list-dd": SpDefinitionListDd;
  }
}
