import { UbCheckbox } from "@ub-design/components-web-components/src/";
// @ts-ignore
import foundationStyle from "../foundation.css?inline" assert { type: "css" };
// @ts-ignore
import checkmarkStyle from "./checkmark.css?inline" assert { type: "css" };
// @ts-ignore
import checkboxStyle from "./sp-checkbox.css?inline" assert { type: "css" };

const styles = new CSSStyleSheet();
styles.replaceSync(`${foundationStyle} ${checkmarkStyle} ${checkboxStyle}`);

export class SpCheckbox extends UbCheckbox {
  static override styles = [...UbCheckbox.styles, styles];
}

customElements.get("sp-checkbox") ||
  customElements.define("sp-checkbox", SpCheckbox);