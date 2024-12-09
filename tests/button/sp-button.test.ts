import { describe, expect, test } from "vitest";
import { getByShadowRole, queryByShadowRole } from "shadow-dom-testing-library";
import { SpButton } from "../../src/components/button/sp-button";
import { isElementMatchingSpeedaIcon } from "../utils/icon";
import "../../src/components/button/sp-button";

function getSpButton() {
  return document.querySelector("sp-button") as SpButton;
}

function getIcon() {
  return getByShadowRole(document.body, "img");
}

function queryIcon() {
  return queryByShadowRole(document.body, "img");
}

describe("sp-button", () => {
  describe("icon属性", () => {
    test("icon属性を設定すると、そのアイコンが表示される", async () => {
      document.body.innerHTML = "<sp-button icon='edit'></sp-button>";

      const icon = getIcon();

      expect(isElementMatchingSpeedaIcon(icon, "edit")).toBeTruthy();
    });

    test("icon属性を設定しない場合、アイコンは表示されない", async () => {
      document.body.innerHTML = "<sp-button icon='edit'></sp-button>";

      const icon = queryIcon();

      expect(icon).not.toBeNull();
    });

    test("icon属性を空文字に設定すると、アイコンは表示されない", async () => {
      document.body.innerHTML = "<sp-button icon=''></sp-button>";

      const icon = queryIcon();

      expect(icon).toBeNull();
    });

    test("icon属性を更新すると、更新後のアイコンが表示される", async () => {
      document.body.innerHTML = "<sp-button icon='edit'></sp-button>";

      const spButton = getSpButton();
      const icon = getIcon();

      spButton.setAttribute("icon", "search");

      expect(isElementMatchingSpeedaIcon(icon, "edit")).toBeFalsy();
      expect(isElementMatchingSpeedaIcon(icon, "search")).toBeTruthy();
    });
  });
});
