/**
 * SpSectionTitleは、デザインシステム2.0におけるセクションタイトルコンポーネントです。
 * セクションの見出しを表示するために使用します。
 *
 * @element sp-section-title
 * @summary セクションタイトルコンポーネント
 *
 * @slot text-links - タイトル横に表示するテキストリンク
 * @slot buttons - タイトル右側に表示するボタン
 */
export declare class SpSectionTitle extends HTMLElement {
    #private;
    /**
     * セクションタイトルのテキスト
     *
     * @attribute
     * @type {string}
     */
    set text(value: string);
    static get observedAttributes(): string[];
    constructor();
    connectedCallback(): void;
    attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
}
declare global {
    interface HTMLElementTagNameMap {
        "sp-section-title": SpSectionTitle;
    }
}
//# sourceMappingURL=sp-section-title.d.ts.map