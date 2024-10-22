import { describe, expect, it } from "vitest";
import { getByShadowRole, queryByShadowRole } from "shadow-dom-testing-library";
import { SpButton } from "../../src/components/button/sp-button";
import { speedaIconPaths } from "../../src/components/icon/icons";
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

function isElementMatchingIcon(
  svg: HTMLElement,
  iconName: keyof typeof speedaIconPaths,
) {
  const path = svg.querySelector("path");
  return `<path d="${path.getAttribute("d")}"/>` === speedaIconPaths[iconName];
}

describe("ub-button", () => {
  it("icon属性を設定すると、そのアイコンが表示される", async () => {
    document.body.innerHTML = "<sp-button icon='edit'></sp-button>";

    const icon = getIcon();

    expect(isElementMatchingIcon(icon, "edit")).toBeTruthy();
  });

  it("icon属性を設定しない場合、アイコンは表示されない", async () => {
    document.body.innerHTML = "<sp-button icon='edit'></sp-button>";

    const icon = queryIcon();

    expect(icon).not.toBeNull();
  });

  it("icon属性を空文字に設定すると、アイコンは表示されない", async () => {
    document.body.innerHTML = "<sp-button icon=''></sp-button>";

    const icon = queryIcon();

    expect(icon).toBeNull();
  });

  it("icon属性を更新すると、更新後のアイコンが表示される", async () => {
    document.body.innerHTML = "<sp-button icon='edit'></sp-button>";

    const spButton = getSpButton();
    const icon = getIcon();

    spButton.setAttribute("icon", "search");

    expect(isElementMatchingIcon(icon, "edit")).toBeFalsy();
    expect(isElementMatchingIcon(icon, "search")).toBeTruthy();
  });

  // TODO: 無効なicon属性を設定したときの仕様が定まっていないため、決まったらテストを追加する
});
