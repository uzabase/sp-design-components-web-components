import { makeStyleSheet } from "../../styles";
import characterCounterStyle from "./character-counter.css?inline";

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
      makeStyleSheet(characterCounterStyle),
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
    this.#validateAndSetDefaultValue("current");
    this.#validateAndSetDefaultValue("max");

    this.#updateCurrentCount();
    this.#updateMaxCount();
    this.#updateLimitStatus();
  }

  #validateAndSetDefaultValue(name: string) {
    const value = this.getAttribute(name);
    if (!this.#isValidNumericValue(value)) {
      this.setAttribute(name, "0");
    }
  }

  #isValidNumericValue(value: string | null): boolean {
    if (value === null) return true;
    const numValue = Number(value);
    return !isNaN(numValue) && numValue >= 0;
  }

  attributeChangedCallback(
    name: string,
    oldValue: string | null,
    newValue: string | null,
  ) {
    if (oldValue === newValue) return;

    if (name === "current") {
      if (!this.#isValidNumericValue(newValue)) {
        return;
      }

      this.#updateCurrentCount();
      this.#updateLimitStatus();
    } else if (name === "max") {
      if (!this.#isValidNumericValue(newValue)) {
        return;
      }

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

declare global {
  interface HTMLElementTagNameMap {
    "sp-character-counter": SpCharacterCounter;
  }
}
