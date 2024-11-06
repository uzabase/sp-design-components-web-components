type TabType = "tabWhite" | "tabGray";
export declare class SpTab extends HTMLElement {
    #private;
    tabElement: HTMLButtonElement;
    textElement: HTMLSpanElement;
    set text(value: string);
    get selected(): boolean;
    set selected(value: boolean);
    get disabled(): boolean;
    set disabled(value: boolean);
    get type(): TabType;
    set type(value: TabType);
    get createNewIcon(): boolean;
    set createNewIcon(value: boolean);
    static get observedAttributes(): string[];
    constructor();
    connectedCallback(): void;
    attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
}
declare global {
    interface HTMLElementTagNameMap {
        "sp-tab": SpTab;
    }
}
export {};
//# sourceMappingURL=sp-tab.d.ts.map