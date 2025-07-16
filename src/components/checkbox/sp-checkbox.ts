import { UbCheckbox } from "@ub-design/components-web-components/";

import { makeStyleSheet } from "../styles";
import checkboxStyle from "./checkbox.css?inline";
import checkmarkStyle from "./checkmark.css?inline";

export class SpCheckbox extends UbCheckbox {
  constructor() {
    super();

    this.shadowRoot!.adoptedStyleSheets = [
      ...this.shadowRoot!.adoptedStyleSheets,
      makeStyleSheet(checkmarkStyle, checkboxStyle),
    ];
  }
}
declare global {
  interface HTMLElementTagNameMap {
    "sp-checkbox": SpCheckbox;
  }
}

if (!customElements.get("sp-checkbox")) {
  customElements.define("sp-checkbox", SpCheckbox);
}
