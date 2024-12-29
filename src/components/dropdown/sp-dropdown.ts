// @ts-ignore
import resetStyle from "@acab/reset.css?inline" assert { type: "css" };
// @ts-ignore
import foundationStyle from "../foundation.css?inline" assert { type: "css" };
// @ts-ignore
import dropdownActionStyle from "./sp-dropdown.css?inline" assert { type: "css" };
import "./sp-dropdown-select";
import { SpDropdownOption } from "./sp-dropdown-option";

type SelectType = "single" | "multiple";
const selectTypes: SelectType[] = ["single", "multiple"];

type Width = "liquid" | number;
const MIN_WIDTH = 80;
const MAX_WIDTH = 320;

export function isValidSelectType(value: string): value is SelectType {
  return selectTypes.some((type) => type === value);
}

function toValidWidth(value: number) {
  if (value < MIN_WIDTH) return MIN_WIDTH;
  if (value > MAX_WIDTH) return MAX_WIDTH;
  return value;
}

const LISTBOX_ARIA_CONTROLS = "sp-dropdown-listbox";

const styles = new CSSStyleSheet();
styles.replaceSync(`${resetStyle} ${foundationStyle} ${dropdownActionStyle}`);

export class SpDropdown extends HTMLElement {
  // elements
  #baseElement = document.createElement("div");
  #selectElement = document.createElement("sp-dropdown-select");
  #listboxElement = document.createElement("div");
  #slotElement = document.createElement("slot");

  // attributes
  #selectType: SelectType = "single";
  #width: Width = "liquid";

  // states
  #expanded = false;
  #value: string = "Default";

  get selectType() {
    return this.#selectType;
  }
  set selectType(value: SelectType) {
    this.#selectType = value;
    this.updateOptions();
  }

  get width() {
    return this.#width;
  }

  set width(value: Width) {
    this.#width = value;
    this.#selectElement.style.width =
      value === "liquid" ? "auto" : `${value}px`;
    this.#listboxElement.style.width =
      value === "liquid" ? "auto" : `${value}px`;
    this.#selectElement.setAttribute("width", String(value));
  }

  get expanded() {
    return this.#expanded;
  }
  set expanded(value: boolean) {
    this.#expanded = value;
  }

  get value() {
    return this.#value;
  }

  set value(val: string) {
    this.#value = val;
    this.#selectElement.value = val;
    this.updateOptions();
  }

  static get observedAttributes() {
    return ["select-type", "width"];
  }

  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.adoptedStyleSheets = [...shadowRoot.adoptedStyleSheets, styles];
  }

  connectedCallback() {
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

    this.#slotElement.addEventListener("slotchange", () => {
      this.updateOptions();
    });
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
        this.selectType = isValidSelectType(newValue) ? newValue : "single";
        break;
      case "width":
        this.width = isNaN(Number(newValue)) ? "liquid" : toValidWidth(Number(newValue));
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

  handleClickOption(value: string) {
    this.value = value;
    this.#hideContents();
  }

  updateOptions() {
    const options = this.#slotElement.assignedElements();
    options.forEach((option) => {
      if (!(option instanceof SpDropdownOption)) return;

      option.setAttribute("select-type", this.#selectType);
      if (option.text === this.#value) {
        option.setAttribute("selected", "");
      } else {
        option.removeAttribute("selected");
      }
      option.onClick = this.handleClickOption.bind(this);
    });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "sp-dropdown": SpDropdown;
  }
}

customElements.get("sp-dropdown") ||
  customElements.define("sp-dropdown", SpDropdown);
