import { SpIcon } from "../../icon/sp-icon";
import { makeStyleSheet } from "../../styles";
import selectStyle from "./select.css?inline";

export class SpSelect extends HTMLElement {
  static formAssociated = true;
  protected internals: ElementInternals;

  #container: HTMLDivElement = document.createElement("div");
  #button: HTMLButtonElement = document.createElement("button");
  #menu: HTMLDivElement = document.createElement("div");
  #menuItems: HTMLDivElement[] = [];
  #isOpen: boolean = false;
  #menuId: string = "";
  #clickOutsideHandler = this.#handleClickOutside.bind(this);

  // Form state
  #value: string = "";
  #disabled: boolean = false;
  #name: string = "";

  get value() {
    return this.#value;
  }
  set value(value: string) {
    this.#value = value;
    this.internals.setFormValue(value);
    this.#updateButtonText();
    this.#updateMenuItems();
  }

  get name() {
    return this.#name;
  }
  set name(value: string) {
    this.setAttribute("name", value);
    this.#name = value;
  }

  get disabled() {
    return this.#disabled;
  }
  set disabled(value: boolean) {
    if (value) {
      this.setAttribute("disabled", "");
    } else {
      this.removeAttribute("disabled");
    }
    this.#disabled = value;
    this.#button.disabled = value;

    if (value && this.#isOpen) {
      this.#isOpen = false;
      this.#updateMenuDisplay();
    }
  }

  static get observedAttributes() {
    return ["value", "disabled", "name"];
  }

  constructor() {
    super();

    this.attachShadow({ mode: "open" });

    this.shadowRoot!.adoptedStyleSheets = [
      ...this.shadowRoot!.adoptedStyleSheets,
      makeStyleSheet(selectStyle),
    ];

    this.internals = this.attachInternals();

    this.#setupUI();
    this.#menuId = this.#generateRandomId("menu");
  }

  #setupUI() {
    this.#container.classList.add("container");

    // Setup button
    this.#button.classList.add("select");
    this.#button.type = "button";
    this.#button.addEventListener("click", this.#handleButtonClick.bind(this));

    // Add arrow icon
    const arrowIcon = new SpIcon();
    arrowIcon.type = "arrow_down";
    arrowIcon.size = "small";
    arrowIcon.classList.add("icon");
    this.#button.appendChild(arrowIcon);

    // Setup menu
    this.#menu.classList.add("menu");
    this.#menu.setAttribute("role", "menu");
    this.#menu.setAttribute("id", this.#menuId);
    this.#menu.style.display = "none";

    // Setup accessibility
    this.#button.setAttribute("aria-haspopup", "true");
    this.#button.setAttribute("aria-expanded", "false");
    this.#button.setAttribute("aria-controls", this.#menuId);

    // Add to container
    this.#container.appendChild(this.#button);
    this.#container.appendChild(this.#menu);

    this.shadowRoot!.appendChild(this.#container);

    // Setup click outside listener
    window.addEventListener("click", this.#clickOutsideHandler);
  }

  #generateRandomId(prefix: string): string {
    return `${prefix}-${Math.random().toString(36).substring(2, 11)}`;
  }

  attributeChangedCallback(
    name: string,
    oldValue: string | null,
    newValue: string | null,
  ) {
    if (oldValue === newValue) return;

    if (name === "value") {
      this.value = newValue || "";
    } else if (name === "disabled") {
      this.disabled = newValue === "" || newValue === "true";
    } else if (name === "name") {
      this.name = newValue || "";
    }
  }

  connectedCallback() {
    // 静的なoptionからメニューを生成
    this.#updateMenuItems();

    for (const attr of SpSelect.observedAttributes) {
      const value = this.getAttribute(attr);
      if (value !== null) {
        this.attributeChangedCallback(attr, "", value);
      }
    }
  }

  disconnectedCallback() {
    // イベントリスナーを削除
    window.removeEventListener("click", this.#clickOutsideHandler);
  }

  #updateMenuItems() {
    // Clear existing items
    this.#menu.innerHTML = "";
    this.#menuItems = [];

    // Create menu items from options
    const options = Array.from(this.querySelectorAll("option"));
    options.forEach((option) => {
      const menuItem = document.createElement("div");
      menuItem.classList.add("menu-item");
      menuItem.setAttribute("role", "menuitem");
      menuItem.textContent = option.textContent || "";
      menuItem.dataset.value = option.value;

      if (option.disabled) {
        menuItem.classList.add("disabled");
        menuItem.setAttribute("aria-disabled", "true");
      } else {
        menuItem.addEventListener("click", () => {
          this.#handleMenuItemClick(option.value);
        });
      }

      if (option.value === this.#value) {
        menuItem.classList.add("selected");
        menuItem.setAttribute("aria-selected", "true");
      }

      this.#menu.appendChild(menuItem);
      this.#menuItems.push(menuItem);
    });
  }

  #updateButtonText() {
    const options = Array.from(this.querySelectorAll("option"));
    const selectedOption = options.find(
      (option) => option.value === this.#value,
    );
    const buttonText = selectedOption ? selectedOption.textContent || "" : "";

    // Remove existing text nodes but keep the icon
    const icon = this.#button.querySelector("sp-icon");
    Array.from(this.#button.childNodes).forEach((node) => {
      if (node !== icon) {
        node.remove();
      }
    });

    // Add text before the icon
    if (buttonText) {
      const textNode = document.createTextNode(buttonText);
      if (icon) {
        this.#button.insertBefore(textNode, icon);
      } else {
        this.#button.appendChild(textNode);
      }
    }
  }

  #handleButtonClick(event: MouseEvent) {
    event.stopPropagation();
    if (this.disabled) return;

    this.#isOpen = !this.#isOpen;
    this.#updateMenuDisplay();
  }

  #handleMenuItemClick(value: string) {
    this.value = value;
    this.#isOpen = false;
    this.#updateMenuDisplay();

    // Dispatch change event
    const changeEvent = new Event("change", {
      bubbles: true,
      cancelable: true,
    });
    this.dispatchEvent(changeEvent);
  }

  #handleClickOutside(event: MouseEvent) {
    if (!this.#isOpen) return;
    if (this.contains(event.target as Node)) return;

    this.#isOpen = false;
    this.#updateMenuDisplay();
  }

  #updateMenuDisplay() {
    if (this.#isOpen && !this.disabled) {
      this.#menu.style.display = "block";
      this.#button.setAttribute("aria-expanded", "true");
      this.#button.classList.add("open");
    } else {
      this.#menu.style.display = "none";
      this.#button.setAttribute("aria-expanded", "false");
      this.#button.classList.remove("open");
    }
  }
}

if (!customElements.get("sp-select")) {
  customElements.define("sp-select", SpSelect);
}

declare global {
  interface HTMLElementTagNameMap {
    "sp-select": SpSelect;
  }
}
