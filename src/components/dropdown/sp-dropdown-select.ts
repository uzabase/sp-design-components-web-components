import "../icon/sp-icon";

import { makeStyleSheet } from "../styles";
import { LISTBOX_ID } from "./sp-dropdown-listbox";
import dropdownSelectStyle from "./sp-dropdown-select.css?inline";

export const DEFAULT_WIDTH = 160;

class SpDropdownSelect extends HTMLElement {
  #baseElement = document.createElement("button");
  #labelElement = document.createElement("span");
  #iconWrapperElement = document.createElement("div");
  #iconElement = document.createElement("sp-icon");

  #text: string = "";
  #placeholder: string = "";
  #expanded: boolean = false;

  get text() {
    return this.#text;
  }

  set text(val: string) {
    this.#text = val;
    if (val) {
      this.#labelElement.innerText = val;
      this.#labelElement.classList.remove("placeholder");
    } else {
      this.#labelElement.innerText = this.placeholder;
      this.#labelElement.classList.add("placeholder");
    }
  }
  get placeholder() {
    return this.#placeholder;
  }

  set placeholder(val: string) {
    this.#placeholder = val;
  }

  get expanded() {
    return this.#expanded;
  }
  set expanded(val: boolean) {
    this.#expanded = val;
    this.#baseElement.setAttribute("aria-expanded", String(val));
  }

  static get observedAttributes() {
    return ["text", "placeholder", "expanded"];
  }

  constructor() {
    super();

    this.attachShadow({
      mode: "open",
      delegatesFocus: true,
    });
  }

  connectedCallback() {
    this.shadowRoot!.adoptedStyleSheets = [
      ...this.shadowRoot!.adoptedStyleSheets,
      makeStyleSheet(dropdownSelectStyle),
    ];
    this.#labelElement.classList.add("label");

    this.#iconElement.size = "small";
    this.#iconElement.type = "arrow_down";

    this.#iconWrapperElement.classList.add("icon-wrapper");
    this.#iconWrapperElement.appendChild(this.#iconElement);

    this.#baseElement.classList.add("base");
    this.#baseElement.setAttribute("role", "combobox");
    this.#baseElement.setAttribute("aria-expanded", String(this.expanded));
    this.#baseElement.setAttribute("aria-haspopup", "listbox");
    this.#baseElement.setAttribute("aria-controls", LISTBOX_ID);
    this.#baseElement.tabIndex = 0;
    this.#baseElement.appendChild(this.#labelElement);
    this.#baseElement.appendChild(this.#iconWrapperElement);

    this.shadowRoot?.appendChild(this.#baseElement);
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) return;
    switch (name) {
      case "text":
        this.text = newValue;
        break;
      case "placeholder":
        this.placeholder = newValue;
        break;
      case "expanded":
        this.expanded = newValue === "true";
        break;
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
  const iconAreaWidth = 26;
  const labelPaddingInline = 8;
  const borderWidth = 1;
  const fontSize = 12;
  const spanElement = document.createElement("span");
  spanElement.innerText = value;
  spanElement.style.fontSize = `${fontSize}px`;
  spanElement.style.visibility = "hidden";
  document.body.appendChild(spanElement);
  const width =
    spanElement.offsetWidth +
    iconAreaWidth +
    labelPaddingInline * 2 +
    borderWidth * 2;
  document.body.removeChild(spanElement);
  return width;
}
