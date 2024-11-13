// @ts-ignore
import foundationStyle from "../foundation.css?inline" assert { type: "css" };
// @ts-ignore
import dropdownActionItemStyle from "./dropdown-action-item.css?inline" assert { type: "css" };

const styles = new CSSStyleSheet();
styles.replaceSync(`${foundationStyle} ${dropdownActionItemStyle}`);

export class SpDropdownActionItem extends HTMLElement {
  #baseElement = document.createElement("div");
  #buttonElement = document.createElement("button");

  set text(value: string) {
    this.#buttonElement.innerText = value;
  }

  static get observedAttributes() {
    return ["text"];
  }

  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.adoptedStyleSheets = [...shadowRoot.adoptedStyleSheets, styles];
  }

  connectedCallback() {
    this.#baseElement.classList.add("base");
    this.#baseElement.role = "menuitem";

    this.#buttonElement.classList.add("action");

    this.#baseElement.appendChild(this.#buttonElement);
    this.shadowRoot?.appendChild(this.#baseElement);
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) return;
    switch (name) {
      case "text":
        this.text = newValue;
        break;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "sp-dropdown-action-item": SpDropdownActionItem;
  }
}

customElements.get("sp-dropdown-action-item") ||
  customElements.define("sp-dropdown-action-item", SpDropdownActionItem);
