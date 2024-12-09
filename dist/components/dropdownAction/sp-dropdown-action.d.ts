import "./sp-dropdown-action-button";
import "./sp-dropdown-action-item";
type Position = "left" | "right";
export declare class SpDropdownAction extends HTMLElement {
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
        "sp-dropdown-action": SpDropdownAction;
    }
}
export {};
//# sourceMappingURL=sp-dropdown-action.d.ts.map