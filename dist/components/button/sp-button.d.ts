import { UbButton } from "@ub-design/components-web-components/";
import { SpeedaIconTypes } from "../icon/icons";
export declare class SpButton extends UbButton {
    #private;
    get icon(): SpeedaIconTypes | "";
    set icon(val: SpeedaIconTypes | "");
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