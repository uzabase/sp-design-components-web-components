import resetStyle from "@acab/reset.css?inline";

import foundationStyle from "../foundation.css?inline";
import dropdownListboxStyle from "./sp-dropdown-listbox.css?inline";

export const LISTBOX_ID = crypto.randomUUID();

const styles = new CSSStyleSheet();
styles.replaceSync(`${resetStyle} ${foundationStyle} ${dropdownListboxStyle}`);

class SpDropdownListbox extends HTMLElement {
  #baseElement = document.createElement("div");
  #slotElement = document.createElement("slot");

  constructor() {
    super();

    const shadowRoot = this.attachShadow({
      mode: "open",
      delegatesFocus: true,
    });
    shadowRoot.adoptedStyleSheets = [...shadowRoot.adoptedStyleSheets, styles];
  }

  connectedCallback() {
    this.#baseElement.setAttribute("role", "listbox");
    this.#baseElement.setAttribute("id", LISTBOX_ID);
    this.#baseElement.classList.add("base");
    this.#baseElement.appendChild(this.#slotElement);

    this.shadowRoot?.appendChild(this.#baseElement);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "sp-dropdown-listbox": SpDropdownListbox;
  }
}

if (!customElements.get("sp-dropdown-listbox")) {
  customElements.define("sp-dropdown-listbox", SpDropdownListbox);
}

export type { SpDropdownListbox };
