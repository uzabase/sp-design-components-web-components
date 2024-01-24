import { UbButton } from "@ub-design/components-web-components/";
import "../icon/sp-icon";
// @ts-ignore
import foundationStyle from "../foundation.css?inline" assert { type: "css" };
// @ts-ignore
import buttonStyle from "./button.css?inline" assert { type: "css" };
import { customElement, property, query } from "lit/decorators.js";
import { SpeedaIconTypes } from "../icon/icons";
import { SpIcon } from "../icon/sp-icon";

const styles = new CSSStyleSheet();
styles.replaceSync(`${foundationStyle} ${buttonStyle}`);

@customElement("sp-button")
export class SpButton extends UbButton {
  #_icon: SpeedaIconTypes | "" = "";
  #_iconElement: SpIcon;
  static styles = [...UbButton.styles, styles];

  @property({ type: String })
  set icon(val: SpeedaIconTypes | "") {
    if (this.#_icon === "" && val) {
      this.#_createIconElement(val);
    } else if (val == "") {
      this.#_removeIconElement();
    } else {
      this.#_updateIconElement(val);
    }
    this.#_icon = val || "";
  }
  get icon() {
    return this.#_icon;
  }

  @query("button")
  button!: HTMLButtonElement;

  async #_createIconElement(type: SpeedaIconTypes) {
    this.#_iconElement = document.createElement("sp-icon");
    this.#_iconElement.classList.add("base__icon");
    this.#_iconElement.setAttribute("type", type);
    this.#_iconElement.setAttribute("size", "small");
    await this.updateComplete;
    this.button.insertBefore(
      this.#_iconElement,
      this.button.getElementsByTagName("span")[0],
    );
  }

  #_removeIconElement() {
    if (!this.#_iconElement) return;
    this.#_iconElement.remove();
    this.#_iconElement = undefined;
  }

  #_updateIconElement(type: SpeedaIconTypes) {
    this.#_iconElement.setAttribute("type", type);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "sp-button": SpButton;
  }
}
