// @ts-ignore
import resetStyle from "@acab/reset.css?inline" assert { type: "css" };
// @ts-ignore
import foundationStyle from "../foundation.css?inline" assert { type: "css" };
// @ts-ignore
import notificationMessageStyle from "./notification-message.css?inline" assert { type: "css" };

const styles = new CSSStyleSheet();
styles.replaceSync(
  `${resetStyle} ${foundationStyle} ${notificationMessageStyle}`,
);

export class SpNotificationMessage extends HTMLElement {
  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.adoptedStyleSheets = [...shadowRoot.adoptedStyleSheets, styles];
  }

  connectedCallback() {
    const base = document.createElement("div");
    base.classList.add("base");

    const icon = document.createElement("sp-icon");
    icon.setAttribute("type", "error");

    const content = document.createElement("div");
    content.classList.add("content");

    const slot = document.createElement("slot");
    content.appendChild(slot);

    base.appendChild(icon);
    base.appendChild(content);

    this.shadowRoot!.appendChild(base);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "sp-notification-message": SpNotificationMessage;
  }
}

customElements.get("sp-notification-message") ||
  customElements.define("sp-notification-message", SpNotificationMessage);
