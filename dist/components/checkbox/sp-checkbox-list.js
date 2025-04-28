import { UbCheckboxText } from "@ub-design/components-web-components/";
import foundationStyle from "../foundation.css?inline";
import checkboxListStyle from "./checkbox-list.css?inline";
import checkmarkStyle from "./checkmark.css?inline";
const styles = new CSSStyleSheet();
styles.replaceSync(`${foundationStyle} ${checkmarkStyle} ${checkboxListStyle}`);
export class SpCheckboxList extends UbCheckboxText {
    constructor() {
        super();
        this.shadowRoot.adoptedStyleSheets = [
            ...this.shadowRoot.adoptedStyleSheets,
            styles,
        ];
    }
}
if (!customElements.get("sp-checkbox-list")) {
    customElements.define("sp-checkbox-list", SpCheckboxList);
}
