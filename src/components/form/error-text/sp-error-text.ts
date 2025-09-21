import { makeStyleSheet } from "../../styles";
import errorTextStyle from "./error-text.css?inline";

export class SpErrorText extends HTMLElement {
  #errorElement = document.createElement("div");
  #slotElement = document.createElement("slot");

  static get observedAttributes() {
    return ["id"];
  }

  constructor() {
    super();

    this.attachShadow({ mode: "open" });

    this.shadowRoot!.adoptedStyleSheets = [
      ...this.shadowRoot!.adoptedStyleSheets,
      makeStyleSheet(errorTextStyle),
    ];

    this.#setupElements();
  }

  #setupElements() {
    this.#errorElement.classList.add("base");
    this.#errorElement.setAttribute("role", "alert");
    this.#errorElement.appendChild(this.#slotElement);
  }

  connectedCallback() {
    this.shadowRoot!.appendChild(this.#errorElement);
  }

  attributeChangedCallback(
    name: string,
    oldValue: string | null,
    newValue: string | null,
  ) {
    if (oldValue === newValue) return;

    if (name === "id") {
      this.#updateIdAttribute(newValue);
    }
  }

  #updateIdAttribute(value: string | null) {
    if (value) {
      this.#errorElement.setAttribute("id", value);
    } else {
      this.#errorElement.removeAttribute("id");
    }
  }
}

if (!customElements.get("sp-error-text")) {
  customElements.define("sp-error-text", SpErrorText);
}

declare global {
  interface HTMLElementTagNameMap {
    "sp-error-text": SpErrorText;
  }
}
