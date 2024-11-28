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
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "sp-dropdown-select": SpDropdownSelect;
  }
}

customElements.get("sp-dropdown-select") ||
  customElements.define("sp-dropdown-select", SpDropdownSelect);
