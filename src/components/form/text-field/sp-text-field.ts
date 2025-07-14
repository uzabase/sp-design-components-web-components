import resetStyle from "@acab/reset.css?inline";

import foundationStyle from "../../foundation.css?inline";
import textFieldStyle from "./text-field.css?inline";

const styles = new CSSStyleSheet();
styles.replaceSync(`${resetStyle} ${foundationStyle} ${textFieldStyle}`);

export class SpTextField extends HTMLElement {
  #inputElement: HTMLInputElement;

  // 基本的なinput属性のサポート
  get value() {
    return this.#inputElement.value;
  }
  set value(val: string) {
    this.#inputElement.value = val;
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

    const shadowRoot = this.attachShadow({ mode: "open" });

    // スタイルシートを適用
    shadowRoot.adoptedStyleSheets = [styles];

    // input要素を作成
    this.#inputElement = document.createElement("input");
    this.#inputElement.classList.add("text-field");

    // コンテナを作成
    const container = document.createElement("div");
    container.classList.add("container");
    container.appendChild(this.#inputElement);

    shadowRoot.appendChild(container);

    // イベントの転送
    this.#setupEventForwarding();
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) return;

    switch (name) {
      case "value":
        this.value = newValue;
        break;
      case "placeholder":
        this.placeholder = newValue;
        break;
      case "disabled":
        this.disabled = newValue !== null;
        break;
      case "readonly":
        this.readonly = newValue !== null;
        break;
      case "type":
        this.type = newValue || "text";
        break;
      case "maxlength":
        this.maxLength = parseInt(newValue) || -1;
        break;
      case "name":
        this.name = newValue;
        break;
      case "required":
        this.required = newValue !== null;
        break;
      case "autofocus":
        this.autofocus = newValue !== null;
        break;
      case "invalid":
        if (newValue !== null) {
          this.#inputElement.setAttribute("aria-invalid", "true");
        } else {
          this.#inputElement.removeAttribute("aria-invalid");
        }
        break;
    }
  }

  connectedCallback() {
    // 既存の属性を初期化
    for (const attr of SpTextField.observedAttributes) {
      const value = this.getAttribute(attr);
      if (value !== null) {
        this.attributeChangedCallback(attr, "", value);
      }
    }
  }

  // フォーカス関連のメソッド
  focus() {
    this.#inputElement.focus();
  }

  blur() {
    this.#inputElement.blur();
  }

  select() {
    this.#inputElement.select();
  }

  // バリデーション関連のメソッド
  checkValidity() {
    return this.#inputElement.checkValidity();
  }

  reportValidity() {
    return this.#inputElement.reportValidity();
  }

  setCustomValidity(message: string) {
    this.#inputElement.setCustomValidity(message);
  }

  #setupEventForwarding() {
    // 重要なイベントを転送
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
        // 元のイベントと同じ種類の新しいイベントを作成
        const forwardedEvent = new Event(eventType, {
          bubbles: event.bubbles,
          cancelable: event.cancelable,
        });

        // このコンポーネントからイベントを発火
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
