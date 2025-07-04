import "../../src/components/tooltip/sp-tooltip";

import { beforeEach,describe, expect, test } from "vitest";

import type { SpTooltip } from "../../src/components/tooltip/sp-tooltip";

function getSpTooltip() {
  return document.querySelector("sp-tooltip") as SpTooltip;
}

describe("sp-tooltip", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  test("UbTooltipを継承している", () => {
    document.body.innerHTML = '<sp-tooltip label="test">Content</sp-tooltip>';
    const tooltip = getSpTooltip();

    expect(tooltip).toBeInstanceOf(HTMLElement);
    expect(tooltip.tagName).toBe("SP-TOOLTIP");
  });
});
