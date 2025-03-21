import { UbButton } from "@ub-design/components-web-components";
export declare class SpButton extends UbButton {
    #private;
    get icon(): string;
    set icon(val: string);
    static get observedAttributes(): string[];
    constructor();
    attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
}
declare global {
    interface HTMLElementTagNameMap {
        "sp-button": SpButton;
    }
}
//# sourceMappingURL=sp-button.d.ts.map