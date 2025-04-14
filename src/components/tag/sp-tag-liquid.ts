import resetStyle from "@acab/reset.css?inline";

import foundationStyle from "../foundation.css?inline";
import tagLiquidStyle from "./tag-liquid.css?inline";

const styles = new CSSStyleSheet();
styles.replaceSync(`${resetStyle} ${foundationStyle} ${tagLiquidStyle}`);

export type SpTagLiquidType = "gray" | "green" | "red" | "yellow" | "blue";
export type SpTagLiquidMode = "light" | "dark";

export class SpTagLiquid extends HTMLElement {
  #type: SpTagLiquidType = "gray";
  #mode: SpTagLiquidMode = "light";
  #baseElement: HTMLElement = document.createElement("div");

  get type(): SpTagLiquidType {
    return this.#type;
  }

  set type(value: SpTagLiquidType) {
    if (this.#type === value) return;

    this.#baseElement.classList.remove(`theme__${this.#type}`);

    if (this.#isValidType(value)) {
      this.#type = value;
      this.#baseElement.classList.add(`theme__${value}`);

      if (value === "gray" && this.#mode === "dark") {
        this.mode = "light";
      }
    } else {
      console.warn(`${value}は無効なtype属性です。`);
      this.#type = "gray";
      this.#baseElement.classList.add(`theme__gray`);
    }
  }

  get mode(): SpTagLiquidMode {
    return this.#mode;
  }

  set mode(value: SpTagLiquidMode) {
    if (this.#type === "gray" && value === "dark") {
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
    return ["type", "mode"];
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
    this.#type = this.#getInitialTypeValue();
    this.#mode = this.#getInitialModeValue();

    this.#render();
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) return;

    switch (name) {
      case "type":
        this.type = newValue as SpTagLiquidType;
        break;
      case "mode":
        this.mode = newValue as SpTagLiquidMode;
        break;
    }
  }

  #getInitialTypeValue(): SpTagLiquidType {
    const type = this.getAttribute("type");
    return this.#isValidType(type) ? (type as SpTagLiquidType) : "gray";
  }

  #getInitialModeValue(): SpTagLiquidMode {
    const mode = this.getAttribute("mode");

    if (this.#type === "gray") {
      return "light";
    }

    return this.#isValidMode(mode) ? (mode as SpTagLiquidMode) : "light";
  }

  #isValidType(type: string | null): type is SpTagLiquidType {
    return (
      type === "gray" ||
      type === "green" ||
      type === "red" ||
      type === "yellow" ||
      type === "blue"
    );
  }

  #isValidMode(mode: string | null): mode is SpTagLiquidMode {
    return mode === "light" || mode === "dark";
  }

  #render() {
    this.shadowRoot!.textContent = "";

    this.#baseElement.classList.add("base");
    this.#baseElement.classList.add(`theme__${this.#type}`);
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
