import { UbIcon } from "@ub-design/components-web-components/";
import iconStyle from "./icon.css?inline";
import { speedaIconPaths } from "./icons";
function isSpeedaIconType(type) {
    return Object.hasOwnProperty.call(speedaIconPaths, type);
}
const styles = new CSSStyleSheet();
styles.replaceSync(iconStyle);
/**
 * SpIconは、デザインシステム2.0におけるアイコンコンポーネントです。
 * デザインシステムで用意されているアイコンセットを提供します。
 *
 * @element sp-icon
 * @summary アイコンコンポーネント
 */
export class SpIcon extends UbIcon {
    constructor() {
        super();
        /**
         * 利用可能なアイコンパスのマップ
         * デザインシステムのアイコンパスが含まれています
         */
        this.paths = { ...speedaIconPaths, "": "" };
        this.shadowRoot.adoptedStyleSheets = [
            ...this.shadowRoot.adoptedStyleSheets,
            styles,
        ];
    }
    /**
     * アイコンのタイプを設定します
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
    set type(value) {
        super.type = isSpeedaIconType(value) ? value : "";
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if (name === "type") {
            const type = isSpeedaIconType(newValue) ? newValue : "";
            super.attributeChangedCallback(name, oldValue, type);
        }
        else {
            super.attributeChangedCallback(name, oldValue, newValue);
        }
    }
}
if (!customElements.get("sp-icon")) {
    customElements.define("sp-icon", SpIcon);
}
