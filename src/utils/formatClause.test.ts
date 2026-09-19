import { describe, expect, it } from "vitest";
import { formatClause } from "./formatClause";

describe("formatClause", () => {
  it("joins code and grade with a space", () => {
    expect(formatClause({ code: "5.9.2", grade: "九级" })).toBe("5.9.2 九级");
  });
});
