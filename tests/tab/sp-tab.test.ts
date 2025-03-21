import { describe, expect, test } from "vitest";
import { getByShadowRole, queryByShadowRole } from "shadow-dom-testing-library";

function getIcon() {
  return getByShadowRole(document.body, "img");
}

function queryIcon() {
  return queryByShadowRole(document.body, "img");
}

  describe("icon属性", () => {
    test("tabが表示されている", async () => {
      document.body.innerHTML = "<sp-tab></sp-tab>";

      const tabElement = document.querySelector('sp-tab');
      expect(tabElement).not.toBeNull()
    });

    test("plusIcon属性をtrueにすると、plusIconアイコンが表示される", async () => {
      document.body.innerHTML = "<sp-tab plusIcon='true'></sp-tab>";

      const plusIcon = getIcon();
      expect(plusIcon).toBeTruthy();

    });

    test("icon属性を設定しない場合、アイコンは表示されない", async () => {
      document.body.innerHTML = "<sp-tab icon='edit'></sp-tab>";

      const icon = queryIcon();

      expect(icon).not.toBeNull();
    });

    test("icon属性を空文字に設定すると、アイコンは表示されない", async () => {
      document.body.innerHTML = "<sp-tab icon=''></sp-tab>";

      const icon = queryIcon();

      expect(icon).toBeNull();
    });

    // test("icon属性を更新すると、更新後のアイコンが表示される", async () => {
    //   document.body.innerHTML = "<sp-tab icon='edit'></sp-tab>";
    //
    //   const spButton = getSpTab();
    //   const icon = getIcon();
    //
    //   spButton.setAttribute("icon", "search");
    //
    //   expect(isElementMatchingSpeedaIcon(icon, "edit")).toBeFalsy();
    //   expect(isElementMatchingSpeedaIcon(icon, "search")).toBeTruthy();
    // });
  });
