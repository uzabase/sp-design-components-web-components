// @ts-ignore
import elementTitleStyle from "./element-title.css?inline" assert { type: "css" };

const styles = new CSSStyleSheet();
styles.replaceSync(elementTitleStyle);

export class SpElementTitle extends HTMLElement {
  #headingElement = document.createElement("h3");
  #linkSlotElement = document.createElement("slot");
  #buttonSlotElement = document.createElement("slot");

  set text(value: string) {
    this.#headingElement.textContent = value;
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.shadowRoot.adoptedStyleSheets = [styles];

    this.#linkSlotElement.name = "links";
    this.#buttonSlotElement.name = "buttons";
  }

  connectedCallback() {
    this.shadowRoot.appendChild(this.createContainer());
  }

  createContainer() {
    const container = document.createElement("div");
    container.classList.add("container");
    container.appendChild(this.createMain());
    container.appendChild(this.createButtons());
    return container;
  }

  createMain() {
    const main = document.createElement("div");
    main.classList.add("main");
    main.appendChild(this.#headingElement);
    main.appendChild(this.createLinks());
    return main;
  }

  createLinks() {
    const links = document.createElement("div");
    links.classList.add("links");
    links.appendChild(this.#linkSlotElement);
    return links;
  }

  createButtons() {
    const buttons = document.createElement("div");
    buttons.classList.add("buttons");
    buttons.appendChild(this.#buttonSlotElement);
    return buttons;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "sp-element-title": SpElementTitle;
  }
}

customElements.get("sp-element-title") ||
  customElements.define("sp-element-title", SpElementTitle);
