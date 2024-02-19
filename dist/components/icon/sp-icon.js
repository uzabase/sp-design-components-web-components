import { UbIcon } from "@ub-design/components-web-components/";
import { speedaIconPaths } from "./icons";
// @ts-ignore
import iconStyle from "./icon.css?inline" assert { type: "css" };
const styles = new CSSStyleSheet();
styles.replaceSync(iconStyle);
export class SpIcon extends UbIcon {
    constructor() {
        super();
        this.paths = speedaIconPaths;
        this.shadowRoot.adoptedStyleSheets = [
            ...this.shadowRoot.adoptedStyleSheets,
            styles,
        ];
    }
}
customElements.get("sp-icon") || customElements.define("sp-icon", SpIcon);
