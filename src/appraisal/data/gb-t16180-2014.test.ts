import { describe, expect, it } from "vitest";
import { CATEGORY_OPTIONS } from "../types/clause";
import { INJURY_CLAUSES } from "./gb-t16180-2014";

const SUB_CLAUSE_CODE_PATTERN = /^5\.(?:[1-9]|10)\.2\(\d+\)$/;
const EXPECTED_TOTAL = 530;

describe("INJURY_CLAUSES", () => {
  it("contains the full GB/T 16180 clause set", () => {
    expect(INJURY_CLAUSES).toHaveLength(EXPECTED_TOTAL);
  });

  it("covers all five specialty categories", () => {
    for (const option of CATEGORY_OPTIONS) {
      const count = INJURY_CLAUSES.filter(
        (clause) => clause.category === option.key,
      ).length;
      expect(count).toBeGreaterThanOrEqual(3);
    }
  });

  it("covers all ten disability grades", () => {
    const grades = new Set(INJURY_CLAUSES.map((clause) => clause.grade));
    expect(grades).toEqual(
      new Set([
        "1级",
        "2级",
        "3级",
        "4级",
        "5级",
        "6级",
        "7级",
        "8级",
        "9级",
        "10级",
      ]),
    );
  });

  it("has unique ids and GB chapter-5 sub-clause codes with (条目)", () => {
    const ids = INJURY_CLAUSES.map((clause) => clause.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const clause of INJURY_CLAUSES) {
      expect(clause.code).toMatch(SUB_CLAUSE_CODE_PATTERN);
      expect(clause.id).toBe(clause.code);
      expect(clause.summary.length).toBeGreaterThan(1);
    }
  });

  it("includes known anchors like 5.3.2(1) and 5.5.2(5)", () => {
    const threeOne = INJURY_CLAUSES.find(
      (item) => item.code === "5.3.2(1)",
    );
    expect(threeOne?.grade).toBe("3级");
    expect(threeOne?.summary).toContain("精神病性症状");

    const fiveFive = INJURY_CLAUSES.find(
      (item) => item.code === "5.5.2(5)",
    );
    expect(fiveFive?.grade).toBe("5级");
  });

  it("matches PDF-verified cleaned summaries", () => {
    for (const clause of INJURY_CLAUSES) {
      expect(clause.summary).not.toMatch(/[,;]/);
      expect(clause.summary).not.toMatch(/ /);
      expect(clause.summary).not.toMatch(
        /5\.\s*\d+\s*[一二三四五六七八九十]/,
      );
      expect(clause.summary).not.toMatch(/mL\/mi\s+n|μmo\s+l/);
    }

    const oneTwentyThree = INJURY_CLAUSES.find(
      (item) => item.code === "5.1.2(23)",
    );
    expect(oneTwentyThree?.summary).toBe(
      "肾功能不全尿毒症期，内生肌酐清除率持续<10mL/min，"
        + "或血浆肌酐水平持续>707μmol/L(8mg/dL)",
    );

    const twoThirtyNine = INJURY_CLAUSES.find(
      (item) => item.code === "5.2.2(39)",
    );
    expect(twoThirtyNine?.summary).toBe("放射性肿瘤");

    const threeThirty = INJURY_CLAUSES.find(
      (item) => item.code === "5.3.2(30)",
    );
    expect(threeThirty?.summary).toBe("Ⅲ度房室传导阻滞");

    const eightSeventyTwo = INJURY_CLAUSES.find(
      (item) => item.code === "5.8.2(72)",
    );
    expect(eightSeventyTwo?.summary).toBe("减压性骨坏死Ⅱ期");
  });
});
