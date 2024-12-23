// @ts-ignore
import resetStyle from "@acab/reset.css?inline" assert { type: "css" };
// @ts-ignore
import foundationStyle from "../foundation.css?inline" assert { type: "css" };
// @ts-ignore
import errorTextStyle from "./error-unit.css?inline" assert { type: "css" };

const size = ["medium", "large"] as const;
type Size = (typeof size)[number];

function isValidSize(value: string): Size {
  if (size.some((size) => size === value)) {
    return value as Size;
  } else {
    console.warn(`${value}は無効なsize属性です。`);
    return size[0];
  }
}

const styles = new CSSStyleSheet();
styles.replaceSync(`${resetStyle} ${foundationStyle} ${errorTextStyle}`);

export class SpErrorUnit extends HTMLElement {
  #wrapperElement = document.createElement("p");
  #iconElement = document.createElement("span");
  #textElement = document.createElement("span");
  #size: Size = size[0];

  set size(value: string) {
    const newValue: Size = isValidSize(value);
    this.#wrapperElement.classList.remove(this.#size);
    this.#wrapperElement.classList.add(newValue);
    this.#size = newValue;
  }

  set text(value: string) {
    this.#textElement.textContent = value;
  }

  set id(value: string) {
    this.setAttribute("id", value);
  }

  static get observedAttributes() {
    return ["size", "text", "id"];
  }

  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.adoptedStyleSheets = [...shadowRoot.adoptedStyleSheets, styles];

    this.size = size[0];
  }

  connectedCallback() {
    this.#wrapperElement.setAttribute("role", "error");
    this.#wrapperElement.classList.add("base");
    this.#iconElement.setAttribute("aria-hidden", "true");
    this.#iconElement.classList.add("icon");
    this.#textElement.classList.add("text");
    this.#wrapperElement.appendChild(this.#iconElement);
    this.#wrapperElement.appendChild(this.#textElement);
    this.shadowRoot?.appendChild(this.#wrapperElement);
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) return;
    switch (name) {
      case "size":
        this.size = newValue;
        break;
      case "text":
        this.text = newValue;
        break;
      case "id":
        this.id = newValue;
        break;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "sp-error-unit": SpErrorUnit;
  }
}

customElements.get("sp-error-unit") ||
customElements.define("sp-error-unit", SpErrorUnit);
