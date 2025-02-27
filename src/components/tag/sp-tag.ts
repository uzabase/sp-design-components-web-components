import "../icon/sp-icon";

import resetStyle from "@acab/reset.css?inline";

import foundationStyle from "../foundation.css?inline";
import tagStyle from "./tag.css?inline";

const styles = new CSSStyleSheet();
styles.replaceSync(`${resetStyle} ${foundationStyle} ${tagStyle}`);

export class SpTag extends HTMLElement {
  #baseElement = document.createElement("span");

  removable = false;

  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot!.adoptedStyleSheets = [
      ...this.shadowRoot!.adoptedStyleSheets,
      styles,
    ];
  }

  connectedCallback() {
    this.#baseElement.classList.add("base");

    const slotElement = document.createElement("slot");

    this.#baseElement.appendChild(slotElement);
    this.#addRemoveButton();
    this.shadowRoot!.appendChild(this.#baseElement);
  }

  #addRemoveButton() {
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
}

declare global {
  interface HTMLElementTagNameMap {
    "sp-tag": SpTag;
  }
}

if (!customElements.get("sp-tag")) {
  customElements.define("sp-tag", SpTag);
}
