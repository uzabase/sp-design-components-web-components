import { UbCheckboxText } from "@ub-design/components-web-components/";

import { makeStyleSheet } from "../styles";
import checkboxTextStyle from "./checkbox-text.css?inline";
import checkmarkStyle from "./checkmark.css?inline";

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
      makeStyleSheet(checkmarkStyle, checkboxTextStyle),
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
