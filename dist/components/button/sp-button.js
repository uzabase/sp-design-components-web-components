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
var _SpButton_instances, _SpButton_icon, _SpButton_iconElement, _SpButton_appendIconElement, _SpButton_removeIconElement, _SpButton_updateIconElement;
import { UbButton } from "@ub-design/components-web-components";
import foundationStyle from "../foundation.css?inline";
import { SpIcon } from "../icon/sp-icon";
import buttonStyle from "./button.css?inline";
const styles = new CSSStyleSheet();
styles.replaceSync(`${foundationStyle} ${buttonStyle}`);
export class SpButton extends UbButton {
    get icon() {
        return __classPrivateFieldGet(this, _SpButton_icon, "f");
    }
    set icon(val) {
        if (!__classPrivateFieldGet(this, _SpButton_icon, "f") && val) {
            __classPrivateFieldGet(this, _SpButton_instances, "m", _SpButton_appendIconElement).call(this);
            __classPrivateFieldGet(this, _SpButton_instances, "m", _SpButton_updateIconElement).call(this, val);
        }
        else if (val === "") {
            __classPrivateFieldGet(this, _SpButton_instances, "m", _SpButton_removeIconElement).call(this);
        }
        else {
            __classPrivateFieldGet(this, _SpButton_instances, "m", _SpButton_updateIconElement).call(this, val);
        }
        __classPrivateFieldSet(this, _SpButton_icon, val, "f");
    }
    static get observedAttributes() {
        return [...super.observedAttributes, "icon"];
    }
    constructor() {
        super();
        _SpButton_instances.add(this);
        _SpButton_icon.set(this, "");
        _SpButton_iconElement.set(this, new SpIcon());
        this.shadowRoot.adoptedStyleSheets = [
            ...this.shadowRoot.adoptedStyleSheets,
            styles,
        ];
        __classPrivateFieldGet(this, _SpButton_iconElement, "f").classList.add("base__icon");
        __classPrivateFieldGet(this, _SpButton_iconElement, "f").size = "small";
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue)
            return;
        super.attributeChangedCallback(name, oldValue, newValue);
        switch (name) {
            case "icon":
                this.icon = newValue;
                break;
        }
    }
}
_SpButton_icon = new WeakMap(), _SpButton_iconElement = new WeakMap(), _SpButton_instances = new WeakSet(), _SpButton_appendIconElement = function _SpButton_appendIconElement() {
    this.buttonElement.prepend(__classPrivateFieldGet(this, _SpButton_iconElement, "f"));
}, _SpButton_removeIconElement = function _SpButton_removeIconElement() {
    __classPrivateFieldGet(this, _SpButton_iconElement, "f").remove();
}, _SpButton_updateIconElement = function _SpButton_updateIconElement(type) {
    __classPrivateFieldGet(this, _SpButton_iconElement, "f").type = type;
};
if (!customElements.get("sp-button")) {
    customElements.define("sp-button", SpButton);
}
