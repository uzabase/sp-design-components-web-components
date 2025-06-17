import resetStyle from "@acab/reset.css?inline";

import foundationStyle from "../foundation.css?inline";
import paginationStyle from "./pagination.css?inline";

const styles = new CSSStyleSheet();
styles.replaceSync(`${resetStyle} ${foundationStyle} ${paginationStyle}`);

type ButtonType = "first" | "previous" | "next" | "last" | "page";

interface NavigationButton {
  type: ButtonType;
  text: string;
  targetPage: number;
}

const MAX_VISIBLE_PAGES = 10; // 表示する最大ページ数
const PAGES_BEFORE_SELECTED = 4; // 選択ページの前に表示するページ数

/**
 * SpPaginationは、デザインシステム2.0におけるページネーションコンポーネントです。
 * ページ分割されたコンテンツのナビゲーションを提供します。
 *
 * @element sp-pagination
 * @summary ページネーションコンポーネント
 *
 * @fires change - ページが変更されたときに発火するイベント。detail.pageに新しいページ番号が含まれます
 */
export class SpPagination extends HTMLElement {
  #total = 1;
  #selected = 1;
  #nav = document.createElement("nav");
  #pageGroupElement = document.createElement("ul");
  #buttonElements: HTMLButtonElement[] = [];

  /**
   * 総ページ数
   *
   * @attribute
   * @type {number}
   * @default 1
   */
  get total() {
    return this.#total;
  }
  set total(value: number) {
    this.#total = value;
  }

  /**
   * 現在選択されているページ番号
   *
   * @attribute
   * @type {number}
   * @default 1
   */
  get selected() {
    return this.#selected;
  }
  set selected(value: number) {
    this.#selected = value;
  }

  static get observedAttributes() {
    return ["total", "selected"];
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
    this.#setupNavigation();
    this.#updatePageGroup();
  }

  #setupNavigation() {
    this.#pageGroupElement.classList.add("page-group");
    this.#nav.appendChild(this.#pageGroupElement);
    this.shadowRoot!.appendChild(this.#nav);
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) {
      return;
    }

    if (name === "total") {
      this.#handleTotalAttribute(newValue);
    }

