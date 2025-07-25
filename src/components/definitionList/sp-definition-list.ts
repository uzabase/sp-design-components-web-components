import { makeStyleSheet } from "../styles";
import spDefinitionListStyle from "./sp-definition-list.css?inline";

/**
 * SpDefinitionListは、デザインシステム2.0における定義リストコンポーネントです。
 * 用語とその定義をペアで表示するリストを提供します。
 *
 * @element sp-definition-list
 * @summary 定義リストコンポーネント
 *
 * @slot - 定義リストの項目（デフォルトスロット）
 */
export class SpDefinitionList extends HTMLElement {
  #dlElement = document.createElement("dl");
  #slotElement = document.createElement("slot");

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.shadowRoot!.adoptedStyleSheets = [
      ...this.shadowRoot!.adoptedStyleSheets,
      makeStyleSheet(spDefinitionListStyle),
    ];

    this.#dlElement.classList.add("base");
    this.#dlElement.appendChild(this.#slotElement);
    this.shadowRoot!.appendChild(this.#dlElement);
  }
}

if (!customElements.get("sp-definition-list")) {
  customElements.define("sp-definition-list", SpDefinitionList);
}

declare global {
  interface HTMLElementTagNameMap {
    "sp-definition-list": SpDefinitionList;
  }
}
