import { UbCheckbox } from "./ub-checkbox";
// @ts-ignore
import colorToken from "@sp-design/token/styles/speeda-tokens.css?inline" assert { type: "css" };
// @ts-ignore
import foundationStyle from "../foundation.css?inline" assert { type: "css" };
// @ts-ignore
import checkmarkStyle from "./sp-checkmark.css?inline" assert { type: "css" };

const styles = new CSSStyleSheet();
styles.replaceSync(`${colorToken} ${foundationStyle} ${checkmarkStyle}`);

export class SpCheckbox extends UbCheckbox {
  constructor() {
    super();
    this.shadowRoot!.adoptedStyleSheets = [
      ...this.shadowRoot.adoptedStyleSheets,
      styles,
    ];
  }
}

customElements.get("sp-checkbox") ||
  customElements.define("sp-checkbox", SpCheckbox);
