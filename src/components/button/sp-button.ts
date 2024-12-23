import { UbButton } from "@ub-design/components-web-components/";
// @ts-ignore
import foundationStyle from "../foundation.css?inline" assert { type: "css" };
// @ts-ignore
import buttonStyle from "./button.css?inline" assert { type: "css" };

const styles = new CSSStyleSheet();
styles.replaceSync(`${foundationStyle} ${buttonStyle}`);

export class SpButton extends UbButton {
  constructor() {
    super();

    if (this.shadowRoot) {
      this.shadowRoot.adoptedStyleSheets = [
        ...this.shadowRoot!.adoptedStyleSheets,
        styles,
      ];
    }
    console.log("sp constructor done");
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "sp-button": SpButton;
  }
}

customElements.get("sp-button") || customElements.define("sp-button", SpButton);
