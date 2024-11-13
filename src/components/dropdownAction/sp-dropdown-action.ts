// @ts-ignore
import foundationStyle from "../foundation.css?inline" assert { type: "css" };
// @ts-ignore
import dropdownActionStyle from "./dropdown-action.css?inline" assert { type: "css" };
import "./sp-dropdown-action-button";
import "./sp-dropdown-action-item";

const styles = new CSSStyleSheet();
styles.replaceSync(`${foundationStyle} ${dropdownActionStyle}`);

export class SpDropdownAction extends HTMLElement {
  #baseElement = document.createElement("div");
  #buttonElement = document.createElement("sp-dropdown-action-button");
  #contentsElement = document.createElement("div");

  set label(value: string) {
    this.#buttonElement.text = value;
  }

  static get observedAttributes() {
    return ["label"];
  }

  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.adoptedStyleSheets = [...shadowRoot.adoptedStyleSheets, styles];
  }

  connectedCallback() {
    this.#buttonElement.addEventListener(
      "click",
      this.#toggleButton.bind(this),
    );

    this.#baseElement.appendChild(this.#buttonElement);

    this.#contentsElement.classList.add("contents");
    this.#contentsElement.role = "menu";
    this.#contentsElement.appendChild(document.createElement("slot"));

    this.#baseElement.appendChild(this.#contentsElement);
    this.#baseElement.classList.add("base");

    this.shadowRoot?.appendChild(this.#baseElement);
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) return;
    switch (name) {
      case "label":
        this.label = newValue;
        break;
    }
  }

  #toggleButton() {
    this.#buttonElement.toggleAttribute("selected");
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "sp-dropdown-action": SpDropdownAction;
  }
}

customElements.get("sp-dropdown-action") ||
  customElements.define("sp-dropdown-action", SpDropdownAction);
