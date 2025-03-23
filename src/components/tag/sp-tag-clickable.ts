import "../icon/sp-icon";

import resetStyle from "@acab/reset.css?inline";

import foundationStyle from "../foundation.css?inline";
import tagClickableStyle from "./tag-clickable.css?inline";

const styles = new CSSStyleSheet();
styles.replaceSync(`${resetStyle} ${foundationStyle} ${tagClickableStyle}`);

export class SpTagClickable extends HTMLElement {
  #selected = false;
  #disabled = false;
  #buttonElement = document.createElement("button");

  /**
   * Returns whether the tag is currently in selected state
   */
  get selected() {
    return this.#selected;
  }

  /**
   * Sets the selected state of the tag
   */
  set selected(value: boolean) {
    if (this.#selected === value) return;

    this.#selected = value;
    if (value) {
      this.setAttribute("selected", "");
    } else {
      this.removeAttribute("selected");
    }
  }

  /**
   * Returns whether the tag is currently disabled
   */
  get disabled() {
    return this.#disabled;
  }

  /**
   * Sets the disabled state of the tag
   */
  set disabled(value: boolean) {
    if (this.#disabled === value) return;

    this.#disabled = value;
    if (value) {
      this.setAttribute("disabled", "");
      this.setAttribute("aria-disabled", "true");
    } else {
      this.removeAttribute("disabled");
      this.removeAttribute("aria-disabled");
    }
  }

  static get observedAttributes() {
    return ["selected", "disabled"];
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
    this.#selected = this.hasAttribute("selected");
    this.#disabled = this.hasAttribute("disabled");

    this.#buttonElement.classList.add("button");
    this.#buttonElement.setAttribute("type", "button");
    this.#buttonElement.addEventListener("click", this.#handleClick.bind(this));

    this.#render();
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) return;

    switch (name) {
      case "selected":
        this.selected = newValue === "true" || newValue === "";
        break;
      case "disabled":
        this.disabled = newValue === "true" || newValue === "";
        break;
    }
  }

  #handleClick(event: MouseEvent) {
    if (this.disabled) return;

    this.dispatchEvent(
      new CustomEvent("click", {
        bubbles: true,
        composed: true,
        detail: { originalEvent: event },
      }),
    );
  }

  #render() {
    this.shadowRoot!.textContent = "";

    const slotElement = document.createElement("slot");
    this.#buttonElement.textContent = "";
    this.#buttonElement.appendChild(slotElement);

    if (this.#disabled) {
      this.#buttonElement.disabled = true;
    } else {
      this.#buttonElement.disabled = false;
    }

    this.shadowRoot!.appendChild(this.#buttonElement);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "sp-tag-clickable": SpTagClickable;
  }
}

if (!customElements.get("sp-tag-clickable")) {
  customElements.define("sp-tag-clickable", SpTagClickable);
}
