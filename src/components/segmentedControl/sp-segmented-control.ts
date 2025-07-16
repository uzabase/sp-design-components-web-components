import { UbRadioButtonTextGroup } from "@ub-design/components-web-components/";

import { makeStyleSheet } from "../styles";
import segmentedControlStyle from "./segmented-control.css?inline";

/**
 * SpSegmentedControlは、デザインシステム2.0におけるセグメント化コントロールコンポーネントです。
 * 関連する選択肢をセグメント化されたボタンとして表示し、一つを選択できます。
 *
 * @element sp-segmented-control
 * @summary セグメント化コントロールコンポーネント
 *
 * @slot - セグメントの選択肢（デフォルトスロット）
 */
export class SpSegmentedControl extends UbRadioButtonTextGroup {
  constructor() {
    super();

    this.shadowRoot!.adoptedStyleSheets = [
      ...this.shadowRoot!.adoptedStyleSheets,
      makeStyleSheet(segmentedControlStyle),
    ];
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "sp-segmented-control": SpSegmentedControl;
  }
}

if (!customElements.get("sp-segmented-control")) {
  customElements.define("sp-segmented-control", SpSegmentedControl);
}
