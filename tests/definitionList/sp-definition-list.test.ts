import "../../src/components/button/sp-button";

import { describe, expect, test } from "vitest";

import type { SpDefinitionList } from "../../src/components/definitionList/sp-definition-list";

function getSpDefinitionList() {
  return document.querySelector("sp-definition-list") as SpDefinitionList;
}

describe("sp-definition-list", () => {
  describe("子要素", () => {
    test("子要素にsp-definition-list-dtとsp-definition-list-ddを複数入れることができる", async () => {
      document.body.innerHTML = `
        <sp-definition-list>
          <sp-definition-list-dt>Term1</sp-definition-list-dt>
          <sp-definition-list-dd>Description1</sp-definition-list-dd>
          <sp-definition-list-dt>Term2</sp-definition-list-dt>
          <sp-definition-list-dd>Description2</sp-definition-list-dd>
        </sp-definition-list>`;

      const definitionList = getSpDefinitionList();

      const dtElements = definitionList.querySelectorAll(
        "sp-definition-list-dt",
      );
      const ddElements = definitionList.querySelectorAll(
        "sp-definition-list-dd",
      );

      expect(dtElements.length).toBe(2);
      expect(ddElements.length).toBe(2);
    });

    test("子要素に何も入れない場合、何も表示されない", async () => {
      document.body.innerHTML = "<sp-definition-list></sp-definition-list>";

      const definitionList = getSpDefinitionList();

      expect(definitionList.children.length).toBe(0);
    });
  });
});
