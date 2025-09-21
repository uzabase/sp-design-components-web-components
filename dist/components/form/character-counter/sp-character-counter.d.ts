export declare class SpCharacterCounter extends HTMLElement {
    #private;
    static get observedAttributes(): string[];
    get current(): number;
    set current(val: number);
    get max(): number;
    set max(val: number);
    constructor();
    connectedCallback(): void;
    attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null): void;
}
declare global {
    interface HTMLElementTagNameMap {
        "sp-character-counter": SpCharacterCounter;
    }
}
//# sourceMappingURL=sp-character-counter.d.ts.map