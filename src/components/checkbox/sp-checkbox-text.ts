import { UbCheckboxText } from "@ub-design/components-web-components/";

import foundationStyle from "../foundation.css?inline";
import checkboxTextStyle from "./checkbox-text.css?inline";
import checkmarkStyle from "./checkmark.css?inline";

const styles = new CSSStyleSheet();
styles.replaceSync(`${foundationStyle} ${checkmarkStyle} ${checkboxTextStyle}`);

/**
 * SpCheckboxTextは、デザインシステム2.0におけるテキスト付きチェックボックスコンポーネントです。
 *
 * @element sp-checkbox-text
 * @summary テキスト付きチェックボックスコンポーネント
 *
 * @slot - チェックボックスのラベルテキスト（デフォルトスロット）
 */
export class SpCheckboxText extends UbCheckboxText {
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
    "sp-checkbox-text": SpCheckboxText;
  }
}

if (!customElements.get("sp-checkbox-text")) {
  customElements.define("sp-checkbox-text", SpCheckboxText);
}
