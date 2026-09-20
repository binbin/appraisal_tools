import { describe, expect, it } from "vitest";
import { formatClauseItemMeta } from "./clauseDisplay";

describe("clauseDisplay", () => {
  it("formats meta with joined body systems", () => {
    expect(
      formatClauseItemMeta({
        id: "5.1.2(7)",
        code: "5.1.2(7)",
        grade: "1级",
        summary: "双下肢膝上缺失及一上肢肘上缺失",
        category: "ortho_plastic",
        bodySystem: "下肢",
        bodySystems: ["下肢", "上肢"],
      }),
    ).toBe("5.1.2(7) 1级 下肢/上肢");
  });
});
