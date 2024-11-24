var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _SpDefinitionListDt_dtElement;
// @ts-ignore
import resetStyle from "@acab/reset.css?inline" assert { type: "css" };
// @ts-ignore
import foundationStyle from "../foundation.css?inline" assert { type: "css" };
// @ts-ignore
import spDefinitionListDtStyle from "./sp-definition-list-dt.css?inline" assert { type: "css" };
const styles = new CSSStyleSheet();
styles.replaceSync(`${resetStyle} ${foundationStyle} ${spDefinitionListDtStyle}`);
export class SpDefinitionListDt extends HTMLElement {
    constructor() {
        super();
        _SpDefinitionListDt_dtElement.set(this, document.createElement("dt"));
        this.attachShadow({ mode: "open" });
    }
    connectedCallback() {
        this.shadowRoot.adoptedStyleSheets = [
            ...this.shadowRoot.adoptedStyleSheets,
            styles,
        ];
        __classPrivateFieldGet(this, _SpDefinitionListDt_dtElement, "f").classList.add("base");
        __classPrivateFieldGet(this, _SpDefinitionListDt_dtElement, "f").innerHTML = this.innerHTML;
        this.shadowRoot.appendChild(__classPrivateFieldGet(this, _SpDefinitionListDt_dtElement, "f"));
    }
}
_SpDefinitionListDt_dtElement = new WeakMap();
customElements.get("sp-definition-list-dt") ||
    customElements.define("sp-definition-list-dt", SpDefinitionListDt);
