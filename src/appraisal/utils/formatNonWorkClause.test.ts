import { describe, expect, it } from "vitest";
import {
  formatNonWorkClause,
  formatNonWorkInjuryClause,
  GB_COMPLETE_CITATION_PREFIX,
  GB_MAJOR_CITATION_PREFIX,
  LABOR_2002_CITATION_PREFIX,
} from "./formatNonWorkClause";

describe("formatNonWorkClause", () => {
  it("prefixes labor-2002 citation", () => {
    expect(
      formatNonWorkClause({
        code: "4.1.2",
        summary: "长期重度呼吸困难",
      }),
    ).toBe(`${LABOR_2002_CITATION_PREFIX}4.1.2 长期重度呼吸困难`);
  });
});

describe("formatNonWorkInjuryClause", () => {
  it("prefixes 4.1.17 citation for grades 1-4", () => {
    expect(
      formatNonWorkInjuryClause({
        code: "5.1.2(3)",
        grade: "1级",
        summary: "重度非肢体瘫运动障碍",
      }),
    ).toBe(`${GB_COMPLETE_CITATION_PREFIX}5.1.2(3) 重度非肢体瘫运动障碍`);
  });

  it("prefixes 4.2.10 citation for grades 5-6", () => {
    expect(
      formatNonWorkInjuryClause({
        code: "5.5.2(6)",
        grade: "5级",
        summary: "四肢瘫肌力4级",
      }),
    ).toBe(`${GB_MAJOR_CITATION_PREFIX}5.5.2(6) 四肢瘫肌力4级`);
  });
});
