import "../icon/sp-icon";

import resetStyle from "@acab/reset.css?inline";

import foundationStyle from "../foundation.css?inline";
import tagStyle from "./tag.css?inline";

const styles = new CSSStyleSheet();
styles.replaceSync(`${resetStyle} ${foundationStyle} ${tagStyle}`);

export type TagColor = "gray" | "green" | "red" | "yellow" | "blue";

const colors: TagColor[] = ["gray", "green", "red", "yellow", "blue"];

function isValidColor(value: string): value is TagColor {
  return colors.some((color) => color === value);
}

const colorClasses: Record<TagColor, string> = {
  gray: "color__gray",
  green: "color__green",
  red: "color__red",
  yellow: "color__yellow",
  blue: "color__blue",
};

export class SpTag extends HTMLElement {
  #removable = false;
  #color: TagColor = "gray";

  get removable() {
    return this.#removable;
  }

  set removable(value: boolean) {
    if (this.#removable === value) return;

    this.#removable = value;
    this.#render();
  }

  get color() {
    return this.#color;
  }

  set color(value: TagColor) {
    if (this.#color === value) return;

    this.#color = value;
    this.#render();
  }

  static get observedAttributes() {
    return ["removable", "color"];
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
    this.#removable = this.hasAttribute("removable");

    const colorAttr = this.getAttribute("color");
    if (colorAttr && isValidColor(colorAttr)) {
      this.#color = colorAttr;
    }

    this.#render();
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) return;

    switch (name) {
      case "removable":
        this.removable = newValue === "true" || newValue === "";
        break;
      case "color":
        if (isValidColor(newValue)) {
          this.color = newValue;
        } else {
          console.warn(
            `${newValue}は無効なcolor属性です。デフォルト値"gray"を使用します。`,
          );
          this.color = "gray";
        }
        break;
    }
  }

  #render() {
    this.shadowRoot!.textContent = "";

    const baseElement = document.createElement("div");
    baseElement.classList.add("base");
    baseElement.classList.add(colorClasses[this.#color]);
    baseElement.setAttribute("role", "tag");

    const contentElement = document.createElement("span");
    contentElement.classList.add("label");
    const slotElement = document.createElement("slot");
    contentElement.appendChild(slotElement);

    baseElement.appendChild(contentElement);

    if (this.#removable) {
      const removeButton = document.createElement("button");
      removeButton.classList.add("remove");
      removeButton.setAttribute("aria-label", "削除");
      removeButton.setAttribute("type", "button");

      const removeIcon = document.createElement("sp-icon");
      removeIcon.size = "small";
      removeIcon.type = "close";
      removeIcon.setAttribute("aria-hidden", "true");

      removeButton.appendChild(removeIcon);
      removeButton.addEventListener("click", () =>
        this.dispatchEvent(new CustomEvent("remove")),
      );

      baseElement.appendChild(removeButton);
    }

    this.shadowRoot!.appendChild(baseElement);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "sp-tag": SpTag;
  }
}

if (!customElements.get("sp-tag")) {
  customElements.define("sp-tag", SpTag);
}
