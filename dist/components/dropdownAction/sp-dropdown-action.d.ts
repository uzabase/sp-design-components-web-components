type Position = "left" | "right";
/**
 * SpDropdownActionは、デザインシステム2.0におけるドロップダウンアクションコンポーネントです。
 * ボタンをクリックすると表示されるアクションメニューを提供します。
 *
 * @element sp-dropdown-action
 * @summary ドロップダウンアクションコンポーネント
 *
 * @slot - ドロップダウンメニューのアクション項目（デフォルトスロット）
 */
export declare class SpDropdownAction extends HTMLElement {
    #private;
    /**
     * ドロップダウンボタンのラベルテキスト
     *
     * @attribute
     * @type {string}
     */
    set label(value: string);
    /**
     * ドロップダウンメニューの開閉状態
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
     * ドロップダウンメニューの表示位置（"left" または "right"）
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
        "sp-dropdown-action": SpDropdownAction;
    }
}
export {};
//# sourceMappingURL=sp-dropdown-action.d.ts.map