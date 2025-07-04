import "./sp-dropdown-listbox";

import resetStyle from "@acab/reset.css?inline";

import foundationStyle from "../foundation.css?inline";
import dropdownStyle from "./sp-dropdown.css?inline";
import { ClickEventDetail, SpDropdownOption } from "./sp-dropdown-option";
import { calculateDropdownSelectWidth } from "./sp-dropdown-select";

const selectTypes = ["single", "multiple"] as const;
type SelectType = (typeof selectTypes)[number];

type Position = "left" | "right";

export function isValidSelectType(value: string): value is SelectType {
  return selectTypes.some((type) => type === value);
}

const LISTBOX_ARIA_CONTROLS = "sp-dropdown-listbox-id";
const DEFAULT_SELECT_WIDTH = 160;

const SELECT_MIN_WIDTH = 80;
const SELECT_MAX_WIDTH = 320;
const LISTBOX_MIN_WIDTH = 80;

const styles = new CSSStyleSheet();
styles.replaceSync(`${resetStyle} ${foundationStyle} ${dropdownStyle}`);

export class SpDropdown extends HTMLElement {
  // elements
  #baseElement = document.createElement("div");
  #selectElement = document.createElement("sp-dropdown-select");
  #listboxElement = document.createElement("sp-dropdown-listbox");
  #slotElement = document.createElement("slot");

  // attributes
  #selectType: SelectType = "single";
  #placeholder: string = "";
  #value: string = "";

  // states
  #text = "";
  #selectWidth = DEFAULT_SELECT_WIDTH;
  #expanded = false;
  #position: Position = "left";

  get selectType() {
    return this.#selectType;
  }
  set selectType(val: SelectType) {
    this.#selectType = val;
    this.#updateOptions();
  }

  get text() {
    return this.#text;
  }

  set text(val: string) {
    this.#text = val;
    this.#selectElement.setAttribute("text", val);
  }

  get selectWidth() {
    return this.#selectWidth;
  }

  set selectWidth(val: number) {
    this.#selectWidth = val;
    const selectWidth = Math.max(Math.min(val, SELECT_MAX_WIDTH), SELECT_MIN_WIDTH);
    const listboxWidth = Math.max(val, LISTBOX_MIN_WIDTH);
    this.#selectElement.style.width = `${selectWidth}px`;
    this.#listboxElement.style.width = `${listboxWidth}px`;
  }

  get placeholder() {
    return this.#placeholder;
  }

  set placeholder(val: string) {
    this.#placeholder = val;
    this.#selectElement.setAttribute("placeholder", val);
  }

  get expanded() {
    return this.#expanded;
  }
  set expanded(val: boolean) {
    this.#expanded = val;
    this.#listboxElement.hidden = !val;
    this.#selectElement.setAttribute("aria-expanded", String(val));
  }

  get value() {
    return this.#value;
  }

  set value(val: string) {
    this.#value = val;
    this.#updateOptions();
  }

  get position() {
    return this.#position;
  }

  set position(val: Position) {
    this.#position = val;
    this.#listboxElement.classList.toggle("position__left", val === "left");
    this.#listboxElement.classList.toggle("position__right", val === "right");
  }

  static get observedAttributes() {
    return ["select-type", "placeholder", "value"];
  }

  constructor() {
    super();

    const shadowRoot = this.attachShadow({
      mode: "open",
      delegatesFocus: true,
    });
    shadowRoot.adoptedStyleSheets = [...shadowRoot.adoptedStyleSheets, styles];
  }

  connectedCallback() {
    this.#initializeElements();
    this.#setupEventListeners();
    this.#updateOptions();
    this.#calculateSelectWidth();
    this.#adjustListboxPosition();
  }

