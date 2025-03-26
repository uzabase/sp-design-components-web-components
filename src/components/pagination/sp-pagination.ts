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

export class SpPagination extends HTMLElement {
  #total = 1;
  #selected = 1;
  #nav = document.createElement("nav");
  #pageGroupElement = document.createElement("ul");

  #pageButtons: NavigationButton[] = [];
  #buttonElements: HTMLButtonElement[] = [];

  get total() {
    return this.#total;
  }
  set total(value: number) {
    this.#total = value;
  }

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
      const parsedValue = Number(newValue);

      const isValueValid =
        !Number.isNaN(parsedValue) &&
        Number.isInteger(parsedValue) &&
        parsedValue > 0;

      if (isValueValid) {
        this.total = parsedValue;
      } else {
        console.warn(`${newValue}は無効なtotal属性です。`);
        this.total = 1;
      }

      this.#updatePageGroup();
    } else if (name === "selected") {
      const parsedValue = Number(newValue);

      const isValueValid =
        !Number.isNaN(parsedValue) &&
        Number.isInteger(parsedValue) &&
        parsedValue > 0 &&
        parsedValue <= this.total;

      if (isValueValid) {
        this.selected = parsedValue;
      } else {
        console.warn(`${newValue}は無効なselected属性です。`);
        this.selected = 1;
      }

      this.#updatePageButtonStates();
    }
  }

  #updatePageGroup() {
    this.#pageGroupElement.innerHTML = "";
    this.#buttonElements = [];

    this.#pageButtons = [
      { type: "first", text: "最初へ", targetPage: 1 },
      { type: "previous", text: "前へ", targetPage: this.selected - 1 },
      ...this.#createPageButtons(),
      { type: "next", text: "次へ", targetPage: this.selected + 1 },
      { type: "last", text: "最後へ", targetPage: this.total },
    ];

    this.#pageButtons
      .map((button) => this.#createButtonItem(button))
      .forEach((item) => this.#pageGroupElement.appendChild(item));
  }

  #createPageButtons(): NavigationButton[] {
    const { firstVisiblePage, lastVisiblePage } = this.#calculateVisiblePages();

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

  #calculateVisiblePages() {
    const firstVisiblePage = Math.max(
      Math.min(this.selected - 4, this.total - 9),
      1,
    );

    const lastVisiblePage = Math.min(
      Math.max(this.selected + 5, 10),
      this.total,
    );

    return { firstVisiblePage, lastVisiblePage };
  }

  #createButtonItem({ type, text, targetPage }: NavigationButton) {
    const button = document.createElement("button");
    button.textContent = text;
    button.classList.add(type);

    if (type === "page") {
      button.setAttribute("aria-label", `${targetPage}ページ目へ`);
      if (targetPage === this.selected) {
        button.classList.add("selected");
        button.setAttribute("aria-current", "page");
      }
    }

    const isDisabled = this.#isButtonDisabled(type);
    button.disabled = isDisabled;
    button.onclick = () => this.#handlePageChange(targetPage);

    this.#buttonElements.push(button);

    const li = document.createElement("li");
    li.appendChild(button);
    return li;
  }

  #isButtonDisabled(type: ButtonType): boolean {
    switch (type) {
      case "first":
      case "previous":
        return this.selected === 1;
      case "next":
      case "last":
        return this.selected === this.total;
      default:
        return false;
    }
  }

  #handlePageChange(newPage: number) {
    if (newPage === this.selected || newPage < 1 || newPage > this.total) {
      return;
    }

    this.selected = newPage;
    this.setAttribute("selected", String(newPage));

    this.dispatchEvent(
      new CustomEvent("change", {
        detail: { page: newPage },
      }),
    );

    this.#updatePageButtonStates();
  }

  #updatePageButtonStates() {
    this.#pageButtons = [
      { type: "first", text: "最初へ", targetPage: 1 },
      { type: "previous", text: "前へ", targetPage: this.selected - 1 },
      ...this.#createPageButtons(),
      { type: "next", text: "次へ", targetPage: this.selected + 1 },
      { type: "last", text: "最後へ", targetPage: this.total },
    ];

    this.#buttonElements.forEach((button, index) => {
      const buttonData = this.#pageButtons[index];

      if (button.classList.contains("page")) {
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

      const isDisabled = this.#isButtonDisabled(buttonData.type);
      button.disabled = isDisabled;
      button.onclick = () => this.#handlePageChange(buttonData.targetPage);
    });
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
