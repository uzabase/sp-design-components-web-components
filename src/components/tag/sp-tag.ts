import "../icon/sp-icon";

import resetStyle from "@acab/reset.css?inline";

import foundationStyle from "../foundation.css?inline";
import tagStyle from "./tag.css?inline";

const styles = new CSSStyleSheet();
styles.replaceSync(`${resetStyle} ${foundationStyle} ${tagStyle}`);

export class SpTag extends HTMLElement {
  #removable = false;

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

    const baseElement = document.createElement("div");
    baseElement.classList.add("base");
    baseElement.setAttribute("role", "tag");

    const contentElement = document.createElement("span");
    contentElement.classList.add("label");
    const slotElement = document.createElement("slot");
    contentElement.appendChild(slotElement);

    baseElement.appendChild(contentElement);

    if (this.#removable) {
      const removeButton = document.createElement("button");
      removeButton.classList.add("remove");
      removeButton.setAttribute("aria-label", "削除");
      removeButton.setAttribute("type", "button");

      const removeIcon = document.createElement("sp-icon");
      removeIcon.size = "small";
      removeIcon.type = "close";
      removeIcon.setAttribute("aria-hidden", "true");

      removeButton.appendChild(removeIcon);
      removeButton.addEventListener("click", () =>
        this.dispatchEvent(new CustomEvent("remove")),
      );

      baseElement.appendChild(removeButton);
    }

    this.shadowRoot!.appendChild(baseElement);
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
