/**
 * SpPaginationは、デザインシステム2.0におけるページネーションコンポーネントです。
 * ページ分割されたコンテンツのナビゲーションを提供します。
 *
 * @element sp-pagination
 * @summary ページネーションコンポーネント
 *
 * @fires change - ページが変更されたときに発火するイベント。detail.pageに新しいページ番号が含まれます
 */
export declare class SpPagination extends HTMLElement {
    #private;
    /**
     * 総ページ数
     *
     * @attribute
     * @type {number}
     * @default 1
     */
    get total(): number;
    set total(value: number);
    /**
     * 現在選択されているページ番号
     *
     * @attribute
     * @type {number}
     * @default 1
     */
    get selected(): number;
    set selected(value: number);
    static get observedAttributes(): string[];
    constructor();
    connectedCallback(): void;
    attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
}
declare global {
    interface HTMLElementTagNameMap {
        "sp-pagination": SpPagination;
    }
}
//# sourceMappingURL=sp-pagination.d.ts.map