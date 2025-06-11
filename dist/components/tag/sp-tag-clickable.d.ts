export declare class SpTagClickable extends HTMLElement {
    #private;
    /**
     * Returns whether the tag is currently in selected state
     */
    get selected(): boolean;
    /**
     * Sets the selected state of the tag
     */
    set selected(value: boolean);
    /**
     * Returns whether the tag is currently disabled
     */
    get disabled(): boolean;
    /**
     * Sets the disabled state of the tag
     */
    set disabled(value: boolean);
    static get observedAttributes(): string[];
    constructor();
    connectedCallback(): void;
    attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
}
declare global {
    interface HTMLElementTagNameMap {
        "sp-tag-clickable": SpTagClickable;
    }
}
//# sourceMappingURL=sp-tag-clickable.d.ts.map