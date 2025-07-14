import resetStyle from "@acab/reset.css?inline";

import foundationStyle from "../../foundation.css?inline";
import textFieldStyle from "./text-field.css?inline";

const styles = new CSSStyleSheet();
styles.replaceSync(`${resetStyle} ${foundationStyle} ${textFieldStyle}`);

export class SpTextField extends HTMLElement {
  static formAssociated = true;
  #inputElement: HTMLInputElement = document.createElement("input");
  #internals!: ElementInternals;

  get value() {
    return this.#inputElement.value;
  }
  set value(val: string) {
    this.#inputElement.value = val;
    this.#internals.setFormValue(val);
  }

  get placeholder() {
    return this.#inputElement.placeholder;
  }
  set placeholder(val: string) {
    this.#inputElement.placeholder = val;
  }

  get disabled() {
    return this.#inputElement.disabled;
  }
  set disabled(val: boolean) {
    this.#inputElement.disabled = val;
  }

  get readonly() {
    return this.#inputElement.readOnly;
  }
  set readonly(val: boolean) {
    this.#inputElement.readOnly = val;
  }

  get type() {
    return this.#inputElement.type;
  }
  set type(val: string) {
    this.#inputElement.type = val;
  }

  get maxLength() {
    return this.#inputElement.maxLength;
  }
  set maxLength(val: number) {
    this.#inputElement.maxLength = val;
  }

  get name() {
    return this.#inputElement.name;
  }
  set name(val: string) {
    this.#inputElement.name = val;
  }

  get required() {
    return this.#inputElement.required;
  }
  set required(val: boolean) {
    this.#inputElement.required = val;
  }

  get autofocus() {
    return this.#inputElement.autofocus;
  }
  set autofocus(val: boolean) {
    this.#inputElement.autofocus = val;
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
  }

  static get observedAttributes() {
    return [
      "value",
      "placeholder",
      "disabled",
      "readonly",
      "type",
      "maxlength",
      "name",
      "required",
      "autofocus",
      "invalid",
    ];
  }

  constructor() {
    super();
    this.#setupShadowRoot();
    this.#setupInputElement();
    this.#setupInternals();
    this.#setupEventForwarding();
  }

  #setupShadowRoot() {
    this.attachShadow({ mode: "open" });

    this.shadowRoot!.adoptedStyleSheets = [
      ...this.shadowRoot!.adoptedStyleSheets,
      styles,
    ];
  }

  #setupInputElement() {
    this.#inputElement.classList.add("text-field");
    const container = document.createElement("div");
    container.classList.add("container");
    container.appendChild(this.#inputElement);
    this.shadowRoot!.appendChild(container);
  }

  #setupInternals() {
    this.#internals = this.attachInternals();
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) return;

    if (name === "value") {
      this.value = newValue;
    } else if (name === "placeholder") {
      this.placeholder = newValue;
    } else if (name === "disabled") {
      this.disabled = newValue !== null;
    } else if (name === "readonly") {
      this.readonly = newValue !== null;
    } else if (name === "type") {
      this.type = newValue || "text";
    } else if (name === "maxlength") {
      this.maxLength = parseInt(newValue) || -1;
    } else if (name === "name") {
      this.name = newValue;
    } else if (name === "required") {
      this.required = newValue !== null;
    } else if (name === "autofocus") {
      this.autofocus = newValue !== null;
    } else if (name === "invalid") {
      this.invalid = newValue !== null;
    }
  }

  connectedCallback() {
    for (const attr of SpTextField.observedAttributes) {
      const value = this.getAttribute(attr);
      if (value !== null) {
        this.attributeChangedCallback(attr, "", value);
      }
    }
  }

  focus() {
    this.#inputElement.focus();
  }

  blur() {
    this.#inputElement.blur();
  }

  select() {
    this.#inputElement.select();
  }

  #setupEventForwarding() {
    const eventsToForward = [
      "input",
      "change",
      "focus",
      "blur",
      "keydown",
      "keyup",
      "keypress",
    ];

    eventsToForward.forEach((eventType) => {
      this.#inputElement.addEventListener(eventType, (event) => {
        const forwardedEvent = new Event(eventType, {
          bubbles: event.bubbles,
          cancelable: event.cancelable,
        });

        this.dispatchEvent(forwardedEvent);
      });
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
