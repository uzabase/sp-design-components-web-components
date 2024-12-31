import resetStyle from "@acab/reset.css?inline";

import foundationStyle from "../foundation.css?inline";
import elementTitleStyle from "./element-title.css?inline";

const styles = new CSSStyleSheet();
styles.replaceSync(`${resetStyle} ${foundationStyle} ${elementTitleStyle}`);

export class SpElementTitle extends HTMLElement {
  #headingElement = document.createElement("h3");
  #textLinkSlotElement = document.createElement("slot");
  #buttonSlotElement = document.createElement("slot");

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

    this.#textLinkSlotElement.name = "text-links";
    this.#buttonSlotElement.name = "buttons";
  }

  connectedCallback() {
    this.shadowRoot!.appendChild(this.#createContainer());

    if (this.#textLinkSlotElement.assignedElements().length === 0) {
      this.shadowRoot!.querySelector(".text-links")?.remove();
    }

    if (this.#buttonSlotElement.assignedElements().length === 0) {
      this.shadowRoot!.querySelector(".buttons")?.remove();
    }
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (name === "text" && oldValue !== newValue) {
      this.text = newValue;
    }
  }

  #createContainer() {
    const container = document.createElement("div");
    container.classList.add("container");
    container.appendChild(this.#createMain());
    container.appendChild(this.#createButtons());
    return container;
  }

  #createMain() {
    const main = document.createElement("div");
    main.classList.add("main");
    main.appendChild(this.#createHeadingBlock());
    main.appendChild(this.#createTextLinks());
    return main;
  }

  #createHeadingBlock() {
    const div = document.createElement("div");
    div.classList.add("heading");
    div.appendChild(this.#headingElement);
    return div;
  }

  #createTextLinks() {
    const div = document.createElement("div");
    div.classList.add("text-links");
    div.appendChild(this.#textLinkSlotElement);
    return div;
  }

  #createButtons() {
    const div = document.createElement("div");
    div.classList.add("buttons");
    div.appendChild(this.#buttonSlotElement);
    return div;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "sp-element-title": SpElementTitle;
  }
}

if (!customElements.get("sp-element-title")) {
  customElements.define("sp-element-title", SpElementTitle);
}
