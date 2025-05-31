import { SpButton } from '../button/sp-button';
/**
 * SpDropdownActionButtonは、デザインシステム2.0におけるドロップダウンアクション用ボタンコンポーネントです。
 * ドロップダウンメニューを開くためのボタンとして使用し、下向き矢印アイコンが自動的に追加されます。
 *
 * @element sp-dropdown-action-button
 * @summary ドロップダウンアクション用ボタンコンポーネント
 */
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