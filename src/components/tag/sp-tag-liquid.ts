import resetStyle from "@acab/reset.css?inline";

import foundationStyle from "../foundation.css?inline";
import tagLiquidStyle from "./tag-liquid.css?inline";

const styles = new CSSStyleSheet();
styles.replaceSync(`${resetStyle} ${foundationStyle} ${tagLiquidStyle}`);

export type SpTagLiquidColor = "gray" | "green" | "red" | "yellow" | "blue";
export type SpTagLiquidMode = "light" | "dark";

export class SpTagLiquid extends HTMLElement {
  #color: SpTagLiquidColor = "gray";
  #mode: SpTagLiquidMode = "light";
  #baseElement: HTMLElement = document.createElement("div");

  get color(): SpTagLiquidColor {
    return this.#color;
  }

  set color(value: SpTagLiquidColor) {
    if (this.#color === value) return;

    this.#baseElement.classList.remove(`theme__${this.#color}`);

    if (this.#isValidColor(value)) {
      this.#color = value;
      this.#baseElement.classList.add(`theme__${value}`);

      if (value === "gray" && this.#mode === "dark") {
        this.mode = "light";
      }
    } else {
      console.warn(`${value}は無効なcolor属性です。`);
      this.#color = "gray";
      this.#baseElement.classList.add(`theme__gray`);
    }
  }

  get mode(): SpTagLiquidMode {
    return this.#mode;
  }

  set mode(value: SpTagLiquidMode) {
    if (this.#color === "gray" && value === "dark") {
      console.warn(
        "grayカラーではdarkモードは使用できません。lightモードが適用されます。",
      );
      value = "light";
    }

    if (this.#mode === value) return;

    this.#baseElement.classList.remove(`mode__${this.#mode}`);

    if (this.#isValidMode(value)) {
      this.#mode = value;
      this.#baseElement.classList.add(`mode__${value}`);
    } else {
      console.warn(`${value}は無効なmode属性です。`);
      this.#mode = "light";
      this.#baseElement.classList.add(`mode__light`);
    }
  }

  static get observedAttributes() {
    return ["color", "mode"];
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
    this.#color = this.#getInitialColorValue();
    this.#mode = this.#getInitialModeValue();

    this.#render();
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) return;

    switch (name) {
      case "color":
        this.color = newValue as SpTagLiquidColor;
        break;
      case "mode":
        this.mode = newValue as SpTagLiquidMode;
        break;
    }
  }

  #getInitialColorValue(): SpTagLiquidColor {
    const color = this.getAttribute("color");
    return this.#isValidColor(color) ? (color as SpTagLiquidColor) : "gray";
  }

  #getInitialModeValue(): SpTagLiquidMode {
    const mode = this.getAttribute("mode");

    if (this.#color === "gray") {
      return "light";
    }

    return this.#isValidMode(mode) ? (mode as SpTagLiquidMode) : "light";
  }

  #isValidColor(color: string | null): color is SpTagLiquidColor {
    return (
      color === "gray" ||
      color === "green" ||
      color === "red" ||
      color === "yellow" ||
      color === "blue"
    );
  }

  #isValidMode(mode: string | null): mode is SpTagLiquidMode {
    return mode === "light" || mode === "dark";
  }

  #render() {
    this.shadowRoot!.textContent = "";

    this.#baseElement.classList.add("base");
    this.#baseElement.classList.add(`theme__${this.#color}`);
    this.#baseElement.classList.add(`mode__${this.#mode}`);
    // Adobe Spectrum Web Componentsに合わせて、role属性とaria-label属性は使用しない

    const slotElement = document.createElement("slot");
    this.#baseElement.appendChild(slotElement);

    this.shadowRoot!.appendChild(this.#baseElement);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "sp-tag-liquid": SpTagLiquid;
  }
}

if (!customElements.get("sp-tag-liquid")) {
  customElements.define("sp-tag-liquid", SpTagLiquid);
}
