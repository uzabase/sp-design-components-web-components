// @ts-ignore
import resetStyle from "@acab/reset.css?inline" assert { type: "css" };
// @ts-ignore
import foundationStyle from "../foundation.css?inline" assert { type: "css" };
// @ts-ignore
import dropdownDialogStyle from "./dropdown-dialog.css?inline" assert { type: "css" };
import "../button/sp-button";

type Position = "left" | "right";

const positions: Position[] = ["left", "right"];

function isValidPosition(value: string): value is Position {
  return positions.some((position) => position === value);
}

const styles = new CSSStyleSheet();
styles.replaceSync(`${resetStyle} ${foundationStyle} ${dropdownDialogStyle}`);

export class SpDropdownDialog extends HTMLElement {
  #baseElement = document.createElement("div");
  #buttonElement = document.createElement("sp-button");
  #dialogElement = document.createElement("div");
  #dialogSlotElement = document.createElement("slot");

  #open: boolean = false;
  #disabled: boolean = false;
  #position: Position = "left";

  set label(value: string) {
    this.#buttonElement.text = value;
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

    this.#updateDialogDisplay();
  }

  get disabled() {
    return this.#disabled;
  }
  set disabled(value: boolean) {
    this.#disabled = value;
    this.#buttonElement.disabled = value;
    this.#updateDialogDisplay();
  }

  get position() {
    return this.#position;
  }
  set position(value: Position) {
    if (value === "left") {
      this.#dialogElement.classList.add("position__left");
      this.#dialogElement.classList.remove("position__right");
    } else {
      this.#dialogElement.classList.add("position__right");
      this.#dialogElement.classList.remove("position__left");
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
    this.#buttonElement.setAttribute("part", "button");
    this.#buttonElement.addEventListener(
      "click",
      this.#handleClickButton.bind(this),
    );

    this.#baseElement.appendChild(this.#buttonElement);

    this.#dialogElement.classList.add("dialog");
    this.#dialogElement.role = "dialog";
    this.#dialogElement.appendChild(this.#dialogSlotElement);

    window.addEventListener("click", this.#handleClickOutside.bind(this));

    this.#baseElement.appendChild(this.#dialogElement);
    this.#baseElement.classList.add("base");

    this.shadowRoot?.appendChild(this.#baseElement);
  }

  disconnectedCallback() {
    window.removeEventListener("click", this.#handleClickOutside.bind(this));
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

  #handleClickButton(event: MouseEvent) {
    event.stopPropagation();

    this.open = !this.open;
  }

  #handleClickOutside(event: MouseEvent) {
    event.stopPropagation();

    if (!this.contains(event.target as Node)) {
      this.open = false;
    }
  }

  #updateDialogDisplay() {
    this.#dialogElement.style.display =
      this.open && !this.disabled ? "block" : "none";
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "sp-dropdown-dialog": SpDropdownDialog;
  }
}

customElements.get("sp-dropdown-dialog") ||
  customElements.define("sp-dropdown-dialog", SpDropdownDialog);