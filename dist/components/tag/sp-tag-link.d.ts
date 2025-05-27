import "../icon/sp-icon";
export declare class SpTagLink extends HTMLElement {
    #private;
    href: string;
    get disabled(): boolean;
    set disabled(value: boolean);
    static get observedAttributes(): string[];
    constructor();
    connectedCallback(): void;
    attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
}
declare global {
    interface HTMLElementTagNameMap {
        "sp-tag-link": SpTagLink;
    }
}
//# sourceMappingURL=sp-tag-link.d.ts.map