/**
 * SpTagRemovableは、デザインシステム2.0における削除可能なタグコンポーネントです。
 * 削除ボタンを持ち、オプションでドラッグ機能も提供します。
 *
 * @element sp-tag-removable
 * @summary 削除可能なタグコンポーネント
 *
 * @slot - タグのテキストコンテンツ（デフォルトスロット）
 *
 * @fires remove - 削除ボタンがクリックされたときに発火するイベント
 * @fires dragstart - ドラッグが開始されたときに発火するイベント。detail.x、detail.yに座標が含まれます
 * @fires drag - ドラッグ中に発火するイベント。detail.x、detail.y、detail.deltaX、detail.deltaYに座標と移動量が含まれます
 * @fires dragend - ドラッグが終了したときに発火するイベント。detail.x、detail.yに座標が含まれます
 */
export declare class SpTagRemovable extends HTMLElement {
    #private;
    /**
     * タグの無効状態
     *
     * @attribute
     * @type {boolean}
     * @default false
     */
    get disabled(): boolean;
    set disabled(value: boolean);
    /**
     * タグのドラッグ可能状態
     *
     * @attribute
     * @type {boolean}
     * @default false
     */
    get draggable(): boolean;
    set draggable(value: boolean);
    static get observedAttributes(): string[];
    constructor();
    connectedCallback(): void;
    attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
    disconnectedCallback(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        "sp-tag-removable": SpTagRemovable;
    }
}
//# sourceMappingURL=sp-tag-removable.d.ts.map