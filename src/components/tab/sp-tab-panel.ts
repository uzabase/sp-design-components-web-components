import { makeStyleSheet } from "../styles";
import tabPanelStyle from "./tab-panel.css?inline";

const styles = makeStyleSheet(tabPanelStyle);

export class SpTabPanel extends HTMLElement {
  #contentWrapper = document.createElement("div");
  #slotElement = document.createElement("slot");
  #name: string | null = null;
  #active: boolean = false;

  get name() {
    return this.#name;
  }

  set name(value: string | null) {
    this.#name = value;
    if (value) {
      this.setAttribute("name", value);
    } else {
      this.removeAttribute("name");
    }
  }

  get active() {
    return this.#active;
  }

  set active(value: boolean) {
    if (this.#active === value) return; // 同じ値の場合は何もしない

    this.#active = value;
    if (value) {
      this.setAttribute("active", "");
      this.setAttribute("aria-hidden", "false");
    } else {
      this.removeAttribute("active");
      this.setAttribute("aria-hidden", "true");
    }
  }

  static get observedAttributes() {
    return ["name", "active"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot!.adoptedStyleSheets = [styles];
  }

  connectedCallback() {
    this.#contentWrapper.classList.add("panel");
    this.#contentWrapper.appendChild(this.#slotElement);
    this.shadowRoot!.appendChild(this.#contentWrapper);

    // アクセシビリティ属性の設定
    this.setAttribute("role", "tabpanel");

    // active属性の初期値を確認してaria-hidden属性を設定
    const isActive = this.hasAttribute("active");
    this.setAttribute("aria-hidden", isActive ? "false" : "true");
  }

  attributeChangedCallback(
    name: string,
    oldValue: string | null,
    newValue: string | null,
  ) {
    if (oldValue === newValue) return;

    switch (name) {
      case "name":
        this.#name = newValue;
        break;
      case "active":
        this.active = newValue !== null;
        break;
    }
  }
}

if (!customElements.get("sp-tab-panel")) {
  customElements.define("sp-tab-panel", SpTabPanel);
}

declare global {
  interface HTMLElementTagNameMap {
    "sp-tab-panel": SpTabPanel;
  }
}
