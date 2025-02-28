import "../icon/sp-icon";

import resetStyle from "@acab/reset.css?inline";

import foundationStyle from "../foundation.css?inline";
import tagStyle from "./tag.css?inline";

const styles = new CSSStyleSheet();
styles.replaceSync(`${resetStyle} ${foundationStyle} ${tagStyle}`);

export class SpTag extends HTMLElement {
  #removable = false;

  #baseElement = document.createElement("span");

  get removable() {
    return this.#removable;
  }

  set removable(value: boolean) {
    if (this.#removable === value) return;

    this.#removable = value;
    this.#render();
  }

  static get observedAttributes() {
    return ["removable"];
  }

  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot!.adoptedStyleSheets = [
      ...this.shadowRoot!.adoptedStyleSheets,
      styles,
    ];
  }

  connectedCallback() {
    this.#removable = this.hasAttribute("removable");
    this.#render();
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) return;

    if (name === "removable") {
      this.removable = newValue === "true" || newValue === "";
    }
  }

  #render() {
    this.shadowRoot!.textContent = "";
    this.#baseElement.textContent = "";

    this.#baseElement.classList.add("base");

    const slotElement = document.createElement("slot");
    this.#baseElement.appendChild(slotElement);

    if (this.#removable) {
      const removeButton = document.createElement("button");
      removeButton.classList.add("remove");

      const removeIcon = document.createElement("sp-icon");
      removeIcon.size = "small";
      removeIcon.type = "close";

      removeButton.appendChild(removeIcon);
      removeButton.addEventListener("click", () =>
        this.dispatchEvent(new CustomEvent("remove")),
      );

      this.#baseElement.appendChild(removeButton);
    }

    this.shadowRoot!.appendChild(this.#baseElement);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "sp-tag": SpTag;
  }
}

if (!customElements.get("sp-tag")) {
  customElements.define("sp-tag", SpTag);
}
