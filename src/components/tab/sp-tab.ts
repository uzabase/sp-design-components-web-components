// @ts-ignore
import resetStyle from "@acab/reset.css?inline" assert { type: "css" };
// @ts-ignore
import foundationStyle from "../foundation.css?inline" assert { type: "css" };
// @ts-ignore
import tabStyle from "./tab.css?inline" assert { type: "css" };

import { SpIcon } from "../icon/sp-icon";
type TabType = "white" | "gray";

const styles = new CSSStyleSheet();
styles.replaceSync(`${foundationStyle} ${tabStyle} ${resetStyle}`);

export class SpTab extends HTMLElement {
  #selected: boolean = false;
  #disabled: boolean = false;
  #fill!: TabType;
  #plusIconElement = new SpIcon();
  #tabElement = document.createElement("button");
  #textElement = document.createElement("span");

  set text(value: string) {
    this.#textElement.innerText = value;
  }

  set disabled(value: boolean) {
    this.#disabled = value;
    const tab = this.#tabElement;
    value ? tab.classList.add("isDisable") : tab.classList.remove("isDisable");
    this.#tabElement.disabled = this.#disabled;
  }

  set selected(value: boolean) {
    this.#selected = value;
    value
      ? this.#tabElement.classList.add("-selected")
      : this.#tabElement.classList.remove("-selected");
    this.#tabElement.setAttribute("aria-selected", this.#selected + "");
  }
  set fill(value: TabType) {
    this.#fill = value;
    const tab = this.#tabElement;
    const fillClassList = {
      white: "-white",
      gray: "-gray",
    };
    tab.classList.remove(fillClassList[this.#fill]);
    tab.classList.add(fillClassList[this.#fill]);
  }

  set plusIcon(value: boolean) {
    if (value) {
      this.#plusIconElement.classList.add("-show");
    } else {
      this.#plusIconElement.classList.remove("-show");
    }
  }

  static get observedAttributes() {
    return ["text", "selected", "plus-icon", "disabled", "fill"];
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
    this.#tabElement.classList.add("spds__tab");
    this.#textElement.classList.add("spds__tabText");
    this.#plusIconElement.classList.add("spds__tabIcon");
    this.#plusIconElement.size = "small";
    this.#plusIconElement.type = "plus";
    this.setAttribute("role", "tab");
    this.#tabElement.appendChild(this.#plusIconElement);
    this.#tabElement.appendChild(this.#textElement);
    this.shadowRoot!.appendChild(this.#tabElement);

  }
  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) return;
    switch (name) {
      case "text":
        this.text = newValue;
        break;
      case "selected":
        this.selected = newValue === "true" || newValue === "";
        break;
      case "disabled":
        this.disabled = newValue === "true" || newValue === "";
        break;
      case "fill":
        this.fill = newValue as TabType;
        break;
      case "plus-icon":
        this.plusIcon = newValue === "true" || newValue === "";
        break;
    }
  }
}

customElements.get("sp-tab") || customElements.define("sp-tab", SpTab);

declare global {
  interface HTMLElementTagNameMap {
    "sp-tab": SpTab;
  }
}
