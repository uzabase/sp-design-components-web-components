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
  #selectType: string = "single";
  #selected: boolean = false;
  #onClick: ((val: string) => void) | null = null;

  get text() {
    return this.#text;
  }

  set text(val: string) {
    this.#text = val;
    this.#textElement.textContent = val;
  }

  get selectType() {
    return this.#selectType;
  }

  set selectType(value: string) {
    this.#selectType = value;
  }

  get selected() {
    return this.#selected;
  }

  set selected(value: boolean) {
    console.log("🚀 ~ SpDropdownOption ~ setselected ~ value:", value);
    this.#selected = value;
    if (value) {
      this.#baseElement.setAttribute("aria-selected", "true");
      this.#iconElement.hidden = false;
    } else {
      this.#baseElement.removeAttribute("aria-selected");
      this.#iconElement.hidden = true;
    }
  }

  get onClick() {
    return this.#onClick;
  }

  set onClick(callback: ((val: string) => void) | null) {
    this.#onClick = callback;
  }

  static get observedAttributes() {
    return ["text", "select-type", "selected", "on-click"];
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
    this.#iconElement.hidden = true;

    this.#iconAreaElement.classList.add("icon-area");
    this.#iconAreaElement.appendChild(this.#iconElement);

    this.#textElement.classList.add("text");

    this.#baseElement.classList.add("base");
    this.#baseElement.role = "option";
    this.#baseElement.appendChild(this.#iconAreaElement);
    this.#baseElement.appendChild(this.#textElement);

    this.shadowRoot?.appendChild(this.#baseElement);

    this.#baseElement.addEventListener("click", () => {
      this.#onClick?.(this.#text);
    });
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) return;
    switch (name) {
      case "text":
        this.text = newValue;
        break;
      case "select-type":
        this.selectType = newValue === "multiple" ? "multiple" : "single";
        break;
      case "selected":
        this.selected = newValue !== null;
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
