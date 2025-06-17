/**
 * SpElementTitleは、デザインシステム2.0におけるエレメントタイトルコンポーネントです。
 * セクション内の要素のタイトルとして使用し、テキストリンクやボタンを配置できます。
 *
 * @element sp-element-title
 * @summary エレメントタイトルコンポーネント
 *
 * @slot - タイトルのテキストコンテンツ（デフォルトスロット）
 * @slot text-links - タイトル横に表示するテキストリンク
 * @slot buttons - タイトル右側に表示するボタン
 */
export declare class SpElementTitle extends HTMLElement {
    #private;
    constructor();
    connectedCallback(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        "sp-element-title": SpElementTitle;
    }
}
//# sourceMappingURL=sp-element-title.d.ts.map