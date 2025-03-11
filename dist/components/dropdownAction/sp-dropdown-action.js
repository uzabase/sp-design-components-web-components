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
var _SpDropdownAction_instances, _SpDropdownAction_baseElement, _SpDropdownAction_buttonElement, _SpDropdownAction_menuElement, _SpDropdownAction_menuSlotElement, _SpDropdownAction_menuItemElements, _SpDropdownAction_menuId, _SpDropdownAction_open, _SpDropdownAction_disabled, _SpDropdownAction_position, _SpDropdownAction_clickOutsideHandler, _SpDropdownAction_handleClickButton, _SpDropdownAction_handleSlotChange, _SpDropdownAction_handleClickMenuItem, _SpDropdownAction_handleClickOutside, _SpDropdownAction_updateMenuDisplay, _SpDropdownAction_setupAccessibilityAttributes, _SpDropdownAction_updateAriaExpandedAttribute, _SpDropdownAction_syncMenuMinWidthWithButtonWidth;
import "./sp-dropdown-action-button";
import "./sp-dropdown-action-item";
import resetStyle from "@acab/reset.css?inline";
import foundationStyle from "../foundation.css?inline";
import dropdownActionStyle from "./dropdown-action.css?inline";
const positions = ["left", "right"];
function isValidPosition(value) {
    return positions.some((position) => position === value);
}
function createMenuId() {
    return `sp-dropdown-action-menu-${Math.random().toString(32).substring(2)}`;
}
const styles = new CSSStyleSheet();
styles.replaceSync(`${resetStyle} ${foundationStyle} ${dropdownActionStyle}`);
export class SpDropdownAction extends HTMLElement {
    set label(value) {
        __classPrivateFieldGet(this, _SpDropdownAction_buttonElement, "f").textContent = value;
        __classPrivateFieldGet(this, _SpDropdownAction_instances, "m", _SpDropdownAction_syncMenuMinWidthWithButtonWidth).call(this);
    }
    get open() {
        return __classPrivateFieldGet(this, _SpDropdownAction_open, "f");
    }
    set open(value) {
        __classPrivateFieldSet(this, _SpDropdownAction_open, value, "f");
        if (value) {
            __classPrivateFieldGet(this, _SpDropdownAction_buttonElement, "f").setAttribute("selected", "");
        }
        else {
            __classPrivateFieldGet(this, _SpDropdownAction_buttonElement, "f").removeAttribute("selected");
        }
        __classPrivateFieldGet(this, _SpDropdownAction_instances, "m", _SpDropdownAction_updateMenuDisplay).call(this);
    }
    get disabled() {
        return __classPrivateFieldGet(this, _SpDropdownAction_disabled, "f");
    }
    set disabled(value) {
        __classPrivateFieldSet(this, _SpDropdownAction_disabled, value, "f");
        __classPrivateFieldGet(this, _SpDropdownAction_buttonElement, "f").disabled = value;
        __classPrivateFieldGet(this, _SpDropdownAction_instances, "m", _SpDropdownAction_updateMenuDisplay).call(this);
    }
    get position() {
        return __classPrivateFieldGet(this, _SpDropdownAction_position, "f");
    }
    set position(value) {
        if (value === "left") {
            __classPrivateFieldGet(this, _SpDropdownAction_menuElement, "f").classList.add("position__left");
            __classPrivateFieldGet(this, _SpDropdownAction_menuElement, "f").classList.remove("position__right");
        }
        else {
            __classPrivateFieldGet(this, _SpDropdownAction_menuElement, "f").classList.add("position__right");
            __classPrivateFieldGet(this, _SpDropdownAction_menuElement, "f").classList.remove("position__left");
        }
        __classPrivateFieldSet(this, _SpDropdownAction_position, value, "f");
    }
    static get observedAttributes() {
        return ["label", "open", "disabled", "position"];
    }
    constructor() {
        super();
        _SpDropdownAction_instances.add(this);
        _SpDropdownAction_baseElement.set(this, document.createElement("div"));
        _SpDropdownAction_buttonElement.set(this, document.createElement("sp-dropdown-action-button"));
        _SpDropdownAction_menuElement.set(this, document.createElement("div"));
        _SpDropdownAction_menuSlotElement.set(this, document.createElement("slot"));
        _SpDropdownAction_menuItemElements.set(this, []);
        _SpDropdownAction_menuId.set(this, createMenuId());
        _SpDropdownAction_open.set(this, false);
        _SpDropdownAction_disabled.set(this, false);
        _SpDropdownAction_position.set(this, "left");
        _SpDropdownAction_clickOutsideHandler.set(this, __classPrivateFieldGet(this, _SpDropdownAction_instances, "m", _SpDropdownAction_handleClickOutside).bind(this));
        const shadowRoot = this.attachShadow({ mode: "open" });
        shadowRoot.adoptedStyleSheets = [...shadowRoot.adoptedStyleSheets, styles];
        this.open = false;
        this.disabled = false;
        this.position = "left";
    }
    connectedCallback() {
        __classPrivateFieldGet(this, _SpDropdownAction_buttonElement, "f").setAttribute("part", "button");
        __classPrivateFieldGet(this, _SpDropdownAction_buttonElement, "f").addEventListener("click", __classPrivateFieldGet(this, _SpDropdownAction_instances, "m", _SpDropdownAction_handleClickButton).bind(this));
        __classPrivateFieldGet(this, _SpDropdownAction_baseElement, "f").appendChild(__classPrivateFieldGet(this, _SpDropdownAction_buttonElement, "f"));
        __classPrivateFieldGet(this, _SpDropdownAction_menuElement, "f").classList.add("menu");
        __classPrivateFieldGet(this, _SpDropdownAction_menuElement, "f").role = "menu";
        __classPrivateFieldGet(this, _SpDropdownAction_menuElement, "f").appendChild(__classPrivateFieldGet(this, _SpDropdownAction_menuSlotElement, "f"));
        __classPrivateFieldGet(this, _SpDropdownAction_menuSlotElement, "f").addEventListener("slotchange", __classPrivateFieldGet(this, _SpDropdownAction_instances, "m", _SpDropdownAction_handleSlotChange).bind(this));
        window.addEventListener("click", __classPrivateFieldGet(this, _SpDropdownAction_clickOutsideHandler, "f"));
        __classPrivateFieldGet(this, _SpDropdownAction_baseElement, "f").appendChild(__classPrivateFieldGet(this, _SpDropdownAction_menuElement, "f"));
        __classPrivateFieldGet(this, _SpDropdownAction_baseElement, "f").classList.add("base");
        this.shadowRoot?.appendChild(__classPrivateFieldGet(this, _SpDropdownAction_baseElement, "f"));
        __classPrivateFieldGet(this, _SpDropdownAction_instances, "m", _SpDropdownAction_setupAccessibilityAttributes).call(this);
        __classPrivateFieldGet(this, _SpDropdownAction_instances, "m", _SpDropdownAction_syncMenuMinWidthWithButtonWidth).call(this);
    }
    disconnectedCallback() {
        __classPrivateFieldGet(this, _SpDropdownAction_menuItemElements, "f").forEach((element) => {
            element.removeEventListener("click", __classPrivateFieldGet(this, _SpDropdownAction_instances, "m", _SpDropdownAction_handleClickMenuItem).bind(this));
        });
        __classPrivateFieldGet(this, _SpDropdownAction_menuSlotElement, "f").removeEventListener("slotchange", __classPrivateFieldGet(this, _SpDropdownAction_instances, "m", _SpDropdownAction_handleSlotChange).bind(this));
        window.removeEventListener("click", __classPrivateFieldGet(this, _SpDropdownAction_clickOutsideHandler, "f"));
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
_SpDropdownAction_baseElement = new WeakMap(), _SpDropdownAction_buttonElement = new WeakMap(), _SpDropdownAction_menuElement = new WeakMap(), _SpDropdownAction_menuSlotElement = new WeakMap(), _SpDropdownAction_menuItemElements = new WeakMap(), _SpDropdownAction_menuId = new WeakMap(), _SpDropdownAction_open = new WeakMap(), _SpDropdownAction_disabled = new WeakMap(), _SpDropdownAction_position = new WeakMap(), _SpDropdownAction_clickOutsideHandler = new WeakMap(), _SpDropdownAction_instances = new WeakSet(), _SpDropdownAction_handleClickButton = function _SpDropdownAction_handleClickButton(event) {
    event.stopPropagation();
    this.open = !this.open;
    __classPrivateFieldGet(this, _SpDropdownAction_instances, "m", _SpDropdownAction_updateAriaExpandedAttribute).call(this);
}, _SpDropdownAction_handleSlotChange = function _SpDropdownAction_handleSlotChange() {
    __classPrivateFieldSet(this, _SpDropdownAction_menuItemElements, __classPrivateFieldGet(this, _SpDropdownAction_menuSlotElement, "f")
        .assignedElements()
        .filter((element) => element instanceof HTMLElement), "f");
    __classPrivateFieldGet(this, _SpDropdownAction_menuItemElements, "f").forEach((element) => {
        element.addEventListener("click", __classPrivateFieldGet(this, _SpDropdownAction_instances, "m", _SpDropdownAction_handleClickMenuItem).bind(this));
    });
}, _SpDropdownAction_handleClickMenuItem = function _SpDropdownAction_handleClickMenuItem(event) {
    event.stopPropagation();
    this.open = false;
    __classPrivateFieldGet(this, _SpDropdownAction_instances, "m", _SpDropdownAction_updateAriaExpandedAttribute).call(this);
}, _SpDropdownAction_handleClickOutside = function _SpDropdownAction_handleClickOutside(event) {
    event.stopPropagation();
    if (!this.contains(event.target)) {
        this.open = false;
        __classPrivateFieldGet(this, _SpDropdownAction_instances, "m", _SpDropdownAction_updateAriaExpandedAttribute).call(this);
    }
}, _SpDropdownAction_updateMenuDisplay = function _SpDropdownAction_updateMenuDisplay() {
    __classPrivateFieldGet(this, _SpDropdownAction_menuElement, "f").style.display =
        this.open && !this.disabled ? "block" : "none";
}, _SpDropdownAction_setupAccessibilityAttributes = function _SpDropdownAction_setupAccessibilityAttributes() {
    __classPrivateFieldGet(this, _SpDropdownAction_buttonElement, "f").setAriaHasPopup("true");
    __classPrivateFieldGet(this, _SpDropdownAction_buttonElement, "f").setAriaControls(__classPrivateFieldGet(this, _SpDropdownAction_menuId, "f"));
    __classPrivateFieldGet(this, _SpDropdownAction_menuElement, "f").setAttribute("id", __classPrivateFieldGet(this, _SpDropdownAction_menuId, "f"));
    __classPrivateFieldGet(this, _SpDropdownAction_instances, "m", _SpDropdownAction_updateAriaExpandedAttribute).call(this);
}, _SpDropdownAction_updateAriaExpandedAttribute = function _SpDropdownAction_updateAriaExpandedAttribute() {
    __classPrivateFieldGet(this, _SpDropdownAction_buttonElement, "f").setAriaExpanded(this.open ? "true" : "false");
}, _SpDropdownAction_syncMenuMinWidthWithButtonWidth = function _SpDropdownAction_syncMenuMinWidthWithButtonWidth() {
    const buttonWidth = __classPrivateFieldGet(this, _SpDropdownAction_buttonElement, "f").offsetWidth;
    __classPrivateFieldGet(this, _SpDropdownAction_menuElement, "f").style.minWidth = `${buttonWidth}px`;
};
if (!customElements.get("sp-dropdown-action")) {
    customElements.define("sp-dropdown-action", SpDropdownAction);
}
