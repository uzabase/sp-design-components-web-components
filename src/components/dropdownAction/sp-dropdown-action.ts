import "./sp-dropdown-action-button";
import "./sp-dropdown-action-item";

import resetStyle from "@acab/reset.css?inline";

import foundationStyle from "../foundation.css?inline";
import dropdownActionStyle from "./dropdown-action.css?inline";

type Position = "left" | "right";

const positions: Position[] = ["left", "right"];

function isValidPosition(value: string): value is Position {
  return positions.some((position) => position === value);
}

function createMenuId() {
  return `sp-dropdown-action-menu-${Math.random().toString(32).substring(2)}`;
}

const styles = new CSSStyleSheet();
styles.replaceSync(`${resetStyle} ${foundationStyle} ${dropdownActionStyle}`);

export class SpDropdownAction extends HTMLElement {
  #baseElement = document.createElement("div");
  #buttonElement = document.createElement("sp-dropdown-action-button");
  #menuElement = document.createElement("div");
  #menuSlotElement = document.createElement("slot");
  #menuItemElements: HTMLElement[] = [];

  #menuId = createMenuId();

  #open: boolean = false;
  #disabled: boolean = false;
  #position: Position = "left";

  #clickOutsideHandler = this.#handleClickOutside.bind(this);

  set label(value: string) {
    this.#buttonElement.textContent = value;
    this.#syncMenuMinWidthWithButtonWidth();
  }

  get open() {
    return this.#open;
  }
  set open(value: boolean) {
    this.#open = value;

    if (value) {
      this.#buttonElement.setAttribute("selected", "");
    } else {
      this.#buttonElement.removeAttribute("selected");
    }

    this.#updateMenuDisplay();
  }

  get disabled() {
    return this.#disabled;
  }
  set disabled(value: boolean) {
    this.#disabled = value;
    this.#buttonElement.disabled = value;
    this.#updateMenuDisplay();
  }

  get position() {
    return this.#position;
  }
  set position(value: Position) {
    if (value === "left") {
      this.#menuElement.classList.add("position__left");
      this.#menuElement.classList.remove("position__right");
    } else {
      this.#menuElement.classList.add("position__right");
      this.#menuElement.classList.remove("position__left");
    }

    this.#position = value;
  }

  static get observedAttributes() {
    return ["label", "open", "disabled", "position"];
  }

  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot!.adoptedStyleSheets = [
      ...this.shadowRoot!.adoptedStyleSheets,
      styles,
    ];

    this.open = false;
    this.disabled = false;
    this.position = "left";
  }

  connectedCallback() {
    this.#setupButtonElement();
    this.#setupMenuElement();
    this.#setupBaseElement();
    this.#setupEventListeners();
    this.shadowRoot!.appendChild(this.#baseElement);
    this.#setupAccessibilityAttributes();
    this.#syncMenuMinWidthWithButtonWidth();
  }

  #setupButtonElement() {
    this.#buttonElement.setAttribute("part", "button");
    this.#buttonElement.addEventListener(
      "click",
      this.#handleClickButton.bind(this),
    );
  }

  #setupMenuElement() {
    this.#menuElement.classList.add("menu");
    this.#menuElement.role = "menu";
    this.#menuElement.appendChild(this.#menuSlotElement);
  }

  #setupBaseElement() {
    this.#baseElement.appendChild(this.#buttonElement);
    this.#baseElement.appendChild(this.#menuElement);
    this.#baseElement.classList.add("base");
  }

  #setupEventListeners() {
    this.#menuSlotElement.addEventListener(
      "slotchange",
      this.#handleSlotChange.bind(this),
    );
    window.addEventListener("click", this.#clickOutsideHandler);
  }

  #setupAccessibilityAttributes() {
    this.#buttonElement.setAriaHasPopup("true");
    this.#buttonElement.setAriaControls(this.#menuId);
    this.#menuElement.setAttribute("id", this.#menuId);
    this.#updateAriaExpandedAttribute();
  }

  #syncMenuMinWidthWithButtonWidth() {
    const buttonWidth = this.#buttonElement.offsetWidth;
    this.#menuElement.style.minWidth = `${buttonWidth}px`;
  }

  disconnectedCallback() {
    this.#menuItemElements.forEach((element) => {
      element.removeEventListener(
        "click",
        this.#handleClickMenuItem.bind(this),
      );
    });

    this.#menuSlotElement.removeEventListener(
      "slotchange",
      this.#handleSlotChange.bind(this),
    );

    window.removeEventListener("click", this.#clickOutsideHandler);
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) return;

    if (name === "label") {
      this.#handleLabelAttribute(newValue);
    }

    if (name === "open") {
      this.#handleOpenAttribute(newValue);
    }

    if (name === "disabled") {
      this.#handleDisabledAttribute(newValue);
    }

    if (name === "position") {
      this.#handlePositionAttribute(newValue);
    }
  }

  #handleLabelAttribute(value: string) {
    this.label = value;
  }

  #handleOpenAttribute(value: string) {
    this.open = value === "true" || value === "";
  }

  #handleDisabledAttribute(value: string) {
    this.disabled = value === "true" || value === "";
  }

  #handlePositionAttribute(value: string) {
    if (isValidPosition(value)) {
      this.position = value;
    } else {
      console.warn(`${value}は無効なposition属性です。`);
      this.position = "left";
    }
  }

  #handleClickButton(event: MouseEvent) {
    event.stopPropagation();

    this.open = !this.open;
    this.#updateAriaExpandedAttribute();
  }

  #handleSlotChange() {
    this.#menuItemElements = this.#menuSlotElement
      .assignedElements()
      .filter((element) => element instanceof HTMLElement);

    this.#menuItemElements.forEach((element) => {
      element.addEventListener("click", this.#handleClickMenuItem.bind(this));
    });
  }

  #handleClickMenuItem(event: MouseEvent) {
    event.stopPropagation();

    this.open = false;
    this.#updateAriaExpandedAttribute();
  }

  #handleClickOutside(event: MouseEvent) {
    event.stopPropagation();

    if (!this.contains(event.target as Node)) {
      this.open = false;
      this.#updateAriaExpandedAttribute();
    }
  }

  #updateMenuDisplay() {
    this.#menuElement.style.display =
      this.open && !this.disabled ? "block" : "none";
  }

  #updateAriaExpandedAttribute() {
    this.#buttonElement.setAriaExpanded(this.open ? "true" : "false");
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "sp-dropdown-action": SpDropdownAction;
  }
}

if (!customElements.get("sp-dropdown-action")) {
  customElements.define("sp-dropdown-action", SpDropdownAction);
}
