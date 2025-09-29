import "../error-text/sp-error-text";
import "../label/sp-label";

import { makeStyleSheet } from "../../styles";
import selectStyle from "./select.css?inline";

export class SpSelect extends HTMLElement {
  static formAssociated = true;
  protected internals: ElementInternals;

  #wrapper: HTMLDivElement = document.createElement("div");
  #selectElement: HTMLSelectElement = document.createElement("select");
  #container: HTMLDivElement = document.createElement("div");
  #errorSlot: HTMLSlotElement = document.createElement("slot");
  #errorContainer: HTMLDivElement = document.createElement("div");
  #helpSlot: HTMLSlotElement = document.createElement("slot");
  #helpContainer: HTMLDivElement = document.createElement("div");
  #labelElement: HTMLElement | null = null;
  #labelWrapper: HTMLDivElement | null = null;
  #mutationObserver: MutationObserver | null = null;

  get value() {
    return this.#selectElement.value;
  }
  set value(value: string) {
    this.#selectElement.value = value;
    this.internals.setFormValue(value);
  }

  get name() {
    return this.#selectElement.name;
  }
  set name(value: string) {
    this.setAttribute("name", value);
    this.#selectElement.name = value;
  }

  get disabled() {
    return this.#selectElement.disabled;
  }
  set disabled(value: boolean) {
    if (value) {
      this.setAttribute("disabled", "");
    } else {
      this.removeAttribute("disabled");
    }
    this.#selectElement.disabled = value;
  }

  get required() {
    return this.#selectElement.required;
  }
  set required(value: boolean) {
    if (value) {
      this.setAttribute("required", "");
    } else {
      this.removeAttribute("required");
    }
    this.#selectElement.required = value;
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

  get orientation() {
    const value = this.getAttribute("orientation");
    return value === "horizontal" ? "horizontal" : "vertical";
  }
  set orientation(value: string) {
    if (value === "horizontal" || value === "vertical") {
      this.setAttribute("orientation", value);
    } else {
      this.removeAttribute("orientation");
    }
    this.#updateOrientation();
  }

  static get observedAttributes() {
    return ["value", "disabled", "name", "required", "label", "orientation"];
  }

  constructor() {
    super();

    this.attachShadow({ mode: "open" });

    this.shadowRoot!.adoptedStyleSheets = [
      ...this.shadowRoot!.adoptedStyleSheets,
      makeStyleSheet(selectStyle),
    ];

    this.internals = this.attachInternals();

    this.#setupErrorSlot();
    this.#setupHelpSlot();
    this.#setupSelectElement();
    this.#setupEventForwarding();
    this.#setupSlotObservers();
    this.#setupMutationObserver();
    this.#moveOptionsToSelect();
    this.#updateLabel();
    this.#updateOrientation();
    this.#updateAriaLabel();
  }

  #setupErrorSlot() {
    this.#errorSlot.name = "error-text";

    this.#errorContainer.classList.add("error-container");
    this.#errorContainer.setAttribute("role", "alert");
    this.#errorContainer.setAttribute("aria-live", "polite");
    this.#errorContainer.id = this.#generateRandomId("error");
    this.#errorContainer.appendChild(this.#errorSlot);
  }

  #setupHelpSlot() {
    this.#helpSlot.name = "help-text";

