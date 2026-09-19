import { describe, expect, it } from "vitest";
import type { InjuryClause } from "../types/clause";
import { filterClauses } from "./filterClauses";

const SAMPLE: InjuryClause[] = [
  {
    id: "5.1.1_1",
    code: "5.1.1_1",
    grade: "一级",
    summary: "极重度智能损伤",
    category: "neuro_psych",
  },
  {
    id: "5.3.2_1",
    code: "5.3.2_1",
    grade: "三级",
    summary: "截瘫肌力≤4级",
    category: "ortho_plastic",
  },
];

describe("filterClauses", () => {
  it("filters by category", () => {
    const result = filterClauses(SAMPLE, "ortho_plastic", "");
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("5.3.2_1");
  });

  it("filters by keyword against code grade summary", () => {
    const result = filterClauses(SAMPLE, "neuro_psych", "智能");
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("5.1.1_1");
  });

  it("returns empty when no match", () => {
    expect(filterClauses(SAMPLE, "occupational", "xxx")).toEqual([]);
  });
});
