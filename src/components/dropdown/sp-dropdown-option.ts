import "../icon/sp-icon";

import resetStyle from "@acab/reset.css?inline";

import foundationStyle from "../foundation.css?inline";
import { isValidSelectType } from "./sp-dropdown";
import dropdownOptionStyle from "./sp-dropdown-option.css?inline";

const styles = new CSSStyleSheet();
styles.replaceSync(`${resetStyle} ${foundationStyle} ${dropdownOptionStyle}`);

export type ClickEventDetail = { value: string; text: string };

export class SpDropdownOption extends HTMLElement {
  #baseElement = document.createElement("div");
  #iconAreaElement = document.createElement("div");
  #iconElement = document.createElement("sp-icon");
  #textElement = document.createElement("span");

  #text: string = "";
  #value: string = "";
  #selectType: string = "single";
  #selected: boolean = false;

  get text() {
    return this.#text;
  }

  set text(val: string) {
    this.#text = val;
    this.#textElement.textContent = val;
  }

  get value() {
    return this.#value;
  }

  set value(val: string) {
    this.#value = val;
  }

  get selectType() {
    return this.#selectType;
  }

  set selectType(val: string) {
    this.#selectType = val;
  }

  get selected() {
    return this.#selected;
  }

  set selected(val: boolean) {
    this.#selected = val;
    if (val) {
      this.#baseElement.setAttribute("aria-selected", "true");
      this.#iconElement.hidden = false;
    } else {
      this.#baseElement.setAttribute("aria-selected", "false");
      this.#iconElement.hidden = true;
    }
  }

  static get observedAttributes() {
    return ["text", "value", "select-type", "selected"];
  }

  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: "open", delegatesFocus: true });
    shadowRoot.adoptedStyleSheets = [...shadowRoot.adoptedStyleSheets, styles];
  }

  connectedCallback() {
    this.#iconElement.size = "small";
    this.#iconElement.type = "check";
    this.#iconElement.text = "check";
    this.#iconElement.hidden = true;

    this.#iconAreaElement.classList.add("icon-area");
    this.#iconAreaElement.appendChild(this.#iconElement);

    this.#textElement.classList.add("text");

    this.#baseElement.classList.add("base");
    this.#baseElement.role = "option";
    this.#baseElement.appendChild(this.#iconAreaElement);
    this.#baseElement.appendChild(this.#textElement);
    this.#baseElement.tabIndex = 0;

    this.shadowRoot?.appendChild(this.#baseElement);

    this.addEventListener("click", this.#handleClick);
  }

  disconnectedCallback() {
    this.removeEventListener("click", this.#handleClick);
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) return;
    switch (name) {
      case "text":
        this.text = newValue;
        break;
      case "value":
        this.value = newValue;
        break;
      case "select-type":
        this.selectType = isValidSelectType(newValue) ? newValue : "single";
        break;
      case "selected":
        this.selected = newValue !== null;
        break;
    }
  }

  #handleClick() {
    this.dispatchEvent(
      new CustomEvent<ClickEventDetail>("sp-dropdown-option-click", {
        bubbles: true,
        composed: true,
        detail: { value: this.value, text: this.text },
      }),
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "sp-dropdown-option": SpDropdownOption;
  }
}

if (!customElements.get("sp-dropdown-option")) {
  customElements.define("sp-dropdown-option", SpDropdownOption);
}
