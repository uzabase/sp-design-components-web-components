import { UbButton } from "@ub-design/components-web-components/";
// @ts-ignore
import foundationStyle from "../foundation.css?inline" assert { type: "css" };
// @ts-ignore
import buttonStyle from "./button.css?inline" assert { type: "css" };
import { SpIcon } from "../icon/sp-icon";

const styles = new CSSStyleSheet();
styles.replaceSync(`${foundationStyle} ${buttonStyle}`);

export class SpButton extends UbButton {
  #icon = "";
  #iconElement = new SpIcon();

  get icon() {
    return this.#icon;
  }
  set icon(val: string) {
    if (!this.#icon && val) {
      this.#appendIconElement();
      this.#updateIconElement(val);
    } else if (val === "") {
      this.#removeIconElement();
    } else {
      this.#updateIconElement(val);
    }
    this.#icon = val;
  }

  static get observedAttributes() {
    return [...super.observedAttributes, "icon"];
  }

  constructor() {
    super();

    if (this.shadowRoot) {
      this.shadowRoot.adoptedStyleSheets = [
        ...this.shadowRoot!.adoptedStyleSheets,
        styles,
      ];
    }

    this.#iconElement.classList.add("base__icon");
    this.#iconElement.size = "small";
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) return;
    super.attributeChangedCallback(name, oldValue, newValue);
    switch (name) {
      case "icon":
        this.icon = newValue;
        break;
    }
  }

  #appendIconElement() {
    this.buttonElement.insertBefore(this.#iconElement, this.textElement);
  }

  #removeIconElement() {
    this.#iconElement.remove();
  }

  #updateIconElement(type: string) {
    this.#iconElement.type = type;
  }
}

customElements.get("sp-button") || customElements.define("sp-button", SpButton);

declare global {
  interface HTMLElementTagNameMap {
    "sp-button": SpButton;
  }
}
