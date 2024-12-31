import { UbRadioButtonTextGroup } from "@ub-design/components-web-components/";

import foundationStyle from "../foundation.css?inline";
import radioButtonTextGroupStyle from "./radio-button-text-group.css?inline";

const styles = new CSSStyleSheet();
styles.replaceSync(`${foundationStyle} ${radioButtonTextGroupStyle}`);

export class SpRadioButtonTextGroup extends UbRadioButtonTextGroup {
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
    "sp-radio-button-text-group": SpRadioButtonTextGroup;
  }
}

if (!customElements.get("sp-radio-button-text-group")) {
  customElements.define("sp-radio-button-text-group", SpRadioButtonTextGroup);
}
