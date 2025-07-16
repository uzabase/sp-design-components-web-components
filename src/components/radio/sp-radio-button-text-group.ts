import { UbRadioButtonTextGroup } from "@ub-design/components-web-components/";

import { makeStyleSheet } from "../styles";
import radioButtonTextGroupStyle from "./radio-button-text-group.css?inline";

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
      makeStyleSheet(radioButtonTextGroupStyle),
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
