import { describe, expect, it } from "vitest";
import { formatClause } from "./formatClause";

describe("formatClause", () => {
  it("joins sub-clause code and grade with a space", () => {
    expect(formatClause({ code: "5.3.2_1", grade: "三级" })).toBe(
      "5.3.2_1 三级",
    );
  });
});
