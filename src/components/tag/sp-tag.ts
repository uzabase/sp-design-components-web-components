import resetStyle from "@acab/reset.css?inline";

import foundationStyle from "../foundation.css?inline";
import tagStyle from "./tag.css?inline";

const styles = new CSSStyleSheet();
styles.replaceSync(`${resetStyle} ${foundationStyle} ${tagStyle}`);

export class SpTag extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot!.adoptedStyleSheets = [
      ...this.shadowRoot!.adoptedStyleSheets,
      styles,
    ];
  }

  connectedCallback() {
    const baseElement = document.createElement("span");
    baseElement.classList.add("base");

    const slotElement = document.createElement("slot");

    baseElement.appendChild(slotElement);
    this.shadowRoot!.appendChild(baseElement);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "sp-tag": SpTag;
  }
}

if (!customElements.get("sp-tag")) {
  customElements.define("sp-tag", SpTag);
}
