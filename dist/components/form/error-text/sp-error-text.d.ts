export declare class SpErrorText extends HTMLElement {
    #private;
    static get observedAttributes(): string[];
    constructor();
    connectedCallback(): void;
    attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null): void;
}
declare global {
    interface HTMLElementTagNameMap {
        "sp-error-text": SpErrorText;
    }
}
//# sourceMappingURL=sp-error-text.d.ts.map