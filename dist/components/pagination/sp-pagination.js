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
var _SpPagination_instances, _SpPagination_total, _SpPagination_selected, _SpPagination_nav, _SpPagination_pageGroupElement, _SpPagination_pageButtons, _SpPagination_buttonElements, _SpPagination_setupNavigation, _SpPagination_updatePageGroup, _SpPagination_createPageButtons, _SpPagination_calculateVisiblePages, _SpPagination_createButtonItem, _SpPagination_isButtonDisabled, _SpPagination_handlePageChange, _SpPagination_updatePageButtonStates;
import resetStyle from "@acab/reset.css?inline";
import foundationStyle from "../foundation.css?inline";
import paginationStyle from "./pagination.css?inline";
const styles = new CSSStyleSheet();
styles.replaceSync(`${resetStyle} ${foundationStyle} ${paginationStyle}`);
export class SpPagination extends HTMLElement {
    get total() {
        return __classPrivateFieldGet(this, _SpPagination_total, "f");
    }
    set total(value) {
        __classPrivateFieldSet(this, _SpPagination_total, value, "f");
    }
    get selected() {
        return __classPrivateFieldGet(this, _SpPagination_selected, "f");
    }
    set selected(value) {
        __classPrivateFieldSet(this, _SpPagination_selected, value, "f");
    }
    static get observedAttributes() {
        return ["total", "selected"];
    }
    constructor() {
        super();
        _SpPagination_instances.add(this);
        _SpPagination_total.set(this, 1);
        _SpPagination_selected.set(this, 1);
        _SpPagination_nav.set(this, document.createElement("nav"));
        _SpPagination_pageGroupElement.set(this, document.createElement("ul"));
        _SpPagination_pageButtons.set(this, []);
        _SpPagination_buttonElements.set(this, []);
        this.attachShadow({ mode: "open" });
        this.shadowRoot.adoptedStyleSheets = [
            ...this.shadowRoot.adoptedStyleSheets,
            styles,
        ];
    }
    connectedCallback() {
        __classPrivateFieldGet(this, _SpPagination_instances, "m", _SpPagination_setupNavigation).call(this);
        __classPrivateFieldGet(this, _SpPagination_instances, "m", _SpPagination_updatePageGroup).call(this);
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue) {
            return;
        }
        if (name === "total") {
            const parsedValue = Number(newValue);
            const isValueValid = !Number.isNaN(parsedValue) &&
                Number.isInteger(parsedValue) &&
                parsedValue > 0;
            if (isValueValid) {
                this.total = parsedValue;
            }
            else {
                console.warn(`${newValue}は無効なtotal属性です。`);
                this.total = 1;
            }
            __classPrivateFieldGet(this, _SpPagination_instances, "m", _SpPagination_updatePageGroup).call(this);
        }
        else if (name === "selected") {
            const parsedValue = Number(newValue);
            const isValueValid = !Number.isNaN(parsedValue) &&
                Number.isInteger(parsedValue) &&
                parsedValue > 0 &&
                parsedValue <= this.total;
            if (isValueValid) {
                this.selected = parsedValue;
            }
            else {
                console.warn(`${newValue}は無効なselected属性です。`);
                this.selected = 1;
            }
            __classPrivateFieldGet(this, _SpPagination_instances, "m", _SpPagination_updatePageButtonStates).call(this);
        }
    }
}
_SpPagination_total = new WeakMap(), _SpPagination_selected = new WeakMap(), _SpPagination_nav = new WeakMap(), _SpPagination_pageGroupElement = new WeakMap(), _SpPagination_pageButtons = new WeakMap(), _SpPagination_buttonElements = new WeakMap(), _SpPagination_instances = new WeakSet(), _SpPagination_setupNavigation = function _SpPagination_setupNavigation() {
    __classPrivateFieldGet(this, _SpPagination_pageGroupElement, "f").classList.add("page-group");
    __classPrivateFieldGet(this, _SpPagination_nav, "f").appendChild(__classPrivateFieldGet(this, _SpPagination_pageGroupElement, "f"));
    this.shadowRoot.appendChild(__classPrivateFieldGet(this, _SpPagination_nav, "f"));
}, _SpPagination_updatePageGroup = function _SpPagination_updatePageGroup() {
    __classPrivateFieldGet(this, _SpPagination_pageGroupElement, "f").innerHTML = "";
    __classPrivateFieldSet(this, _SpPagination_buttonElements, [], "f");
    __classPrivateFieldSet(this, _SpPagination_pageButtons, [
        { type: "first", text: "最初へ", targetPage: 1 },
        { type: "previous", text: "前へ", targetPage: this.selected - 1 },
        ...__classPrivateFieldGet(this, _SpPagination_instances, "m", _SpPagination_createPageButtons).call(this),
        { type: "next", text: "次へ", targetPage: this.selected + 1 },
        { type: "last", text: "最後へ", targetPage: this.total },
    ], "f");
    __classPrivateFieldGet(this, _SpPagination_pageButtons, "f")
        .map((button) => __classPrivateFieldGet(this, _SpPagination_instances, "m", _SpPagination_createButtonItem).call(this, button))
        .forEach((item) => __classPrivateFieldGet(this, _SpPagination_pageGroupElement, "f").appendChild(item));
}, _SpPagination_createPageButtons = function _SpPagination_createPageButtons() {
    const { firstVisiblePage, lastVisiblePage } = __classPrivateFieldGet(this, _SpPagination_instances, "m", _SpPagination_calculateVisiblePages).call(this);
    return Array.from({ length: lastVisiblePage - firstVisiblePage + 1 }, (_, index) => {
        const pageNumber = firstVisiblePage + index;
        return {
            type: "page",
            text: String(pageNumber),
            targetPage: pageNumber,
        };
    });
}, _SpPagination_calculateVisiblePages = function _SpPagination_calculateVisiblePages() {
    const firstVisiblePage = Math.max(Math.min(this.selected - 4, this.total - 9), 1);
    const lastVisiblePage = Math.min(Math.max(this.selected + 5, 10), this.total);
    return { firstVisiblePage, lastVisiblePage };
}, _SpPagination_createButtonItem = function _SpPagination_createButtonItem({ type, text, targetPage }) {
    const button = document.createElement("button");
    button.textContent = text;
    button.classList.add(type);
    if (type === "page") {
        button.setAttribute("aria-label", `${targetPage}ページ目へ`);
        if (targetPage === this.selected) {
            button.classList.add("selected");
            button.setAttribute("aria-current", "page");
        }
    }
    const isDisabled = __classPrivateFieldGet(this, _SpPagination_instances, "m", _SpPagination_isButtonDisabled).call(this, type);
    button.disabled = isDisabled;
    button.onclick = () => __classPrivateFieldGet(this, _SpPagination_instances, "m", _SpPagination_handlePageChange).call(this, targetPage);
    __classPrivateFieldGet(this, _SpPagination_buttonElements, "f").push(button);
    const li = document.createElement("li");
    li.appendChild(button);
    return li;
}, _SpPagination_isButtonDisabled = function _SpPagination_isButtonDisabled(type) {
    switch (type) {
        case "first":
        case "previous":
            return this.selected === 1;
        case "next":
        case "last":
            return this.selected === this.total;
        default:
            return false;
    }
}, _SpPagination_handlePageChange = function _SpPagination_handlePageChange(newPage) {
    if (newPage === this.selected || newPage < 1 || newPage > this.total) {
        return;
    }
    this.selected = newPage;
    this.setAttribute("selected", String(newPage));
    this.dispatchEvent(new CustomEvent("change", {
        detail: { page: newPage },
    }));
    __classPrivateFieldGet(this, _SpPagination_instances, "m", _SpPagination_updatePageButtonStates).call(this);
}, _SpPagination_updatePageButtonStates = function _SpPagination_updatePageButtonStates() {
    __classPrivateFieldSet(this, _SpPagination_pageButtons, [
        { type: "first", text: "最初へ", targetPage: 1 },
        { type: "previous", text: "前へ", targetPage: this.selected - 1 },
        ...__classPrivateFieldGet(this, _SpPagination_instances, "m", _SpPagination_createPageButtons).call(this),
        { type: "next", text: "次へ", targetPage: this.selected + 1 },
        { type: "last", text: "最後へ", targetPage: this.total },
    ], "f");
    __classPrivateFieldGet(this, _SpPagination_buttonElements, "f").forEach((button, index) => {
        const buttonData = __classPrivateFieldGet(this, _SpPagination_pageButtons, "f")[index];
        if (button.classList.contains("page")) {
            button.textContent = buttonData.text;
            const isCurrentPage = buttonData.targetPage === this.selected;
            button.classList.toggle("selected", isCurrentPage);
            button.setAttribute("aria-label", `${buttonData.targetPage}ページ目へ`);
            if (isCurrentPage) {
                button.setAttribute("aria-current", "page");
            }
            else {
                button.removeAttribute("aria-current");
            }
        }
        const isDisabled = __classPrivateFieldGet(this, _SpPagination_instances, "m", _SpPagination_isButtonDisabled).call(this, buttonData.type);
        button.disabled = isDisabled;
        button.onclick = () => __classPrivateFieldGet(this, _SpPagination_instances, "m", _SpPagination_handlePageChange).call(this, buttonData.targetPage);
    });
};
if (!customElements.get("sp-pagination")) {
    customElements.define("sp-pagination", SpPagination);
}
