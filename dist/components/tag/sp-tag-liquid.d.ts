export type SpTagLiquidType = "gray" | "green" | "red" | "yellow" | "blue";
export type SpTagLiquidMode = "light" | "dark";
export declare class SpTagLiquid extends HTMLElement {
    #private;
    get type(): SpTagLiquidType;
    set type(value: SpTagLiquidType);
    get light(): boolean;
    set light(value: boolean);
    static get observedAttributes(): string[];
    constructor();
    connectedCallback(): void;
    attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
}
declare global {
    interface HTMLElementTagNameMap {
        "sp-tag-liquid": SpTagLiquid;
    }
}
//# sourceMappingURL=sp-tag-liquid.d.ts.map