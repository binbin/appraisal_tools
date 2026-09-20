import { describe, expect, it } from "vitest";
import { NON_WORK_DISABILITY_CLAUSES } from "./non-work-disability-2002";

describe("NON_WORK_DISABILITY_CLAUSES", () => {
  it("covers complete and major degree conditions from the 2002 standard", () => {
    const completeCount = NON_WORK_DISABILITY_CLAUSES.filter(
      (clause) => clause.degree === "complete",
    ).length;
    const majorCount = NON_WORK_DISABILITY_CLAUSES.filter(
      (clause) => clause.degree === "major",
    ).length;

    expect(completeCount).toBe(21);
    expect(majorCount).toBe(13);
    expect(NON_WORK_DISABILITY_CLAUSES).toHaveLength(34);
  });

  it("uses unique ids", () => {
    const ids = NON_WORK_DISABILITY_CLAUSES.map((clause) => clause.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
