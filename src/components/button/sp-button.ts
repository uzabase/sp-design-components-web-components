import { UbButton } from "@ub-design/components-web-components/src/";
// @ts-ignore
import foundationStyle from "../foundation.css" assert { type: "css" };
// @ts-ignore
import buttonStyle from "./sp-button.css" assert { type: "css" };

const styles = new CSSStyleSheet();
styles.replaceSync(`${foundationStyle} ${buttonStyle}`);

export class SpButton extends UbButton {
  constructor() {
    super();
    this.shadowRoot!.adoptedStyleSheets = [
      ...(this.shadowRoot as ShadowRoot).adoptedStyleSheets,
      styles,
    ];
  }
}

customElements.get("sp-button") || customElements.define("sp-button", SpButton);
