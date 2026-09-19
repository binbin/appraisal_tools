import { describe, expect, it } from "vitest";
import { CATEGORY_OPTIONS } from "../types/clause";
import { INJURY_CLAUSES } from "./gb-t16180-2014";

const SUB_CLAUSE_CODE_PATTERN = /^5\.(?:[1-9]|10)\.2_\d+$/;
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
        "一级",
        "二级",
        "三级",
        "四级",
        "五级",
        "六级",
        "七级",
        "八级",
        "九级",
        "十级",
      ]),
    );
  });

  it("has unique ids and detailed sub-clause codes", () => {
    const ids = INJURY_CLAUSES.map((clause) => clause.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const clause of INJURY_CLAUSES) {
      expect(clause.code).toMatch(SUB_CLAUSE_CODE_PATTERN);
      expect(clause.id).toBe(clause.code);
      expect(clause.summary.length).toBeGreaterThan(1);
    }
  });

  it("includes known anchors like 5.3.2_1", () => {
    const clause = INJURY_CLAUSES.find((item) => item.code === "5.3.2_1");
    expect(clause?.grade).toBe("三级");
    expect(clause?.summary).toContain("精神病性症状");
  });
});
