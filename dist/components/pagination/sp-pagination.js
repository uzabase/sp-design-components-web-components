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
var _SpPagination_instances, _SpPagination_total, _SpPagination_selected, _SpPagination_nav, _SpPagination_pageGroupElement, _SpPagination_buttonElements, _SpPagination_setupNavigation, _SpPagination_handleTotalAttribute, _SpPagination_handleSelectedAttribute, _SpPagination_updatePageGroup, _SpPagination_getNavigationButtons, _SpPagination_getPageButtons, _SpPagination_calculateVisiblePageRange, _SpPagination_createButtonItem, _SpPagination_createButton, _SpPagination_setupPageButton, _SpPagination_isButtonDisabled, _SpPagination_handlePageChange, _SpPagination_isInvalidPageChange, _SpPagination_updateSelectedPage, _SpPagination_dispatchChangeEvent, _SpPagination_updatePageButtonStates, _SpPagination_updatePageButtonDisplay, _SpPagination_updateButtonState;
import resetStyle from "@acab/reset.css?inline";
import foundationStyle from "../foundation.css?inline";
import paginationStyle from "./pagination.css?inline";
const styles = new CSSStyleSheet();
styles.replaceSync(`${resetStyle} ${foundationStyle} ${paginationStyle}`);
const MAX_VISIBLE_PAGES = 10; // 表示する最大ページ数
const PAGES_BEFORE_SELECTED = 4; // 選択ページの前に表示するページ数
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
            __classPrivateFieldGet(this, _SpPagination_instances, "m", _SpPagination_handleTotalAttribute).call(this, newValue);
        }
        if (name === "selected") {
            __classPrivateFieldGet(this, _SpPagination_instances, "m", _SpPagination_handleSelectedAttribute).call(this, newValue);
        }
    }
}
_SpPagination_total = new WeakMap(), _SpPagination_selected = new WeakMap(), _SpPagination_nav = new WeakMap(), _SpPagination_pageGroupElement = new WeakMap(), _SpPagination_buttonElements = new WeakMap(), _SpPagination_instances = new WeakSet(), _SpPagination_setupNavigation = function _SpPagination_setupNavigation() {
    __classPrivateFieldGet(this, _SpPagination_pageGroupElement, "f").classList.add("page-group");
    __classPrivateFieldGet(this, _SpPagination_nav, "f").appendChild(__classPrivateFieldGet(this, _SpPagination_pageGroupElement, "f"));
    this.shadowRoot.appendChild(__classPrivateFieldGet(this, _SpPagination_nav, "f"));
}, _SpPagination_handleTotalAttribute = function _SpPagination_handleTotalAttribute(value) {
    const parsedValue = Number(value);
    const isValueValid = !Number.isNaN(parsedValue) &&
        Number.isInteger(parsedValue) &&
        parsedValue > 0;
    if (isValueValid) {
        this.total = parsedValue;
    }
    else {
        console.warn(`${value}は無効なtotal属性です。`);
        this.total = 1;
    }
    __classPrivateFieldGet(this, _SpPagination_instances, "m", _SpPagination_updatePageGroup).call(this);
}, _SpPagination_handleSelectedAttribute = function _SpPagination_handleSelectedAttribute(value) {
    const parsedValue = Number(value);
    const isValueValid = !Number.isNaN(parsedValue) &&
        Number.isInteger(parsedValue) &&
        parsedValue > 0 &&
        parsedValue <= this.total;
    if (isValueValid) {
        this.selected = parsedValue;
    }
    else {
        console.warn(`${value}は無効なselected属性です。`);
        this.selected = 1;
    }
    __classPrivateFieldGet(this, _SpPagination_instances, "m", _SpPagination_updatePageButtonStates).call(this);
}, _SpPagination_updatePageGroup = function _SpPagination_updatePageGroup() {
    __classPrivateFieldGet(this, _SpPagination_pageGroupElement, "f").innerHTML = "";
    __classPrivateFieldSet(this, _SpPagination_buttonElements, [], "f");
    const navigationButtons = __classPrivateFieldGet(this, _SpPagination_instances, "m", _SpPagination_getNavigationButtons).call(this);
    navigationButtons
        .map((button) => __classPrivateFieldGet(this, _SpPagination_instances, "m", _SpPagination_createButtonItem).call(this, button))
        .forEach((item) => __classPrivateFieldGet(this, _SpPagination_pageGroupElement, "f").appendChild(item));
}, _SpPagination_getNavigationButtons = function _SpPagination_getNavigationButtons() {
    return [
        { type: "first", text: "最初へ", targetPage: 1 },
        {
            type: "previous",
            text: "前へ",
            targetPage: Math.max(1, this.selected - 1),
        },
        ...__classPrivateFieldGet(this, _SpPagination_instances, "m", _SpPagination_getPageButtons).call(this),
        {
            type: "next",
            text: "次へ",
            targetPage: Math.min(this.total, this.selected + 1),
        },
        { type: "last", text: "最後へ", targetPage: this.total },
    ];
}, _SpPagination_getPageButtons = function _SpPagination_getPageButtons() {
    const { firstVisiblePage, lastVisiblePage } = __classPrivateFieldGet(this, _SpPagination_instances, "m", _SpPagination_calculateVisiblePageRange).call(this);
    return Array.from({ length: lastVisiblePage - firstVisiblePage + 1 }, (_, index) => {
        const pageNumber = firstVisiblePage + index;
        return {
            type: "page",
            text: String(pageNumber),
            targetPage: pageNumber,
        };
    });
}, _SpPagination_calculateVisiblePageRange = function _SpPagination_calculateVisiblePageRange() {
    // 選択ページを中心に表示（選択ページの前にPAGES_BEFORE_SELECTED分のページを表示）
    let firstVisiblePage = Math.max(1, this.selected - PAGES_BEFORE_SELECTED);
    // 最後のページが表示範囲を超える場合は調整
    if (firstVisiblePage + MAX_VISIBLE_PAGES - 1 > this.total) {
        firstVisiblePage = Math.max(1, this.total - MAX_VISIBLE_PAGES + 1);
    }
    const lastVisiblePage = Math.min(this.total, firstVisiblePage + MAX_VISIBLE_PAGES - 1);
    return { firstVisiblePage, lastVisiblePage };
}, _SpPagination_createButtonItem = function _SpPagination_createButtonItem({ type, text, targetPage }) {
    const button = __classPrivateFieldGet(this, _SpPagination_instances, "m", _SpPagination_createButton).call(this, type, text, targetPage);
    __classPrivateFieldGet(this, _SpPagination_buttonElements, "f").push(button);
    const li = document.createElement("li");
    li.appendChild(button);
    return li;
}, _SpPagination_createButton = function _SpPagination_createButton(type, text, targetPage) {
    const button = document.createElement("button");
    button.textContent = text;
    button.classList.add(type);
    if (type === "page") {
        __classPrivateFieldGet(this, _SpPagination_instances, "m", _SpPagination_setupPageButton).call(this, button, targetPage);
    }
    const isDisabled = __classPrivateFieldGet(this, _SpPagination_instances, "m", _SpPagination_isButtonDisabled).call(this, type);
    button.disabled = isDisabled;
    button.onclick = () => __classPrivateFieldGet(this, _SpPagination_instances, "m", _SpPagination_handlePageChange).call(this, targetPage);
    return button;
}, _SpPagination_setupPageButton = function _SpPagination_setupPageButton(button, targetPage) {
    button.setAttribute("aria-label", `${targetPage}ページ目へ`);
    if (targetPage === this.selected) {
        button.classList.add("selected");
        button.setAttribute("aria-current", "page");
    }
}, _SpPagination_isButtonDisabled = function _SpPagination_isButtonDisabled(type) {
    if (type === "first" || type === "previous") {
        return this.selected === 1;
    }
    if (type === "next" || type === "last") {
        return this.selected === this.total;
    }
    return false;
}, _SpPagination_handlePageChange = function _SpPagination_handlePageChange(newPage) {
    if (__classPrivateFieldGet(this, _SpPagination_instances, "m", _SpPagination_isInvalidPageChange).call(this, newPage)) {
        return;
    }
    __classPrivateFieldGet(this, _SpPagination_instances, "m", _SpPagination_updateSelectedPage).call(this, newPage);
    __classPrivateFieldGet(this, _SpPagination_instances, "m", _SpPagination_dispatchChangeEvent).call(this, newPage);
    __classPrivateFieldGet(this, _SpPagination_instances, "m", _SpPagination_updatePageButtonStates).call(this);
}, _SpPagination_isInvalidPageChange = function _SpPagination_isInvalidPageChange(newPage) {
    return newPage === this.selected || newPage < 1 || newPage > this.total;
}, _SpPagination_updateSelectedPage = function _SpPagination_updateSelectedPage(newPage) {
    this.selected = newPage;
    this.setAttribute("selected", String(newPage));
}, _SpPagination_dispatchChangeEvent = function _SpPagination_dispatchChangeEvent(newPage) {
    this.dispatchEvent(new CustomEvent("change", {
        detail: { page: newPage },
    }));
}, _SpPagination_updatePageButtonStates = function _SpPagination_updatePageButtonStates() {
    const navigationButtons = __classPrivateFieldGet(this, _SpPagination_instances, "m", _SpPagination_getNavigationButtons).call(this);
    __classPrivateFieldGet(this, _SpPagination_buttonElements, "f").forEach((button, index) => {
        const buttonData = navigationButtons[index];
        if (button.classList.contains("page")) {
            __classPrivateFieldGet(this, _SpPagination_instances, "m", _SpPagination_updatePageButtonDisplay).call(this, button, buttonData);
        }
        __classPrivateFieldGet(this, _SpPagination_instances, "m", _SpPagination_updateButtonState).call(this, button, buttonData);
    });
}, _SpPagination_updatePageButtonDisplay = function _SpPagination_updatePageButtonDisplay(button, buttonData) {
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
}, _SpPagination_updateButtonState = function _SpPagination_updateButtonState(button, buttonData) {
    const isDisabled = __classPrivateFieldGet(this, _SpPagination_instances, "m", _SpPagination_isButtonDisabled).call(this, buttonData.type);
    button.disabled = isDisabled;
    button.onclick = () => __classPrivateFieldGet(this, _SpPagination_instances, "m", _SpPagination_handlePageChange).call(this, buttonData.targetPage);
};
if (!customElements.get("sp-pagination")) {
    customElements.define("sp-pagination", SpPagination);
}
