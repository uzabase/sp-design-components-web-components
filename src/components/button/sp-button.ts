import { UbButton } from "@ub-design/components-web-components";

import { SpIcon } from "../icon/sp-icon";
import { makeStyleSheet } from "../styles";
import buttonStyle from "./button.css?inline";

/**
 * SpButtonは、デザインシステム2.0におけるボタンコンポーネントです。
 *
 * @element sp-button
 * @summary ボタンコンポーネント
 *
 * @slot - ボタンのテキストコンテンツ（デフォルトスロット）
 */
export class SpButton extends UbButton {
  #icon = "";
  #iconElement = new SpIcon();

  /**
   * ボタンに表示するアイコン名
   * 指定しない場合はアイコンを表示しません
   *
   * @attribute
   * @type {string}
   */
  get icon() {
    return this.#icon;
  }
  set icon(val: string) {
    if (!this.#icon && val) {
      this.#appendIconElement();
      this.#updateIconElement(val);
    } else if (val === "") {
      this.#removeIconElement();
    } else {
      this.#updateIconElement(val);
    }
    this.#icon = val;
  }

  static get observedAttributes() {
    return [...super.observedAttributes, "icon"];
  }

  constructor() {
    super();

    this.shadowRoot!.adoptedStyleSheets = [
      ...this.shadowRoot!.adoptedStyleSheets,
      makeStyleSheet(buttonStyle),
    ];

    this.#iconElement.classList.add("base__icon");

    this.#iconElement.size = "small";
  }
  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) return;
    super.attributeChangedCallback(name, oldValue, newValue);
    switch (name) {
      case "icon":
        this.icon = newValue;
        break;
    }
  }

  #appendIconElement() {
    this.buttonElement.prepend(this.#iconElement);
  }

  #removeIconElement() {
    this.#iconElement.remove();
  }

  #updateIconElement(type: string) {
    this.#iconElement.type = type;
  }
}

if (!customElements.get("sp-button")) {
  customElements.define("sp-button", SpButton);
}

declare global {
  interface HTMLElementTagNameMap {
    "sp-button": SpButton;
  }
}
