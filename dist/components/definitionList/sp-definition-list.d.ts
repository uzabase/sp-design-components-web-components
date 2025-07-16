/**
 * SpDefinitionListは、デザインシステム2.0における定義リストコンポーネントです。
 * 用語とその定義をペアで表示するリストを提供します。
 *
 * @element sp-definition-list
 * @summary 定義リストコンポーネント
 *
 * @slot - 定義リストの項目（デフォルトスロット）
 */
export declare class SpDefinitionList extends HTMLElement {
    #private;
    constructor();
    connectedCallback(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        "sp-definition-list": SpDefinitionList;
    }
}
//# sourceMappingURL=sp-definition-list.d.ts.map