import resetStyle from "@acab/reset.css?inline";

import foundationStyle from "../../foundation.css?inline";
import textFieldStyle from "./text-field.css?inline";

const styles = new CSSStyleSheet();
styles.replaceSync(`${resetStyle} ${foundationStyle} ${textFieldStyle}`);

export class SpTextField extends HTMLElement {
  static formAssociated = true;
  protected internals: ElementInternals;

  #inputElement: HTMLInputElement = document.createElement("input");

  get value() {
    return this.#inputElement.value;
  }
  set value(val: string) {
    this.setAttribute("value", val);
    this.#inputElement.value = val;
    this.internals.setFormValue(val);
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

  get readonly() {
    return this.#inputElement.readOnly;
  }
  set readonly(val: boolean) {
    if (val) {
      this.setAttribute("readonly", "");
    } else {
      this.removeAttribute("readonly");
    }
    this.#inputElement.readOnly = val;
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

  get maxlength() {
    return this.#inputElement.maxLength;
  }
  set maxlength(val: number) {
    this.setAttribute("maxlength", String(val));
    this.#inputElement.maxLength = val;
  }

  get type() {
    return this.#inputElement.type;
  }
  set type(val: string) {
    this.setAttribute("type", val);
    this.#inputElement.type = val;
  }

  get placeholder() {
    return this.#inputElement.placeholder;
  }
  set placeholder(val: string) {
    this.setAttribute("placeholder", val);
    this.#inputElement.placeholder = val;
  }

  get autofocus() {
    return this.#inputElement.autofocus;
  }
  set autofocus(val: boolean) {
    if (val) {
      this.setAttribute("autofocus", "");
    } else {
      this.removeAttribute("autofocus");
    }
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

    this.attachShadow({ mode: "open" });

    this.shadowRoot!.adoptedStyleSheets = [
      ...this.shadowRoot!.adoptedStyleSheets,
      styles,
    ];

    this.internals = this.attachInternals();

    this.#setupInputElement();

    this.#setupEventForwarding();
  }

  #setupInputElement() {
    this.#inputElement.classList.add("text-field");
    const container = document.createElement("div");
    container.classList.add("container");
    container.appendChild(this.#inputElement);
    this.shadowRoot!.appendChild(container);
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) return;
    if (name === "value") {
      this.value = newValue;
    } else if (name === "placeholder") {
      this.placeholder = newValue;
    } else if (name === "disabled") {
      this.disabled = newValue === "" || newValue === "true";
    } else if (name === "readonly") {
      this.readonly = newValue === "" || newValue === "true";
    } else if (name === "type") {
      this.type = newValue || "text";
    } else if (name === "maxlength") {
      this.maxlength = parseInt(newValue) || -1;
    } else if (name === "name") {
      this.name = newValue;
    } else if (name === "required") {
      this.required = newValue === "" || newValue === "true";
    } else if (name === "autofocus") {
      this.autofocus = newValue === "" || newValue === "true";
    } else if (name === "invalid") {
      this.invalid = newValue === "" || newValue === "true";
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

  formResetCallback() {
    this.value = "";
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

    this.#inputElement.addEventListener("input", () => {
      this.value = this.#inputElement.value;
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
