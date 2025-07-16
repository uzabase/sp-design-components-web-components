import { makeStyleSheet } from "../styles";
import dropdownActionItemStyle from "./dropdown-action-item.css?inline";

/**
 * SpDropdownActionItemは、デザインシステム2.0におけるドロップダウンアクション項目コンポーネントです。
 * ドロップダウンメニュー内のアクション項目として使用します。
 *
 * @element sp-dropdown-action-item
 * @summary ドロップダウンアクション項目コンポーネント
 *
 * @slot - アクション項目のテキストコンテンツ（デフォルトスロット）
 */
export class SpDropdownActionItem extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot!.adoptedStyleSheets = [
      ...this.shadowRoot!.adoptedStyleSheets,
      makeStyleSheet(dropdownActionItemStyle),
    ];
  }

  connectedCallback() {
    const baseElement = document.createElement("div");
    const buttonElement = document.createElement("button");
    const slotElement = document.createElement("slot");

    this.#setupRoleAttribute();
    this.#setupElements(baseElement, buttonElement);
    this.#assembleElements(baseElement, buttonElement, slotElement);
    this.shadowRoot!.appendChild(baseElement);
  }

  #setupRoleAttribute() {
    this.role = "menuitem";
  }

  #setupElements(
    baseElement: HTMLDivElement,
    buttonElement: HTMLButtonElement,
  ) {
    baseElement.classList.add("base");
    buttonElement.classList.add("action");
  }

  #assembleElements(
    baseElement: HTMLDivElement,
    buttonElement: HTMLButtonElement,
    slotElement: HTMLSlotElement,
  ) {
    buttonElement.appendChild(slotElement);
    baseElement.appendChild(buttonElement);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "sp-dropdown-action-item": SpDropdownActionItem;
  }
}

if (!customElements.get("sp-dropdown-action-item")) {
  customElements.define("sp-dropdown-action-item", SpDropdownActionItem);
}
