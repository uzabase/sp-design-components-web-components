import { getId } from "../../utils/get-id";
import { makeStyleSheet } from "../styles";
import dropdownListboxStyle from "./sp-dropdown-listbox.css?inline";

export const LISTBOX_ID = getId();

class SpDropdownListbox extends HTMLElement {
  #baseElement = document.createElement("div");
  #slotElement = document.createElement("slot");

  constructor() {
    super();

    this.attachShadow({
      mode: "open",
      delegatesFocus: true,
    });
  }

  connectedCallback() {
    this.shadowRoot!.adoptedStyleSheets = [
      ...this.shadowRoot!.adoptedStyleSheets,
      makeStyleSheet(dropdownListboxStyle),
    ];
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
