import { UbRadioButtonTextGroup } from "@ub-design/components-web-components/";

import { makeStyleSheet } from "../styles";
import segmentedControlStyle from "./segmented-control.css?inline";

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
