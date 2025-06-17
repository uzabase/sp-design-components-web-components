export type Type = "error" | "warning" | "information" | "success";
export declare const iconPaths: Record<Type, string>;
export declare const iconAriaLabels: Record<Type, string>;
/**
 * SpNotificationBarは、デザインシステム2.0における通知バーコンポーネントです。
 * ユーザーに重要な情報やメッセージを表示するために使用します。
 *
 * @element sp-notification-bar
 * @summary 通知バーコンポーネント
 *
 * @slot - 通知メッセージのコンテンツ（デフォルトスロット）
 *
 * @fires close - 閉じるボタンがクリックされたときに発火するイベント
 */
export declare class SpNotificationBar extends HTMLElement {
    #private;
    /**
     * 通知の種類（"error"、"warning"、"information"、または "success"）
     * - "error": エラーメッセージ
     * - "warning": 警告メッセージ
     * - "information": 情報メッセージ
     * - "success": 成功メッセージ
     *
     * @attribute
     * @type {"error"|"warning"|"information"|"success"}
     * @default "information"
     */
    get type(): Type;
    set type(value: Type);
    static get observedAttributes(): string[];
    constructor();
    connectedCallback(): void;
    attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
}
declare global {
    interface HTMLElementTagNameMap {
        "sp-notification-bar": SpNotificationBar;
    }
}
//# sourceMappingURL=sp-notification-bar.d.ts.map