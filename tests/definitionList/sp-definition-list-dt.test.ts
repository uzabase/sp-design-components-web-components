import { describe, expect, test } from "vitest";
import "../../src/components/button/sp-button";
import { SpDefinitionListDt } from "../../src/components/definitionList/sp-definition-list-dt";

function getSpDefinitionListDt() {
  return document.querySelector("sp-definition-list-dt") as SpDefinitionListDt;
}

describe("sp-definition-list-dt", () => {
  describe("小要素", () => {
    test("小要素に文字列を受け取ることができる", async () => {
      document.body.innerHTML =
        "<sp-definition-list-dt>Term</sp-definition-list-dt>";

      const definitionList = getSpDefinitionListDt();
      expect(definitionList.textContent).toBe("Term");
    });

    test("小要素にbrタグを受け取った時、改行する", async () => {
      document.body.innerHTML =
        "<sp-definition-list-dt>Term<br>Term</sp-definition-list-dt>";

      const definitionList = getSpDefinitionListDt();
      expect(definitionList.innerHTML).toBe("Term<br>Term");
      expect(definitionList.innerText).toBe(`TermTerm`);
    });

    test("小要素に何も入れない場合、何も表示されない", async () => {
      document.body.innerHTML =
        "<sp-definition-list-dt></sp-definition-list-dt>";

      const definitionList = getSpDefinitionListDt();
      expect(definitionList.textContent).toBe("");
    });
  });
});
