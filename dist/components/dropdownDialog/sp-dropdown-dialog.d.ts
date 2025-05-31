type Position = "left" | "right";
export declare class SpDropdownDialog extends HTMLElement {
    #private;
    set label(value: string);
    get open(): boolean;
    set open(value: boolean);
    get disabled(): boolean;
    set disabled(value: boolean);
    get position(): Position;
    set position(value: Position);
    static get observedAttributes(): string[];
    constructor();
    connectedCallback(): void;
    disconnectedCallback(): void;
    attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
}
declare global {
    interface HTMLElementTagNameMap {
        "sp-dropdown-dialog": SpDropdownDialog;
    }
}
export {};
//# sourceMappingURL=sp-dropdown-dialog.d.ts.map