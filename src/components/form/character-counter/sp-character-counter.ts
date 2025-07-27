import resetStyle from "@acab/reset.css?inline";

import foundationStyle from "../../foundation.css?inline";
import characterCounterStyle from "./character-counter.css?inline";

const styles = new CSSStyleSheet();
styles.replaceSync(`${resetStyle} ${foundationStyle} ${characterCounterStyle}`);

export class SpCharacterCounter extends HTMLElement {
  #baseElement: HTMLDivElement = document.createElement("div");
  #currentCount: HTMLSpanElement = document.createElement("span");
  #separator: HTMLSpanElement = document.createElement("span");
  #maxCount: HTMLSpanElement = document.createElement("span");

  static get observedAttributes() {
    return ["current", "max"];
  }

  get current() {
    return Number(this.getAttribute("current")) || 0;
  }
  set current(val: number) {
    this.setAttribute("current", String(val));
  }

  get max() {
    return Number(this.getAttribute("max")) || 0;
  }
  set max(val: number) {
    this.setAttribute("max", String(val));
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot!.adoptedStyleSheets = [
      ...this.shadowRoot!.adoptedStyleSheets,
      styles,
    ];

    this.#setupElements();
  }

  #setupElements() {
    this.#baseElement.classList.add("base");

    this.#currentCount.classList.add("current-count");

    this.#separator.classList.add("separator");
    this.#separator.textContent = "/";

    this.#maxCount.classList.add("max-count");

    this.#baseElement.appendChild(this.#currentCount);
    this.#baseElement.appendChild(this.#separator);
    this.#baseElement.appendChild(this.#maxCount);

    this.shadowRoot!.appendChild(this.#baseElement);
  }

  connectedCallback() {
    this.#updateCurrentCount();
    this.#updateMaxCount();
    this.#updateLimitStatus();
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) return;

    if (name === "current") {
      this.#updateCurrentCount();
      this.#updateLimitStatus();
    } else if (name === "max") {
      this.#updateMaxCount();
      this.#updateLimitStatus();
    }
  }

  #updateCurrentCount() {
    this.#currentCount.textContent = String(this.current).padStart(2, "0");
  }

  #updateMaxCount() {
    this.#maxCount.textContent = String(this.max).padStart(2, "0");
  }

  #updateLimitStatus() {
    this.#currentCount.classList.remove("limit-reached", "limit-exceeded");
    if (this.current === this.max) {
      this.#currentCount.classList.add("limit-reached");
    } else if (this.current > this.max) {
      this.#currentCount.classList.add("limit-exceeded");
    }
  }
}

if (!customElements.get("sp-character-counter")) {
  customElements.define("sp-character-counter", SpCharacterCounter);
}