    this.#helpContainer.classList.add("help-container");
    this.#helpContainer.id = this.#generateRandomId("help");
    this.#helpContainer.appendChild(this.#helpSlot);
  }

  #setupSelectElement() {
    this.#selectElement.classList.add("select");
    this.#updateAriaDescribedBy();

    this.#wrapper.classList.add("wrapper");
    this.#container.classList.add("container");
    this.#container.appendChild(this.#selectElement);
    this.#wrapper.appendChild(this.#container);

    this.shadowRoot!.appendChild(this.#wrapper);
  }

  #setupEventForwarding() {
    this.#selectElement.addEventListener("change", (event) => {
      const forwardedEvent = new Event("change", {
        bubbles: event.bubbles,
        cancelable: event.cancelable,
      });
      this.dispatchEvent(forwardedEvent);
    });

    this.#selectElement.addEventListener("change", () => {
      this.value = this.#selectElement.value;
    });
  }

  #setupSlotObservers() {
    this.#errorSlot.addEventListener("slotchange", () => {
      this.#updateErrorState();
    });

    this.#helpSlot.addEventListener("slotchange", () => {
      this.#updateHelpState();
    });

    this.#updateErrorState();
    this.#updateHelpState();
  }

  #setupMutationObserver() {
    this.#mutationObserver = new MutationObserver((mutations) => {
      let shouldMoveOptions = false;

      mutations.forEach((mutation) => {
        if (mutation.type === "childList") {
          // option または optgroup が追加/削除された場合
          const hasOptionChanges =
            Array.from(mutation.addedNodes).some(
              (node) =>
                node.nodeName === "OPTION" || node.nodeName === "OPTGROUP",
            ) ||
            Array.from(mutation.removedNodes).some(
              (node) =>
                node.nodeName === "OPTION" || node.nodeName === "OPTGROUP",
            );

          if (hasOptionChanges) {
            shouldMoveOptions = true;
          }
        }
      });

      if (shouldMoveOptions) {
        this.#moveOptionsToSelect();
      }
    });
  }

  #moveOptionsToSelect() {
    // Light DOMからoption要素を取得してselectに移動
    const options = Array.from(this.querySelectorAll("option"));
    const optgroups = Array.from(this.querySelectorAll("optgroup"));

    // optionとoptgroupをselectに移動
    [...options, ...optgroups].forEach((element) => {
      this.#selectElement.appendChild(element);
    });
  }

  #generateRandomId(prefix: string): string {
    return `${prefix}-${Math.random().toString(36).substring(2, 11)}`;
  }

  #updateErrorState() {
    const assignedElements = this.#errorSlot.assignedElements();
    const hasErrorContent = assignedElements.length > 0;

    if (hasErrorContent) {
      this.#selectElement.setAttribute("aria-invalid", "true");
      this.#showErrorText();
    } else {
      this.#selectElement.removeAttribute("aria-invalid");
      this.#hideErrorText();
    }
    this.#updateAriaDescribedBy();
  }

  #updateHelpState() {
    const assignedElements = this.#helpSlot.assignedElements();
    const hasHelpContent = assignedElements.length > 0;

    if (hasHelpContent) {
      this.#showHelpText();
    } else {
      this.#hideHelpText();
    }
    this.#updateAriaDescribedBy();
  }

  #showErrorText() {
    if (this.#errorContainer) {
      this.#errorContainer.style.display = "flex";
      if (!this.#wrapper.contains(this.#errorContainer)) {
        this.#wrapper.appendChild(this.#errorContainer);
      }
    }
  }

  #hideErrorText() {
    if (this.#errorContainer) {
      this.#errorContainer.style.display = "none";
    }
  }

  #showHelpText() {
    if (this.#helpContainer) {
      this.#helpContainer.style.display = "flex";
      if (!this.#wrapper.contains(this.#helpContainer)) {
        this.#wrapper.appendChild(this.#helpContainer);
      }
    }
  }

  #hideHelpText() {
    if (this.#helpContainer) {
      this.#helpContainer.style.display = "none";
    }
  }

  #updateAriaDescribedBy() {
    const describedByIds: string[] = [];

    // Check if help text is visible
    const hasHelpContent = this.#helpSlot.assignedElements().length > 0;
    if (hasHelpContent) {
      describedByIds.push(this.#helpContainer.id);
    }

    // Check if error text is visible
    const hasErrorContent = this.#errorSlot.assignedElements().length > 0;
    if (hasErrorContent) {
      describedByIds.push(this.#errorContainer.id);
    }

    if (describedByIds.length > 0) {
      this.#selectElement.setAttribute(
        "aria-describedby",
        describedByIds.join(" "),
      );
    } else {
      this.#selectElement.removeAttribute("aria-describedby");
    }
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
    } else if (name === "required") {
      this.required = newValue === "" || newValue === "true";
      this.#updateLabel();
    } else if (name === "label") {
      this.#updateLabel();
    } else if (name === "orientation") {
      this.#updateOrientation();
    }
  }

  connectedCallback() {
    this.setAttribute("role", "group");

    // optionが後から追加される場合に備えて再度移動
    this.#moveOptionsToSelect();

    // MutationObserverを開始
    if (this.#mutationObserver) {
      this.#mutationObserver.observe(this, {
        childList: true,
        subtree: true,
      });
    }

    for (const attr of SpSelect.observedAttributes) {
      const value = this.getAttribute(attr);
      if (value !== null) {
        this.attributeChangedCallback(attr, "", value);
      }
    }
  }

  disconnectedCallback() {
    // MutationObserverを停止
    if (this.#mutationObserver) {
      this.#mutationObserver.disconnect();
    }
  }

  #updateLabel() {
    const labelText = this.getAttribute("label");

    if (labelText) {
      if (!this.#labelElement) {
        this.#labelWrapper = document.createElement("div");
        this.#labelWrapper.classList.add("label-wrapper");

        this.#labelElement = document.createElement("sp-label");
        this.#labelWrapper.appendChild(this.#labelElement);

        if (this.#wrapper && this.#container) {
          this.#wrapper.insertBefore(this.#labelWrapper, this.#container);
        }

        this.#setupLabelClickHandler();
      }

      this.#labelElement.textContent = labelText;

      this.#selectElement.setAttribute("aria-label", labelText);

      if (this.required) {
        this.#labelElement.setAttribute("required", "");
      } else {
        this.#labelElement.removeAttribute("required");
      }
    } else {
      if (this.#labelWrapper) {
        this.#selectElement.removeAttribute("aria-label");
        this.#labelWrapper.remove();
        this.#labelWrapper = null;
        this.#labelElement = null;
      }
    }

    this.#updateAriaLabel();
  }

  #setupLabelClickHandler() {
    if (!this.#labelElement) return;

    this.#labelElement.addEventListener("click", (event: Event) => {
      if (this.disabled || event.defaultPrevented) return;

      this.#selectElement.focus();
    });
  }

  #updateOrientation() {
    const orientation = this.orientation;
    this.#wrapper.setAttribute("data-orientation", orientation);
  }

  #updateAriaLabel() {
    const currentLabel = this.label;

    if (currentLabel) {
      this.setAttribute("aria-label", currentLabel);
    } else {
      this.removeAttribute("aria-label");
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