    if (name === "selected") {
      this.#handleSelectedAttribute(newValue);
    }
  }

  #handleTotalAttribute(value: string) {
    const parsedValue = Number(value);
    const isValueValid =
      !Number.isNaN(parsedValue) &&
      Number.isInteger(parsedValue) &&
      parsedValue > 0;

    if (isValueValid) {
      this.total = parsedValue;
    } else {
      console.warn(`${value}は無効なtotal属性です。`);
      this.total = 1;
    }

    this.#updatePageGroup();
  }

  #handleSelectedAttribute(value: string) {
    const parsedValue = Number(value);
    const isValueValid =
      !Number.isNaN(parsedValue) &&
      Number.isInteger(parsedValue) &&
      parsedValue > 0 &&
      parsedValue <= this.total;

    if (isValueValid) {
      this.selected = parsedValue;
    } else {
      console.warn(`${value}は無効なselected属性です。`);
      this.selected = 1;
    }

    this.#updatePageButtonStates();
  }

  #updatePageGroup() {
    this.#pageGroupElement.innerHTML = "";
    this.#buttonElements = [];

    const navigationButtons = this.#getNavigationButtons();

    navigationButtons
      .map((button) => this.#createButtonItem(button))
      .forEach((item) => this.#pageGroupElement.appendChild(item));
  }

  #getNavigationButtons(): NavigationButton[] {
    return [
      { type: "first", text: "最初へ", targetPage: 1 },
      {
        type: "previous",
        text: "前へ",
        targetPage: Math.max(1, this.selected - 1),
      },
      ...this.#getPageButtons(),
      {
        type: "next",
        text: "次へ",
        targetPage: Math.min(this.total, this.selected + 1),
      },
      { type: "last", text: "最後へ", targetPage: this.total },
    ];
  }

  #getPageButtons(): NavigationButton[] {
    const { firstVisiblePage, lastVisiblePage } =
      this.#calculateVisiblePageRange();

    return Array.from(
      { length: lastVisiblePage - firstVisiblePage + 1 },
      (_, index) => {
        const pageNumber = firstVisiblePage + index;
        return {
          type: "page",
          text: String(pageNumber),
          targetPage: pageNumber,
        };
      },
    );
  }

  #calculateVisiblePageRange() {
    // 選択ページを中心に表示（選択ページの前にPAGES_BEFORE_SELECTED分のページを表示）
    let firstVisiblePage = Math.max(1, this.selected - PAGES_BEFORE_SELECTED);

    // 最後のページが表示範囲を超える場合は調整
    if (firstVisiblePage + MAX_VISIBLE_PAGES - 1 > this.total) {
      firstVisiblePage = Math.max(1, this.total - MAX_VISIBLE_PAGES + 1);
    }

    const lastVisiblePage = Math.min(
      this.total,
      firstVisiblePage + MAX_VISIBLE_PAGES - 1,
    );

    return { firstVisiblePage, lastVisiblePage };
  }

  #createButtonItem({ type, text, targetPage }: NavigationButton) {
    const button = this.#createButton(type, text, targetPage);
    this.#buttonElements.push(button);

    const li = document.createElement("li");
    li.appendChild(button);
    return li;
  }

  #createButton(type: ButtonType, text: string, targetPage: number) {
    const button = document.createElement("button");
    button.textContent = text;
    button.classList.add(type);

    if (type === "page") {
      this.#setupPageButton(button, targetPage);
    }

    const isDisabled = this.#isButtonDisabled(type);
    button.disabled = isDisabled;
    button.onclick = () => this.#handlePageChange(targetPage);

    return button;
  }

  #setupPageButton(button: HTMLButtonElement, targetPage: number) {
    button.setAttribute("aria-label", `${targetPage}ページ目へ`);
    if (targetPage === this.selected) {
      button.classList.add("selected");
      button.setAttribute("aria-current", "page");
    }
  }

  #isButtonDisabled(type: ButtonType): boolean {
    if (type === "first" || type === "previous") {
      return this.selected === 1;
    }

    if (type === "next" || type === "last") {
      return this.selected === this.total;
    }

    return false;
  }

  #handlePageChange(newPage: number) {
    if (this.#isInvalidPageChange(newPage)) {
      return;
    }

    this.#updateSelectedPage(newPage);
    this.#dispatchChangeEvent(newPage);
    this.#updatePageButtonStates();
  }

  #isInvalidPageChange(newPage: number): boolean {
    return newPage === this.selected || newPage < 1 || newPage > this.total;
  }

  #updateSelectedPage(newPage: number) {
    this.selected = newPage;
    this.setAttribute("selected", String(newPage));
  }

  #dispatchChangeEvent(newPage: number) {
    this.dispatchEvent(
      new CustomEvent("change", {
        detail: { page: newPage },
      }),
    );
  }

  #updatePageButtonStates() {
    const navigationButtons = this.#getNavigationButtons();

    this.#buttonElements.forEach((button, index) => {
      const buttonData = navigationButtons[index];

      if (button.classList.contains("page")) {
        this.#updatePageButtonDisplay(button, buttonData);
      }

      this.#updateButtonState(button, buttonData);
    });
  }

  #updatePageButtonDisplay(
    button: HTMLButtonElement,
    buttonData: NavigationButton,
  ) {
    button.textContent = buttonData.text;
    const isCurrentPage = buttonData.targetPage === this.selected;
    button.classList.toggle("selected", isCurrentPage);
    button.setAttribute("aria-label", `${buttonData.targetPage}ページ目へ`);

    if (isCurrentPage) {
      button.setAttribute("aria-current", "page");
    } else {
      button.removeAttribute("aria-current");
    }
  }

  #updateButtonState(button: HTMLButtonElement, buttonData: NavigationButton) {
    const isDisabled = this.#isButtonDisabled(buttonData.type);
    button.disabled = isDisabled;
    button.onclick = () => this.#handlePageChange(buttonData.targetPage);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "sp-pagination": SpPagination;
  }
}

if (!customElements.get("sp-pagination")) {
  customElements.define("sp-pagination", SpPagination);
}
