import { SpButton } from '../button/sp-button';
export declare class SpDropdownActionButton extends SpButton {
    #private;
    constructor();
    connectedCallback(): void;
    setAriaHasPopup(value: string): void;
    setAriaExpanded(value: string): void;
    setAriaControls(value: string): void;
}
declare global {
    interface HTMLElementTagNameMap {
        "sp-dropdown-action-button": SpDropdownActionButton;
    }
}
//# sourceMappingURL=sp-dropdown-action-button.d.ts.map