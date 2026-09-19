import { describe, expect, it } from "vitest";
import type { InjuryClause } from "../types/clause";
import { filterClauses } from "./filterClauses";

const SAMPLE: InjuryClause[] = [
  {
    id: "a",
    code: "5.1.1",
    grade: "一级",
    summary: "极重度智能损伤",
    category: "neuro_psych",
  },
  {
    id: "b",
    code: "5.9.2",
    grade: "九级",
    summary: "一拇指远侧指间关节离断",
    category: "ortho_plastic",
  },
];

describe("filterClauses", () => {
  it("filters by category", () => {
    const result = filterClauses(SAMPLE, "ortho_plastic", "");
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("b");
  });

  it("filters by keyword against code grade summary", () => {
    const result = filterClauses(SAMPLE, "neuro_psych", "智能");
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("a");
  });

  it("returns empty when no match", () => {
    expect(filterClauses(SAMPLE, "occupational", "xxx")).toEqual([]);
  });
});
