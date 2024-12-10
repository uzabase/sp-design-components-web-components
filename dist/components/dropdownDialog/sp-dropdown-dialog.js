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
var _SpDropdownDialog_instances, _SpDropdownDialog_baseElement, _SpDropdownDialog_buttonElement, _SpDropdownDialog_dialogElement, _SpDropdownDialog_dialogSlotElement, _SpDropdownDialog_open, _SpDropdownDialog_disabled, _SpDropdownDialog_position, _SpDropdownDialog_handleClickButton, _SpDropdownDialog_handleClickOutside, _SpDropdownDialog_updateDialogDisplay;
// @ts-ignore
import resetStyle from "@acab/reset.css?inline" assert { type: "css" };
// @ts-ignore
import foundationStyle from "../foundation.css?inline" assert { type: "css" };
// @ts-ignore
import dropdownDialogStyle from "./dropdown-dialog.css?inline" assert { type: "css" };
import "../button/sp-button";
const positions = ["left", "right"];
function isValidPosition(value) {
    return positions.some((position) => position === value);
}
const styles = new CSSStyleSheet();
styles.replaceSync(`${resetStyle} ${foundationStyle} ${dropdownDialogStyle}`);
export class SpDropdownDialog extends HTMLElement {
    set label(value) {
        __classPrivateFieldGet(this, _SpDropdownDialog_buttonElement, "f").text = value;
    }
    get open() {
        return __classPrivateFieldGet(this, _SpDropdownDialog_open, "f");
    }
    set open(value) {
        __classPrivateFieldSet(this, _SpDropdownDialog_open, value, "f");
        if (value) {
            __classPrivateFieldGet(this, _SpDropdownDialog_buttonElement, "f").setAttribute("selected", "");
        }
        else {
            __classPrivateFieldGet(this, _SpDropdownDialog_buttonElement, "f").removeAttribute("selected");
        }
        __classPrivateFieldGet(this, _SpDropdownDialog_instances, "m", _SpDropdownDialog_updateDialogDisplay).call(this);
    }
    get disabled() {
        return __classPrivateFieldGet(this, _SpDropdownDialog_disabled, "f");
    }
    set disabled(value) {
        __classPrivateFieldSet(this, _SpDropdownDialog_disabled, value, "f");
        __classPrivateFieldGet(this, _SpDropdownDialog_buttonElement, "f").disabled = value;
        __classPrivateFieldGet(this, _SpDropdownDialog_instances, "m", _SpDropdownDialog_updateDialogDisplay).call(this);
    }
    get position() {
        return __classPrivateFieldGet(this, _SpDropdownDialog_position, "f");
    }
    set position(value) {
        if (value === "left") {
            __classPrivateFieldGet(this, _SpDropdownDialog_dialogElement, "f").classList.add("position__left");
            __classPrivateFieldGet(this, _SpDropdownDialog_dialogElement, "f").classList.remove("position__right");
        }
        else {
            __classPrivateFieldGet(this, _SpDropdownDialog_dialogElement, "f").classList.add("position__right");
            __classPrivateFieldGet(this, _SpDropdownDialog_dialogElement, "f").classList.remove("position__left");
        }
        __classPrivateFieldSet(this, _SpDropdownDialog_position, value, "f");
    }
    static get observedAttributes() {
        return ["label", "open", "disabled", "position"];
    }
    constructor() {
        super();
        _SpDropdownDialog_instances.add(this);
        _SpDropdownDialog_baseElement.set(this, document.createElement("div"));
        _SpDropdownDialog_buttonElement.set(this, document.createElement("sp-button"));
        _SpDropdownDialog_dialogElement.set(this, document.createElement("div"));
        _SpDropdownDialog_dialogSlotElement.set(this, document.createElement("slot"));
        _SpDropdownDialog_open.set(this, false);
        _SpDropdownDialog_disabled.set(this, false);
        _SpDropdownDialog_position.set(this, "left");
        const shadowRoot = this.attachShadow({ mode: "open" });
        shadowRoot.adoptedStyleSheets = [...shadowRoot.adoptedStyleSheets, styles];
        this.open = false;
        this.disabled = false;
        this.position = "left";
    }
    connectedCallback() {
        __classPrivateFieldGet(this, _SpDropdownDialog_buttonElement, "f").setAttribute("part", "button");
        __classPrivateFieldGet(this, _SpDropdownDialog_buttonElement, "f").addEventListener("click", __classPrivateFieldGet(this, _SpDropdownDialog_instances, "m", _SpDropdownDialog_handleClickButton).bind(this));
        __classPrivateFieldGet(this, _SpDropdownDialog_baseElement, "f").appendChild(__classPrivateFieldGet(this, _SpDropdownDialog_buttonElement, "f"));
        __classPrivateFieldGet(this, _SpDropdownDialog_dialogElement, "f").classList.add("dialog");
        __classPrivateFieldGet(this, _SpDropdownDialog_dialogElement, "f").role = "dialog";
        __classPrivateFieldGet(this, _SpDropdownDialog_dialogElement, "f").appendChild(__classPrivateFieldGet(this, _SpDropdownDialog_dialogSlotElement, "f"));
        window.addEventListener("click", __classPrivateFieldGet(this, _SpDropdownDialog_instances, "m", _SpDropdownDialog_handleClickOutside).bind(this));
        __classPrivateFieldGet(this, _SpDropdownDialog_baseElement, "f").appendChild(__classPrivateFieldGet(this, _SpDropdownDialog_dialogElement, "f"));
        __classPrivateFieldGet(this, _SpDropdownDialog_baseElement, "f").classList.add("base");
        this.shadowRoot?.appendChild(__classPrivateFieldGet(this, _SpDropdownDialog_baseElement, "f"));
    }
    disconnectedCallback() {
        window.removeEventListener("click", __classPrivateFieldGet(this, _SpDropdownDialog_instances, "m", _SpDropdownDialog_handleClickOutside).bind(this));
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue)
            return;
        switch (name) {
            case "label":
                this.label = newValue;
                break;
            case "open":
                this.open = newValue === "true" || newValue === "";
                break;
            case "disabled":
                this.disabled = newValue === "true" || newValue === "";
                break;
            case "position":
                if (isValidPosition(newValue)) {
                    this.position = newValue;
                }
                else {
                    console.warn(`${newValue}は無効なposition属性です。`);
                    this.position = "left";
                }
        }
    }
}
_SpDropdownDialog_baseElement = new WeakMap(), _SpDropdownDialog_buttonElement = new WeakMap(), _SpDropdownDialog_dialogElement = new WeakMap(), _SpDropdownDialog_dialogSlotElement = new WeakMap(), _SpDropdownDialog_open = new WeakMap(), _SpDropdownDialog_disabled = new WeakMap(), _SpDropdownDialog_position = new WeakMap(), _SpDropdownDialog_instances = new WeakSet(), _SpDropdownDialog_handleClickButton = function _SpDropdownDialog_handleClickButton(event) {
    event.stopPropagation();
    this.open = !this.open;
}, _SpDropdownDialog_handleClickOutside = function _SpDropdownDialog_handleClickOutside(event) {
    event.stopPropagation();
    if (!this.contains(event.target)) {
        this.open = false;
    }
}, _SpDropdownDialog_updateDialogDisplay = function _SpDropdownDialog_updateDialogDisplay() {
    __classPrivateFieldGet(this, _SpDropdownDialog_dialogElement, "f").style.display =
        this.open && !this.disabled ? "block" : "none";
};
customElements.get("sp-dropdown-dialog") ||
    customElements.define("sp-dropdown-dialog", SpDropdownDialog);
