import { speedaIconPaths } from "../../src/components/icon/icons";

export function isElementMatchingSpeedaIcon(
  svg: HTMLElement,
  iconName: keyof typeof speedaIconPaths,
) {
  const path = svg.querySelector("path");
  return `<path d="${path?.getAttribute("d")}"/>` === speedaIconPaths[iconName];
}
