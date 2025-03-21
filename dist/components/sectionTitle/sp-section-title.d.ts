export declare class SpSectionTitle extends HTMLElement {
    #private;
    set text(value: string);
    static get observedAttributes(): string[];
    constructor();
    connectedCallback(): void;
    attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
}
declare global {
    interface HTMLElementTagNameMap {
        "sp-section-title": SpSectionTitle;
    }
}
//# sourceMappingURL=sp-section-title.d.ts.map