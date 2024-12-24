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

    for (let pageNumber = 1; pageNumber <= this.total; pageNumber++) {
      const button = document.createElement("button");
      const li = document.createElement("li");

      button.textContent = String(pageNumber);
      button.classList.add("page");

      if (pageNumber === this.current) {
        button.classList.add("selected");
        button.setAttribute("aria-current", "page");
      }

      button.addEventListener("click", () => this.#handlePageClick(pageNumber));

      li.appendChild(button);

      this.#pageGroupElement.appendChild(li);
    }
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
}

declare global {
  interface HTMLElementTagNameMap {
    "sp-pagination": SpPagination;
  }
}

customElements.get("sp-pagination") ||
  customElements.define("sp-pagination", SpPagination);
