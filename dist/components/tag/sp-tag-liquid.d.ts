export type SpTagLiquidType = "gray" | "green" | "red" | "yellow" | "blue";
export type SpTagLiquidMode = "light" | "dark";
/**
 * SpTagLiquidは、デザインシステム2.0における液体状のタグコンポーネントです。
 * 色とモード（明るい/暗い）を指定できるカラフルなタグを提供します。
 *
 * @element sp-tag-liquid
 * @summary 液体状のタグコンポーネント
 *
 * @slot - タグのテキストコンテンツ（デフォルトスロット）
 */
export declare class SpTagLiquid extends HTMLElement {
    #private;
    /**
     * タグの色の種類（"gray"、"green"、"red"、"yellow"、または "blue"）
     * - "gray": グレー
     * - "green": グリーン
     * - "red": レッド
     * - "yellow": イエロー
     * - "blue": ブルー
     *
     * @attribute
     * @type {"gray"|"green"|"red"|"yellow"|"blue"}
     * @default "gray"
     */
    get type(): SpTagLiquidType;
    set type(value: SpTagLiquidType);
    /**
     * ライトモードの有効状態（※grayカラーはライトモードのみ）
     *
     * @attribute
     * @type {boolean}
     * @default true
     */
    get light(): boolean;
    set light(value: boolean);
    static get observedAttributes(): string[];
    constructor();
    connectedCallback(): void;
    attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
}
declare global {
    interface HTMLElementTagNameMap {
        "sp-tag-liquid": SpTagLiquid;
    }
}
//# sourceMappingURL=sp-tag-liquid.d.ts.map