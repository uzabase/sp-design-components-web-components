import "./sp-dropdown-select";

import resetStyle from "@acab/reset.css?inline";

import foundationStyle from "../foundation.css?inline";
import dropdownActionStyle from "./sp-dropdown.css?inline";
import { ClickEventDetail, SpDropdownOption } from "./sp-dropdown-option";

const DEFAULT_WIDTH = 160;

type SelectType = "single" | "multiple";
const selectTypes: SelectType[] = ["single", "multiple"];

type Width = number;

type Position = "left" | "right";

export function isValidSelectType(value: string): value is SelectType {
  return selectTypes.some((type) => type === value);
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
  #placeholder: string = "";
  #value: string = "";

  // states
  #width: Width = DEFAULT_WIDTH;
  #expanded = false;
  #position: Position = "left";

  get selectType() {
    return this.#selectType;
  }
  set selectType(value: SelectType) {
    this.#selectType = value;
    this.#updateOptions();
  }

  get width() {
    return this.#width;
  }

  set width(value: Width) {
    this.#width = value;
    this.#listboxElement.style.minWidth = `${value}px`;
    this.#selectElement.setAttribute("width", String(value));
  }

  get placeholder() {
    return this.#placeholder;
  }

  set placeholder(value: string) {
    this.#placeholder = value;
    this.#selectElement.setAttribute("placeholder", value);
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
    this.#updateOptions();
  }

  get position() {
    return this.#position;
  }

  set position(val: Position) {
    if (val === "left") {
      this.#listboxElement.classList.add("position__left");
      this.#listboxElement.classList.remove("position__right");
    } else {
      this.#listboxElement.classList.add("position__right");
      this.#listboxElement.classList.remove("position__left");
    }

    this.#position = val;
  }

  static get observedAttributes() {
    return ["select-type", "placeholder", "value"];
  }

  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.adoptedStyleSheets = [...shadowRoot.adoptedStyleSheets, styles];
  }

  connectedCallback() {
    this.#selectElement.setAttribute("aria-controls", LISTBOX_ARIA_CONTROLS);
    this.#selectElement.setAttribute("placeholder", this.placeholder);
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
      this.#hideListbox.bind(this),
    );

    this.#slotElement.addEventListener("slotchange", () => {
      this.#updateOptions();
      this.#calculateSelectWidth();
    });
    this.#updateOptions();
    this.#calculateSelectWidth();

    this.addEventListener("sp-dropdown-option-click", this.#handleClickOption);

    window.addEventListener("click", this.#clickOutsideHandler);
    window.addEventListener("resize", this.#adjustListboxPositionHandler);
    this.#adjustListboxPosition(); // 初期ロード時に位置を調整
  }

  disconnectedCallback() {
    this.#slotElement.removeEventListener(
      "click",
      this.#hideListbox.bind(this),
    );

    this.removeEventListener(
      "sp-dropdown-option-click",
      this.#handleClickOption,
    );

    window.removeEventListener("click", this.#clickOutsideHandler);
    window.removeEventListener("resize", this.#adjustListboxPositionHandler);
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) return;
    switch (name) {
      case "select-type":
        this.selectType = isValidSelectType(newValue) ? newValue : "single";
        break;
      case "placeholder":
        this.placeholder = newValue;
        break;
      case "value":
        this.value = newValue;
        break;
    }
  }

  #toggleListbox() {
    this.#expanded = !this.#expanded;
    this.#listboxElement.hidden = !this.#expanded;
  }

  #hideListbox() {
    this.#expanded = false;
    this.#listboxElement.hidden = true;
  }

  #handleClickOption(event: Event) {
    if (!(event instanceof CustomEvent)) return;
    const customEvent = event as CustomEvent<ClickEventDetail>;
    const { value } = customEvent.detail;
    this.value = value;
    this.#hideListbox();
  }

  #calculateSelectWidth() {
    const listboxWidth = this.#listboxElement.offsetWidth;
    this.width = listboxWidth;
  }

  #updateOptions() {
    const options = this.#slotElement.assignedElements();
    options.forEach((option) => {
      if (!(option instanceof SpDropdownOption)) return;

      option.setAttribute("select-type", this.#selectType);
      if (option.text === this.#value) {
        option.setAttribute("selected", "");
      } else {
        option.removeAttribute("selected");
      }
    });
  }

  #handleClickOutside(event: MouseEvent) {
    event.stopPropagation();
    if (!this.contains(event.target as Node)) {
      this.#hideListbox();
    }
  }
  #clickOutsideHandler = this.#handleClickOutside.bind(this);

  #adjustListboxPosition() {
    const selectLeft = this.#selectElement.getBoundingClientRect().left;
    const listboxWidth = this.#listboxElement.offsetWidth;
    const listboxRight = selectLeft + listboxWidth;
    if (listboxRight > window.innerWidth) {
      this.position = "right";
    } else {
      this.position = "left";
    }
  }
  #adjustListboxPositionHandler = this.#adjustListboxPosition.bind(this);
}

declare global {
  interface HTMLElementTagNameMap {
    "sp-dropdown": SpDropdown;
  }
}

if (!customElements.get("sp-dropdown")) {
  customElements.define("sp-dropdown", SpDropdown);
}
