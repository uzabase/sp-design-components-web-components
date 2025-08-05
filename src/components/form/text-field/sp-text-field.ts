import "../error-text/sp-error-text";
import "../character-counter/sp-character-counter";

import { makeStyleSheet } from "../../styles";
import textFieldStyle from "./text-field.css?inline";

export class SpTextField extends HTMLElement {
  static formAssociated = true;
  protected internals: ElementInternals;

  #inputElement: HTMLInputElement = document.createElement("input");
  #container: HTMLDivElement = document.createElement("div");
  #errorSlot: HTMLSlotElement = document.createElement("slot");
  #characterCounter: HTMLElement = document.createElement(
    "sp-character-counter",
  );
  #characterLimit: number | undefined = undefined;

  get value() {
    return this.#inputElement.value;
  }
  set value(val: string) {
    this.setAttribute("value", val);
    this.#inputElement.value = val;
    this.internals.setFormValue(val);
    this.#updateCharacterCounter();
  }

  get name() {
    return this.#inputElement.name;
  }
  set name(val: string) {
    this.setAttribute("name", val);
    this.#inputElement.name = val;
  }

  get disabled() {
    return this.#inputElement.disabled;
  }
  set disabled(val: boolean) {
    if (val) {
      this.setAttribute("disabled", "");
    } else {
      this.removeAttribute("disabled");
    }
    this.#inputElement.disabled = val;
  }

  get required() {
    return this.#inputElement.required;
  }
  set required(val: boolean) {
    if (val) {
      this.setAttribute("required", "");
    } else {
      this.removeAttribute("required");
    }
    this.#inputElement.required = val;
  }

  get characterLimit() {
    return this.#characterLimit;
  }
  set characterLimit(val: number | undefined) {
    this.#characterLimit = val;
    if (val === undefined) {
      this.removeAttribute("character-limit");
    } else {
      this.setAttribute("character-limit", String(val));
    }
    this.#updateCharacterCounter();
    this.#updateCharacterCounterVisibility();
  }

  get placeholder() {
    return this.#inputElement.placeholder;
  }
  set placeholder(val: string) {
    this.setAttribute("placeholder", val);
    this.#inputElement.placeholder = val;
  }

  get invalid() {
    return this.hasAttribute("invalid");
  }
  set invalid(val: boolean) {
    if (val) {
      this.setAttribute("invalid", "");
      this.#inputElement.setAttribute("aria-invalid", "true");
    } else {
      this.removeAttribute("invalid");
      this.#inputElement.removeAttribute("aria-invalid");
    }
    this.#updateErrorTextVisibility();
  }

  static get observedAttributes() {
    return [
      "value",
      "placeholder",
      "disabled",
      "character-limit",
      "name",
      "required",
      "invalid",
    ];
  }

  constructor() {
    super();

    this.attachShadow({ mode: "open" });

    this.shadowRoot!.adoptedStyleSheets = [
      ...this.shadowRoot!.adoptedStyleSheets,
      makeStyleSheet(textFieldStyle),
    ];

    this.internals = this.attachInternals();

    this.#setupInputElement();
    this.#setupErrorSlot();
    this.#setupCharacterCounter();
    this.#setupEventForwarding();
  }

  #setupInputElement() {
    this.#inputElement.classList.add("text-field");
    this.#inputElement.type = "text";
    this.#container.classList.add("container");
    this.#container.appendChild(this.#inputElement);
    this.shadowRoot!.appendChild(this.#container);
  }

  #setupErrorSlot() {
    this.#errorSlot.name = "error-text";
    const errorText = document.createElement("sp-error-text");

    const fieldName = this.getAttribute("name") || "field";
    const errorId = `${fieldName}-error`;
    errorText.id = errorId;

    this.#inputElement.setAttribute("aria-errormessage", errorId);

    errorText.appendChild(this.#errorSlot);
    errorText.style.display = "none";

    const infoContainer = document.createElement("div");
    infoContainer.classList.add("info");

    infoContainer.appendChild(errorText);

    this.#container.appendChild(infoContainer);
  }

  #setupCharacterCounter() {
    this.#characterCounter.classList.add("character-counter");

    const infoContainer = this.#container.querySelector(".info");
    if (infoContainer) {
      infoContainer.appendChild(this.#characterCounter);
    }

    this.#updateCharacterCounterVisibility();
  }

  #updateErrorTextVisibility() {
    if (!this.#container) return;
    const errorText = this.#container.querySelector(
      "sp-error-text",
    ) as HTMLElement;

    if (!errorText) return;

    if (this.invalid) {
      errorText.style.display = "block";
    } else {
      errorText.style.display = "none";
    }
  }

  #updateErrorTextId() {
    if (!this.#container) return;
    const errorText = this.#container.querySelector(
      "sp-error-text",
    ) as HTMLElement;

    if (!errorText) return;

    const fieldName = this.getAttribute("name") || "field";
    const errorId = `${fieldName}-error`;

    errorText.id = errorId;
    this.#inputElement.setAttribute("aria-errormessage", errorId);
  }

  #updateCharacterCounterVisibility() {
    if (!this.#characterCounter) return;

    const hasCharacterCounter =
      this.#characterLimit !== undefined && this.#characterLimit > 0;
    if (hasCharacterCounter) {
      this.#characterCounter.style.display = "inline-block";
      this.#updateCharacterCounter();
    } else {
      this.#characterCounter.style.display = "none";
    }
  }

  #updateCharacterCounter() {
    if (
      !this.#characterCounter ||
      this.#characterLimit === undefined ||
      this.#characterLimit <= 0
    )
      return;

    const currentLength = this.value.length;
    const maxLength = this.#characterLimit;

    this.#characterCounter.setAttribute("current", String(currentLength));
    this.#characterCounter.setAttribute("max", String(maxLength));
  }

  attributeChangedCallback(
    name: string,
    oldValue: string | null,
    newValue: string | null,
  ) {
    if (oldValue === newValue) return;

    if (name === "value") {
      this.value = newValue || "";
    } else if (name === "placeholder") {
      this.placeholder = newValue || "";
    } else if (name === "disabled") {
      this.disabled = newValue === "" || newValue === "true";
    } else if (name === "character-limit") {
      if (!newValue) {
        this.#characterLimit = undefined;
      } else {
        const parsed = parseInt(newValue);
        if (parsed <= 0) {
          console.error(
            `Invalid character-limit: ${parsed}. Must be greater than 0.`,
          );
          return;
        }
        this.#characterLimit = parsed;
      }
      this.#updateCharacterCounter();
      this.#updateCharacterCounterVisibility();
    } else if (name === "name") {
      this.name = newValue || "";
      this.#updateErrorTextId();
    } else if (name === "required") {
      this.required = newValue === "" || newValue === "true";
    } else if (name === "invalid") {
      this.invalid = newValue === "" || newValue === "true";
      this.#updateErrorTextVisibility();
    }
  }

  connectedCallback() {
    for (const attr of SpTextField.observedAttributes) {
      const value = this.getAttribute(attr);
      if (value !== null) {
        this.attributeChangedCallback(attr, "", value);
      }
    }
    this.#updateErrorTextVisibility();
    this.#updateCharacterCounterVisibility();
  }

  #setupEventForwarding() {
    this.#inputElement.addEventListener("input", (event) => {
      const forwardedEvent = new Event("input", {
        bubbles: event.bubbles,
        cancelable: event.cancelable,
      });
      this.dispatchEvent(forwardedEvent);
    });

    this.#inputElement.addEventListener("input", () => {
      this.value = this.#inputElement.value;
      this.#updateCharacterCounter();
    });
  }
}

if (!customElements.get("sp-text-field")) {
  customElements.define("sp-text-field", SpTextField);
}

declare global {
  interface HTMLElementTagNameMap {
    "sp-text-field": SpTextField;
  }
}
