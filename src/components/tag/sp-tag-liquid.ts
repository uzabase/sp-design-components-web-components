
import { makeStyleSheet } from "../styles";
import tagLiquidStyle from "./tag-liquid.css?inline";

export type SpTagLiquidType = "gray" | "green" | "red" | "yellow" | "blue";
export type SpTagLiquidMode = "light" | "dark";

export class SpTagLiquid extends HTMLElement {
  #type: SpTagLiquidType = "gray";
  #light: boolean = true;
  #baseElement: HTMLElement = document.createElement("div");

  get type(): SpTagLiquidType {
    return this.#type;
  }

  set type(value: SpTagLiquidType) {
    if (this.#type === value) return;

    this.#baseElement.classList.remove(`type__${this.#type}`);

    if (this.#isValidType(value)) {
      this.#type = value;
      this.#baseElement.classList.add(`type__${value}`);
      this.light = this.hasAttribute("light");
    } else {
      console.warn(`${value}は無効なtype属性です。`);
      this.#type = "gray";
      this.#baseElement.classList.add(`type__gray`);
    }
  }

  get light(): boolean {
    return this.#light;
  }

  set light(value: boolean) {
    if (this.#light === value) return;

    if (value) {
      this.#baseElement.classList.add("light");
    } else {
      this.#baseElement.classList.remove("light");
    }

    this.#light = value;

    if (value) {
      this.setAttribute("light", "");
    } else {
      this.removeAttribute("light");
    }
  }

  static get observedAttributes() {
    return ["type", "light"];
  }

  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot!.adoptedStyleSheets = [
      ...this.shadowRoot!.adoptedStyleSheets,
      makeStyleSheet(tagLiquidStyle),
    ];
  }

  connectedCallback() {
    this.#type = this.#getInitialTypeValue();
    this.#light = this.#getInitialLightValue();

    this.#render();
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) return;

    switch (name) {
      case "type":
        this.type = newValue as SpTagLiquidType;
        break;
      case "light":
        this.light = newValue === "true" || newValue === "";
        break;
    }
  }

  #getInitialTypeValue(): SpTagLiquidType {
    const type = this.getAttribute("type");
    return this.#isValidType(type) ? (type as SpTagLiquidType) : "gray";
  }

  #getInitialLightValue(): boolean {
    if (this.#type === "gray") {
      return true;
    }

    return this.hasAttribute("light");
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

  #render() {
    this.shadowRoot!.textContent = "";

    this.#baseElement.classList.add("base");
    this.#baseElement.classList.add(`type__${this.#type}`);

    if (this.#light) {
      this.#baseElement.classList.add("light");
    }

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
