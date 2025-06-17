import { UbButton } from '@ub-design/components-web-components';
/**
 * SpButtonは、デザインシステム2.0におけるボタンコンポーネントです。
 *
 * @element sp-button
 * @summary ボタンコンポーネント
 *
 * @slot - ボタンのテキストコンテンツ（デフォルトスロット）
 */
export declare class SpButton extends UbButton {
    #private;
    /**
     * ボタンに表示するアイコン名
     * 指定しない場合はアイコンを表示しません
     *
     * @attribute
     * @type {string}
     */
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