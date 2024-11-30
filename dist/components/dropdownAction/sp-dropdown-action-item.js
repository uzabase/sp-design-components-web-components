// @ts-ignore
import foundationStyle from "../foundation.css?inline" assert { type: "css" };
// @ts-ignore
import dropdownActionItemStyle from "./dropdown-action-item.css?inline" assert { type: "css" };
const styles = new CSSStyleSheet();
styles.replaceSync(`${foundationStyle} ${dropdownActionItemStyle}`);
export class SpDropdownActionItem extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: "open" });
        shadowRoot.adoptedStyleSheets = [...shadowRoot.adoptedStyleSheets, styles];
    }
    connectedCallback() {
        const baseElement = document.createElement("div");
        const buttonElement = document.createElement("button");
        const slotElement = document.createElement("slot");
        this.role = "menuitem";
        baseElement.classList.add("base");
        buttonElement.classList.add("action");
        buttonElement.appendChild(slotElement);
        baseElement.appendChild(buttonElement);
        this.shadowRoot?.appendChild(baseElement);
    }
}
customElements.get("sp-dropdown-action-item") ||
    customElements.define("sp-dropdown-action-item", SpDropdownActionItem);
