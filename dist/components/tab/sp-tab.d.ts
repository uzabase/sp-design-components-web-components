type TabType = "white" | "gray";
export declare class SpTab extends HTMLElement {
    #private;
    get disabled(): boolean;
    set disabled(value: boolean);
    set selected(value: boolean);
    set fill(value: TabType);
    set plusIcon(value: boolean);
    static get observedAttributes(): string[];
    constructor();
    connectedCallback(): void;
    disconnectedCallback(): void;
    attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
}
declare global {
    interface HTMLElementTagNameMap {
        "sp-tab": SpTab;
    }
}
export {};
//# sourceMappingURL=sp-tab.d.ts.map