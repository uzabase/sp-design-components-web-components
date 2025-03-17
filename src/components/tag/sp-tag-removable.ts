import "../icon/sp-icon";

import resetStyle from "@acab/reset.css?inline";

import foundationStyle from "../foundation.css?inline";
import tagRemovableStyle from "./tag-removable.css?inline";

const styles = new CSSStyleSheet();
styles.replaceSync(`${resetStyle} ${foundationStyle} ${tagRemovableStyle}`);

export class SpTagRemovable extends HTMLElement {
  #disabled = false;

  #removeButton = document.createElement("button");
  
  get disabled() {
    return this.#disabled;
  }

  set disabled(value: boolean) {
    if (this.#disabled === value) return;

    this.#disabled = value;
    this.#removeButton.disabled = value;
    this.#render();
  }

  static get observedAttributes() {
    return ["disabled"];
  }

  constructor() {
    super();
    
    this.attachShadow({ mode: "open" });
    this.shadowRoot!.adoptedStyleSheets = [
      ...this.shadowRoot!.adoptedStyleSheets,
      styles,
    ];
    
    this.disabled = false
  }

  connectedCallback() {
    this.#removeButton.classList.add("remove");
    this.#removeButton.setAttribute("aria-label", "削除");
    this.#removeButton.setAttribute("type", "button");

    const removeIcon = document.createElement("sp-icon");
    removeIcon.size = "small";
    removeIcon.type = "close";
    removeIcon.setAttribute("aria-hidden", "true");

    this.#removeButton.appendChild(removeIcon);
    this.#removeButton.addEventListener("click", () =>
      this.dispatchEvent(new CustomEvent("remove")),
    );

    this.#render();
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) return;

    switch (name) {
      case "disabled":
        this.disabled = newValue === "true" || newValue === "";
        break;
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

    baseElement.appendChild(this.#removeButton);

    this.shadowRoot!.appendChild(baseElement);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "sp-tag-removable": SpTagRemovable;
  }
}

if (!customElements.get("sp-tag-removable")) {
  customElements.define("sp-tag-removable", SpTagRemovable);
}
