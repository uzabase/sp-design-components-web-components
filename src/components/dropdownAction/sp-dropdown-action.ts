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
  #contentsSlotElement = document.createElement("slot");

  #show: boolean = false;
  #disabled: boolean = false;

  #resizeObserver: ResizeObserver;

  set label(value: string) {
    this.#buttonElement.text = value;
  }

  get show() {
    return this.#show;
  }
  set show(value: boolean) {
    this.#show = value;
    
    if (value) {
      this.#buttonElement.setAttribute("selected", "");
    } else {
      this.#buttonElement.removeAttribute("selected");
    }

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

    this.#resizeObserver = new ResizeObserver(() => {
      this.#updateContentsPosition();
    });
  }

  connectedCallback() {
    this.#buttonElement.addEventListener(
      "click",
      this.#toggleButton.bind(this),
    );

    this.#baseElement.appendChild(this.#buttonElement);

    this.#contentsElement.classList.add("contents");
    this.#contentsElement.role = "menu";
    this.#contentsElement.appendChild(this.#contentsSlotElement);

    this.#contentsSlotElement.addEventListener("click", this.#hideContents.bind(this));

    this.#baseElement.appendChild(this.#contentsElement);
    this.#baseElement.classList.add("base");

    this.shadowRoot?.appendChild(this.#baseElement);

    this.#setupPositionObservers();
  }

  disconnectedCallback() {
    this.#contentsSlotElement.removeEventListener("click", this.#hideContents.bind(this));
    this.#removePositionObservers();
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
    this.show = !this.show;
    this.#updateContentsPosition();
  }
  
  #hideContents() {
    this.show = false;
  }

  #setupPositionObservers() {
    this.#resizeObserver.observe(this.#contentsElement);

    window.addEventListener(
      "resize",
      this.#updateContentsPosition.bind(this),
      true,
    );

    window.addEventListener(
      "scroll",
      this.#updateContentsPosition.bind(this),
      true,
    );
  }

  #removePositionObservers() {
    this.#resizeObserver.unobserve(this.#contentsElement);

    window.removeEventListener(
      "resize",
      this.#updateContentsPosition.bind(this),
      true,
    );

    window.removeEventListener(
      "scroll",
      this.#updateContentsPosition.bind(this),
      true,
    );
  }

  #updateContentsPosition() {
    if (!this.show) return;

    const buttonRect = this.#buttonElement.getBoundingClientRect();
    const contentsRect = this.#contentsElement.getBoundingClientRect();
    const viewportWidth = window.innerWidth;

    if (buttonRect.left + contentsRect.width > viewportWidth) {
      this.#contentsElement.style.right = "0";
      this.#contentsElement.style.left = "auto";
    } else {
      this.#contentsElement.style.left = "0";
      this.#contentsElement.style.right = "auto";
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "sp-dropdown-action": SpDropdownAction;
  }
}

customElements.get("sp-dropdown-action") ||
  customElements.define("sp-dropdown-action", SpDropdownAction);
