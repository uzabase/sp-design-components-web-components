import { UbButton } from "@ub-design/components-web-components/src/";
// @ts-ignore
import foundationStyle from "../foundation.css?inline" assert { type: "css" };
// @ts-ignore
import buttonStyle from "./sp-button.css?inline" assert { type: "css" };

const styles = new CSSStyleSheet();
styles.replaceSync(`${foundationStyle} ${buttonStyle}`);

export class SpButton extends UbButton {
  static override styles = [...UbButton.styles, styles];
}

customElements.get("sp-button") || customElements.define("sp-button", SpButton);
