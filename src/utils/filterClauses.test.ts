import { describe, expect, it } from "vitest";
import type { InjuryClause } from "../types/clause";
import { filterClauses } from "./filterClauses";

const SAMPLE: InjuryClause[] = [
  {
    id: "1_1",
    code: "1_1",
    grade: "一级",
    summary: "极重度智能损伤",
    category: "neuro_psych",
  },
  {
    id: "3_1",
    code: "3_1",
    grade: "三级",
    summary: "精神病性症状，经系统治疗1年后仍表现为危险或冲动行为者",
    category: "neuro_psych",
  },
  {
    id: "5_5",
    code: "5_5",
    grade: "五级",
    summary: "一手功能完全丧失",
    category: "ortho_plastic",
  },
];

describe("filterClauses", () => {
  it("filters by category", () => {
    const result = filterClauses(SAMPLE, "ortho_plastic", "");
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("5_5");
  });

  it("filters by keyword against code grade summary", () => {
    const result = filterClauses(SAMPLE, "neuro_psych", "智能");
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("1_1");
  });

  it("returns empty when no match", () => {
    expect(filterClauses(SAMPLE, "occupational", "xxx")).toEqual([]);
  });
});
