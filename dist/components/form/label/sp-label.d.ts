export declare class SpLabel extends HTMLElement {
    #private;
    static get observedAttributes(): string[];
    get required(): boolean;
    set required(value: boolean);
    constructor();
    connectedCallback(): void;
    attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null): void;
}
declare global {
    interface HTMLElementTagNameMap {
        "sp-label": SpLabel;
    }
}
//# sourceMappingURL=sp-label.d.ts.map