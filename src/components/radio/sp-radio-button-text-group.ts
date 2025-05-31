import { UbRadioButtonTextGroup } from "@ub-design/components-web-components/";

import foundationStyle from "../foundation.css?inline";
import radioButtonTextGroupStyle from "./radio-button-text-group.css?inline";

const styles = new CSSStyleSheet();
styles.replaceSync(`${foundationStyle} ${radioButtonTextGroupStyle}`);

/**
 * SpRadioButtonTextGroupは、デザインシステム2.0におけるテキスト付きラジオボタングループコンポーネントです。
 * 複数の選択肢から一つを選択するためのラジオボタンのグループを提供します。
 *
 * @element sp-radio-button-text-group
 * @summary テキスト付きラジオボタングループコンポーネント
 *
 * @slot - ラジオボタンの選択肢（デフォルトスロット）
 */
export class SpRadioButtonTextGroup extends UbRadioButtonTextGroup {
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
    "sp-radio-button-text-group": SpRadioButtonTextGroup;
  }
}

if (!customElements.get("sp-radio-button-text-group")) {
  customElements.define("sp-radio-button-text-group", SpRadioButtonTextGroup);
}
