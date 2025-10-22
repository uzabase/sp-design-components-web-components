export declare class SpTextField extends HTMLElement {
    #private;
    static formAssociated: boolean;
    protected internals: ElementInternals;
    get value(): string;
    set value(value: string);
    get name(): string;
    set name(value: string);
    get disabled(): boolean;
    set disabled(value: boolean);
    get required(): boolean;
    set required(value: boolean);
    get characterLimit(): number | undefined;
    set characterLimit(value: number | undefined);
    get placeholder(): string;
    set placeholder(value: string);
    get type(): string;
    set type(value: string);
    get autocomplete(): string;
    set autocomplete(value: string);
    get label(): string;
    set label(value: string);
    get orientation(): string;
    set orientation(value: string);
    static get observedAttributes(): string[];
    constructor();
    attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null): void;
    connectedCallback(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        "sp-text-field": SpTextField;
    }
}
//# sourceMappingURL=sp-text-field.d.ts.map