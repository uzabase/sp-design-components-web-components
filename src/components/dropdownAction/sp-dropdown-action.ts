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

const styles = new CSSStyleSheet();
styles.replaceSync(`${foundationStyle} ${dropdownActionStyle}`);

export class SpDropdownAction extends HTMLElement {
  #baseElement = document.createElement("div");
  #buttonElement = document.createElement("sp-dropdown-action-button");
  #contentsElement = document.createElement("div");
  #contentsSlotElement = document.createElement("slot");

  #show: boolean = false;
  #disabled: boolean = false;
  #position: Position = "left";

  set label(value: string) {
    this.#buttonElement.text = value;
    this.#syncContentsMinWidthWithButtonWidth();
  }

  get show() {
    return this.#show;
  }
  set show(value: boolean) {
    this.#show = value;
    
    if (value) {
      this.#buttonElement.setAttribute("selected", "");
    } else {
      this.#buttonElement.removeAttribute("selected");
    }

    // TODO: ちゃんとした実装にする
    this.#contentsElement.style.display = value ? "block" : "none";
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
      this.#contentsElement.style.right = "auto";
      this.#contentsElement.style.left = "0";
    } else {
      this.#contentsElement.style.right = "0";
      this.#contentsElement.style.left = "auto";
    }

    this.#position = value;
  }

  static get observedAttributes() {
    return ["label", "show", "disabled", "position"];
  }

  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.adoptedStyleSheets = [...shadowRoot.adoptedStyleSheets, styles];

    this.show = false;
    this.disabled = false;
    this.position = "left";
  }

  connectedCallback() {
    this.#buttonElement.addEventListener(
      "click",
      this.#toggleButton.bind(this),
    );

    this.#baseElement.appendChild(this.#buttonElement);

    this.#contentsElement.classList.add("contents");
    this.#contentsElement.role = "menu";
    this.#contentsElement.appendChild(this.#contentsSlotElement);

    this.#contentsSlotElement.addEventListener("click", this.#hideContents.bind(this));

    this.#baseElement.appendChild(this.#contentsElement);
    this.#baseElement.classList.add("base");

    this.shadowRoot?.appendChild(this.#baseElement);

    this.#syncContentsMinWidthWithButtonWidth();
  }

  disconnectedCallback() {
    this.#contentsSlotElement.removeEventListener("click", this.#hideContents.bind(this));
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) return;
    switch (name) {
      case "label":
        this.label = newValue;
        break;
      case "show":
        this.show = newValue === "true" || newValue === "";
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

  #toggleButton() {
    this.show = !this.show;
  }
  
  #hideContents() {
    this.show = false;
  }
  
  #syncContentsMinWidthWithButtonWidth() {
    const buttonWidth = this.#buttonElement.offsetWidth;
    this.#contentsElement.style.minWidth = `${buttonWidth}px`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "sp-dropdown-action": SpDropdownAction;
  }
}

customElements.get("sp-dropdown-action") ||
  customElements.define("sp-dropdown-action", SpDropdownAction);
