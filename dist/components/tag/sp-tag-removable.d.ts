export declare class SpTagRemovable extends HTMLElement {
    #private;
    get disabled(): boolean;
    set disabled(value: boolean);
    get draggable(): boolean;
    set draggable(value: boolean);
    static get observedAttributes(): string[];
    constructor();
    connectedCallback(): void;
    attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
    disconnectedCallback(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        "sp-tag-removable": SpTagRemovable;
    }
}
//# sourceMappingURL=sp-tag-removable.d.ts.map