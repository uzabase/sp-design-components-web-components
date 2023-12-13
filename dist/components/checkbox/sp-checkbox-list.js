import { UbCheckboxList } from "@ub-design/components-web-components/";
// @ts-ignore
import foundationStyle from "../foundation.css?inline" assert { type: "css" };
// @ts-ignore
import checkmarkStyle from "./checkmark.css?inline" assert { type: "css" };
// @ts-ignore
import checkboxListStyle from "./checkbox-list.css?inline" assert { type: "css" };
const styles = new CSSStyleSheet();
styles.replaceSync(`${foundationStyle} ${checkmarkStyle} ${checkboxListStyle}`);
export class SpCheckboxList extends UbCheckboxList {
}
SpCheckboxList.styles = [...UbCheckboxList.styles, styles];
customElements.get("sp-checkbox-list") ||
    customElements.define("sp-checkbox-list", SpCheckboxList);
