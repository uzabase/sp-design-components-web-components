import { UbCheckbox } from "@ub-design/components-web-components/";
// @ts-ignore
import foundationStyle from "../foundation.css?inline" assert { type: "css" };
// @ts-ignore
import checkmarkStyle from "./checkmark.css?inline" assert { type: "css" };
// @ts-ignore
import checkboxStyle from "./checkbox.css?inline" assert { type: "css" };
import { SpButton } from "../button/sp-button";

const styles = new CSSStyleSheet();
styles.replaceSync(`${foundationStyle} ${checkmarkStyle} ${checkboxStyle}`);

export class SpCheckbox extends UbCheckbox {
  static styles = [...UbCheckbox.styles, styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "sp-checkbox": SpCheckbox;
  }
}

customElements.get("sp-checkbox") ||
  customElements.define("sp-checkbox", SpCheckbox);
