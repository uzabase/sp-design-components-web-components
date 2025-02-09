import "../icon/sp-icon";

import resetStyle from "@acab/reset.css?inline";

import foundationStyle from "../foundation.css?inline";
import dropdownSelectStyle from "./sp-dropdown-select.css?inline";

const styles = new CSSStyleSheet();
styles.replaceSync(`${resetStyle} ${foundationStyle} ${dropdownSelectStyle}`);

export const DEFAULT_WIDTH = 160;

class SpDropdownSelect extends HTMLElement {
  #baseElement = document.createElement("div");
  #inputElement = document.createElement("input");
  #iconWrapperElement = document.createElement("div");
  #iconElement = document.createElement("sp-icon");

  #value: string = "";
  #width: number = DEFAULT_WIDTH;
  #placeholder: string = "";

  get value() {
    return this.#value;
  }

  set value(val: string) {
    this.#value = val;
    this.#inputElement.value = val;
  }

  get width() {
    return this.#width;
  }

  set width(val: number) {
    console.log("🚀 ~ SpDropdownSelect ~ setwidth ~ val:", val)
    this.#width = val;
    this.#inputElement.style.width = `${val}px`;
  }

  get placeholder() {
    return this.#placeholder;
  }

  set placeholder(val: string) {
    this.#placeholder = val;
    this.#inputElement.setAttribute("placeholder", val);
  }

  static get observedAttributes() {
    return ["value", "width", "placeholder"];
  }

  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.adoptedStyleSheets = [...shadowRoot.adoptedStyleSheets, styles];
  }

  connectedCallback() {
    this.#inputElement.classList.add("input");
    this.#inputElement.type = "text";
    this.#inputElement.readOnly = true;
    this.#inputElement.setAttribute("placeholder", this.placeholder);

    this.#iconElement.size = "small";
    this.#iconElement.type = "arrow_down";
    this.#iconElement.text = "arrow_down";

    this.#iconWrapperElement.classList.add("icon-wrapper");
    this.#iconWrapperElement.appendChild(this.#iconElement);

    this.#baseElement.classList.add("base");
    this.#baseElement.appendChild(this.#inputElement);
    this.#baseElement.appendChild(this.#iconWrapperElement);

    this.shadowRoot?.appendChild(this.#baseElement);
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) return;
    switch (name) {
      case "value":
        this.value = newValue;
        break;
      case "width":
        this.width = isNaN(Number(newValue)) ? DEFAULT_WIDTH : Number(newValue);
        break;
      case "placeholder":
        this.placeholder = newValue;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "sp-dropdown-select": SpDropdownSelect;
  }
}

if (!customElements.get("sp-dropdown-select")) {
  customElements.define("sp-dropdown-select", SpDropdownSelect);
}

export type { SpDropdownSelect };

// sp-dropdown-selectに任意のvalueを入れた時の幅を計算する関数
export function calculateDropDownSelectWidth(value: string): number {
  const baseElement = document.createElement("div");
  const inputElement = document.createElement("span");
  const iconWrapperElement = document.createElement("div");
  const iconElement = document.createElement("sp-icon");

  inputElement.classList.add("input");
  inputElement.innerText = value;

  iconElement.size = "small";
  iconElement.type = "arrow_down";
  iconElement.text = "arrow_down";

  iconWrapperElement.classList.add("icon-wrapper");
  iconWrapperElement.appendChild(iconElement);

  baseElement.classList.add("base");
  baseElement.appendChild(inputElement);
  baseElement.appendChild(iconWrapperElement);

  document.body.appendChild(baseElement);

  const width = inputElement.offsetWidth;

  document.body.removeChild(baseElement);

  return width;
}
