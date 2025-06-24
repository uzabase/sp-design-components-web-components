import resetStyle from "@sp-design/recet.css/src/reset.css?inline";

import foundationStyle from "./foundation.css?inline";

export function makeStyleSheet(...styles: string[]) {
  const cssStyleSheet = new CSSStyleSheet();
  cssStyleSheet.replaceSync(
    `${styles.join(" ")} ${resetStyle} ${foundationStyle}`,
  );
  return cssStyleSheet;
}
