import "../error-text/sp-error-text";
import "../character-counter/sp-character-counter";
import "../label/sp-label";

import { makeStyleSheet } from "../../styles";
import textFieldStyle from "./text-field.css?inline";

export class SpTextField extends HTMLElement {
  static formAssociated = true;
  protected internals: ElementInternals;

  #inputElement: HTMLInputElement = document.createElement("input");
  #container: HTMLDivElement = document.createElement("div");
  #errorSlot: HTMLSlotElement = document.createElement("slot");
  #errorContainer: HTMLDivElement = document.createElement("div");
  #characterCounter: HTMLElement = document.createElement(
    "sp-character-counter",
  );
  #labelElement: HTMLElement | null = null;
  #characterLimit: number | undefined = undefined;

  get value() {
    return this.#inputElement.value;
  }
  set value(value: string) {
    this.#inputElement.value = value;
    this.internals.setFormValue(value);
    this.#updateCharacterCounter();
  }

  get name() {
    return this.#inputElement.name;
  }
  set name(value: string) {
    this.setAttribute("name", value);
    this.#inputElement.name = value;
  }

  get disabled() {
    return this.#inputElement.disabled;
  }
  set disabled(value: boolean) {
    if (value) {
      this.setAttribute("disabled", "");
    } else {
      this.removeAttribute("disabled");
    }
    this.#inputElement.disabled = value;
  }

  get required() {
    return this.#inputElement.required;
  }
  set required(value: boolean) {
    if (value) {
      this.setAttribute("required", "");
    } else {
      this.removeAttribute("required");
    }
    this.#inputElement.required = value;
  }

  get characterLimit() {
    return this.#characterLimit;
  }
  set characterLimit(value: number | undefined) {
    this.#characterLimit = value;
    if (value === undefined) {
      this.removeAttribute("character-limit");
    } else {
      this.setAttribute("character-limit", String(value));
    }
    this.#updateCharacterCounter();
    this.#updateCharacterCounterVisibility();
  }

  get placeholder() {
    return this.#inputElement.placeholder;
  }
  set placeholder(value: string) {
    this.setAttribute("placeholder", value);
    this.#inputElement.placeholder = value;
  }

  get type() {
    return this.#inputElement.type;
  }
  set type(value: string) {
    this.setAttribute("type", value);
    this.#inputElement.type = value;
  }

  get autocomplete() {
    return this.#inputElement.autocomplete;
  }
  set autocomplete(value: string) {
    this.setAttribute("autocomplete", value);
    // 無効な値を設定した場合もブラウザに判断を委ねるために、プロパティではなく属性を設定
    this.#inputElement.setAttribute("autocomplete", value);
  }

  get label() {
    return this.getAttribute("label") || "";
  }
  set label(value: string) {
    if (value) {
      this.setAttribute("label", value);
    } else {
      this.removeAttribute("label");
    }
    this.#updateLabel();
  }

  static get observedAttributes() {
    return [
      "value",
      "placeholder",
      "disabled",
      "character-limit",
      "name",
      "required",
      "type",
      "autocomplete",
      "label",
    ];
  }

  constructor() {
    super();

    this.attachShadow({ mode: "open" });

    this.shadowRoot!.adoptedStyleSheets = [
      ...this.shadowRoot!.adoptedStyleSheets,
      makeStyleSheet(textFieldStyle),
    ];

    this.internals = this.attachInternals();

    this.#setupErrorSlot();
    this.#setupInputElement();
    this.#setupCharacterCounter();
    this.#setupEventForwarding();
    this.#setupErrorSlotObserver();
    this.#updateLabel();
  }

  #setupInputElement() {
    this.#inputElement.classList.add("text-field");
    this.#inputElement.type = "text";
    this.#inputElement.setAttribute(
      "aria-describedby",
      this.#errorContainer.id,
    );
    this.#container.classList.add("container");
    this.#container.appendChild(this.#inputElement);
    this.shadowRoot!.appendChild(this.#container);
  }

  #setupErrorSlot() {
    this.#errorSlot.name = "error-text";

    this.#errorContainer.classList.add("error-container");
    this.#errorContainer.setAttribute("role", "alert");
    this.#errorContainer.setAttribute("aria-live", "polite");
    this.#errorContainer.id = this.#generateRandomId();
    this.#errorContainer.appendChild(this.#errorSlot);
  }

  #setupCharacterCounter() {
    this.#characterCounter.classList.add("character-counter");

    // infoContainerを作成し、inputの後に配置
    const infoContainer = document.createElement("div");
    infoContainer.classList.add("info");
    infoContainer.appendChild(this.#errorContainer);
    infoContainer.appendChild(this.#characterCounter);

    this.#container.appendChild(infoContainer);

    this.#updateCharacterCounterVisibility();
  }

  #updateCharacterCounterVisibility() {
    if (!this.#characterCounter) return;

    const hasCharacterCounter =
      this.#characterLimit !== undefined && this.#characterLimit > 0;
    if (hasCharacterCounter) {
      this.#characterCounter.style.display = "inline-block";
      this.#updateCharacterCounter();
    } else {
      this.#characterCounter.style.display = "none";
    }
  }

  #updateCharacterCounter() {
    if (
      !this.#characterCounter ||
      this.#characterLimit === undefined ||
      this.#characterLimit <= 0
    )
      return;

    const currentLength = this.value.length;
    const maxLength = this.#characterLimit;

    this.#characterCounter.setAttribute("current", String(currentLength));
    this.#characterCounter.setAttribute("max", String(maxLength));
  }

  attributeChangedCallback(
    name: string,
    oldValue: string | null,
    newValue: string | null,
  ) {
    if (oldValue === newValue) return;

    if (name === "value") {
      this.value = newValue || "";
    } else if (name === "placeholder") {
      this.placeholder = newValue || "";
    } else if (name === "disabled") {
      this.disabled = newValue === "" || newValue === "true";
    } else if (name === "character-limit") {
      if (!newValue) {
        this.#characterLimit = undefined;
      } else {
        const parsed = parseInt(newValue);
        if (parsed <= 0) {
          console.error(
            `Invalid character-limit: ${parsed}. Must be greater than 0.`,
          );
          return;
        }
        this.#characterLimit = parsed;
      }
      this.#updateCharacterCounter();
      this.#updateCharacterCounterVisibility();
    } else if (name === "name") {
      this.name = newValue || "";
    } else if (name === "required") {
      this.required = newValue === "" || newValue === "true";
      this.#updateLabel();
    } else if (name === "type") {
      this.type = newValue || "text";
    } else if (name === "autocomplete") {
      this.autocomplete = newValue || "";
    } else if (name === "label") {
      this.#updateLabel();
    }
  }

  connectedCallback() {
    for (const attr of SpTextField.observedAttributes) {
      const value = this.getAttribute(attr);
      if (value !== null) {
        this.attributeChangedCallback(attr, "", value);
      }
    }
    this.#updateCharacterCounterVisibility();
  }

  #setupEventForwarding() {
    this.#inputElement.addEventListener("input", (event) => {
      const forwardedEvent = new Event("input", {
        bubbles: event.bubbles,
        cancelable: event.cancelable,
      });
      this.dispatchEvent(forwardedEvent);
    });

    this.#inputElement.addEventListener("input", () => {
      this.value = this.#inputElement.value;
      this.#updateCharacterCounter();
    });
  }

  #setupErrorSlotObserver() {
    this.#errorSlot.addEventListener("slotchange", () => {
      this.#updateErrorState();
    });

    this.#updateErrorState();
  }

  #generateRandomId(): string {
    return `error-${Math.random().toString(36).substring(2, 11)}`;
  }

  #updateErrorState() {
    const assignedElements = this.#errorSlot.assignedElements();
    const hasErrorContent = assignedElements.length > 0;

    if (hasErrorContent) {
      this.#inputElement.setAttribute("aria-invalid", "true");
      this.#showErrorText();
    } else {
      this.#inputElement.removeAttribute("aria-invalid");
      this.#hideErrorText();
    }
  }

  #showErrorText() {
    if (!this.#container) return;
    const errorContainer = this.#container.querySelector(
      ".error-container",
    ) as HTMLElement;
    if (errorContainer) {
      errorContainer.style.display = "flex";
    }
  }

  #hideErrorText() {
    if (!this.#container) return;
    const errorContainer = this.#container.querySelector(
      ".error-container",
    ) as HTMLElement;
    if (errorContainer) {
      errorContainer.style.display = "none";
    }
  }

  #updateLabel() {
    const labelText = this.getAttribute("label");

    if (labelText) {
      if (!this.#labelElement) {
        this.#labelElement = document.createElement("sp-label");

        if (this.shadowRoot && this.#container) {
          this.shadowRoot.insertBefore(this.#labelElement, this.#container);
        }

        this.#setupLabelClickHandler();
      }

      this.#labelElement.textContent = labelText;

      this.#inputElement.setAttribute("aria-label", labelText);

      if (this.required) {
        this.#labelElement.setAttribute("required", "");
      } else {
        this.#labelElement.removeAttribute("required");
      }
    } else {
      if (this.#labelElement) {
        this.#inputElement.removeAttribute("aria-label");
        this.#labelElement.remove();
        this.#labelElement = null;
      }
    }
  }

  #setupLabelClickHandler() {
    if (!this.#labelElement) return;

    this.#labelElement.addEventListener("click", (event: Event) => {
      if (this.disabled || event.defaultPrevented) return;

      this.#inputElement.focus();
    });
  }
}

if (!customElements.get("sp-text-field")) {
  customElements.define("sp-text-field", SpTextField);
}

declare global {
  interface HTMLElementTagNameMap {
    "sp-text-field": SpTextField;
  }
}
