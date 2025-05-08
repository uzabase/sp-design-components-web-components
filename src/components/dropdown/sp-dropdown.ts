import resetStyle from "@acab/reset.css?inline";

import foundationStyle from "../foundation.css?inline";
import dropdownActionStyle from "./sp-dropdown.css?inline";
import { ClickEventDetail, SpDropdownOption } from "./sp-dropdown-option";
import { calculateDropdownSelectWidth } from "./sp-dropdown-select";

type SelectType = "single" | "multiple";
const selectTypes: SelectType[] = ["single", "multiple"];

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
  #text = "";
  #selectWidth = 0;
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
    this.#listboxElement.style.width = `${val}px`;
    this.#selectElement.setAttribute("width", String(val));
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

    const shadowRoot = this.attachShadow({
      mode: "open",
      delegatesFocus: true,
    });
    shadowRoot.adoptedStyleSheets = [...shadowRoot.adoptedStyleSheets, styles];
  }

  connectedCallback() {
    this.#selectElement.role = "combobox";
    this.#selectElement.setAttribute("aria-haspopup", "listbox");
    this.#selectElement.setAttribute("aria-controls", LISTBOX_ARIA_CONTROLS);
    this.#selectElement.setAttribute("aria-expanded", String(this.expanded));
    this.#selectElement.setAttribute("placeholder", this.placeholder);
    this.#selectElement.text = this.#text;

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

    this.addEventListener("keydown", this.#handleKeyDown);

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

    this.removeEventListener("keydown", this.#handleKeyDown);

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

  #getOptions() {
    return this.#slotElement
      .assignedElements()
      .filter((element) => element instanceof SpDropdownOption);
  }

  /**
   * optionの各値とplaceholderをそれぞれselectに入れた時の幅を計算し、最も大きい幅をselectの幅として設定する
   */
  #calculateSelectWidth() {
    let maxSelectWidth = 0;
    const options = this.#getOptions();

    const candidateValues = [
      this.#placeholder,
      ...options.map((option) => option.text),
    ];

    candidateValues.forEach((value) => {
      const selectWidth = calculateDropdownSelectWidth(value);
      if (selectWidth > maxSelectWidth) {
        maxSelectWidth = selectWidth;
      }
    });

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

  #focusNextOption() {
    const options = this.#getOptions();
    const activeElement = document.activeElement;
    const focusedIndex = options.findIndex(
      (option) => option === activeElement,
    );
    if (focusedIndex === -1) {
      options[0].focus();
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
      options[options.length - 1].focus();
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
    switch (event.key) {
      case "ArrowDown":
        // 次のオプションにフォーカス
        this.expanded = true;
        this.#focusNextOption();
        break;
      case "ArrowUp":
        // 前のオプションにフォーカス
        this.expanded = true;
        this.#focusPreviousOption();
        break;
      case "Enter":
      case " ":
        if (!this.expanded) {
          // 閉じている場合はメニューを開く
          this.expanded = true;
          this.#focusNextOption();
        } else {
          // 開いている場合は選択して閉じる
          this.#selectFocusedOption();
          this.expanded = false;
        }
        break;
      case "Escape":
        // ドロップダウンを閉じる
        this.expanded = false;
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

