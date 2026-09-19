import type { InjuryClause, SpecialtyCategory } from "../types/clause";

export function filterClauses(
  clauses: InjuryClause[],
  category: SpecialtyCategory,
  keyword: string,
): InjuryClause[] {
  const normalized = keyword.trim().toLowerCase();
  return clauses.filter((clause) => {
    if (clause.category !== category) {
      return false;
    }
    if (!normalized) {
      return true;
    }
    const haystack =
      `${clause.code} ${clause.grade} ${clause.summary}`.toLowerCase();
    return haystack.includes(normalized);
  });
}
