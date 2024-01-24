var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
var _SpButton_instances, _SpButton__icon, _SpButton__iconElement, _SpButton__createIconElement, _SpButton__removeIconElement, _SpButton__updateIconElement;
import { UbButton } from "@ub-design/components-web-components/";
import "../icon/sp-icon";
// @ts-ignore
import foundationStyle from "../foundation.css?inline" assert { type: "css" };
// @ts-ignore
import buttonStyle from "./button.css?inline" assert { type: "css" };
import { customElement, property, query } from "lit/decorators.js";
const styles = new CSSStyleSheet();
styles.replaceSync(`${foundationStyle} ${buttonStyle}`);
let SpButton = class SpButton extends UbButton {
    constructor() {
        super(...arguments);
        _SpButton_instances.add(this);
        _SpButton__icon.set(this, "");
        _SpButton__iconElement.set(this, void 0);
    }
    set icon(val) {
        if (__classPrivateFieldGet(this, _SpButton__icon, "f") === "" && val) {
            __classPrivateFieldGet(this, _SpButton_instances, "m", _SpButton__createIconElement).call(this, val);
        }
        else if (val == "") {
            __classPrivateFieldGet(this, _SpButton_instances, "m", _SpButton__removeIconElement).call(this);
        }
        else {
            __classPrivateFieldGet(this, _SpButton_instances, "m", _SpButton__updateIconElement).call(this, val);
        }
        __classPrivateFieldSet(this, _SpButton__icon, val || "", "f");
    }
    get icon() {
        return __classPrivateFieldGet(this, _SpButton__icon, "f");
    }
};
_SpButton__icon = new WeakMap();
_SpButton__iconElement = new WeakMap();
_SpButton_instances = new WeakSet();
_SpButton__createIconElement = async function _SpButton__createIconElement(type) {
    __classPrivateFieldSet(this, _SpButton__iconElement, document.createElement("sp-icon"), "f");
    __classPrivateFieldGet(this, _SpButton__iconElement, "f").classList.add("base__icon");
    __classPrivateFieldGet(this, _SpButton__iconElement, "f").setAttribute("type", type);
    __classPrivateFieldGet(this, _SpButton__iconElement, "f").setAttribute("size", "small");
    await this.updateComplete;
    this.button.insertBefore(__classPrivateFieldGet(this, _SpButton__iconElement, "f"), this.button.getElementsByTagName("span")[0]);
};
_SpButton__removeIconElement = function _SpButton__removeIconElement() {
    if (!__classPrivateFieldGet(this, _SpButton__iconElement, "f"))
        return;
    __classPrivateFieldGet(this, _SpButton__iconElement, "f").remove();
    __classPrivateFieldSet(this, _SpButton__iconElement, undefined, "f");
};
_SpButton__updateIconElement = function _SpButton__updateIconElement(type) {
    __classPrivateFieldGet(this, _SpButton__iconElement, "f").setAttribute("type", type);
};
SpButton.styles = [...UbButton.styles, styles];
__decorate([
    property({ type: String })
], SpButton.prototype, "icon", null);
__decorate([
    query("button")
], SpButton.prototype, "button", void 0);
SpButton = __decorate([
    customElement("sp-button")
], SpButton);
export { SpButton };
