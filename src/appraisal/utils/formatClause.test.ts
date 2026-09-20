import { describe, expect, it } from "vitest";
import { formatClause, INJURY_CITATION_PREFIX } from "./formatClause";

describe("formatClause", () => {
  it("prefixes GB/T citation then joins code and summary", () => {
    expect(
      formatClause({
        code: "1.3",
        summary: "重度非肢体瘫运动障碍",
      }),
    ).toBe(`${INJURY_CITATION_PREFIX}1.3 重度非肢体瘫运动障碍`);
  });
});
