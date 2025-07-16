export type Type = "error" | "warning" | "information" | "success";
export declare const iconAriaLabels: Record<Type, string>;
export declare const iconPaths: Record<Type, string>;
/**
 * SpNotificationMessageは、デザインシステム2.0における通知メッセージコンポーネントです。
 * ユーザーに情報、警告、エラー、成功メッセージを表示するために使用します。
 *
 * @element sp-notification-message
 * @summary 通知メッセージコンポーネント
 *
 * @slot - 通知メッセージのコンテンツ（デフォルトスロット）
 */
export declare class SpNotificationMessage extends HTMLElement {
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
        "sp-notification-message": SpNotificationMessage;
    }
}
//# sourceMappingURL=sp-notification-message.d.ts.map