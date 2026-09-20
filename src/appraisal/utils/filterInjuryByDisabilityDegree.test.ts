import { describe, expect, it } from "vitest";
import { INJURY_CLAUSES } from "../data/gb-t16180-2014";
import {
  filterInjuryClausesByDisabilityDegree,
  filterInjuryClausesForNonWorkGb,
  gradesForDisabilityDegree,
} from "./filterInjuryByDisabilityDegree";

describe("filterInjuryClausesByDisabilityDegree", () => {
  it("maps complete loss to grades 1-4 only", () => {
    expect([...gradesForDisabilityDegree("complete")]).toEqual([
      "1级",
      "2级",
      "3级",
      "4级",
    ]);
    const result = filterInjuryClausesByDisabilityDegree(
      INJURY_CLAUSES,
      "complete",
    );
    expect(result.length).toBeGreaterThan(0);
    expect(
      result.every((clause) =>
        ["1级", "2级", "3级", "4级"].includes(clause.grade),
      ),
    ).toBe(true);
  });

  it("maps major loss to grades 5-6 only and hides below grade 6", () => {
    const result = filterInjuryClausesByDisabilityDegree(
      INJURY_CLAUSES,
      "major",
    );
    expect(result.length).toBeGreaterThan(0);
    expect(
      result.every((clause) => ["5级", "6级"].includes(clause.grade)),
    ).toBe(true);
    expect(result.some((clause) => clause.grade === "7级")).toBe(false);
  });
});

describe("filterInjuryClausesForNonWorkGb", () => {
  it("keeps grades 1-6 and hides grade 7+", () => {
    const result = filterInjuryClausesForNonWorkGb(INJURY_CLAUSES);
    expect(result.length).toBeGreaterThan(0);
    expect(
      result.every((clause) =>
        ["1级", "2级", "3级", "4级", "5级", "6级"].includes(
          clause.grade,
        ),
      ),
    ).toBe(true);
    expect(result.some((clause) => clause.grade === "7级")).toBe(false);
  });
});
