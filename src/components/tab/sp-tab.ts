// @ts-ignore
import foundationStyle from "../foundation.css?inline" assert { type: "css" };
// @ts-ignore
import tabStyle from "./tab.css?inline" assert { type: "css" };
import { SpeedaIconTypes } from "../icon/icons";
import { SpIcon } from "../icon/sp-icon";

type TabType = "tabWhite" | "tabGray";

const styles = new CSSStyleSheet();
styles.replaceSync(`${foundationStyle} ${tabStyle}`);

export class SpTab extends HTMLElement {
  #selected: boolean;
  #disabled: boolean;
  #type: TabType;
  #createNewIcon: boolean;
  #createNewIconElement = new SpIcon();
  tabElement = document.createElement("button");
  textElement = document.createElement("span");

  set text(value: string) {
    this.textElement.innerText = value;
  }

  get selected() {
    return this.#selected;
  }
  set selected(value: boolean) {
    this.#selected = value;
    value ? this.#onSelectedAdd() : this.#onSelectedRemove();
  }

  get disabled() {
    return this.#disabled;
  }
  set disabled(value: boolean) {
    const tab = this.tabElement;
    this.#disabled = value;
    value ? tab.classList.add("isDisable") : tab.classList.remove("isDisable");
    this.#tabDisabledUpdate();
  }

  get type() {
    return this.#type;
  }
  set type(value: TabType) {
    const tab = this.tabElement;
    const typeClassList = {
      tabWhite: "-white",
      tabGray: "-gray",
    };
    tab.classList.remove(typeClassList[this.#type]);
    tab.classList.add(typeClassList[value]);
    this.#type = value;
  }
  get createNewIcon() {
    return this.#createNewIcon;
  }
  set createNewIcon(value: boolean) {
    this.#createNewIcon = value;
    if (value === true) {
      this.tabElement.insertBefore(
        this.#createNewIconElement,
        this.textElement,
      );
    } else {
      this.#createNewIconElement.remove();
    }
  }

  static get observedAttributes() {
    return ["text", "selected", "create-new-icon", "disabled", "type"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.adoptedStyleSheets = [
      ...this.shadowRoot.adoptedStyleSheets,
      styles,
    ];
    this.tabElement.classList.add("spds__tab");
    this.tabElement.setAttribute("role", "tab");
    this.tabElement.setAttribute("aria-tabindex", "0");
    this.textElement.classList.add("spds__tabText");
    this.tabElement.appendChild(this.textElement);
  }
  connectedCallback() {
    this.#createNewIconElement.classList.add("base__icon");
    this.#createNewIconElement.size = "small";
    this.#createNewIconElement.type = "plus";
    if (typeof this.selected === "undefined") {
      // this.selected = false;
      this.tabElement.setAttribute("aria-selected", "false");
    }
    if (typeof this.type === "undefined") this.type = "tabWhite";
    this.setAttribute("role", "tablist");
    this.shadowRoot.appendChild(this.tabElement);
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
      case "type":
        this.type = newValue as TabType;
        break;
      case "create-new-icon":
        this.createNewIcon = newValue === "true" || newValue === "";
        break;
    }
  }

  #onSelectedAdd() {
    this.tabElement.classList.add("-selected");
    this.tabElement.setAttribute("aria-selected", "true");
  }
  #onSelectedRemove() {
    this.tabElement.classList.remove("-selected");
    this.tabElement.setAttribute("aria-selected", "false");
  }

  #tabDisabledUpdate() {
    this.tabElement.disabled = this.disabled;
  }
}

customElements.get("sp-tab") || customElements.define("sp-tab", SpTab);

declare global {
  interface HTMLElementTagNameMap {
    "sp-tab": SpTab;
  }
}
