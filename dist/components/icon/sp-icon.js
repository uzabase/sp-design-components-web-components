import { UbIcon } from "@ub-design/components-web-components/";
import { speedaIconPaths } from "./icons";
// @ts-ignore
import iconStyle from "./icon.css?inline" assert { type: "css" };
const styles = new CSSStyleSheet();
styles.replaceSync(iconStyle);
export class SpIcon extends UbIcon {
    constructor() {
        super(...arguments);
        this.paths = speedaIconPaths;
    }
}
SpIcon.styles = [...UbIcon.styles, styles];
customElements.get("sp-icon") || customElements.define("sp-icon", SpIcon);
