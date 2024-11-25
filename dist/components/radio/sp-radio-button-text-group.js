import { UbRadioButtonTextGroup } from "@ub-design/components-web-components/";
// @ts-ignore
import foundationStyle from "../foundation.css?inline" assert { type: "css" };
// @ts-ignore
import radioButtonTextGroupStyle from "./radio-button-text-group.css?inline" assert { type: "css" };
const styles = new CSSStyleSheet();
styles.replaceSync(`${foundationStyle} ${radioButtonTextGroupStyle}`);
export class SpRadioButtonTextGroup extends UbRadioButtonTextGroup {
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
customElements.get("sp-radio-button-text-group") ||
    customElements.define("sp-radio-button-text-group", SpRadioButtonTextGroup);
