var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { customElement, property, query } from "lit/decorators.js";
import { UbIcon } from "@ub-design/components-web-components/";
import { speedaIcons } from "./icons";
// @ts-ignore
import iconStyle from "./icon.css?inline" assert { type: "css" };
const styles = new CSSStyleSheet();
styles.replaceSync(iconStyle);
let SpIcon = class SpIcon extends UbIcon {
    set color(val) {
        this._color = val || "regular";
        setTimeout(() => {
            this.svg.classList.add("color__" + val);
        });
    }
    get color() {
        return this._color;
    }
    constructor() {
        super();
        this.paths = speedaIcons;
        this.color = this.color || "regular";
    }
};
SpIcon.styles = [...UbIcon.styles, styles];
__decorate([
    property({ type: String })
], SpIcon.prototype, "color", null);
__decorate([
    query("svg")
], SpIcon.prototype, "svg", void 0);
SpIcon = __decorate([
    customElement("sp-icon")
], SpIcon);
export { SpIcon };
