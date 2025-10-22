export declare class SpTabPanel extends HTMLElement {
    #private;
    get name(): string | null;
    set name(value: string | null);
    get active(): boolean;
    set active(value: boolean);
    static get observedAttributes(): string[];
    constructor();
    connectedCallback(): void;
    attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null): void;
}
declare global {
    interface HTMLElementTagNameMap {
        "sp-tab-panel": SpTabPanel;
    }
}
//# sourceMappingURL=sp-tab-panel.d.ts.map