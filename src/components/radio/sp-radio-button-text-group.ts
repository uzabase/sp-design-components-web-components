import { UbRadioButtonTextGroup } from "@ub-design/components-web-components/";

import { makeStyleSheet } from "../styles";
import radioButtonTextGroupStyle from "./radio-button-text-group.css?inline";

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
