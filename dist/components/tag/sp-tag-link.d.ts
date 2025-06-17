/**
 * SpTagLinkは、デザインシステム2.0におけるリンク機能付きタグコンポーネントです。
 * クリック可能なリンクとして動作するタグを提供します。
 *
 * @element sp-tag-link
 * @summary リンク機能付きタグコンポーネント
 *
 * @slot - タグのテキストコンテンツ（デフォルトスロット）
 */
export declare class SpTagLink extends HTMLElement {
    #private;
    /**
     * リンク先のURL
     *
     * @attribute
     * @type {string}
     * @default ""
     */
    href: string;
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
        "sp-tag-link": SpTagLink;
    }
}
//# sourceMappingURL=sp-tag-link.d.ts.map