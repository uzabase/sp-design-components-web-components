var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _SpDefinitionListDd_ddElement;
// @ts-ignore
import resetStyle from "@acab/reset.css?inline" assert { type: "css" };
// @ts-ignore
import foundationStyle from "../foundation.css?inline" assert { type: "css" };
// @ts-ignore
import spDefinitionListDdStyle from "./sp-definition-list-dd.css?inline" assert { type: "css" };
const styles = new CSSStyleSheet();
styles.replaceSync(`${resetStyle} ${foundationStyle} ${spDefinitionListDdStyle}`);
export class SpDefinitionListDd extends HTMLElement {
    constructor() {
        super();
        _SpDefinitionListDd_ddElement.set(this, document.createElement("dd"));
        this.attachShadow({ mode: "open" });
    }
    connectedCallback() {
        this.shadowRoot.adoptedStyleSheets = [
            ...this.shadowRoot.adoptedStyleSheets,
            styles,
        ];
        __classPrivateFieldGet(this, _SpDefinitionListDd_ddElement, "f").classList.add("base");
        __classPrivateFieldGet(this, _SpDefinitionListDd_ddElement, "f").innerHTML = this.innerHTML;
        this.shadowRoot.appendChild(__classPrivateFieldGet(this, _SpDefinitionListDd_ddElement, "f"));
    }
}
_SpDefinitionListDd_ddElement = new WeakMap();
customElements.get("sp-definition-list-dd") ||
    customElements.define("sp-definition-list-dd", SpDefinitionListDd);
