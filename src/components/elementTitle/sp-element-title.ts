import { makeStyleSheet } from "../styles";
import elementTitleStyle from "./element-title.css?inline";

/**
 * SpElementTitleは、デザインシステム2.0におけるエレメントタイトルコンポーネントです。
 * セクション内の要素のタイトルとして使用し、テキストリンクやボタンを配置できます。
 *
 * @element sp-element-title
 * @summary エレメントタイトルコンポーネント
 *
 * @slot - タイトルのテキストコンテンツ（デフォルトスロット）
 * @slot text-links - タイトル横に表示するテキストリンク
 * @slot buttons - タイトル右側に表示するボタン
 */
export class SpElementTitle extends HTMLElement {
  #headingElement = document.createElement("h3");
  #textLinkSlotElement = document.createElement("slot");
  #buttonSlotElement = document.createElement("slot");

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.shadowRoot!.adoptedStyleSheets = [
      ...this.shadowRoot!.adoptedStyleSheets,
      makeStyleSheet(elementTitleStyle),
    ];

    this.#textLinkSlotElement.name = "text-links";
    this.#buttonSlotElement.name = "buttons";
  }

  connectedCallback() {
    this.shadowRoot!.appendChild(this.#createContainer());

    if (this.#textLinkSlotElement.assignedElements().length === 0) {
      this.shadowRoot!.querySelector(".text-links")?.remove();
    }

    if (this.#buttonSlotElement.assignedElements().length === 0) {
      this.shadowRoot!.querySelector(".buttons")?.remove();
    }
  }

  #createContainer() {
    const container = document.createElement("div");
    container.classList.add("container");
    container.appendChild(this.#createMain());
    container.appendChild(this.#createButtons());
    return container;
  }

  #createMain() {
    const main = document.createElement("div");
    main.classList.add("main");
    main.appendChild(this.#createHeadingBlock());
    main.appendChild(this.#createTextLinks());
    return main;
  }

  #createHeadingBlock() {
    const slot = document.createElement("slot");
    this.#headingElement.appendChild(slot);

    const div = document.createElement("div");
    div.classList.add("heading");
    div.appendChild(this.#headingElement);
    return div;
  }

  #createTextLinks() {
    const div = document.createElement("div");
    div.classList.add("text-links");
    div.appendChild(this.#textLinkSlotElement);
    return div;
  }

  #createButtons() {
    const div = document.createElement("div");
    div.classList.add("buttons");
    div.appendChild(this.#buttonSlotElement);
    return div;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "sp-element-title": SpElementTitle;
  }
}

if (!customElements.get("sp-element-title")) {
  customElements.define("sp-element-title", SpElementTitle);
}
