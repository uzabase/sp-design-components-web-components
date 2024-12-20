import { UbCheckbox } from "@ub-design/components-web-components/";
// @ts-ignore
import foundationStyle from "../foundation.css?inline" assert { type: "css" };
// @ts-ignore
import checkmarkStyle from "./checkmark.css?inline" assert { type: "css" };
// @ts-ignore
import checkboxStyle from "./checkbox.css?inline" assert { type: "css" };
const styles = new CSSStyleSheet();
styles.replaceSync(`${foundationStyle} ${checkmarkStyle} ${checkboxStyle}`);
export class SpCheckbox extends UbCheckbox {
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
customElements.get("sp-checkbox") ||
    customElements.define("sp-checkbox", SpCheckbox);
