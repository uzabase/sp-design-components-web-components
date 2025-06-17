import resetStyle from "@acab/reset.css?inline";

import foundationStyle from "../foundation.css?inline";
import spDefinitionListDdStyle from "./sp-definition-list-dd.css?inline";

const styles = new CSSStyleSheet();
styles.replaceSync(
  `${resetStyle} ${foundationStyle} ${spDefinitionListDdStyle}`,
);

/**
 * SpDefinitionListDdは、デザインシステム2.0における定義リストの説明項目コンポーネントです。
 * 定義リスト内で用語の説明を表示するために使用します。
 *
 * @element sp-definition-list-dd
 * @summary 定義リストの説明項目コンポーネント
 *
 * @slot - 説明のテキストコンテンツ（デフォルトスロット）
 */
export class SpDefinitionListDd extends HTMLElement {
  #ddElement = document.createElement("dd");

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.shadowRoot!.adoptedStyleSheets = [
      ...this.shadowRoot!.adoptedStyleSheets,
      styles,
    ];

    this.#ddElement.classList.add("base");
    this.#ddElement.innerHTML = this.innerHTML;

    this.shadowRoot!.appendChild(this.#ddElement);
  }
}

if (!customElements.get("sp-definition-list-dd")) {
  customElements.define("sp-definition-list-dd", SpDefinitionListDd);
}

declare global {
  interface HTMLElementTagNameMap {
    "sp-definition-list-dd": SpDefinitionListDd;
  }
}
