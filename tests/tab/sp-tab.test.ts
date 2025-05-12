import "../../src/components/tab/sp-tab";

import { screen } from "shadow-dom-testing-library";
import { describe, expect, test } from "vitest";

describe("sp-tab", () => {
  test.each([
    ["gray", "-gray"],
    ["white", "-white"],
  ])(
    "fill属性を%sにすると、buttonタグにclass名「%s」がつく",
    async (fill, className) => {
      document.body.innerHTML = `<sp-tab fill=${fill}></sp-tab>`;
      const buttonElement = screen.getByShadowRole("button");
      expect(buttonElement.classList.contains(className)).toBe(true);
    },
  );
  test("fill属性を設定しない場合、デフォルトのfillであるgrayのタブが表示される", async () => {
    document.body.innerHTML = "<sp-tab></sp-tab>";
    const buttonElement = screen.getByShadowRole("button");
    expect(buttonElement.classList.contains("-gray")).toBe(true);
  });

  test("無効なfill属性を設定すると、デフォルトのfillであるgrayのタブが表示される", async () => {
    document.body.innerHTML = "<sp-tab fill='red'></sp-tab>";
    const buttonElement = screen.getByShadowRole("button");
    expect(buttonElement.classList.contains("-gray")).toBe(true);
  });
  test("plus-icon属性をtrueにすると、plusアイコンが表示される", async () => {
    document.body.innerHTML = "<sp-tab plus-icon='true'></sp-tab>";
    const iconElement = document.querySelector("sp-tab")!.shadowRoot!.querySelector("sp-icon")!;
    expect(iconElement.classList.contains("-show")).toBe(true);
  });
  test("plus-icon属性をfalseにすると、plusアイコンが表示されない", async () => {
    document.body.innerHTML = "<sp-tab plus-icon='false'></sp-tab>";
    const iconElement = document.querySelector("sp-tab")!.shadowRoot!.querySelector("sp-icon")!;
    expect(iconElement.classList.contains("-show")).toBe(false);
  });

  test("selected属性をtrueにすると、buttonタグにclass名「-selected」がつく", async () => {
    document.body.innerHTML = `<sp-tab selected="true"></sp-tab>`;
    const buttonElement = screen.getByShadowRole("button");
    expect(buttonElement.classList.contains("-selected")).toBe(true);
  });
  describe("disabled属性", () => {
    test("disabled属性をtrueにすると、buttonタグにdisabled属性がつく", async () => {
      document.body.innerHTML = `<sp-tab disabled=""></sp-tab>`;
      const buttonElement = screen.getByShadowRole(
        "button",
      ) as HTMLButtonElement;
      expect(buttonElement.disabled).toBe(true);
    });
    test("disabled属性をtrueにすると、buttonタグがクリックできなくなる", async () => {
      document.body.innerHTML = `<sp-tab disabled=""></sp-tab>`;
      const buttonElement = screen.getByShadowRole("button");
      let eventFired = false;
      buttonElement.addEventListener("click", () => {
        eventFired = true;
      });
      expect(eventFired).toBe(false);
    });
  });
  test("label属性を設定すると、タブにその文字列が表示される", async () => {
    document.body.innerHTML = `<sp-tab label="ラベル"></sp-tab>`;
    const buttonElement = screen.getByShadowRole("button");
    expect(buttonElement).not.toBeNull();
  });
});
