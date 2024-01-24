import { UbButton } from "@ub-design/components-web-components/";
import "../icon/sp-icon";
import { SpeedaIconTypes } from "../icon/icons";
export declare class SpButton extends UbButton {
    #private;
    static styles: CSSStyleSheet[];
    set icon(val: SpeedaIconTypes | "");
    get icon(): SpeedaIconTypes | "";
    button: HTMLButtonElement;
}
declare global {
    interface HTMLElementTagNameMap {
        "sp-button": SpButton;
    }
}
//# sourceMappingURL=sp-button.d.ts.map