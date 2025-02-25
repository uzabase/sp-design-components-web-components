export declare class SpPagination extends HTMLElement {
    #private;
    get total(): number;
    set total(value: number);
    get selected(): number;
    set selected(value: number);
    static get observedAttributes(): string[];
    constructor();
    connectedCallback(): void;
    attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
}
declare global {
    interface HTMLElementTagNameMap {
        "sp-pagination": SpPagination;
    }
}
//# sourceMappingURL=sp-pagination.d.ts.map