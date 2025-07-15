import resetStyle from "@acab/reset.css?inline";

import foundationStyle from "../foundation.css?inline";
import { SpIcon } from "../icon/sp-icon";
import tabStyle from "./tab.css?inline";

type TabType = "white" | "gray";
const types: TabType[] = ["white", "gray"];
function isValidTabType(value: string): value is TabType {
  return types.some((type) => type === value);
}

function isBooleanAttribute(value: string | null): boolean {
  return value === "true" || value === "";
}

const styles = new CSSStyleSheet();
styles.replaceSync(`${foundationStyle} ${tabStyle} ${resetStyle}`);

export class SpTab extends HTMLElement {
  #disabled!: boolean;
  #plusIconElement = new SpIcon();
  #tabElement = document.createElement("button");
  #textElement = document.createElement("span");
  #textSlotElement = document.createElement("slot");

  set disabled(value: boolean) {
    this.#disabled = value;
    if (value) {
      this.#tabElement.classList.add("isDisable");
      this.setAttribute("aria-disabled", "true");
      if (!this.hasAttribute("disabled")) {
        this.setAttribute("disabled", "");
      }
    } else {
      this.#tabElement.classList.remove("isDisable");
      this.setAttribute("aria-disabled", "false");
      this.removeAttribute("disabled");
    }
    this.#tabElement.disabled = this.#disabled;
  }

  set selected(value: boolean) {
    if (value) {
      this.#tabElement.classList.add("-selected");
      this.setAttribute("aria-selected", "true");
    } else {
      this.#tabElement.classList.remove("-selected");
      this.setAttribute("aria-selected", "false");
    }
  }

  set fill(value: TabType) {
    // 既存のfillクラスを削除
    this.#tabElement.classList.remove("-white", "-gray");
    
    // 新しいfillクラスを追加
    this.#tabElement.classList.add(`-${value}`);
  }

  set plusIcon(value: boolean) {
    if (value) {
      this.#plusIconElement.classList.add("-show");
    } else {
      this.#plusIconElement.classList.remove("-show");
    }
  }

  static get observedAttributes() {
    return ["selected", "plus-icon", "disabled", "fill"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot!.adoptedStyleSheets = [styles];
    
    // プロパティの初期化
    this.#disabled = false;
    this.fill = "gray";
  }

  connectedCallback() {
    this.#tabElement.classList.add("spds__tab");
    this.#textElement.classList.add("spds__tabText");
    this.#textElement.appendChild(this.#textSlotElement);

    this.#plusIconElement.classList.add("spds__tabIcon");
    this.#plusIconElement.size = "small";
    this.#plusIconElement.type = "plus";
    this.setAttribute("role", "tab");
    this.setAttribute("aria-selected", "false");
    
    // disabled属性の初期値を確認して適切に設定
    const isDisabled = this.hasAttribute("disabled");
    this.setAttribute("aria-disabled", isDisabled ? "true" : "false");
    
    this.#plusIconElement.setAttribute("aria-hidden", "true");
    this.#tabElement.appendChild(this.#plusIconElement);
    this.#tabElement.appendChild(this.#textElement);
    this.shadowRoot!.appendChild(this.#tabElement);
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) return;
    switch (name) {
      case "selected":
        this.selected = isBooleanAttribute(newValue);
        break;
      case "disabled":
        this.disabled = isBooleanAttribute(newValue);
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
        this.plusIcon = isBooleanAttribute(newValue);
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
