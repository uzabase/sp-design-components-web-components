import resetStyle from "@acab/reset.css?inline";

import foundationStyle from "../foundation.css?inline";
import { SpIcon } from "../icon/sp-icon";
import tabStyle from "./tab.css?inline";

type TabType = "white" | "gray";
const types: TabType[] = ["white", "gray"];
function isValidTabType(value: string): value is TabType {
  return types.some((type) => type === value);
}

const styles = new CSSStyleSheet();
styles.replaceSync(`${foundationStyle} ${tabStyle} ${resetStyle}`);

export class SpTab extends HTMLElement {
  #selected: boolean = false;
  #disabled: boolean = false;
  #fill: TabType = "gray";
  #plusIconElement = new SpIcon();
  #tabElement = document.createElement("button");
  #textElement = document.createElement("span");
  #textSlotElement = document.createElement("slot");

  set disabled(value: boolean) {
    this.#disabled = value;
    const tab = this.#tabElement;
    if (value) {
      tab.classList.add("isDisable");
    } else {
      tab.classList.remove("isDisable");
    }
    this.#tabElement.disabled = this.#disabled;
  }

  set selected(value: boolean) {
    this.#selected = value;
    if (value) {
      this.#tabElement.classList.add("-selected");
    } else {
      this.#tabElement.classList.remove("-selected");
    }
    this.#tabElement.setAttribute("aria-selected", this.#selected + "");
  }

  set fill(value: TabType) {
    this.#fill = value;
    const tab = this.#tabElement;

    const fillClassList = {
      white: "-white",
      gray: "-gray",
    };
    if (value === "gray") {
      tab.classList.remove("-white");
      tab.classList.add(fillClassList[this.#fill]);
    } else if (value === "white") {
      tab.classList.remove("-gray");
      tab.classList.add(fillClassList[this.#fill]);
    }
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
    this.#textElement.appendChild(this.#textSlotElement);

    this.#plusIconElement.classList.add("spds__tabIcon");
    this.#plusIconElement.size = "small";
    this.#plusIconElement.type = "plus";
    this.setAttribute("role", "tab");
    this.#plusIconElement.setAttribute("aria-hidden", "true");
    this.#tabElement.appendChild(this.#plusIconElement);
    this.#tabElement.appendChild(this.#textElement);
    this.shadowRoot!.appendChild(this.#tabElement);
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
      case "fill":
        if (isValidTabType(newValue)) {
          this.fill = newValue;
        } else {
          console.warn(`${newValue}は無効なfill属性です。`);
          this.fill = "gray";
        }
        break;
      case "plus-icon":
        this.plusIcon = newValue === "true" || newValue === "";
        break;
    }
  }
}

if (!customElements.get("sp-tab")) {
  customElements.define("sp-tab", SpTab);
}

declare global {
  interface HTMLElementTagNameMap {
    "sp-tab": SpTab;
  }
}
