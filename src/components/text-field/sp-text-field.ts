// @ts-ignore
import resetStyle from "@acab/reset.css?inline" assert { type: "css" };
// @ts-ignore
import foundationStyle from "../foundation.css?inline" assert { type: "css" };
// @ts-ignore
import textFieldStyle from "./text-field.css?inline" assert { type: "css" };
import "../label-unit/sp-label-unit";
import "../error-unit/sp-error-unit";

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
styles.replaceSync(`${resetStyle} ${foundationStyle} ${textFieldStyle}`);

export class SpTextField extends HTMLElement {
  #fieldsetElement = document.createElement("fieldset");
  #labelUnitElement = document.createElement("sp-label-unit");
  #errorUnitElement = document.createElement("sp-error-unit");
  #inputElement = document.createElement("input");
  #errorId: string = "error-" + Math.random().toString(36).slice(-8);
  #size: Size = size[0];

  set size(value: string) {
    const newValue: Size = isValidSize(value);
    this.#fieldsetElement.classList.remove(this.#size);
    this.#fieldsetElement.classList.add(newValue);
    this.#labelUnitElement.size = newValue;
    this.#errorUnitElement.size = newValue;
    this.#size = newValue;
  }

  get value() {
    return this.#inputElement.value;
  }
  set value(value: string) {
    this.#inputElement.value = value;
  }

  set name(value: string) {
    this.setAttribute("name", value);
    this.#inputElement.name = value;
  }

  set disabled(value: boolean) {
    this.#inputElement.disabled = value;
  }

  set text(value: string) {
    this.#labelUnitElement.text = value;
    this.#fieldsetElement.setAttribute("aria-label", value);
  }

  set errorText(value: string) {
    this.#errorUnitElement.text = value;
    this.#inputElement.setAttribute("aria-describedby", this.#errorId);
    this.#inputElement.setAttribute("aria-invalid", !!value+"")
  }

  set supportText(value: string) {
    this.#labelUnitElement.supportText = value;
  }

  set required(value: boolean) {
    this.#labelUnitElement.required = value;""
    this.#inputElement.setAttribute("aria-required", value+"");
  }

  static get observedAttributes() {
    return [
      "value",
      "name",
      "disabled",
      "text",
      "support-text",
      "error-text",
      "required",
      "size",
    ];
  }

  protected internals: ElementInternals;
  static formAssociated = true;

  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.adoptedStyleSheets = [...shadowRoot.adoptedStyleSheets, styles];

    this.internals = this.attachInternals();

    this.size = size[0];
    this.#errorUnitElement.id = this.#errorId;
  }

  connectedCallback() {
    const fieldElement = document.createElement("div");
    fieldElement.classList.add("field");
    this.#fieldsetElement.classList.add("base");
    this.#inputElement.classList.add("input");

    fieldElement.appendChild(this.#inputElement);
    fieldElement.appendChild(this.#errorUnitElement);
    this.#fieldsetElement.appendChild(this.#labelUnitElement);
    this.#fieldsetElement.appendChild(fieldElement);
    this.shadowRoot?.appendChild(this.#fieldsetElement);
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) return;
    switch (name) {
      case "value":
        this.value = newValue;
        break;
      case "name":
        this.name = newValue;
        break;
      case "disabled":
        this.disabled = newValue === "true" || newValue === "";
        break;
      case "text":
        this.text = newValue;
        break;
      case "error-text":
        this.errorText = newValue;
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
    "sp-text-field": SpTextField;
  }
}
customElements.get("sp-text-field") ||
  customElements.define("sp-text-field", SpTextField);
