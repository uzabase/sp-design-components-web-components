// @ts-ignore
import resetStyle from "@acab/reset.css?inline" assert { type: "css" };
// @ts-ignore
import foundationStyle from "../foundation.css?inline" assert { type: "css" };
// @ts-ignore
import notificationMessageStyle from "./notification-message.css?inline" assert { type: "css" };

export type Variant = "error" | "warning" | "info" | "success";

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

const iconPaths: Record<Variant, string> = {
  error:
    '<path fill-rule="evenodd" clip-rule="evenodd" d="M2.58 18.8574L11.3416 3.99902H12.6459L21.4075 18.8574L20.7554 19.999H3.23212L2.58 18.8574ZM11.2 9.5V14.5H12.8V9.5H11.2ZM11.2 16V17.5H12.8V16H11.2Z" fill="#CA3232"/>',
  info: '<path fill-rule="evenodd" clip-rule="evenodd" d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21ZM11.2 7.71997V9.49997H12.8V7.71997H11.2ZM10.5 16.2V16.72H13.5V16.2L12.8 16V11H10.5V11.8L11.2 12V16L10.5 16.2Z" fill="#3978BF"/>',
  success:
    '<path fill-rule="evenodd" clip-rule="evenodd" d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21ZM15.5303 10.5303L14.4697 9.46967L11 12.9393L9.53033 11.4697L8.46967 12.5303L10.4697 14.5303L11 15.0607L11.5303 14.5303L15.5303 10.5303Z" fill="#1A7037"/>',
  warning:
    '<path fill-rule="evenodd" clip-rule="evenodd" d="M2.58 18.8574L11.3416 3.99902H12.6459L21.4075 18.8574L20.7554 19.999H3.23212L2.58 18.8574ZM11.2 9.5V14.5H12.8V9.5H11.2ZM11.2 16V17.5H12.8V16H11.2Z" fill="#EAB100"/>',
};

const styles = new CSSStyleSheet();
styles.replaceSync(
  `${resetStyle} ${foundationStyle} ${notificationMessageStyle}`,
);

export class SpNotificationMessage extends HTMLElement {
  #variant: Variant = "info";

  #baseElement = document.createElement("div");
  #iconElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");

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

    this.#iconElement.setAttribute("role", "img");
    this.#iconElement.setAttribute("viewBox", "0 0 24 24");
    this.#iconElement.classList.add("icon");
    this.#iconElement.innerHTML = iconPaths[this.variant];

    const content = document.createElement("div");
    content.classList.add("content");

    const slot = document.createElement("slot");
    content.appendChild(slot);

    this.#baseElement.appendChild(this.#iconElement);
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
