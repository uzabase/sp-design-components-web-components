import resetStyle from "@acab/reset.css?inline";

import foundationStyle from "../../foundation.css?inline";
import characterCounterStyle from "./character-counter.css?inline";

const styles = new CSSStyleSheet();
styles.replaceSync(`${resetStyle} ${foundationStyle} ${characterCounterStyle}`);

const template = document.createElement("template");
template.innerHTML = `
  <span class="current-count"></span><span class="separator">/</span><span class="max-count"></span>
`;

export class SpCharacterCounter extends HTMLElement {
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
    this.shadowRoot!.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    this.update();
  }

  attributeChangedCallback() {
    this.update();
  }

  update() {
    const current = this.current;
    const max = this.max;
    const currentCount = this.shadowRoot!.querySelector(
      ".current-count",
    ) as HTMLElement;
    const maxCount = this.shadowRoot!.querySelector(
      ".max-count",
    ) as HTMLElement;
    if (currentCount)
      currentCount.textContent = String(current).padStart(2, "0");
    if (maxCount) maxCount.textContent = String(max).padStart(2, "0");

    currentCount.classList.remove("limit-reached", "limit-exceeded");
    if (current === max) {
      currentCount.classList.add("limit-reached");
    } else if (current > max) {
      currentCount.classList.add("limit-exceeded");
    }
  }
}

if (!customElements.get("sp-character-counter")) {
  customElements.define("sp-character-counter", SpCharacterCounter);
}
