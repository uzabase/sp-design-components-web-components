import { UbTooltip } from "../../../../ub-design-components-web-components/src/components/tooltip/ub-tooltip";
import tooltipStyle from "./tooltip.css?inline";

const styles = new CSSStyleSheet();
styles.replaceSync(`${tooltipStyle}`);

/**
 * SpTooltipは、UbTooltipを継承したSP用ツールチップコンポーネントです。
 *
 * @element sp-tooltip
 * @summary ツールチップコンポーネント
 */
export class SpTooltip extends UbTooltip {
  constructor() {
    super();
    if (this.shadowRoot) {
      this.shadowRoot.adoptedStyleSheets = [
        ...this.shadowRoot.adoptedStyleSheets,
        styles,
      ];
    }
  }
}

if (!customElements.get("sp-tooltip")) {
  customElements.define("sp-tooltip", SpTooltip);
}

declare global {
  interface HTMLElementTagNameMap {
    "sp-tooltip": SpTooltip;
  }
}
