import resetStyle from "@sp-design/recet.css/src/reset.css?inline";

import foundationStyle from "./foundation.css?inline";

export function makeStyleSheet(...styles: string[]) {
  const cssStyleSheet = new CSSStyleSheet();
  cssStyleSheet.replaceSync(
    `${resetStyle} ${foundationStyle} ${styles.join(" ")}`,
  );
  return cssStyleSheet;
}
