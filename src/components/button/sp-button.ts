import { UbButton } from "@ub-design/components-web-components/src/";
// @ts-ignore
import colorToken from "@sp-design/token/styles/speeda-tokens.css" assert { type: "css" };
// @ts-ignore
import foundationStyle from "../foundation.css" assert { type: "css" };
// @ts-ignore
import buttonStyle from "./sp-button.css" assert { type: "css" };

const styles = new CSSStyleSheet();
styles.replaceSync(`${colorToken} ${foundationStyle} ${buttonStyle}`);

export class SpButton extends UbButton {
  constructor() {
    super();
    this.shadowRoot!.adoptedStyleSheets = [
      ...this.shadowRoot.adoptedStyleSheets,
      styles,
    ];
  }
}

customElements.get("sp-button") || customElements.define("sp-button", SpButton);
