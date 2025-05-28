import "../icon/sp-icon";

import resetStyle from "@acab/reset.css?inline";

import foundationStyle from "../foundation.css?inline";
import tagLinkStyle from "./tag-link.css?inline";

const styles = new CSSStyleSheet();
styles.replaceSync(`${resetStyle} ${foundationStyle} ${tagLinkStyle}`);

export class SpTagLink extends HTMLElement {
  href = "";
  #disabled = false;

  #linkElement: HTMLAnchorElement = document.createElement("a");

  get disabled() {
    return this.#disabled;
  }

  set disabled(value: boolean) {
    if (this.#disabled === value) return;

    this.#disabled = value;

    if (value) {
      this.setAttribute("aria-disabled", "true");
      this.setAttribute("tabindex", "-1");
    } else {
      this.removeAttribute("aria-disabled");
      this.removeAttribute("tabindex");
    }
  }

  static get observedAttributes() {
    return ["href", "disabled"];
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
    this.#render();
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) return;

    switch (name) {
      case "href":
        this.#linkElement.setAttribute("href", newValue);
        break;
      case "disabled":
        this.disabled = newValue === "true" || newValue === "";
        break;
    }
  }

  #render() {
    this.shadowRoot!.textContent = "";

    this.#linkElement.classList.add("link");
    const slotElement = document.createElement("slot");
    this.#linkElement.appendChild(slotElement);

    this.shadowRoot!.appendChild(this.#linkElement);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "sp-tag-link": SpTagLink;
  }
}

if (!customElements.get("sp-tag-link")) {
  customElements.define("sp-tag-link", SpTagLink);
}
