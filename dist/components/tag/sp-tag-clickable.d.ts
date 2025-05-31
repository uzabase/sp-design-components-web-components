/**
 * SpTagClickableは、デザインシステム2.0におけるクリック可能なタグコンポーネントです。
 * 選択状態を持ち、クリックイベントを発火するタグとして使用します。
 *
 * @element sp-tag-clickable
 * @summary クリック可能なタグコンポーネント
 *
 * @slot - タグのテキストコンテンツ（デフォルトスロット）
 *
 * @fires click - タグがクリックされたときに発火するイベント。detail.originalEventに元のMouseEventが含まれます
 */
export declare class SpTagClickable extends HTMLElement {
    #private;
    /**
     * タグの選択状態
     *
     * @attribute
     * @type {boolean}
     * @default false
     */
    get selected(): boolean;
    set selected(value: boolean);
    /**
     * タグの無効状態
     *
     * @attribute
     * @type {boolean}
     * @default false
     */
    get disabled(): boolean;
    set disabled(value: boolean);
    static get observedAttributes(): string[];
    constructor();
    connectedCallback(): void;
    attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
}
declare global {
    interface HTMLElementTagNameMap {
        "sp-tag-clickable": SpTagClickable;
    }
}
//# sourceMappingURL=sp-tag-clickable.d.ts.map