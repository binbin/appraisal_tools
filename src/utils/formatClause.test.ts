import { describe, expect, it } from "vitest";
import { formatClause } from "./formatClause";

describe("formatClause", () => {
  it("joins sub-clause code and grade with a space", () => {
    expect(formatClause({ code: "5_5", grade: "五级" })).toBe("5_5 五级");
    expect(formatClause({ code: "7_36", grade: "七级" })).toBe("7_36 七级");
  });
});
