import { describe, expect, test } from "vitest";
import { getByShadowRole } from "shadow-dom-testing-library";
import { isElementMatchingSpeedaIcon } from "../utils/icon";
import "../../src/components/icon/sp-icon";

function getIcon() {
  return getByShadowRole(document.body, "img");
}

describe("sp-icon", () => {
  describe("type属性", () => {
    test("type属性を設定すると、そのアイコンが表示される", async () => {
      document.body.innerHTML = "<sp-icon type='edit'></sp-icon>";

      const icon = getIcon();

      expect(isElementMatchingSpeedaIcon(icon, "edit")).toBeTruthy();
    });

    test("無効なtype属性を設定すると、空のアイコンが表示される", async () => {
      document.body.innerHTML = "<sp-icon type='invalid'></sp-icon>";

      const icon = getIcon();

      expect(icon.innerHTML).toBe("");
    });
  });
});
