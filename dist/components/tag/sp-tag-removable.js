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
var _SpTagRemovable_instances, _SpTagRemovable_disabled, _SpTagRemovable_draggable, _SpTagRemovable_removeButton, _SpTagRemovable_dragIcon, _SpTagRemovable_dragStartX, _SpTagRemovable_dragStartY, _SpTagRemovable_isDragging, _SpTagRemovable_onDragStart, _SpTagRemovable_onDrag, _SpTagRemovable_onDragEnd, _SpTagRemovable_render;
import "../icon/sp-icon";
import resetStyle from "@acab/reset.css?inline";
import foundationStyle from "../foundation.css?inline";
import tagRemovableStyle from "./tag-removable.css?inline";
const styles = new CSSStyleSheet();
styles.replaceSync(`${resetStyle} ${foundationStyle} ${tagRemovableStyle}`);
export class SpTagRemovable extends HTMLElement {
    get disabled() {
        return __classPrivateFieldGet(this, _SpTagRemovable_disabled, "f");
    }
    set disabled(value) {
        if (__classPrivateFieldGet(this, _SpTagRemovable_disabled, "f") === value)
            return;
        __classPrivateFieldSet(this, _SpTagRemovable_disabled, value, "f");
        __classPrivateFieldGet(this, _SpTagRemovable_removeButton, "f").disabled = value;
        __classPrivateFieldGet(this, _SpTagRemovable_instances, "m", _SpTagRemovable_render).call(this);
    }
    get draggable() {
        return __classPrivateFieldGet(this, _SpTagRemovable_draggable, "f");
    }
    set draggable(value) {
        if (__classPrivateFieldGet(this, _SpTagRemovable_draggable, "f") === value)
            return;
        __classPrivateFieldSet(this, _SpTagRemovable_draggable, value, "f");
        __classPrivateFieldGet(this, _SpTagRemovable_instances, "m", _SpTagRemovable_render).call(this);
    }
    static get observedAttributes() {
        return ["disabled", "draggable"];
    }
    constructor() {
        super();
        _SpTagRemovable_instances.add(this);
        _SpTagRemovable_disabled.set(this, false);
        _SpTagRemovable_draggable.set(this, false);
        _SpTagRemovable_removeButton.set(this, document.createElement("button"));
        _SpTagRemovable_dragIcon.set(this, null);
        _SpTagRemovable_dragStartX.set(this, 0);
        _SpTagRemovable_dragStartY.set(this, 0);
        _SpTagRemovable_isDragging.set(this, false);
        _SpTagRemovable_onDragStart.set(this, (event) => {
            if (__classPrivateFieldGet(this, _SpTagRemovable_disabled, "f"))
                return;
            __classPrivateFieldSet(this, _SpTagRemovable_isDragging, true, "f");
            __classPrivateFieldSet(this, _SpTagRemovable_dragStartX, event.clientX, "f");
            __classPrivateFieldSet(this, _SpTagRemovable_dragStartY, event.clientY, "f");
            const baseElement = this.shadowRoot?.querySelector(".base");
            if (baseElement) {
                baseElement.classList.add("dragging");
            }
            this.dispatchEvent(new CustomEvent("dragstart", {
                detail: { x: event.clientX, y: event.clientY },
            }));
            document.addEventListener("mousemove", __classPrivateFieldGet(this, _SpTagRemovable_onDrag, "f"));
            document.addEventListener("mouseup", __classPrivateFieldGet(this, _SpTagRemovable_onDragEnd, "f"));
            event.preventDefault();
        });
        _SpTagRemovable_onDrag.set(this, (event) => {
            if (!__classPrivateFieldGet(this, _SpTagRemovable_isDragging, "f"))
                return;
            const deltaX = event.clientX - __classPrivateFieldGet(this, _SpTagRemovable_dragStartX, "f");
            const deltaY = event.clientY - __classPrivateFieldGet(this, _SpTagRemovable_dragStartY, "f");
            this.dispatchEvent(new CustomEvent("drag", {
                detail: {
                    x: event.clientX,
                    y: event.clientY,
                    deltaX,
                    deltaY,
                },
            }));
        });
        _SpTagRemovable_onDragEnd.set(this, (event) => {
            if (!__classPrivateFieldGet(this, _SpTagRemovable_isDragging, "f"))
                return;
            __classPrivateFieldSet(this, _SpTagRemovable_isDragging, false, "f");
            const baseElement = this.shadowRoot?.querySelector(".base");
            if (baseElement) {
                baseElement.classList.remove("dragging");
            }
            this.dispatchEvent(new CustomEvent("dragend", {
                detail: { x: event.clientX, y: event.clientY },
            }));
            document.removeEventListener("mousemove", __classPrivateFieldGet(this, _SpTagRemovable_onDrag, "f"));
            document.removeEventListener("mouseup", __classPrivateFieldGet(this, _SpTagRemovable_onDragEnd, "f"));
        });
        this.attachShadow({ mode: "open" });
        this.shadowRoot.adoptedStyleSheets = [
            ...this.shadowRoot.adoptedStyleSheets,
            styles,
        ];
        this.disabled = false;
    }
    connectedCallback() {
        __classPrivateFieldGet(this, _SpTagRemovable_removeButton, "f").classList.add("remove");
        __classPrivateFieldGet(this, _SpTagRemovable_removeButton, "f").setAttribute("aria-label", "削除");
        __classPrivateFieldGet(this, _SpTagRemovable_removeButton, "f").setAttribute("type", "button");
        const removeIcon = document.createElement("sp-icon");
        removeIcon.size = "small";
        removeIcon.type = "close";
        removeIcon.setAttribute("aria-hidden", "true");
        __classPrivateFieldGet(this, _SpTagRemovable_removeButton, "f").appendChild(removeIcon);
        __classPrivateFieldGet(this, _SpTagRemovable_removeButton, "f").addEventListener("click", () => this.dispatchEvent(new CustomEvent("remove")));
        __classPrivateFieldGet(this, _SpTagRemovable_instances, "m", _SpTagRemovable_render).call(this);
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue)
            return;
        switch (name) {
            case "disabled":
                this.disabled = newValue === "true" || newValue === "";
                break;
            case "draggable":
                this.draggable = newValue === "true" || newValue === "";
                break;
        }
    }
    disconnectedCallback() {
        if (__classPrivateFieldGet(this, _SpTagRemovable_dragIcon, "f")) {
            __classPrivateFieldGet(this, _SpTagRemovable_dragIcon, "f").removeEventListener("mousedown", __classPrivateFieldGet(this, _SpTagRemovable_onDragStart, "f"));
        }
        document.removeEventListener("mousemove", __classPrivateFieldGet(this, _SpTagRemovable_onDrag, "f"));
        document.removeEventListener("mouseup", __classPrivateFieldGet(this, _SpTagRemovable_onDragEnd, "f"));
    }
}
_SpTagRemovable_disabled = new WeakMap(), _SpTagRemovable_draggable = new WeakMap(), _SpTagRemovable_removeButton = new WeakMap(), _SpTagRemovable_dragIcon = new WeakMap(), _SpTagRemovable_dragStartX = new WeakMap(), _SpTagRemovable_dragStartY = new WeakMap(), _SpTagRemovable_isDragging = new WeakMap(), _SpTagRemovable_onDragStart = new WeakMap(), _SpTagRemovable_onDrag = new WeakMap(), _SpTagRemovable_onDragEnd = new WeakMap(), _SpTagRemovable_instances = new WeakSet(), _SpTagRemovable_render = function _SpTagRemovable_render() {
    this.shadowRoot.textContent = "";
    const baseElement = document.createElement("div");
    baseElement.classList.add("base");
    baseElement.setAttribute("role", "tag");
    if (__classPrivateFieldGet(this, _SpTagRemovable_draggable, "f")) {
        __classPrivateFieldSet(this, _SpTagRemovable_dragIcon, document.createElement("sp-icon"), "f");
        __classPrivateFieldGet(this, _SpTagRemovable_dragIcon, "f").setAttribute("type", "drag");
        __classPrivateFieldGet(this, _SpTagRemovable_dragIcon, "f").setAttribute("size", "small");
        __classPrivateFieldGet(this, _SpTagRemovable_dragIcon, "f").setAttribute("aria-hidden", "true");
        __classPrivateFieldGet(this, _SpTagRemovable_dragIcon, "f").classList.add("drag-icon");
        __classPrivateFieldGet(this, _SpTagRemovable_dragIcon, "f").style.cursor = __classPrivateFieldGet(this, _SpTagRemovable_disabled, "f") ? "default" : "grab";
        __classPrivateFieldGet(this, _SpTagRemovable_dragIcon, "f").setAttribute("role", "button");
        __classPrivateFieldGet(this, _SpTagRemovable_dragIcon, "f").setAttribute("aria-label", "ドラッグハンドル");
        if (!__classPrivateFieldGet(this, _SpTagRemovable_disabled, "f")) {
            __classPrivateFieldGet(this, _SpTagRemovable_dragIcon, "f").addEventListener("mousedown", __classPrivateFieldGet(this, _SpTagRemovable_onDragStart, "f"));
        }
        baseElement.appendChild(__classPrivateFieldGet(this, _SpTagRemovable_dragIcon, "f"));
    }
    const contentElement = document.createElement("span");
    contentElement.classList.add("label");
    const slotElement = document.createElement("slot");
    contentElement.appendChild(slotElement);
    baseElement.appendChild(contentElement);
    baseElement.appendChild(__classPrivateFieldGet(this, _SpTagRemovable_removeButton, "f"));
    this.shadowRoot.appendChild(baseElement);
};
if (!customElements.get("sp-tag-removable")) {
    customElements.define("sp-tag-removable", SpTagRemovable);
}
