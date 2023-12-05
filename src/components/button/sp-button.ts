import { UbButton } from "@ub-design/components-web-components";
import colorToken from "@sp-design/token/styles/speeda-tokens.css?inline" assert { type: "css" };
// @ts-ignore
import foundationStyle from "../foundation.css?inline" assert { type: "css" };
// @ts-ignore
import buttonStyle from "./sp-button.css?inline" assert { type: "css" };

const styles = new CSSStyleSheet();
styles.replaceSync(`${colorToken.replace(":root", ":host")} ${foundationStyle} ${buttonStyle}`);

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
