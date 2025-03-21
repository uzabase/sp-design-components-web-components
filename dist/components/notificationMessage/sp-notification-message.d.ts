export type Type = "error" | "warning" | "information" | "success";
export declare const iconAriaLabels: Record<Type, string>;
export declare const iconPaths: Record<Type, string>;
export declare class SpNotificationMessage extends HTMLElement {
    #private;
    get type(): Type;
    set type(value: Type);
    static get observedAttributes(): string[];
    constructor();
    connectedCallback(): void;
    attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
}
declare global {
    interface HTMLElementTagNameMap {
        "sp-notification-message": SpNotificationMessage;
    }
}
//# sourceMappingURL=sp-notification-message.d.ts.map