import { UbIcon } from "@ub-design/components-web-components/";
import { speedaIconPaths } from "./icons";

// @ts-ignore
import iconStyle from "./icon.css?inline" assert { type: "css" };
import { SpButton } from "../button/sp-button";

const styles = new CSSStyleSheet();
styles.replaceSync(iconStyle);

export class SpIcon extends UbIcon {
  static styles = [...UbIcon.styles, styles];
  paths = speedaIconPaths;
}

declare global {
  interface HTMLElementTagNameMap {
    "sp-icon": SpIcon;
  }
}

customElements.get("sp-icon") || customElements.define("sp-icon", SpIcon);
