import resetStyle from "@acab/reset.css?inline";

import foundationStyle from "../foundation.css?inline";
import spDefinitionListDtStyle from "./sp-definition-list-dt.css?inline";

const styles = new CSSStyleSheet();
styles.replaceSync(
  `${resetStyle} ${foundationStyle} ${spDefinitionListDtStyle}`,
);

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
      styles,
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
