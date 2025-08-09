import { makeStyleSheet } from "../../styles";
import labelStyle from "./label.css?inline";

export class SpLabel extends HTMLElement {
  #labelElement = document.createElement("label");
  #slotElement = document.createElement("slot");
  #requiredElement = document.createElement("span");
  #requiredLabelElement = document.createElement("span");

  #required = false;

  static get observedAttributes() {
    return ["required"];
  }

  get required() {
    return this.#required;
  }
  set required(value: boolean) {
    if (value !== this.#required) {
      this.#required = value;
      this.#updateRequiredState();
    }
  }

  constructor() {
    super();

    this.attachShadow({ mode: "open" });

    this.shadowRoot!.adoptedStyleSheets = [
      ...this.shadowRoot!.adoptedStyleSheets,
      makeStyleSheet(labelStyle),
    ];

    this.#setupElements();
  }

  #setupElements() {
    this.#labelElement.classList.add("label");
    this.#labelElement.appendChild(this.#slotElement);

    this.#requiredElement.classList.add("required");
    this.#requiredElement.textContent = "*";
    this.#requiredElement.setAttribute("aria-hidden", "true");

    this.#requiredLabelElement.classList.add("sr-only");
    this.#requiredLabelElement.textContent = "（必須）";
  }

  connectedCallback() {
    this.shadowRoot!.appendChild(this.#labelElement);
  }

  attributeChangedCallback(
    name: string,
    oldValue: string | null,
    newValue: string | null,
  ) {
    if (oldValue === newValue) return;

    if (name === "required") {
      this.required = newValue === "" || newValue === "true";
    }
  }

  #updateRequiredState() {
    if (this.#required) {
      this.#labelElement.appendChild(this.#requiredElement);
      this.#labelElement.appendChild(this.#requiredLabelElement);
    } else {
      this.#requiredElement.remove();
      this.#requiredLabelElement.remove();
    }
  }
}

if (!customElements.get("sp-label")) {
  customElements.define("sp-label", SpLabel);
}

declare global {
  interface HTMLElementTagNameMap {
    "sp-label": SpLabel;
  }
}
