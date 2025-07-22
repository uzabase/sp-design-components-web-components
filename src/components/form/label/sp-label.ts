import { makeStyleSheet } from "../../styles";
import labelStyle from "./label.css?inline";

export class SpLabel extends HTMLElement {
  #labelElement = document.createElement("label");
  #slotElement = document.createElement("slot");
  #requiredElement = document.createElement("span");

  #required = false;

  get required() {
    return this.#required;
  }
  set required(val: boolean) {
    if (val !== this.#required) {
      this.#required = val;
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

  static get observedAttributes() {
    return ["required", "for"];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) return;

    if (name === "required") {
      this.required = newValue === "" || newValue === "true";
    } else if (name === "for") {
      this.#labelElement.setAttribute("for", newValue);
    }
  }

  connectedCallback() {
    this.shadowRoot!.appendChild(this.#labelElement);
  }

  #setupElements() {
    this.#labelElement.classList.add("label");
    this.#labelElement.appendChild(this.#slotElement);

    const forAttribute = this.getAttribute("for");
    if (forAttribute) {
      this.#labelElement.setAttribute("for", forAttribute);
    }

    this.#requiredElement.classList.add("required");
    this.#requiredElement.textContent = "*";
    this.#requiredElement.setAttribute("aria-hidden", "true");
  }

  #updateRequiredState() {
    if (this.#required) {
      this.#labelElement.appendChild(this.#requiredElement);
    } else {
      this.#labelElement.removeChild(this.#requiredElement);
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
