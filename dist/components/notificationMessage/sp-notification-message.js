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
var _SpNotificationMessage_type, _SpNotificationMessage_baseElement, _SpNotificationMessage_iconElement;
import resetStyle from "@acab/reset.css?inline";
import foundationStyle from "../foundation.css?inline";
import notificationMessageStyle from "./notification-message.css?inline";
const types = ["error", "warning", "information", "success"];
function isValidType(value) {
    return types.some((type) => type === value);
}
export const iconAriaLabels = {
    error: "エラー",
    warning: "警告",
    information: "情報",
    success: "成功",
};
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
const styles = new CSSStyleSheet();
styles.replaceSync(`${resetStyle} ${foundationStyle} ${notificationMessageStyle}`);
export class SpNotificationMessage extends HTMLElement {
    get type() {
        return __classPrivateFieldGet(this, _SpNotificationMessage_type, "f");
    }
    set type(value) {
        __classPrivateFieldGet(this, _SpNotificationMessage_baseElement, "f").classList.remove(typeClasses[__classPrivateFieldGet(this, _SpNotificationMessage_type, "f")]);
        __classPrivateFieldGet(this, _SpNotificationMessage_baseElement, "f").classList.add(typeClasses[value]);
        __classPrivateFieldGet(this, _SpNotificationMessage_iconElement, "f").innerHTML = iconPaths[value];
        __classPrivateFieldSet(this, _SpNotificationMessage_type, value, "f");
    }
    static get observedAttributes() {
        return ["type"];
    }
    constructor() {
        super();
        _SpNotificationMessage_type.set(this, "information");
        _SpNotificationMessage_baseElement.set(this, document.createElement("div"));
        _SpNotificationMessage_iconElement.set(this, document.createElementNS("http://www.w3.org/2000/svg", "svg"));
        const shadowRoot = this.attachShadow({ mode: "open" });
        shadowRoot.adoptedStyleSheets = [...shadowRoot.adoptedStyleSheets, styles];
        this.type = "information";
    }
    connectedCallback() {
        __classPrivateFieldGet(this, _SpNotificationMessage_baseElement, "f").classList.add("base");
        __classPrivateFieldGet(this, _SpNotificationMessage_iconElement, "f").setAttribute("role", "img");
        __classPrivateFieldGet(this, _SpNotificationMessage_iconElement, "f").setAttribute("viewBox", "0 0 24 24");
        __classPrivateFieldGet(this, _SpNotificationMessage_iconElement, "f").setAttribute("aria-hidden", "false");
        __classPrivateFieldGet(this, _SpNotificationMessage_iconElement, "f").setAttribute("aria-label", iconAriaLabels[this.type]);
        __classPrivateFieldGet(this, _SpNotificationMessage_iconElement, "f").classList.add("icon");
        __classPrivateFieldGet(this, _SpNotificationMessage_iconElement, "f").innerHTML = iconPaths[this.type];
        const content = document.createElement("div");
        content.classList.add("content");
        const slot = document.createElement("slot");
        content.appendChild(slot);
        __classPrivateFieldGet(this, _SpNotificationMessage_baseElement, "f").appendChild(__classPrivateFieldGet(this, _SpNotificationMessage_iconElement, "f"));
        __classPrivateFieldGet(this, _SpNotificationMessage_baseElement, "f").appendChild(content);
        this.shadowRoot.appendChild(__classPrivateFieldGet(this, _SpNotificationMessage_baseElement, "f"));
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
_SpNotificationMessage_type = new WeakMap(), _SpNotificationMessage_baseElement = new WeakMap(), _SpNotificationMessage_iconElement = new WeakMap();
if (!customElements.get("sp-notification-message")) {
    customElements.define("sp-notification-message", SpNotificationMessage);
}
