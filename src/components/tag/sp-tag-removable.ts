import "../icon/sp-icon";

import resetStyle from "@acab/reset.css?inline";

import foundationStyle from "../foundation.css?inline";
import tagRemovableStyle from "./tag-removable.css?inline";

const styles = new CSSStyleSheet();
styles.replaceSync(`${resetStyle} ${foundationStyle} ${tagRemovableStyle}`);

export class SpTagRemovable extends HTMLElement {
  #disabled = false;
  #draggable = false;
  #removeButton = document.createElement("button");
  #dragIcon: HTMLElement | null = null;
  #dragStartX = 0;
  #dragStartY = 0;
  #isDragging = false;

  get disabled() {
    return this.#disabled;
  }

  set disabled(value: boolean) {
    if (this.#disabled === value) return;

    this.#disabled = value;
    this.#removeButton.disabled = value;
    this.#render();
  }

  get draggable() {
    return this.#draggable;
  }

  set draggable(value: boolean) {
    if (this.#draggable === value) return;

    this.#draggable = value;
    this.#render();
  }

  static get observedAttributes() {
    return ["disabled", "draggable"];
  }

  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot!.adoptedStyleSheets = [
      ...this.shadowRoot!.adoptedStyleSheets,
      styles,
    ];

    this.disabled = false;
  }

  connectedCallback() {
    this.#removeButton.classList.add("remove");
    this.#removeButton.setAttribute("aria-label", "削除");
    this.#removeButton.setAttribute("type", "button");

    const removeIcon = document.createElement("sp-icon");
    removeIcon.size = "small";
    removeIcon.type = "close";
    removeIcon.setAttribute("aria-hidden", "true");

    this.#removeButton.appendChild(removeIcon);
    this.#removeButton.addEventListener("click", () =>
      this.dispatchEvent(new CustomEvent("remove")),
    );

    this.#render();
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) return;

    switch (name) {
      case "disabled":
        this.disabled = newValue === "true" || newValue === "";
        break;
      case "draggable":
        this.draggable = newValue === "true" || newValue === "";
        break;
    }
  }

  #onDragStart = (event: MouseEvent) => {
    if (this.#disabled) return;

    this.#isDragging = true;
    this.#dragStartX = event.clientX;
    this.#dragStartY = event.clientY;

    // Apply dragging style
    this.classList.add("dragging");

    // Dispatch custom dragstart event
    this.dispatchEvent(
      new CustomEvent("sp-dragstart", {
        bubbles: true,
        composed: true,
        detail: { x: event.clientX, y: event.clientY },
      }),
    );

    // Add global event listeners
    document.addEventListener("mousemove", this.#onDrag);
    document.addEventListener("mouseup", this.#onDragEnd);

    // Prevent default text selection during drag
    event.preventDefault();
  };

  #onDrag = (event: MouseEvent) => {
    if (!this.#isDragging) return;

    const deltaX = event.clientX - this.#dragStartX;
    const deltaY = event.clientY - this.#dragStartY;

    // Dispatch custom drag event
    this.dispatchEvent(
      new CustomEvent("sp-drag", {
        bubbles: true,
        composed: true,
        detail: {
          x: event.clientX,
          y: event.clientY,
          deltaX,
          deltaY,
        },
      }),
    );
  };

  #onDragEnd = (event: MouseEvent) => {
    if (!this.#isDragging) return;

    this.#isDragging = false;

    // Remove dragging style
    this.classList.remove("dragging");

    // Dispatch custom dragend event
    this.dispatchEvent(
      new CustomEvent("sp-dragend", {
        bubbles: true,
        composed: true,
        detail: { x: event.clientX, y: event.clientY },
      }),
    );

    // Remove global event listeners
    document.removeEventListener("mousemove", this.#onDrag);
    document.removeEventListener("mouseup", this.#onDragEnd);
  };

  disconnectedCallback() {
    // Clean up any event listeners when component is removed
    if (this.#dragIcon) {
      this.#dragIcon.removeEventListener("mousedown", this.#onDragStart);
    }
    document.removeEventListener("mousemove", this.#onDrag);
    document.removeEventListener("mouseup", this.#onDragEnd);
  }

  #render() {
    this.shadowRoot!.textContent = "";

    const baseElement = document.createElement("div");
    baseElement.classList.add("base");
    baseElement.setAttribute("role", "tag");

    if (this.#draggable) {
      this.#dragIcon = document.createElement("sp-icon");
      this.#dragIcon.setAttribute("type", "drag");
      this.#dragIcon.setAttribute("size", "small");
      this.#dragIcon.setAttribute("aria-hidden", "true");
      this.#dragIcon.classList.add("drag-icon");

      // Add cursor style and ARIA attributes
      this.#dragIcon.style.cursor = this.#disabled ? "default" : "grab";
      this.#dragIcon.setAttribute("role", "button");
      this.#dragIcon.setAttribute("aria-label", "ドラッグハンドル");

      // Add drag event listener to the icon
      if (!this.#disabled) {
        this.#dragIcon.addEventListener("mousedown", this.#onDragStart);
      }

      baseElement.appendChild(this.#dragIcon);
    }

    const contentElement = document.createElement("span");
    contentElement.classList.add("label");
    const slotElement = document.createElement("slot");
    contentElement.appendChild(slotElement);

    baseElement.appendChild(contentElement);
    baseElement.appendChild(this.#removeButton);

    this.shadowRoot!.appendChild(baseElement);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "sp-tag-removable": SpTagRemovable;
  }
}

if (!customElements.get("sp-tag-removable")) {
  customElements.define("sp-tag-removable", SpTagRemovable);
}
