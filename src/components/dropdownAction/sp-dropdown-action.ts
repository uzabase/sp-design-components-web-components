// @ts-ignore
import foundationStyle from "../foundation.css?inline" assert { type: "css" };
// @ts-ignore
import dropdownActionStyle from "./dropdown-action.css?inline" assert { type: "css" };
import "./sp-dropdown-action-button";
import "./sp-dropdown-action-item";

const styles = new CSSStyleSheet();
styles.replaceSync(`${foundationStyle} ${dropdownActionStyle}`);

export class SpDropdownAction extends HTMLElement {
  #baseElement = document.createElement("div");
  #buttonElement = document.createElement("sp-dropdown-action-button");
  #contentsElement = document.createElement("div");

  #show: boolean = false;
  #disabled: boolean = false;

  set label(value: string) {
    this.#buttonElement.text = value;
  }

  get show() {
    return this.#show;
  }
  set show(value: boolean) {
    this.#show = value;
    // TODO: ちゃんとした実装にする
    this.#contentsElement.style.display = value ? "block" : "none";
  }

  get disabled() {
    return this.#disabled;
  }
  set disabled(value: boolean) {
    this.#disabled = value;
    this.#buttonElement.disabled = value;
  }

  static get observedAttributes() {
    return ["label", "show", "disabled"];
  }

  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.adoptedStyleSheets = [...shadowRoot.adoptedStyleSheets, styles];

    this.show = false;
    this.disabled = false;
  }

  connectedCallback() {
    this.#buttonElement.addEventListener(
      "click",
      this.#toggleButton.bind(this),
    );

    this.#baseElement.appendChild(this.#buttonElement);

    this.#contentsElement.classList.add("contents");
    this.#contentsElement.role = "menu";
    this.#contentsElement.appendChild(document.createElement("slot"));

    this.#baseElement.appendChild(this.#contentsElement);
    this.#baseElement.classList.add("base");

    this.shadowRoot?.appendChild(this.#baseElement);
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) return;
    switch (name) {
      case "label":
        this.label = newValue;
        break;
      case "show":
        this.show = newValue === "true" || newValue === "";
        break;
      case "disabled":
        this.disabled = newValue === "true" || newValue === "";
        break;
    }
  }

  #toggleButton() {
    // TODO: 両方とも個別にトグルしていてズレそうだと考えてしまうので、同期させる仕組みにしたい
    this.#buttonElement.toggleAttribute("selected");
    this.show = !this.show;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "sp-dropdown-action": SpDropdownAction;
  }
}

customElements.get("sp-dropdown-action") ||
  customElements.define("sp-dropdown-action", SpDropdownAction);
