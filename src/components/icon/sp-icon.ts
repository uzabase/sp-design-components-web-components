import { customElement, property, query } from "lit/decorators.js";
import { UbIcon } from "@ub-design/components-web-components/src/";
import { speedaIcons } from "./icons";

// @ts-ignore
import iconStyle from "./icon.css?inline" assert { type: "css" };

const styles = new CSSStyleSheet();
styles.replaceSync(iconStyle);

type Color = "black" | "white";

@customElement("sp-icon")
export class SpIcon extends UbIcon {
  private _color: Color;
  static styles = [...UbIcon.styles, styles];

  paths = speedaIcons;

  @property({ type: String })
  set color(val: Color) {
    this._color = val || "black";
    setTimeout(() => {
      this.svg.classList.add("color__" + val);
    });
  }
  get color() {
    return this._color;
  }

  @query("svg")
  svg!: SVGElement;

  constructor() {
    super();
    this.color = this.color || "black";
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "sp-icon": SpIcon;
  }
}
