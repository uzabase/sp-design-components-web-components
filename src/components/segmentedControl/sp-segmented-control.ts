import { UbRadioButtonTextGroup } from "@ub-design/components-web-components/";
// @ts-ignore
import foundationStyle from "../foundation.css?inline" assert { type: "css" };
// @ts-ignore
import segmentedControlStyle from "./segmented-control.css?inline" assert { type: "css" };

const styles = new CSSStyleSheet();
styles.replaceSync(`${foundationStyle} ${segmentedControlStyle}`);

export class SpSegmentedControl extends UbRadioButtonTextGroup {
  constructor() {
    super();

    if (this.shadowRoot) {
      this.shadowRoot.adoptedStyleSheets = [
        ...this.shadowRoot.adoptedStyleSheets,
        styles,
      ];
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "sp-segmented-control": SpSegmentedControl;
  }
}

customElements.get("sp-segmented-control") ||
  customElements.define("sp-segmented-control", SpSegmentedControl);
