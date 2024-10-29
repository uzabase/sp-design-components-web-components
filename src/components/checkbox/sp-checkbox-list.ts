import { UbCheckboxText } from "@ub-design/components-web-components/";
// @ts-ignore
import foundationStyle from "../foundation.css?inline" assert { type: "css" };
// @ts-ignore
import checkmarkStyle from "./checkmark.css?inline" assert { type: "css" };
// @ts-ignore
import checkboxListStyle from "./checkbox-list.css?inline" assert { type: "css" };

const styles = new CSSStyleSheet();
styles.replaceSync(`${foundationStyle} ${checkmarkStyle} ${checkboxListStyle}`);

export class SpCheckboxList extends UbCheckboxText {
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
    "sp-checkbox-list": SpCheckboxList;
  }
}

customElements.get("sp-checkbox-list") ||
  customElements.define("sp-checkbox-list", SpCheckboxList);
