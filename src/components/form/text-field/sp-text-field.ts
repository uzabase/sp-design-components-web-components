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
    this.#inputElement.maxLength = -1;
    this.#updateCharacterCounter();
  }

  get characterLimit() {
    return parseInt(this.getAttribute("character-limit") || "0");
  }
  set characterLimit(val: number) {
    this.setAttribute("character-limit", String(val));
    this.#updateCharacterCounter();
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
    this.#updateErrorTextVisibility();
  }

  get showCharacterCounter() {
    return this.hasAttribute("show-character-counter");
  }
  set showCharacterCounter(val: boolean) {
    if (val) {
      this.setAttribute("show-character-counter", "");
    } else {
      this.removeAttribute("show-character-counter");
    }
    this.#updateCharacterCounterVisibility();
  }

  static get observedAttributes() {
    return [
      "value",
      "placeholder",
      "disabled",
      "readonly",
      "type",
      "maxlength",
      "character-limit",
      "name",
      "required",
      "autofocus",
      "invalid",
      "show-character-counter",
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
    this.#container.classList.add("container");
    this.#container.appendChild(this.#inputElement);
    this.shadowRoot!.appendChild(this.#container);
  }

  #setupErrorSlot() {
    this.#errorSlot.name = "error-text";
    // sp-error-textでラップ
    const errorText = document.createElement("sp-error-text");
    errorText.appendChild(this.#errorSlot);
    errorText.style.display = "none";

    // エラーテキストと文字数カウンターを同列に配置するためのコンテナ
    const errorContainer = document.createElement("div");
    errorContainer.classList.add("error-container");

    // エラーテキストをコンテナに追加
    errorContainer.appendChild(errorText);

    // 新しいコンテナを追加
    this.#container.appendChild(errorContainer);

    this.#updateErrorTextVisibility();
  }

  #setupCharacterCounter() {
    this.#characterCounter.classList.add("character-counter");

    // 既存のエラーコンテナに文字数カウンターを追加
    const errorContainer = this.#container.querySelector(".error-container");
    if (errorContainer) {
      errorContainer.appendChild(this.#characterCounter);
    }

    this.#updateCharacterCounterVisibility();
  }

  #updateErrorTextVisibility() {
    if (!this.#container) return;
    const errorText = this.#container.querySelector(
      "sp-error-text",
    ) as HTMLElement;
    const errorContainer = this.#container.querySelector(
      ".error-container",
    ) as HTMLElement;

    if (!errorText || !errorContainer) return;

    if (this.invalid) {
      errorText.style.display = "block";
    } else {
      errorText.style.display = "none";
    }

    // 文字数カウンターが表示される場合は、エラーコンテナを常に表示
    const hasCharacterCounter =
      this.showCharacterCounter && this.characterLimit > 0;
    if (this.invalid || hasCharacterCounter) {
      errorContainer.style.display = "flex";
    } else {
      errorContainer.style.display = "none";
    }
  }

  #updateCharacterCounterVisibility() {
    if (!this.#characterCounter) return;

    if (this.showCharacterCounter && this.characterLimit > 0) {
      this.#characterCounter.style.display = "inline-block";
      this.#updateCharacterCounter();
    } else {
      this.#characterCounter.style.display = "none";
    }

    // エラーテキストの表示制御も更新
    this.#updateErrorTextVisibility();
  }

  #updateCharacterCounter() {
    if (
      !this.#characterCounter ||
      !this.showCharacterCounter ||
      this.characterLimit <= 0
    )
      return;

    const currentLength = this.value.length;
    const maxLength = this.characterLimit;

    // sp-character-counterの属性を更新
    this.#characterCounter.setAttribute("current", String(currentLength));
    this.#characterCounter.setAttribute("max", String(maxLength));
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
    } else if (name === "character-limit") {
      this.characterLimit = parseInt(newValue) || 0;
    } else if (name === "name") {
      this.name = newValue;
    } else if (name === "required") {
      this.required = newValue === "" || newValue === "true";
    } else if (name === "autofocus") {
      this.autofocus = newValue === "" || newValue === "true";
    } else if (name === "invalid") {
      this.invalid = newValue === "" || newValue === "true";
      this.#updateErrorTextVisibility();
    } else if (name === "show-character-counter") {
      this.showCharacterCounter = newValue === "" || newValue === "true";
      this.#updateCharacterCounterVisibility();
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
