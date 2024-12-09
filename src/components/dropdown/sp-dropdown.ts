// @ts-ignore
import resetStyle from "@acab/reset.css?inline" assert { type: "css" };
// @ts-ignore
import foundationStyle from "../foundation.css?inline" assert { type: "css" };
// @ts-ignore
import dropdownActionStyle from "./sp-dropdown.css?inline" assert { type: "css" };
import "./sp-dropdown-select";

type SelectType = "single" | "multiple";

const LISTBOX_ARIA_CONTROLS = "sp-dropdown-listbox";

const styles = new CSSStyleSheet();
styles.replaceSync(`${resetStyle} ${foundationStyle} ${dropdownActionStyle}`);

export class SpDropdown extends HTMLElement {
  #baseElement = document.createElement("div");
  #selectElement = document.createElement("sp-dropdown-select");
  #listboxElement = document.createElement("div");
  #slotElement = document.createElement("slot");

  #selectType: SelectType = "single";
  #expanded = false;
  #value: string = "DefaultDefaultDefaultDefault";

  get selectType() {
    return this.#selectType;
  }
  set selectType(value: SelectType) {
    this.#selectType = value;
  }

  get expanded() {
    return this.#expanded;
  }
  set expanded(value: boolean) {
    this.#expanded = value;
  }

  static get observedAttributes() {
    return ["select-type"];
  }

  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.adoptedStyleSheets = [...shadowRoot.adoptedStyleSheets, styles];
  }

  connectedCallback() {
    this.#selectElement.role = "combobox";
    this.#selectElement.setAttribute("aria-controls", LISTBOX_ARIA_CONTROLS);
    this.#selectElement.value = this.#value;

    this.#listboxElement.id = LISTBOX_ARIA_CONTROLS;
    this.#listboxElement.classList.add("listbox");
    this.#listboxElement.role = "listbox";
    this.#listboxElement.appendChild(this.#slotElement);
    
    this.#baseElement.classList.add("base");
    this.#baseElement.appendChild(this.#selectElement);
    this.#baseElement.appendChild(this.#listboxElement);

    this.shadowRoot?.appendChild(this.#baseElement);

    this.#selectElement.addEventListener(
      "click",
      this.#toggleListbox.bind(this),
    );
    this.#listboxElement.addEventListener(
      "click",
      this.#hideContents.bind(this),
    );
  }

  disconnectedCallback() {
    this.#slotElement.removeEventListener(
      "click",
      this.#hideContents.bind(this),
    );
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) return;
    switch (name) {
      case "select-type":
        this.selectType = newValue === "multiple" ? "multiple" : "single";
        break;
    }
  }

  #toggleListbox() {
    this.#expanded = !this.#expanded;
    this.#listboxElement.hidden = !this.#expanded;
  }

  #hideContents() {
    this.#expanded = false;
    this.#listboxElement.hidden = true;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "sp-dropdown": SpDropdown;
  }
}

customElements.get("sp-dropdown") ||
  customElements.define("sp-dropdown", SpDropdown);
