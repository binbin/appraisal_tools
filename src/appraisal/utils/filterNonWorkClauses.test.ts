import { describe, expect, it } from "vitest";
import { filterNonWorkClauses } from "./filterNonWorkClauses";
import { NON_WORK_DISABILITY_CLAUSES } from "../data/non-work-disability-2002";

describe("filterNonWorkClauses", () => {
  it("filters by degree", () => {
    const result = filterNonWorkClauses(
      NON_WORK_DISABILITY_CLAUSES,
      "major",
      "",
    );
    expect(result.every((clause) => clause.degree === "major")).toBe(true);
    expect(result.length).toBe(13);
  });

  it("filters by keyword within degree", () => {
    const result = filterNonWorkClauses(
      NON_WORK_DISABILITY_CLAUSES,
      "complete",
      "呼吸困难",
    );
    expect(result).toHaveLength(1);
    expect(result[0]?.code).toBe("4.1.2");
  });
});
