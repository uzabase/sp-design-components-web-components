import resetStyle from "@acab/reset.css?inline";

import foundationStyle from "../foundation.css?inline";
import notificationMessageStyle from "./notification-message.css?inline";

export type Type = "error" | "warning" | "information" | "success";

const types: Type[] = ["error", "warning", "information", "success"];

function isValidType(value: string): value is Type {
  return types.some((type) => type === value);
}

export const iconAriaLabels: Record<Type, string> = {
  error: "エラー",
  warning: "警告",
  information: "情報",
  success: "成功",
};

const typeClasses: Record<Type, string> = {
  error: "type__error",
  warning: "type__warning",
  information: "type__information",
  success: "type__success",
};

export const iconPaths: Record<Type, string> = {
  error:
    '<path fill-rule="evenodd" clip-rule="evenodd" d="M2.58 18.8574L11.3416 3.99902H12.6459L21.4075 18.8574L20.7554 19.999H3.23212L2.58 18.8574ZM11.2 9.5V14.5H12.8V9.5H11.2ZM11.2 16V17.5H12.8V16H11.2Z" fill="#CA3232"></path>',
  information:
    '<path fill-rule="evenodd" clip-rule="evenodd" d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21ZM11.2 7.71997V9.49997H12.8V7.71997H11.2ZM10.5 16.2V16.72H13.5V16.2L12.8 16V11H10.5V11.8L11.2 12V16L10.5 16.2Z" fill="#3978BF"></path>',
  success:
    '<path fill-rule="evenodd" clip-rule="evenodd" d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21ZM15.5303 10.5303L14.4697 9.46967L11 12.9393L9.53033 11.4697L8.46967 12.5303L10.4697 14.5303L11 15.0607L11.5303 14.5303L15.5303 10.5303Z" fill="#1A7037"></path>',
  warning:
    '<path fill-rule="evenodd" clip-rule="evenodd" d="M2.58 18.8574L11.3416 3.99902H12.6459L21.4075 18.8574L20.7554 19.999H3.23212L2.58 18.8574ZM11.2 9.5V14.5H12.8V9.5H11.2ZM11.2 16V17.5H12.8V16H11.2Z" fill="#EAB100"></path>',
};

const styles = new CSSStyleSheet();
styles.replaceSync(
  `${resetStyle} ${foundationStyle} ${notificationMessageStyle}`,
);

/**
 * SpNotificationMessageは、デザインシステム2.0における通知メッセージコンポーネントです。
 * ユーザーに情報、警告、エラー、成功メッセージを表示するために使用します。
 *
 * @element sp-notification-message
 * @summary 通知メッセージコンポーネント
 *
 * @slot - 通知メッセージのコンテンツ（デフォルトスロット）
 */
export class SpNotificationMessage extends HTMLElement {
  #type: Type = "information";

  #baseElement = document.createElement("div");
  #iconElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");

  /**
   * 通知の種類（"error"、"warning"、"information"、または "success"）
   * - "error": エラーメッセージ
   * - "warning": 警告メッセージ
   * - "information": 情報メッセージ
   * - "success": 成功メッセージ
   *
   * @attribute
   * @type {"error"|"warning"|"information"|"success"}
   * @default "information"
   */
  get type() {
    return this.#type;
  }
  set type(value: Type) {
    this.#baseElement.classList.remove(typeClasses[this.#type]);
    this.#baseElement.classList.add(typeClasses[value]);
    this.#iconElement.innerHTML = iconPaths[value];
    this.#type = value;
  }

  static get observedAttributes() {
    return ["type"];
  }

  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot!.adoptedStyleSheets = [
      ...this.shadowRoot!.adoptedStyleSheets,
      styles,
    ];

    this.type = "information";
  }

  connectedCallback() {
    this.#setupBaseElement();
    this.#setupIconElement();
    const content = this.#createContentElement();
    this.#assembleElements(content);
    this.shadowRoot!.appendChild(this.#baseElement);
  }

  #setupBaseElement() {
    this.#baseElement.classList.add("base");
  }

  #setupIconElement() {
    this.#iconElement.setAttribute("role", "img");
    this.#iconElement.setAttribute("viewBox", "0 0 24 24");
    this.#iconElement.setAttribute("aria-hidden", "false");
    this.#iconElement.setAttribute("aria-label", iconAriaLabels[this.type]);
    this.#iconElement.classList.add("icon");
    this.#iconElement.innerHTML = iconPaths[this.type];
  }

  #createContentElement() {
    const content = document.createElement("div");
    content.classList.add("content");

    const slot = document.createElement("slot");
    content.appendChild(slot);

    return content;
  }

  #assembleElements(content: HTMLElement) {
    this.#baseElement.appendChild(this.#iconElement);
    this.#baseElement.appendChild(content);
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) return;

    if (name === "type") {
      this.#handleTypeAttribute(newValue);
    }
  }

  #handleTypeAttribute(value: string): void {
    if (isValidType(value)) {
      this.type = value;
    } else {
      console.warn(`${value}は無効なtype属性です。`);
      this.type = "information";
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "sp-notification-message": SpNotificationMessage;
  }
}

if (!customElements.get("sp-notification-message")) {
  customElements.define("sp-notification-message", SpNotificationMessage);
}
