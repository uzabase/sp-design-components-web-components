export declare class SpElementTitle extends HTMLElement {
    #private;
    set text(value: string);
    static get observedAttributes(): string[];
    constructor();
    connectedCallback(): void;
    attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
}
declare global {
    interface HTMLElementTagNameMap {
        "sp-element-title": SpElementTitle;
    }
}
//# sourceMappingURL=sp-element-title.d.ts.map