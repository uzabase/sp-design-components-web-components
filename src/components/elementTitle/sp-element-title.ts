import elementTitleStyle from "./element-title.css?inline" assert { type: "css"};

const styles = new CSSStyleSheet();
styles.replaceSync(elementTitleStyle);

export class SpElementTitle extends HTMLElement {
  #spanElement = document.createElement("span");

  set text(value: string) {
    this.#spanElement.textContent = value;
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.shadowRoot.adoptedStyleSheets = [styles];
  }

  connectedCallback() {
    this.shadowRoot.appendChild(this.#spanElement);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "sp-element-title": SpElementTitle;
  }
}

customElements.get("sp-element-title") ||
customElements.define("sp-element-title", SpElementTitle);