  disconnectedCallback() {
    this.#cleanupEventListeners();
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

  #initializeElements() {
    this.#selectElement.setAttribute("aria-haspopup", "listbox");
    this.#selectElement.setAttribute("aria-controls", LISTBOX_ARIA_CONTROLS);
    this.#selectElement.setAttribute("aria-expanded", String(this.expanded));
    this.#selectElement.setAttribute("placeholder", this.placeholder);
    this.#selectElement.text = this.#text;

    this.#listboxElement.setAttribute("id", LISTBOX_ARIA_CONTROLS);
    this.#listboxElement.classList.add("listbox");
    this.#listboxElement.appendChild(this.#slotElement);

    this.#baseElement.classList.add("base");
    this.#baseElement.appendChild(this.#selectElement);
    this.#baseElement.appendChild(this.#listboxElement);

    this.shadowRoot?.appendChild(this.#baseElement);
  }

  #setupEventListeners() {
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
    this.addEventListener("sp-dropdown-option-click", this.#handleClickOption);
    this.addEventListener("keydown", this.#handleKeyDown);
    window.addEventListener("click", this.#clickOutsideHandler);
    window.addEventListener("resize", this.#adjustListboxPositionHandler);
  }

  #cleanupEventListeners() {
    this.#selectElement.removeEventListener(
      "click",
      this.#toggleListbox.bind(this),
    );
    this.#listboxElement.removeEventListener(
      "click",
      this.#hideListbox.bind(this),
    );
    this.removeEventListener(
      "sp-dropdown-option-click",
      this.#handleClickOption,
    );
    this.removeEventListener("keydown", this.#handleKeyDown);
    window.removeEventListener("click", this.#clickOutsideHandler);
    window.removeEventListener("resize", this.#adjustListboxPositionHandler);
  }

  #toggleListbox() {
    this.expanded = !this.expanded;
  }

  #hideListbox() {
    this.expanded = false;
  }

  #handleClickOption(event: Event) {
    if (!(event instanceof CustomEvent)) return;
    const customEvent = event as CustomEvent<ClickEventDetail>;
    const { value, text } = customEvent.detail;
    this.value = value;
    this.text = text;
    this.#hideListbox();
  }

  #getOptions(): SpDropdownOption[] {
    return this.#slotElement
      .assignedElements()
      .filter(
        (element): element is SpDropdownOption =>
          element instanceof SpDropdownOption,
      );
  }

  /**
   * optionの各値とplaceholderをそれぞれselectに入れた時の幅を計算し、最も大きい幅をselectの幅として設定する
   */
  #calculateSelectWidth() {
    const options = this.#getOptions();
    const candidateValues = [
      this.#placeholder,
      ...options.map((option) => option.text),
    ];
    const maxSelectWidth = Math.max(
      ...candidateValues.map((value) => calculateDropdownSelectWidth(value)),
    );
    this.selectWidth = maxSelectWidth;
  }

  #updateOptions() {
    const options = this.#getOptions();

    options.forEach((option) => {
      option.setAttribute("select-type", this.selectType);
      if (option.value === this.#value) {
        option.setAttribute("selected", "");
      } else {
        option.removeAttribute("selected");
      }
    });
  }

  #handleClickOutside = (event: MouseEvent) => {
    if (!this.contains(event.target as Node)) {
      this.#hideListbox();
    }
  };
  #clickOutsideHandler = this.#handleClickOutside.bind(this);

  #adjustListboxPosition() {
    const selectLeft = this.#selectElement.getBoundingClientRect().left;
    const listboxWidth = this.#listboxElement.offsetWidth;
    const listboxRight = selectLeft + listboxWidth;
    this.position = listboxRight > window.innerWidth ? "right" : "left";
  }
  #adjustListboxPositionHandler = this.#adjustListboxPosition.bind(this);

  #focusNextOption() {
    const options = this.#getOptions();
    const activeElement = document.activeElement;
    const focusedIndex = options.findIndex(
      (option) => option === activeElement,
    );

    if (focusedIndex === -1) {
      options[0]?.focus();
    } else if (focusedIndex < options.length - 1) {
      options[focusedIndex + 1].focus();
    }
  }

  #focusPreviousOption() {
    const options = this.#getOptions();
    const activeElement = document.activeElement;
    const focusedIndex = options.findIndex(
      (option) => option === activeElement,
    );

    if (focusedIndex > 0) {
      options[focusedIndex - 1].focus();
    } else if (focusedIndex === -1) {
      options[options.length - 1]?.focus();
    }
  }

  #selectFocusedOption() {
    const options = this.#getOptions();
    const activeElement = document.activeElement;
    const focusedOption = options.find((option) => option === activeElement);
    if (focusedOption) {
      focusedOption.click();
    }
    this.#selectElement.focus();
  }

  #handleKeyDown(event: KeyboardEvent) {
    // VOキーが押されている場合は、デフォルトの動作を許可
    if (event.ctrlKey && event.altKey) {
      return;
    }

    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        this.expanded = true;
        this.#focusNextOption();
        break;
      case "ArrowUp":
        event.preventDefault();
        this.expanded = true;
        this.#focusPreviousOption();
        break;
      case "Enter":
      case " ":
        event.preventDefault();
        if (!this.expanded) {
          this.expanded = true;
          this.#focusNextOption();
        } else {
          this.#selectFocusedOption();
          this.expanded = false;
        }
        break;
      case "Escape":
        event.preventDefault();
        this.expanded = false;
        this.#selectElement.focus();
        break;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "sp-dropdown": SpDropdown;
  }
}

if (!customElements.get("sp-dropdown")) {
  customElements.define("sp-dropdown", SpDropdown);
}
