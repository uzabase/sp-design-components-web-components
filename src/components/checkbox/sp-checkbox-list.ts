import { UbCheckboxList } from "@ub-design/components-web-components/";
// @ts-ignore
import foundationStyle from "../foundation.css?inline" assert { type: "css" };
// @ts-ignore
import checkmarkStyle from "./checkmark.css?inline" assert { type: "css" };
// @ts-ignore
import checkboxListStyle from "./checkbox-list.css?inline" assert { type: "css" };
import { SpCheckbox } from "./sp-checkbox";

const styles = new CSSStyleSheet();
styles.replaceSync(`${foundationStyle} ${checkmarkStyle} ${checkboxListStyle}`);

export class SpCheckboxList extends UbCheckboxList {
  static styles = [...UbCheckboxList.styles, styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "sp-checkbox-list": SpCheckboxList;
  }
}

customElements.get("sp-checkbox-list") ||
  customElements.define("sp-checkbox-list", SpCheckboxList);
