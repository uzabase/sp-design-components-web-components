import { UbIcon } from "@ub-design/components-web-components/";
import { speedaIconPaths } from "./icons";
// @ts-ignore
import iconStyle from "./icon.css?inline" assert { type: "css" };
function isSpeedaIconType(type) {
    return speedaIconPaths.hasOwnProperty(type);
}
const styles = new CSSStyleSheet();
styles.replaceSync(iconStyle);
export class SpIcon extends UbIcon {
    constructor() {
        super();
        this.paths = { ...speedaIconPaths, "": "" };
        if (this.shadowRoot) {
            this.shadowRoot.adoptedStyleSheets = [
                ...this.shadowRoot.adoptedStyleSheets,
                styles,
            ];
        }
    }
    set type(value) {
        super.type = isSpeedaIconType(value) ? value : "";
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if (name === "type") {
            const type = isSpeedaIconType(newValue) ? newValue : "";
            super.attributeChangedCallback(name, oldValue, type);
        }
        else {
            super.attributeChangedCallback(name, oldValue, newValue);
        }
    }
}
customElements.get("sp-icon") || customElements.define("sp-icon", SpIcon);
