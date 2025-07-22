import { makeStyleSheet } from "../../styles";
import errorTextStyle from "./error-text.css?inline";

/**
 * SpErrorTextは、デザインシステム2.0におけるエラーテキストコンポーネントです。
 * フォームフィールドのエラーメッセージを表示するために使用します。
 *
 * @element sp-error-text
 * @summary エラーテキストコンポーネント
 *
 * @slot - エラーメッセージのテキストコンテンツ（デフォルトスロット）
 */
export class SpErrorText extends HTMLElement {
  #errorElement = document.createElement("div");
  #slotElement = document.createElement("slot");

  constructor() {
    super();

    this.attachShadow({ mode: "open" });

    this.shadowRoot!.adoptedStyleSheets = [
      ...this.shadowRoot!.adoptedStyleSheets,
      makeStyleSheet(errorTextStyle),
    ];

    this.#setupElements();
  }

  connectedCallback() {
    this.shadowRoot!.appendChild(this.#errorElement);
  }

  #setupElements() {
    this.#errorElement.classList.add("base");
    this.#errorElement.appendChild(this.#slotElement);
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
