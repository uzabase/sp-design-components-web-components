import { describe, expect, it } from "vitest";

import {
  SpTagLiquid,
  SpTagLiquidColor,
  SpTagLiquidMode,
} from "../../src/components/tag/sp-tag-liquid";

describe("SpTagLiquid", () => {
  const createTag = (color?: SpTagLiquidColor, mode?: SpTagLiquidMode) => {
    const tag = document.createElement("sp-tag-liquid") as SpTagLiquid;

    if (color) {
      tag.setAttribute("color", color);
    }

    if (mode) {
      tag.setAttribute("mode", mode);
    }

    document.body.appendChild(tag);
    return tag;
  };

  it("should render with default values", () => {
    const tag = createTag();

    expect(tag.color).toBe("gray");
    expect(tag.mode).toBe("light");
  });

  it("should set initial color and mode from attributes", () => {
    const tag = createTag("green", "dark");

    expect(tag.color).toBe("green");
    expect(tag.mode).toBe("dark");
  });

  it("should update color when attribute changes", () => {
    const tag = createTag("gray", "light");

    tag.setAttribute("color", "blue");
    expect(tag.color).toBe("blue");
  });

  it("should update mode when attribute changes", () => {
    const tag = createTag("gray", "light");

    tag.setAttribute("mode", "dark");
    expect(tag.mode).toBe("dark");
  });

  it("should use default color when invalid color is provided", () => {
    // @ts-expect-error: Testing invalid input
    const tag = createTag("invalid", "light");

    expect(tag.color).toBe("gray");
  });

  it("should use default mode when invalid mode is provided", () => {
    // @ts-expect-error: Testing invalid input
    const tag = createTag("gray", "invalid");

    expect(tag.mode).toBe("light");
  });

  it("should update dynamically using properties", () => {
    const tag = createTag();

    tag.color = "red";
    tag.mode = "dark";

    expect(tag.color).toBe("red");
    expect(tag.mode).toBe("dark");
  });
});
