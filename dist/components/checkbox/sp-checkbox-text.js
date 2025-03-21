import { UbCheckboxText } from "@ub-design/components-web-components/";
import foundationStyle from "../foundation.css?inline";
import checkboxTextStyle from "./checkbox-text.css?inline";
import checkmarkStyle from "./checkmark.css?inline";
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
if (!customElements.get("sp-checkbox-text")) {
    customElements.define("sp-checkbox-text", SpCheckboxText);
}
