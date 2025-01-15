// @ts-ignore
import resetStyle from "@acab/reset.css?inline" assert { type: "css" };
// @ts-ignore
import foundationStyle from "../foundation.css?inline" assert { type: "css" };
// @ts-ignore
import paginationStyle from "./pagination.css?inline" assert { type: "css" };

const styles = new CSSStyleSheet();
styles.replaceSync(`${resetStyle} ${foundationStyle} ${paginationStyle}`);

type ButtonType = "first" | "previous" | "next" | "last" | "page";

interface NavigationButton {
  type: ButtonType;
  text: string;
  targetPage: number;
}

export class SpPagination extends HTMLElement {
  #total = 0;
  #current = 0;
  #nav = document.createElement("nav");
  #pageGroupElement = document.createElement("ul");
  #pageButtons: NavigationButton[] = [];

  get total() {
    return this.#total;
  }
  set total(value: number) {
    this.#total = value;
  }

  get current() {
    return this.#current;
  }
  set current(value: number) {
    this.#current = value;
  }

  static get observedAttributes() {
    return ["total", "current"];
  }

  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.adoptedStyleSheets = [...shadowRoot.adoptedStyleSheets, styles];
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

      if (
        Number.isNaN(parsedValue) ||
        !Number.isInteger(parsedValue) ||
        parsedValue > 0
      ) {
        this.total = parsedValue;
        this.#updatePageGroup();
      } else {
        console.warn(`${newValue}は無効なtotal属性です。`);
      }
    } else if (name === "current") {
      const parsedValue = Number(newValue);

      if (
        Number.isNaN(parsedValue) ||
        !Number.isInteger(parsedValue) ||
        parsedValue > 0
      ) {
        this.current = parsedValue;
        this.#updatePageButtonStates();
      } else {
        console.warn(`${newValue}は無効なcurrent属性です。`);
      }
    }
  }

  #updatePageGroup() {
    this.#pageGroupElement.innerHTML = "";

    this.#pageButtons = [
      { type: "first", text: "最初へ", targetPage: 1 },
      { type: "previous", text: "前へ", targetPage: this.current - 1 },
      ...this.#createPageButtons(),
      { type: "next", text: "次へ", targetPage: this.current + 1 },
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
    const firstVisiblePage = Math.min(
      Math.max(1, this.current - 4),
      this.total - 9,
    );
    const lastVisiblePage = Math.max(
      Math.min(this.total, this.current + 5),
      10,
    );

    return { firstVisiblePage, lastVisiblePage };
  }

  #createButtonItem({ type, text, targetPage }: NavigationButton) {
    const button = document.createElement("button");
    button.textContent = text;
    button.classList.add(type);

    if (type === "page") {
      button.setAttribute("aria-label", `${targetPage}ページ目へ`);
      if (targetPage === this.current) {
        button.classList.add("selected");
        button.setAttribute("aria-current", "page");
      }
    }

    const isDisabled = this.#isButtonDisabled(type);
    button.disabled = isDisabled;
    button.onclick = () => this.#handlePageChange(targetPage);

    const li = document.createElement("li");
    li.appendChild(button);
    return li;
  }

  #isButtonDisabled(type: ButtonType): boolean {
    switch (type) {
      case "first":
      case "previous":
        return this.current === 1;
      case "next":
      case "last":
        return this.current === this.total;
      default:
        return false;
    }
  }

  #handlePageChange(newPage: number) {
    if (newPage === this.current || newPage < 1 || newPage > this.total) return;

    this.current = newPage;
    this.setAttribute("current", String(newPage));

    this.dispatchEvent(
      new CustomEvent("page-change", {
        detail: { page: newPage },
      }),
    );

    this.#updatePageButtonStates();
  }

  #updatePageButtonStates() {
    const buttons = this.#pageGroupElement.querySelectorAll("button");

    this.#pageButtons = [
      { type: "first", text: "最初へ", targetPage: 1 },
      { type: "previous", text: "前へ", targetPage: this.current - 1 },
      ...this.#createPageButtons(),
      { type: "next", text: "次へ", targetPage: this.current + 1 },
      { type: "last", text: "最後へ", targetPage: this.total },
    ];

    buttons.forEach((button, index) => {
      const buttonData = this.#pageButtons[index];

      if (button.classList.contains("page")) {
        button.textContent = buttonData.text;
        const isCurrentPage = buttonData.targetPage === this.current;
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

customElements.get("sp-pagination") ||
  customElements.define("sp-pagination", SpPagination);
