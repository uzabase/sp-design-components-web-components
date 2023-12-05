import { UbCheckboxText } from "./ub-checkbox-text";
// @ts-ignore
import colorToken from "@sp-design/token/styles/speeda-tokens.css?inline" assert { type: "css" };
// @ts-ignore
import foundationStyle from "../foundation.css?inline" assert { type: "css" };
// @ts-ignore
import checkmarkStyle from "./sp-checkmark.css?inline" assert { type: "css" };
// @ts-ignore
import checkboxTextStyle from "./sp-checkbox-text.css?inline" assert { type: "css" };

const styles = new CSSStyleSheet();
styles.replaceSync(
  `${colorToken} ${foundationStyle} ${checkmarkStyle} ${checkboxTextStyle}`,
);

export class SpCheckboxText extends UbCheckboxText {
  constructor() {
    super();
    this.shadowRoot!.adoptedStyleSheets = [
      ...this.shadowRoot.adoptedStyleSheets,
      styles,
    ];
  }
}

customElements.get("sp-checkbox-text") ||
  customElements.define("sp-checkbox-text", SpCheckboxText);
