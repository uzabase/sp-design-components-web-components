// @ts-ignore
import resetStyle from "@acab/reset.css?inline" assert { type: "css" };
// @ts-ignore
import foundationStyle from "../foundation.css?inline" assert { type: "css" };
// @ts-ignore
import notificationMessageStyle from "./notification-message.css?inline" assert { type: "css" };

type Variant = "error" | "warning" | "info" | "success";

const variants: Variant[] = ["error", "warning", "info", "success"];

function isValidVariant(value: string): value is Variant {
  return variants.some((variant) => variant === value);
}

const variantClasses: Record<Variant, string> = {
  error: "variant__error",
  warning: "variant__warning",
  info: "variant__info",
  success: "variant__success",
};

const styles = new CSSStyleSheet();
styles.replaceSync(
  `${resetStyle} ${foundationStyle} ${notificationMessageStyle}`,
);

export class SpNotificationMessage extends HTMLElement {
  #variant: Variant = "info";

  #baseElement = document.createElement("div");

  get variant() {
    return this.#variant;
  }
  set variant(value: Variant) {
    this.#baseElement.classList.remove(variantClasses[this.#variant]);
    this.#baseElement.classList.add(variantClasses[value]);
    this.#variant = value;
  }

  static get observedAttributes() {
    return ["variant"];
  }

  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.adoptedStyleSheets = [...shadowRoot.adoptedStyleSheets, styles];

    this.variant = "info";
  }

  connectedCallback() {
    this.#baseElement.classList.add("base");

    const icon = document.createElement("sp-icon");
    icon.setAttribute("type", "error");

    const content = document.createElement("div");
    content.classList.add("content");

    const slot = document.createElement("slot");
    content.appendChild(slot);

    this.#baseElement.appendChild(icon);
    this.#baseElement.appendChild(content);

    this.shadowRoot!.appendChild(this.#baseElement);
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) return;
    switch (name) {
      case "variant":
        if (isValidVariant(newValue)) {
          this.variant = newValue;
        } else {
          console.warn(`${newValue}は無効なvariant属性です。`);
          this.variant = "info";
        }
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "sp-notification-message": SpNotificationMessage;
  }
}

customElements.get("sp-notification-message") ||
  customElements.define("sp-notification-message", SpNotificationMessage);
