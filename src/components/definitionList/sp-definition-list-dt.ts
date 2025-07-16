import { makeStyleSheet } from "../styles";
import spDefinitionListDtStyle from "./sp-definition-list-dt.css?inline";

/**
 * SpDefinitionListDtは、デザインシステム2.0における定義リストの用語項目コンポーネントです。
 * 定義リスト内で用語を表示するために使用します。
 *
 * @element sp-definition-list-dt
 * @summary 定義リストの用語項目コンポーネント
 *
 * @slot - 用語のテキストコンテンツ（デフォルトスロット）
 */
export class SpDefinitionListDt extends HTMLElement {
  #dtElement = document.createElement("dt");

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.shadowRoot!.adoptedStyleSheets = [
      ...this.shadowRoot!.adoptedStyleSheets,
      makeStyleSheet(spDefinitionListDtStyle),
    ];

    this.#dtElement.classList.add("base");
    this.#dtElement.innerHTML = this.innerHTML;
    this.shadowRoot!.appendChild(this.#dtElement);
  }
}

if (!customElements.get("sp-definition-list-dt")) {
  customElements.define("sp-definition-list-dt", SpDefinitionListDt);
}

declare global {
  interface HTMLElementTagNameMap {
    "sp-definition-list-dt": SpDefinitionListDt;
  }
}
