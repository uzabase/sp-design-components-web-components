import "../icon/sp-icon";

import resetStyle from "@acab/reset.css?inline";

import foundationStyle from "../foundation.css?inline";
import dropdownSelectStyle from "./sp-dropdown-select.css?inline";

export const DEFAULT_WIDTH = 160;

const styles = new CSSStyleSheet();
styles.replaceSync(`${resetStyle} ${foundationStyle} ${dropdownSelectStyle}`);

class SpDropdownSelect extends HTMLElement {
  #baseElement = document.createElement("span");
  #inputElement = document.createElement("input");
  #iconWrapperElement = document.createElement("div");
  #iconElement = document.createElement("sp-icon");

  #text: string = "";
  #width: number = DEFAULT_WIDTH;
  #placeholder: string = "";

  get text() {
    return this.#text;
  }

  set text(val: string) {
    this.#text = val;
    this.#inputElement.value = val;
  }

  get width() {
    return this.#width;
  }

  set width(val: number) {
    this.#width = val;
    this.#baseElement.style.width = `${val}px`;
  }

  get placeholder() {
    return this.#placeholder;
  }

  set placeholder(val: string) {
    this.#placeholder = val;
    this.#inputElement.setAttribute("placeholder", val);
  }

  static get observedAttributes() {
    return ["text", "width", "placeholder"];
  }

  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: "open", delegatesFocus: true });
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
    this.#iconElement.setAttribute("aria-hidden", "true");

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
      case "text":
        this.text = newValue;
        break;
      case "width":
        this.width = Number(newValue) ? Number(newValue) : DEFAULT_WIDTH;
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

// sp-dropdown-selectに特定のvalueを設定した際の幅を計算する関数
export function calculateDropdownSelectWidth(value: string): number {
  const paddingWidth = 42; // input要素の左右のpadding
  const borderWidth = 2; // input要素の左右のborder
  const fontSize = 12; // input要素のフォントサイズ
  const spanElement = document.createElement("span");
  spanElement.innerText = value;
  spanElement.style.fontSize = `${fontSize}px`;
  spanElement.style.visibility = "hidden";
  document.body.appendChild(spanElement);
  const width = spanElement.offsetWidth + paddingWidth + borderWidth;
  document.body.removeChild(spanElement);
  return width;
}
