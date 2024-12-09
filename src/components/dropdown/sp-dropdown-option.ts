// @ts-ignore
import resetStyle from "@acab/reset.css?inline" assert { type: "css" };
// @ts-ignore
import foundationStyle from "../foundation.css?inline" assert { type: "css" };
// @ts-ignore
import dropdownOptionStyle from "./sp-dropdown-option.css?inline" assert { type: "css" };
import "../icon/sp-icon";

const styles = new CSSStyleSheet();
styles.replaceSync(`${resetStyle} ${foundationStyle} ${dropdownOptionStyle}`);

export class SpDropdownOption extends HTMLElement {
  #baseElement = document.createElement("div");
  #iconAreaElement = document.createElement("div");
  #iconElement = document.createElement("sp-icon");
  #textElement = document.createElement("span");

  #text: string = "Text";

  get text() {
    return this.#text;
  }

  set text(val: string) {
    console.log("🚀 ~ SpDropdownOption ~ settext ~ val:", val);
    this.#text = val;
    this.#textElement.textContent = val;
    console.log({ val });
  }

  static get observedAttributes() {
    return ["text"];
  }

  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.adoptedStyleSheets = [...shadowRoot.adoptedStyleSheets, styles];
  }

  connectedCallback() {
    this.#iconElement.size = "small";
    this.#iconElement.type = "check";
    this.#iconElement.text = "check";

    this.#iconAreaElement.classList.add("icon-area");
    this.#iconAreaElement.appendChild(this.#iconElement);

    this.#textElement.classList.add("text");

    this.#baseElement.classList.add("base");
    this.#baseElement.role = "option";
    this.#baseElement.appendChild(this.#iconAreaElement);
    this.#baseElement.appendChild(this.#textElement);

    this.shadowRoot?.appendChild(this.#baseElement);
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) return;
    switch (name) {
      case "text":
        this.text = newValue;
        break;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "sp-dropdown-option": SpDropdownOption;
  }
}

customElements.get("sp-dropdown-option") ||
  customElements.define("sp-dropdown-option", SpDropdownOption);
