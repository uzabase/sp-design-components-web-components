import { UbCheckbox } from "@ub-design/components-web-components/";

import foundationStyle from "../foundation.css?inline";
import checkboxStyle from "./checkbox.css?inline";
import checkmarkStyle from "./checkmark.css?inline";

const styles = new CSSStyleSheet();
styles.replaceSync(`${foundationStyle} ${checkmarkStyle} ${checkboxStyle}`);

/**
 * SpCheckboxは、デザインシステム2.0におけるチェックボックスコンポーネントです。
 *
 * @element sp-checkbox
 * @summary チェックボックスコンポーネント
 */
export class SpCheckbox extends UbCheckbox {
  constructor() {
    super();

    this.shadowRoot!.adoptedStyleSheets = [
      ...this.shadowRoot!.adoptedStyleSheets,
      styles,
    ];
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "sp-checkbox": SpCheckbox;
  }
}

if (!customElements.get("sp-checkbox")) {
  customElements.define("sp-checkbox", SpCheckbox);
}
