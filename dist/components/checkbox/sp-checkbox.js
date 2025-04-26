import { UbCheckbox } from "@ub-design/components-web-components/";
import foundationStyle from "../foundation.css?inline";
import checkboxStyle from "./checkbox.css?inline";
import checkmarkStyle from "./checkmark.css?inline";
const styles = new CSSStyleSheet();
styles.replaceSync(`${foundationStyle} ${checkmarkStyle} ${checkboxStyle}`);
export class SpCheckbox extends UbCheckbox {
    constructor() {
        super();
        this.shadowRoot.adoptedStyleSheets = [
            ...this.shadowRoot.adoptedStyleSheets,
            styles,
        ];
    }
}
if (!customElements.get("sp-checkbox")) {
    customElements.define("sp-checkbox", SpCheckbox);
}
