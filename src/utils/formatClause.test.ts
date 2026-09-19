import { describe, expect, it } from "vitest";
import { formatClause } from "./formatClause";

describe("formatClause", () => {
  it("joins sub-clause code and summary with a space", () => {
    expect(
      formatClause({
        code: "1_3",
        summary: "重度非肢体瘫运动障碍",
      }),
    ).toBe("1_3 重度非肢体瘫运动障碍");
  });
});
