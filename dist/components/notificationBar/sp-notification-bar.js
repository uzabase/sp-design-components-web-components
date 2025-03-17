var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _SpNotificationBar_type, _SpNotificationBar_baseElement, _SpNotificationBar_bodyElement, _SpNotificationBar_endElement, _SpNotificationBar_iconElement;
import resetStyle from "@acab/reset.css?inline";
import foundationStyle from "../foundation.css?inline";
import { SpIcon } from "../icon/sp-icon";
import notificationBarStyle from "./notification-bar.css?inline";
const types = ["error", "warning", "information", "success"];
function isValidType(value) {
    return types.some((type) => type === value);
}
const typeClasses = {
    error: "type__error",
    warning: "type__warning",
    information: "type__information",
    success: "type__success",
};
export const iconPaths = {
    error: '<path fill-rule="evenodd" clip-rule="evenodd" d="M2.58 18.8574L11.3416 3.99902H12.6459L21.4075 18.8574L20.7554 19.999H3.23212L2.58 18.8574ZM11.2 9.5V14.5H12.8V9.5H11.2ZM11.2 16V17.5H12.8V16H11.2Z" fill="#CA3232"></path>',
    information: '<path fill-rule="evenodd" clip-rule="evenodd" d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21ZM11.2 7.71997V9.49997H12.8V7.71997H11.2ZM10.5 16.2V16.72H13.5V16.2L12.8 16V11H10.5V11.8L11.2 12V16L10.5 16.2Z" fill="#3978BF"></path>',
    success: '<path fill-rule="evenodd" clip-rule="evenodd" d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21ZM15.5303 10.5303L14.4697 9.46967L11 12.9393L9.53033 11.4697L8.46967 12.5303L10.4697 14.5303L11 15.0607L11.5303 14.5303L15.5303 10.5303Z" fill="#1A7037"></path>',
    warning: '<path fill-rule="evenodd" clip-rule="evenodd" d="M2.58 18.8574L11.3416 3.99902H12.6459L21.4075 18.8574L20.7554 19.999H3.23212L2.58 18.8574ZM11.2 9.5V14.5H12.8V9.5H11.2ZM11.2 16V17.5H12.8V16H11.2Z" fill="#EAB100"></path>',
};
export const iconAriaLabels = {
    error: "エラー",
    warning: "警告",
    information: "情報",
    success: "成功",
};
const styles = new CSSStyleSheet();
styles.replaceSync(`${resetStyle} ${foundationStyle} ${notificationBarStyle}`);
export class SpNotificationBar extends HTMLElement {
    get type() {
        return __classPrivateFieldGet(this, _SpNotificationBar_type, "f");
    }
    set type(value) {
        __classPrivateFieldGet(this, _SpNotificationBar_baseElement, "f").classList.remove(typeClasses[__classPrivateFieldGet(this, _SpNotificationBar_type, "f")]);
        __classPrivateFieldGet(this, _SpNotificationBar_baseElement, "f").classList.add(typeClasses[value]);
        __classPrivateFieldGet(this, _SpNotificationBar_iconElement, "f").innerHTML = iconPaths[value];
        __classPrivateFieldSet(this, _SpNotificationBar_type, value, "f");
    }
    static get observedAttributes() {
        return ["type"];
    }
    constructor() {
        super();
        _SpNotificationBar_type.set(this, "information");
        _SpNotificationBar_baseElement.set(this, document.createElement("div"));
        _SpNotificationBar_bodyElement.set(this, document.createElement("div"));
        _SpNotificationBar_endElement.set(this, document.createElement("div"));
        _SpNotificationBar_iconElement.set(this, document.createElementNS("http://www.w3.org/2000/svg", "svg"));
        const shadowRoot = this.attachShadow({ mode: "open" });
        shadowRoot.adoptedStyleSheets = [...shadowRoot.adoptedStyleSheets, styles];
        this.type = "information";
    }
    connectedCallback() {
        __classPrivateFieldGet(this, _SpNotificationBar_baseElement, "f").classList.add("base");
        // Create body element with role="alert"
        __classPrivateFieldGet(this, _SpNotificationBar_bodyElement, "f").classList.add("body");
        __classPrivateFieldGet(this, _SpNotificationBar_bodyElement, "f").setAttribute("role", "alert");
        // Icon setup
        __classPrivateFieldGet(this, _SpNotificationBar_iconElement, "f").setAttribute("role", "img");
        __classPrivateFieldGet(this, _SpNotificationBar_iconElement, "f").setAttribute("viewBox", "0 0 24 24");
        __classPrivateFieldGet(this, _SpNotificationBar_iconElement, "f").setAttribute("aria-hidden", "false");
        __classPrivateFieldGet(this, _SpNotificationBar_iconElement, "f").setAttribute("aria-label", iconAriaLabels[this.type]);
        __classPrivateFieldGet(this, _SpNotificationBar_iconElement, "f").classList.add("icon");
        __classPrivateFieldGet(this, _SpNotificationBar_iconElement, "f").innerHTML = iconPaths[this.type];
        // Content setup
        const content = document.createElement("div");
        content.classList.add("content");
        const slot = document.createElement("slot");
        content.appendChild(slot);
        // Add icon and content to body
        __classPrivateFieldGet(this, _SpNotificationBar_bodyElement, "f").appendChild(__classPrivateFieldGet(this, _SpNotificationBar_iconElement, "f"));
        __classPrivateFieldGet(this, _SpNotificationBar_bodyElement, "f").appendChild(content);
        // End element with close button
        __classPrivateFieldGet(this, _SpNotificationBar_endElement, "f").classList.add("action");
        // Close button setup
        const closeIcon = new SpIcon();
        closeIcon.type = "close";
        closeIcon.setAttribute("aria-hidden", "true");
        const closeButton = document.createElement("button");
        closeButton.classList.add("close");
        closeButton.setAttribute("aria-label", "閉じる");
        closeButton.addEventListener("click", () => {
            this.dispatchEvent(new CustomEvent("close"));
        });
        closeButton.appendChild(closeIcon);
        __classPrivateFieldGet(this, _SpNotificationBar_endElement, "f").appendChild(closeButton);
        // Add body and end to base
        __classPrivateFieldGet(this, _SpNotificationBar_baseElement, "f").appendChild(__classPrivateFieldGet(this, _SpNotificationBar_bodyElement, "f"));
        __classPrivateFieldGet(this, _SpNotificationBar_baseElement, "f").appendChild(__classPrivateFieldGet(this, _SpNotificationBar_endElement, "f"));
        this.shadowRoot.appendChild(__classPrivateFieldGet(this, _SpNotificationBar_baseElement, "f"));
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue)
            return;
        switch (name) {
            case "type":
                if (isValidType(newValue)) {
                    this.type = newValue;
                }
                else {
                    console.warn(`${newValue}は無効なtype属性です。`);
                    this.type = "information";
                }
        }
    }
}
_SpNotificationBar_type = new WeakMap(), _SpNotificationBar_baseElement = new WeakMap(), _SpNotificationBar_bodyElement = new WeakMap(), _SpNotificationBar_endElement = new WeakMap(), _SpNotificationBar_iconElement = new WeakMap();
if (!customElements.get("sp-notification-bar")) {
    customElements.define("sp-notification-bar", SpNotificationBar);
}
