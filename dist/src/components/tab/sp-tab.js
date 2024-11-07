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
var _SpTab_instances, _SpTab_selected, _SpTab_disabled, _SpTab_type, _SpTab_createNewIcon, _SpTab_createNewIconElement, _SpTab_onSelectedAdd, _SpTab_onSelectedRemove, _SpTab_tabDisabledUpdate;
// @ts-ignore
import foundationStyle from "../foundation.css?inline" assert { type: "css" };
// @ts-ignore
import tabStyle from "./tab.css?inline" assert { type: "css" };
import { SpIcon } from "../icon/sp-icon";
const styles = new CSSStyleSheet();
styles.replaceSync(`${foundationStyle} ${tabStyle}`);
export class SpTab extends HTMLElement {
    set text(value) {
        this.textElement.innerText = value;
    }
    get selected() {
        return __classPrivateFieldGet(this, _SpTab_selected, "f");
    }
    set selected(value) {
        __classPrivateFieldSet(this, _SpTab_selected, value, "f");
        value ? __classPrivateFieldGet(this, _SpTab_instances, "m", _SpTab_onSelectedAdd).call(this) : __classPrivateFieldGet(this, _SpTab_instances, "m", _SpTab_onSelectedRemove).call(this);
    }
    get disabled() {
        return __classPrivateFieldGet(this, _SpTab_disabled, "f");
    }
    set disabled(value) {
        const tab = this.tabElement;
        __classPrivateFieldSet(this, _SpTab_disabled, value, "f");
        value ? tab.classList.add("isDisable") : tab.classList.remove("isDisable");
        __classPrivateFieldGet(this, _SpTab_instances, "m", _SpTab_tabDisabledUpdate).call(this);
    }
    get type() {
        return __classPrivateFieldGet(this, _SpTab_type, "f");
    }
    set type(value) {
        const tab = this.tabElement;
        const typeClassList = {
            tabWhite: "-white",
            tabGray: "-gray",
        };
        tab.classList.remove(typeClassList[__classPrivateFieldGet(this, _SpTab_type, "f")]);
        tab.classList.add(typeClassList[value]);
        __classPrivateFieldSet(this, _SpTab_type, value, "f");
    }
    get createNewIcon() {
        return __classPrivateFieldGet(this, _SpTab_createNewIcon, "f");
    }
    set createNewIcon(value) {
        __classPrivateFieldSet(this, _SpTab_createNewIcon, value, "f");
        if (value === true) {
            this.tabElement.insertBefore(__classPrivateFieldGet(this, _SpTab_createNewIconElement, "f"), this.textElement);
        }
        else {
            __classPrivateFieldGet(this, _SpTab_createNewIconElement, "f").remove();
        }
    }
    static get observedAttributes() {
        return ["text", "selected", "create-new-icon", "disabled", "type"];
    }
    constructor() {
        super();
        _SpTab_instances.add(this);
        _SpTab_selected.set(this, void 0);
        _SpTab_disabled.set(this, void 0);
        _SpTab_type.set(this, void 0);
        _SpTab_createNewIcon.set(this, void 0);
        _SpTab_createNewIconElement.set(this, new SpIcon());
        this.tabElement = document.createElement("button");
        this.textElement = document.createElement("span");
        this.attachShadow({ mode: "open" });
        this.shadowRoot.adoptedStyleSheets = [
            ...this.shadowRoot.adoptedStyleSheets,
            styles,
        ];
        this.tabElement.classList.add("spds__tab");
        this.tabElement.setAttribute("role", "tab");
        this.tabElement.setAttribute("aria-tabindex", "0");
        this.textElement.classList.add("spds__tabText");
        this.tabElement.appendChild(this.textElement);
    }
    connectedCallback() {
        __classPrivateFieldGet(this, _SpTab_createNewIconElement, "f").classList.add("base__icon");
        __classPrivateFieldGet(this, _SpTab_createNewIconElement, "f").size = "small";
        __classPrivateFieldGet(this, _SpTab_createNewIconElement, "f").type = "plus";
        if (typeof this.selected === "undefined") {
            // this.selected = false;
            this.tabElement.setAttribute("aria-selected", "false");
        }
        if (typeof this.type === "undefined")
            this.type = "tabWhite";
        this.setAttribute("role", "tablist");
        this.shadowRoot.appendChild(this.tabElement);
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue)
            return;
        switch (name) {
            case "text":
                this.text = newValue;
                break;
            case "selected":
                this.selected = newValue === "true" || newValue === "";
                break;
            case "disabled":
                this.disabled = newValue === "true" || newValue === "";
                break;
            case "type":
                this.type = newValue;
                break;
            case "create-new-icon":
                this.createNewIcon = newValue === "true" || newValue === "";
                break;
        }
    }
}
_SpTab_selected = new WeakMap(), _SpTab_disabled = new WeakMap(), _SpTab_type = new WeakMap(), _SpTab_createNewIcon = new WeakMap(), _SpTab_createNewIconElement = new WeakMap(), _SpTab_instances = new WeakSet(), _SpTab_onSelectedAdd = function _SpTab_onSelectedAdd() {
    this.tabElement.classList.add("-selected");
    this.tabElement.setAttribute("aria-selected", "true");
}, _SpTab_onSelectedRemove = function _SpTab_onSelectedRemove() {
    this.tabElement.classList.remove("-selected");
    this.tabElement.setAttribute("aria-selected", "false");
}, _SpTab_tabDisabledUpdate = function _SpTab_tabDisabledUpdate() {
    this.tabElement.disabled = this.disabled;
};
customElements.get("sp-tab") || customElements.define("sp-tab", SpTab);
