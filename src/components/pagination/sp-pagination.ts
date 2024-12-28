// @ts-ignore
import resetStyle from "@acab/reset.css?inline" assert { type: "css" };
// @ts-ignore
import foundationStyle from "../foundation.css?inline" assert { type: "css" };
// @ts-ignore
import paginationStyle from "./pagination.css?inline" assert { type: "css" };

const styles = new CSSStyleSheet();
styles.replaceSync(`${resetStyle} ${foundationStyle} ${paginationStyle}`);

export class SpPagination extends HTMLElement {
  #total = 0;
  #current = 0;

  #pageGroupElement = document.createElement("ul");

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
    this.shadowRoot!.appendChild(this.#pageGroupElement);

    this.#pageGroupElement.classList.add("page-group");

    this.#updatePageGroup();
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
        this.#updatePageGroup();
      } else {
        console.warn(`${newValue}は無効なcurrent属性です。`);
      }
    }
  }

  #updatePageGroup() {
    this.#pageGroupElement.innerHTML = "";

    const previousButtonItem = this.#createPreviousButtonItem();
    this.#pageGroupElement.appendChild(previousButtonItem);

    const firstVisiblePageNumber = Math.min(
      Math.max(1, this.current - 4),
      this.total - 9,
    );
    const lastVisiblePageNumber = Math.max(
      Math.min(this.total, this.current + 5),
      10,
    );

    for (
      let pageNumber = firstVisiblePageNumber;
      pageNumber <= lastVisiblePageNumber;
      pageNumber++
    ) {
      const pageButtonItem = this.#createPageButtonItem(pageNumber);
      this.#pageGroupElement.appendChild(pageButtonItem);
    }

    const nextButtonItem = this.#createNextButtonItem();
    this.#pageGroupElement.appendChild(nextButtonItem);
  }

  #createPageButtonItem(pageNumber: number) {
    const button = document.createElement("button");
    button.textContent = String(pageNumber);
    button.classList.add("page");

    if (pageNumber === this.current) {
      button.classList.add("selected");
      button.setAttribute("aria-current", "page");
    }

    button.addEventListener("click", () => this.#handlePageClick(pageNumber));

    const li = document.createElement("li");
    li.appendChild(button);

    return li;
  }

  #handlePageClick(pageNumber: number) {
    if (pageNumber !== this.current) {
      this.current = pageNumber;
      this.setAttribute("current", String(pageNumber));

      this.dispatchEvent(
        new CustomEvent("page-change", {
          detail: { page: pageNumber },
        }),
      );

      this.#updatePageGroup();
    }
  }

  #createPreviousButtonItem() {
    const previousButton = document.createElement("button");
    previousButton.textContent = "前へ";
    previousButton.classList.add("previous");
    previousButton.addEventListener("click", () => this.#handlePreviousClick());

    const previousListItem = document.createElement("li");
    previousListItem.appendChild(previousButton);

    return previousListItem;
  }

  #handlePreviousClick() {
    if (this.current > 1) {
      this.current--;
      this.setAttribute("current", String(this.current));

      this.dispatchEvent(
        new CustomEvent("page-change", {
          detail: { page: this.current },
        }),
      );

      this.#updatePageGroup();
    }
  }

  #createNextButtonItem() {
    const nextButton = document.createElement("button");
    nextButton.textContent = "次へ";
    nextButton.classList.add("next");
    nextButton.addEventListener("click", () => this.#handleNextClick());

    const nextListItem = document.createElement("li");
    nextListItem.appendChild(nextButton);

    return nextListItem;
  }

  #handleNextClick() {
    if (this.current < this.total) {
      this.current++;
      this.setAttribute("current", String(this.current));

      this.dispatchEvent(
        new CustomEvent("page-change", {
          detail: { page: this.current },
        }),
      );

      this.#updatePageGroup();
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "sp-pagination": SpPagination;
  }
}

customElements.get("sp-pagination") ||
  customElements.define("sp-pagination", SpPagination);
