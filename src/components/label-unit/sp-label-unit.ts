// @ts-ignore
import resetStyle from "@acab/reset.css?inline" assert { type: "css" };
// @ts-ignore
import foundationStyle from "../foundation.css?inline" assert { type: "css" };
// @ts-ignore
import labelUnitStyle from "./label-unit.css?inline" assert { type: "css" };

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
styles.replaceSync(`${resetStyle} ${foundationStyle} ${labelUnitStyle}`);

export class SpLabelUnit extends HTMLElement {
  #legendElement = document.createElement("legend");
  #supportTextElement = document.createElement("p");
  #size: Size = size[0];

  set size(value: string) {
    const newValue: Size = isValidSize(value);
    this.#legendElement.classList.remove(this.#size);
    this.#legendElement.classList.add(newValue);
    this.#supportTextElement.classList.remove(this.#size);
    this.#supportTextElement.classList.add(newValue);
    this.#size = newValue;
  }

  set text(value: string) {
    this.#legendElement.textContent = value;
  }

  set supportText(value: string) {
    this.#supportTextElement.textContent = value;
  }

  set required(value: boolean) {
    value
      ? this.#legendElement.classList.add("required")
      : this.#legendElement.classList.remove("required");
  }

  static get observedAttributes() {
    return ["size", "text", "support-text", "required"];
  }

  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.adoptedStyleSheets = [...shadowRoot.adoptedStyleSheets, styles];

    this.size = size[0];
  }

  connectedCallback() {
    this.#legendElement.classList.add("legend");
    this.#supportTextElement.classList.add("support");
    this.shadowRoot?.appendChild(this.#legendElement);
    this.shadowRoot?.appendChild(this.#legendElement);
    this.shadowRoot?.appendChild(this.#supportTextElement);
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) return;
    switch (name) {
      case "text":
        this.text = newValue;
        break;
      case "support-text":
        this.supportText = newValue;
        break;
      case "required":
        this.required = newValue === "true" || newValue === "";
        break;
      case "size":
        this.size = newValue;
        break;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "sp-label-unit": SpLabelUnit;
  }
}

customElements.get("sp-label-unit") ||
  customElements.define("sp-label-unit", SpLabelUnit);
