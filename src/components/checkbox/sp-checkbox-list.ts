import { UbCheckboxText } from "@ub-design/components-web-components/";

import { makeStyleSheet } from "../styles";
import checkboxListStyle from "./checkbox-list.css?inline";
import checkmarkStyle from "./checkmark.css?inline";

export class SpCheckboxList extends UbCheckboxText {
  constructor() {
    super();

    this.shadowRoot!.adoptedStyleSheets = [
      ...this.shadowRoot!.adoptedStyleSheets,
      makeStyleSheet(checkmarkStyle, checkboxListStyle),
    ];
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "sp-checkbox-list": SpCheckboxList;
  }
}

if (!customElements.get("sp-checkbox-list")) {
  customElements.define("sp-checkbox-list", SpCheckboxList);
}
