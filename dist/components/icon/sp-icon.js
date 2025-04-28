import { UbIcon } from "@ub-design/components-web-components/";
import iconStyle from "./icon.css?inline";
import { speedaIconPaths } from "./icons";
function isSpeedaIconType(type) {
    return Object.hasOwnProperty.call(speedaIconPaths, type);
}
const styles = new CSSStyleSheet();
styles.replaceSync(iconStyle);
export class SpIcon extends UbIcon {
    constructor() {
        super();
        this.paths = { ...speedaIconPaths, "": "" };
        this.shadowRoot.adoptedStyleSheets = [
            ...this.shadowRoot.adoptedStyleSheets,
            styles,
        ];
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
if (!customElements.get("sp-icon")) {
    customElements.define("sp-icon", SpIcon);
}
