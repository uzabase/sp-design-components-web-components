import { UbIcon } from '@ub-design/components-web-components/';
/**
 * SpIconは、デザインシステム2.0におけるアイコンコンポーネントです。
 * デザインシステムで用意されているアイコンセットを提供します。
 *
 * @element sp-icon
 * @summary アイコンコンポーネント
 */
export declare class SpIcon extends UbIcon {
    /**
     * 利用可能なアイコンパスのマップ
     * デザインシステムのアイコンパスが含まれています
     */
    paths: {
        "": string;
        arrow_down: string;
        arrow_down_link: string;
        arrow_left: string;
        arrow_left_link: string;
        arrow_right: string;
        arrow_right_link: string;
        arrow_up: string;
        arrow_up_link: string;
        bookmark: string;
        calendar: string;
        check: string;
        check_bold: string;
        clear: string;
        close: string;
        copy: string;
        create: string;
        delete: string;
        doublearrow_down: string;
        doublearrow_left: string;
        doublearrow_right: string;
        download: string;
        drag: string;
        edit: string;
        error: string;
        folder: string;
        help: string;
        kebab_menu: string;
        like: string;
        list: string;
        location: string;
        lock: string;
        mail: string;
        menu: string;
        my_speeda: string;
        notification: string;
        open_in_new: string;
        operator: string;
        opinion: string;
        people: string;
        person: string;
        pib: string;
        plus: string;
        search: string;
        settings: string;
        sort: string;
        sort_down: string;
        sort_up: string;
        toggle_arrow_down: string;
        toggle_arrow_right: string;
        zip: string;
    };
    constructor();
    /**
     * アイコンのタイプ
     * デザインシステムのアイコンタイプを指定した場合はそのタイプを設定し、それ以外を指定した場合は表示しません
     *
     * 指定可能なアイコンタイプ：
     * - arrow_down
     * - arrow_down_link
     * - arrow_left
     * - arrow_left_link
     * - arrow_right
     * - arrow_right_link
     * - arrow_up
     * - arrow_up_link
     * - bookmark
     * - calendar
     * - check
     * - check_bold
     * - clear
     * - close
     * - copy
     * - create
     * - delete
     * - doublearrow_down
     * - doublearrow_left
     * - doublearrow_right
     * - download
     * - drag
     * - edit
     * - error
     * - folder
     * - help
     * - kebab_menu
     * - like
     * - list
     * - location
     * - lock
     * - mail
     * - menu
     * - my_speeda
     * - notification
     * - open_in_new
     * - operator
     * - opinion
     * - people
     * - person
     * - pib
     * - plus
     * - search
     * - settings
     * - sort
     * - sort_down
     * - sort_up
     * - toggle_arrow_down
     * - toggle_arrow_right
     * - zip
     *
     * @attribute
     * @type {string}
     */
    set type(value: string);
    attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
}
declare global {
    interface HTMLElementTagNameMap {
        "sp-icon": SpIcon;
    }
}
//# sourceMappingURL=sp-icon.d.ts.map