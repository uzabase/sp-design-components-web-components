import resetStyle from "@acab/reset.css?inline";

import foundationStyle from "../../foundation.css?inline";
import labelStyle from "./label.css?inline";

const styles = new CSSStyleSheet();
styles.replaceSync(`${resetStyle} ${foundationStyle} ${labelStyle}`);

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
      styles,
    ];

    this.#setupElements();
  }

  static get observedAttributes() {
    return ["required"];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) return;

    if (name === "required") {
      this.required = this.hasAttribute("required");
    }
  }

  connectedCallback() {
    this.shadowRoot!.appendChild(this.#labelElement);
  }

  #setupElements() {
    this.#labelElement.classList.add("base");

    this.#labelElement.appendChild(this.#slotElement);

    this.#requiredElement.classList.add("required");
    this.#requiredElement.textContent = "*";
    this.#requiredElement.setAttribute("aria-hidden", "true");
  }

  #updateRequiredState() {
    if (this.#required) {
      this.#labelElement.appendChild(this.#requiredElement);
    } else {
      this.#requiredElement.remove();
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
