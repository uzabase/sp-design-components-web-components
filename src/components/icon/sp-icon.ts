import { UbIcon } from "@ub-design/components-web-components/";

import iconStyle from "./icon.css?inline";
import { speedaIconPaths, SpeedaIconTypes } from "./icons";

function isSpeedaIconType(type: string): type is SpeedaIconTypes {
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
  /**
   * 利用可能なアイコンパスのマップ
   * デザインシステムのアイコンパスが含まれています
   */
  paths = { ...speedaIconPaths, "": "" };

  constructor() {
    super();

    this.shadowRoot!.adoptedStyleSheets = [
      ...this.shadowRoot!.adoptedStyleSheets,
      styles,
    ];
  }

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
  set type(value: string) {
    super.type = isSpeedaIconType(value) ? value : "";
  }

  attributeChangedCallback(
    name: string,
    oldValue: string,
    newValue: string,
  ): void {
    if (name === "type") {
      const type = isSpeedaIconType(newValue) ? newValue : "";
      super.attributeChangedCallback(name, oldValue, type);
    } else {
      super.attributeChangedCallback(name, oldValue, newValue);
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "sp-icon": SpIcon;
  }
}

if (!customElements.get("sp-icon")) {
  customElements.define("sp-icon", SpIcon);
}
