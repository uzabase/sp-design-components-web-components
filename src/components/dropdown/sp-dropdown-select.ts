// @ts-ignore
import resetStyle from "@acab/reset.css?inline" assert { type: "css" };
// @ts-ignore
import foundationStyle from "../foundation.css?inline" assert { type: "css" };
// @ts-ignore
import dropdownSelectStyle from "./sp-dropdown-select.css?inline" assert { type: "css" };
import "../icon/sp-icon";

const styles = new CSSStyleSheet();
styles.replaceSync(`${resetStyle} ${foundationStyle} ${dropdownSelectStyle}`);

class SpDropdownSelect extends HTMLElement {
  #baseElement = document.createElement("div");
  #inputElement = document.createElement("input");
  // 横幅を文字に応じて変えるために https://www.bring-flower.com/blog/adjust-width-of-input-element/ の方法を使用している。
  // CSSの field-sizing がstableになったらそちらを使えば良い
  #inputWrapperElement = document.createElement("div");
  #dummyTextBoxElement = document.createElement("span");
  #iconWrapperElement = document.createElement("div");
  #iconElement = document.createElement("sp-icon");

  // TODO: set defaultValue prop
  #value: string = "default";

  get value() {
    return this.#value;
  }

  set value(val: string) {
    this.#value = val;
    this.#inputElement.value = val;
    this.#adjustInputWidth();
  }

  static get observedAttributes() {
    return ["value"];
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

    this.#dummyTextBoxElement.classList.add("dummy-text-box");
    this.#dummyTextBoxElement.ariaHidden = "true";

    this.#inputWrapperElement.classList.add("input-wrapper");
    this.#inputWrapperElement.appendChild(this.#inputElement);
    this.#inputWrapperElement.appendChild(this.#dummyTextBoxElement);

    this.#iconElement.size = "small";
    this.#iconElement.type = "arrow_down";
    this.#iconElement.text = "arrow_down";

    this.#iconWrapperElement.classList.add("icon-wrapper");
    this.#iconWrapperElement.appendChild(this.#iconElement);

    this.#baseElement.classList.add("base");
    this.#baseElement.appendChild(this.#inputWrapperElement);
    this.#baseElement.appendChild(this.#iconWrapperElement);

    this.shadowRoot?.appendChild(this.#baseElement);
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) return;
    switch (name) {
      case "value":
        this.value = newValue;
        break;
    }
  }

  #adjustInputWidth() {
    this.#dummyTextBoxElement.textContent = this.#inputElement.value || "";
    // 左右のborderの分（2px）余裕を持たないとellipsisになってしまう
    this.#inputElement.style.width = this.#dummyTextBoxElement.clientWidth + 2 + 'px';
    console.log("🚀 ~ SpDropdownSelect ~ #adjustInputWidth ~ this.#dummyTextBoxElement.clientWidth:", this.#dummyTextBoxElement.clientWidth)
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "sp-dropdown-select": SpDropdownSelect;
  }
}

customElements.get("sp-dropdown-select") ||
  customElements.define("sp-dropdown-select", SpDropdownSelect);
