import "../icon/sp-icon";

import { makeStyleSheet } from "../styles";
import tagRemovableStyle from "./tag-removable.css?inline";

/**
 * SpTagRemovableは、デザインシステム2.0における削除可能なタグコンポーネントです。
 * 削除ボタンを持ち、オプションでドラッグ機能も提供します。
 *
 * @element sp-tag-removable
 * @summary 削除可能なタグコンポーネント
 *
 * @slot - タグのテキストコンテンツ（デフォルトスロット）
 *
 * @fires remove - 削除ボタンがクリックされたときに発火するイベント
 * @fires dragstart - ドラッグが開始されたときに発火するイベント。detail.x、detail.yに座標が含まれます
 * @fires drag - ドラッグ中に発火するイベント。detail.x、detail.y、detail.deltaX、detail.deltaYに座標と移動量が含まれます
 * @fires dragend - ドラッグが終了したときに発火するイベント。detail.x、detail.yに座標が含まれます
 */
export class SpTagRemovable extends HTMLElement {
  #disabled = false;
  #draggable = false;
  #removeButton = document.createElement("button");
  #dragIcon: HTMLElement | null = null;
  #dragStartX = 0;
  #dragStartY = 0;
  #isDragging = false;

  /**
   * タグの無効状態
   *
   * @attribute
   * @type {boolean}
   * @default false
   */
  get disabled() {
    return this.#disabled;
  }

  set disabled(value: boolean) {
    if (this.#disabled === value) return;

    this.#disabled = value;
    this.#removeButton.disabled = value;
    this.#render();
  }

  /**
   * タグのドラッグ可能状態
   *
   * @attribute
   * @type {boolean}
   * @default false
   */
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
      makeStyleSheet(tagRemovableStyle),
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

    const baseElement = this.shadowRoot?.querySelector(".base");
    if (baseElement) {
      baseElement.classList.add("dragging");
    }

    this.dispatchEvent(
      new CustomEvent("dragstart", {
        detail: { x: event.clientX, y: event.clientY },
      }),
    );

    document.addEventListener("mousemove", this.#onDrag);
    document.addEventListener("mouseup", this.#onDragEnd);

    event.preventDefault();
  };

  #onDrag = (event: MouseEvent) => {
    if (!this.#isDragging) return;

    const deltaX = event.clientX - this.#dragStartX;
    const deltaY = event.clientY - this.#dragStartY;

    this.dispatchEvent(
      new CustomEvent("drag", {
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

    const baseElement = this.shadowRoot?.querySelector(".base");
    if (baseElement) {
      baseElement.classList.remove("dragging");
    }

    this.dispatchEvent(
      new CustomEvent("dragend", {
        detail: { x: event.clientX, y: event.clientY },
      }),
    );

    document.removeEventListener("mousemove", this.#onDrag);
    document.removeEventListener("mouseup", this.#onDragEnd);
  };

  disconnectedCallback() {
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

      this.#dragIcon.style.cursor = this.#disabled ? "default" : "grab";
      this.#dragIcon.setAttribute("role", "button");
      this.#dragIcon.setAttribute("aria-label", "ドラッグハンドル");

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
