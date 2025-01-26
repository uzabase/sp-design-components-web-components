import { UbIcon } from "@ub-design/components-web-components/";

import iconStyle from "./icon.css?inline";
import { speedaIconPaths, SpeedaIconTypes } from "./icons";

function isSpeedaIconType(type: string): type is SpeedaIconTypes {
  return Object.hasOwnProperty.call(speedaIconPaths, type);
}

const styles = new CSSStyleSheet();
styles.replaceSync(iconStyle);

export class SpIcon extends UbIcon {
  paths = { ...speedaIconPaths, "": "" };

  constructor() {
    super();

    if (this.shadowRoot) {
      this.shadowRoot.adoptedStyleSheets = [
        ...this.shadowRoot.adoptedStyleSheets,
        styles,
      ];
    }
  }

  set type(value: string) {
    super.type = isSpeedaIconType(value) ? value : "";
  }

  attributeChangedCallback(
    name: string,
    oldValue: string,
    newValue: string,
  ): void {
    if (name === "type") {
      const type = isSpeedaIconType(newValue) ? newValue : "";
      super.attributeChangedCallback(name, oldValue, type);
    } else {
      super.attributeChangedCallback(name, oldValue, newValue);
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "sp-icon": SpIcon;
  }
}

if (!customElements.get("sp-icon")) {
  customElements.define("sp-icon", SpIcon);
}
