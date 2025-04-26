var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _SpDefinitionList_dlElement, _SpDefinitionList_slotElement;
import resetStyle from "@acab/reset.css?inline";
import foundationStyle from "../foundation.css?inline";
import spDefinitionListStyle from "./sp-definition-list.css?inline";
const styles = new CSSStyleSheet();
styles.replaceSync(`${resetStyle} ${foundationStyle} ${spDefinitionListStyle}`);
export class SpDefinitionList extends HTMLElement {
    constructor() {
        super();
        _SpDefinitionList_dlElement.set(this, document.createElement("dl"));
        _SpDefinitionList_slotElement.set(this, document.createElement("slot"));
        this.attachShadow({ mode: "open" });
    }
    connectedCallback() {
        this.shadowRoot.adoptedStyleSheets = [
            ...this.shadowRoot.adoptedStyleSheets,
            styles,
        ];
        __classPrivateFieldGet(this, _SpDefinitionList_dlElement, "f").classList.add("base");
        __classPrivateFieldGet(this, _SpDefinitionList_dlElement, "f").appendChild(__classPrivateFieldGet(this, _SpDefinitionList_slotElement, "f"));
        this.shadowRoot.appendChild(__classPrivateFieldGet(this, _SpDefinitionList_dlElement, "f"));
    }
}
_SpDefinitionList_dlElement = new WeakMap(), _SpDefinitionList_slotElement = new WeakMap();
if (!customElements.get("sp-definition-list")) {
    customElements.define("sp-definition-list", SpDefinitionList);
}
