import { UbIcon } from "@ub-design/components-web-components/";
import { speedaIconPaths } from "./icons";

// @ts-ignore
import iconStyle from "./icon.css?inline" assert { type: "css" };

const styles = new CSSStyleSheet();
styles.replaceSync(iconStyle);

export class SpIcon extends UbIcon {
  paths = speedaIconPaths;

  constructor() {
    super();
    this.shadowRoot.adoptedStyleSheets = [
      ...this.shadowRoot.adoptedStyleSheets,
      styles,
    ];
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "sp-icon": SpIcon;
  }
}

customElements.get("sp-icon") || customElements.define("sp-icon", SpIcon);
