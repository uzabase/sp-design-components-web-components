import "../icon/sp-icon";

import { makeStyleSheet } from "../styles";
import tagClickableStyle from "./tag-clickable.css?inline";

/**
 * SpTagClickableは、デザインシステム2.0におけるクリック可能なタグコンポーネントです。
 * 選択状態を持ち、クリックイベントを発火するタグとして使用します。
 *
 * @element sp-tag-clickable
 * @summary クリック可能なタグコンポーネント
 *
 * @slot - タグのテキストコンテンツ（デフォルトスロット）
 *
 * @fires click - タグがクリックされたときに発火するイベント。detail.originalEventに元のMouseEventが含まれます
 */
export class SpTagClickable extends HTMLElement {
  #selected = false;
  #disabled = false;
  #buttonElement = document.createElement("button");

  /**
   * Returns whether the tag is currently in selected state
   */
  get selected() {
    return this.#selected;
  }

  /**
   * Sets the selected state of the tag
   */
  set selected(value: boolean) {
    if (this.#selected === value) return;

    this.#selected = value;
    if (value) {
      this.#buttonElement.classList.add("isSelected");
    } else {
      this.#buttonElement.classList.remove("isSelected");
    }
  }

  /**
   * Returns whether the tag is currently disabled
   */
  get disabled() {
    return this.#disabled;
  }

  /**
   * Sets the disabled state of the tag
   */
  set disabled(value: boolean) {
    if (this.#disabled === value) return;

    this.#disabled = value;
    if (value) {
      this.setAttribute("aria-disabled", "true");
      this.#buttonElement.disabled = true;
      this.#buttonElement.classList.add("isDisabled");
    } else {
      this.removeAttribute("aria-disabled");
      this.#buttonElement.disabled = false;
      this.#buttonElement.classList.remove("isDisabled");
    }
  }

  static get observedAttributes() {
    return ["selected", "disabled"];
  }

  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot!.adoptedStyleSheets = [
      ...this.shadowRoot!.adoptedStyleSheets,
      makeStyleSheet(tagClickableStyle),
    ];

    this.selected = false;
    this.disabled = false;
  }

  connectedCallback() {
    this.#selected = this.hasAttribute("selected");
    this.#disabled = this.hasAttribute("disabled");

    this.#buttonElement.classList.add("button");
    this.#buttonElement.setAttribute("type", "button");
    this.#buttonElement.addEventListener("click", this.#handleClick.bind(this));

    this.#render();
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) return;

    switch (name) {
      case "selected":
        this.selected = newValue === "true" || newValue === "";
        break;
      case "disabled":
        this.disabled = newValue === "true" || newValue === "";
        break;
    }
  }

  #handleClick(event: MouseEvent) {
    if (this.disabled) return;

    this.dispatchEvent(
      new CustomEvent("click", { detail: { originalEvent: event } }),
    );
  }

  #render() {
    this.shadowRoot!.textContent = "";

    const slotElement = document.createElement("slot");
    this.#buttonElement.textContent = "";
    this.#buttonElement.appendChild(slotElement);

    if (this.#disabled) {
      this.#buttonElement.disabled = true;
    } else {
      this.#buttonElement.disabled = false;
    }

    this.shadowRoot!.appendChild(this.#buttonElement);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "sp-tag-clickable": SpTagClickable;
  }
}

if (!customElements.get("sp-tag-clickable")) {
  customElements.define("sp-tag-clickable", SpTagClickable);
}
