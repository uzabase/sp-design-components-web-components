import { UbCheckboxText } from "@ub-design/components-web-components/";

import foundationStyle from "../foundation.css?inline";
import checkboxListStyle from "./checkbox-list.css?inline";
import checkmarkStyle from "./checkmark.css?inline";

const styles = new CSSStyleSheet();
styles.replaceSync(`${foundationStyle} ${checkmarkStyle} ${checkboxListStyle}`);

/**
 * SpCheckboxListは、デザインシステム2.0におけるリスト形式のチェックボックスコンポーネントです。
 *
 * @element sp-checkbox-list
 * @summary リスト形式のチェックボックスコンポーネント
 *
 * @slot - チェックボックスのラベルテキスト（デフォルトスロット）
 */
export class SpCheckboxList extends UbCheckboxText {
  constructor() {
    super();

    this.shadowRoot!.adoptedStyleSheets = [
      ...this.shadowRoot!.adoptedStyleSheets,
      styles,
    ];
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "sp-checkbox-list": SpCheckboxList;
  }
}

if (!customElements.get("sp-checkbox-list")) {
  customElements.define("sp-checkbox-list", SpCheckboxList);
}
