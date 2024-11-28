import { describe, expect, test } from "vitest";
import "../../src/components/button/sp-button";
import { SpDefinitionListDd } from "../../src/components/definitionList/sp-definition-list-dd";

function getSpDefinitionListDd() {
  return document.querySelector("sp-definition-list-dd") as SpDefinitionListDd;
}

describe("sp-definition-list-dd", () => {
  describe("小要素", () => {
    test("小要素に文字列を受け取ることができる", async () => {
      document.body.innerHTML =
        "<sp-definition-list-dd>Description</sp-definition-list-dd>";

      const definitionList = getSpDefinitionListDd();
      expect(definitionList.textContent).toBe("Description");
    });

    test("小要素にbrタグを受け取った時、改行する", async () => {
      document.body.innerHTML =
        "<sp-definition-list-dd>Description<br>Description</sp-definition-list-dd>";

      const definitionList = getSpDefinitionListDd();
      expect(definitionList.innerHTML).toBe("Description<br>Description");
      expect(definitionList.innerText).toBe(`DescriptionDescription`);
    });

    test("小要素に何も入れない場合、何も表示されない", async () => {
      document.body.innerHTML =
        "<sp-definition-list-dd></sp-definition-list-dd>";

      const definitionList = getSpDefinitionListDd();
      expect(definitionList.textContent).toBe("");
    });
  });
});
