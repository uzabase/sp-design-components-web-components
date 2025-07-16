type Position = "left" | "right";
/**
 * SpDropdownDialogは、デザインシステム2.0におけるドロップダウンダイアログコンポーネントです。
 * ボタンをクリックすると表示されるダイアログコンテンツを提供します。
 *
 * @element sp-dropdown-dialog
 * @summary ドロップダウンダイアログコンポーネント
 *
 * @slot - ドロップダウンダイアログのコンテンツ（デフォルトスロット）
 */
export declare class SpDropdownDialog extends HTMLElement {
    #private;
    /**
     * ドロップダウンボタンのラベルテキスト
     *
     * @attribute
     * @type {string}
     */
    set label(value: string);
    /**
     * ドロップダウンダイアログの開閉状態
     *
     * @attribute
     * @type {boolean}
     * @default false
     */
    get open(): boolean;
    set open(value: boolean);
    /**
     * ドロップダウンの無効状態
     *
     * @attribute
     * @type {boolean}
     * @default false
     */
    get disabled(): boolean;
    set disabled(value: boolean);
    /**
     * ドロップダウンダイアログの表示位置（"left" または "right"）
     * - "left": 左寄せ
     * - "right": 右寄せ
     *
     * @attribute
     * @type {"left"|"right"}
     * @default "left"
     */
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
        "sp-dropdown-dialog": SpDropdownDialog;
    }
}
export {};
//# sourceMappingURL=sp-dropdown-dialog.d.ts.map