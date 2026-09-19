import { describe, expect, it } from "vitest";
import { CATEGORY_OPTIONS } from "../types/clause";
import { INJURY_CLAUSES } from "./gb-t16180-2014";

describe("INJURY_CLAUSES", () => {
  it("covers all five specialty categories", () => {
    for (const option of CATEGORY_OPTIONS) {
      const count = INJURY_CLAUSES.filter(
        (clause) => clause.category === option.key,
      ).length;
      expect(count).toBeGreaterThanOrEqual(3);
    }
  });

  it("has unique ids", () => {
    const ids = INJURY_CLAUSES.map((clause) => clause.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
