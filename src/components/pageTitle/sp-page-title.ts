import resetStyle from "@acab/reset.css?inline";

import foundationStyle from "../foundation.css?inline";
import pageTitleStyle from "./page-title.css?inline";

const styles = new CSSStyleSheet();
styles.replaceSync(`${resetStyle} ${foundationStyle} ${pageTitleStyle}`);

export class SpPageTitle extends HTMLElement {
  #headingElement = document.createElement("h1");

  set text(value: string) {
    this.#headingElement.textContent = value;
  }

  static get observedAttributes() {
    return ["text"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.shadowRoot!.adoptedStyleSheets = [styles];

    this.shadowRoot!.appendChild(this.#headingElement);
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (name === "text" && oldValue !== newValue) {
      this.text = newValue;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "sp-page-title": SpPageTitle;
  }
}

if (!customElements.get("sp-page-title")) {
  customElements.define("sp-page-title", SpPageTitle);
}
