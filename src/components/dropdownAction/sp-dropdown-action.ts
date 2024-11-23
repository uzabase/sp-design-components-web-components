// @ts-ignore
import foundationStyle from "../foundation.css?inline" assert { type: "css" };
// @ts-ignore
import dropdownActionStyle from "./dropdown-action.css?inline" assert { type: "css" };
import "./sp-dropdown-action-button";
import "./sp-dropdown-action-item";

type Position = "left" | "right";

const positions: Position[] = ["left", "right"];

function isValidPosition(value: string): value is Position {
  return positions.some((position) => position === value);
}

function createMenuId() {
  return `sp-dropdown-action-menu-${Math.random().toString(32).substring(2)}`;
}

const styles = new CSSStyleSheet();
styles.replaceSync(`${foundationStyle} ${dropdownActionStyle}`);

export class SpDropdownAction extends HTMLElement {
  #baseElement = document.createElement("div");
  #buttonElement = document.createElement("sp-dropdown-action-button");
  #menuElement = document.createElement("div");
  #menuSlotElement = document.createElement("slot");
  
  #menuId = createMenuId();

  #open: boolean = false;
  #disabled: boolean = false;
  #position: Position = "left";

  set label(value: string) {
    this.#buttonElement.text = value;
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

    this.#menuElement.style.display = value ? "block" : "none";
  }

  get disabled() {
    return this.#disabled;
  }
  set disabled(value: boolean) {
    this.#disabled = value;
    this.#buttonElement.disabled = value;
  }
  
  get position() {
    return this.#position;
  }
  set position(value: Position) {
    if (value === "left") {
      this.#menuElement.style.right = "auto";
      this.#menuElement.style.left = "0";
    } else {
      this.#menuElement.style.right = "0";
      this.#menuElement.style.left = "auto";
    }

    this.#position = value;
  }

  static get observedAttributes() {
    return ["label", "open", "disabled", "position"];
  }

  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.adoptedStyleSheets = [...shadowRoot.adoptedStyleSheets, styles];

    this.open = false;
    this.disabled = false;
    this.position = "left";
  }

  connectedCallback() {
    this.#buttonElement.addEventListener(
      "click",
      this.#toggleMenuVisibility.bind(this),
    );

    this.#baseElement.appendChild(this.#buttonElement);

    this.#menuElement.classList.add("menu");
    this.#menuElement.role = "menu";
    this.#menuElement.appendChild(this.#menuSlotElement);

    this.#menuSlotElement.addEventListener("click", this.#hideMenu.bind(this));

    this.#baseElement.appendChild(this.#menuElement);
    this.#baseElement.classList.add("base");

    this.shadowRoot?.appendChild(this.#baseElement);

    this.#setupAccessibilityAttributes();
    this.#syncMenuMinWidthWithButtonWidth();
  }

  disconnectedCallback() {
    this.#menuSlotElement.removeEventListener("click", this.#hideMenu.bind(this));
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) return;
    switch (name) {
      case "label":
        this.label = newValue;
        break;
      case "open":
        this.open = newValue === "true" || newValue === "";
        break;
      case "disabled":
        this.disabled = newValue === "true" || newValue === "";
        break;
      case "position":
        if (isValidPosition(newValue)) {
          this.position = newValue;
        } else {
          console.warn(`${newValue}は無効なposition属性です。`);
          this.position = "left";
        }
    }
  }

  #toggleMenuVisibility() {
    this.open = !this.open;
    this.#updateAriaExpandedAttribute();
  }
  
  #hideMenu() {
    this.open = false;
    this.#updateAriaExpandedAttribute();
  }
  
  #setupAccessibilityAttributes() {
    this.#buttonElement.setAriaHasPopup("true");
    this.#buttonElement.setAriaControls(this.#menuId);
    this.#menuElement.setAttribute("id", this.#menuId);
    this.#updateAriaExpandedAttribute();
  }
  
  #updateAriaExpandedAttribute() {
    this.#buttonElement.setAriaExpanded(this.open ? "true" : "false");
  }
  
  #syncMenuMinWidthWithButtonWidth() {
    const buttonWidth = this.#buttonElement.offsetWidth;
    this.#menuElement.style.minWidth = `${buttonWidth}px`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "sp-dropdown-action": SpDropdownAction;
  }
}

customElements.get("sp-dropdown-action") ||
  customElements.define("sp-dropdown-action", SpDropdownAction);
