import { UbRadioButtonTextGroup } from "@ub-design/components-web-components/";

import foundationStyle from "../foundation.css?inline";
import segmentedControlStyle from "./segmented-control.css?inline";

const styles = new CSSStyleSheet();
styles.replaceSync(`${foundationStyle} ${segmentedControlStyle}`);

export class SpSegmentedControl extends UbRadioButtonTextGroup {
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
    "sp-segmented-control": SpSegmentedControl;
  }
}

if (!customElements.get("sp-segmented-control")) {
  customElements.define("sp-segmented-control", SpSegmentedControl);
}
