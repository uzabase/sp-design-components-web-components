import { UbCheckboxText } from "@ub-design/components-web-components/";
// @ts-ignore
import foundationStyle from "../foundation.css?inline" assert { type: "css" };
// @ts-ignore
import checkmarkStyle from "./checkmark.css?inline" assert { type: "css" };
// @ts-ignore
import checkboxTextStyle from "./checkbox-text.css?inline" assert { type: "css" };

const styles = new CSSStyleSheet();
styles.replaceSync(`${foundationStyle} ${checkmarkStyle} ${checkboxTextStyle}`);

export class SpCheckboxText extends UbCheckboxText {
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
    "sp-checkbox-text": SpCheckboxText;
  }
}

customElements.get("sp-checkbox-text") ||
  customElements.define("sp-checkbox-text", SpCheckboxText);
