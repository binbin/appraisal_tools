import type { InjuryClause, SpecialtyCategory } from "../types/clause";

function normalizeSearchText(text: string): string {
  return text.trim().toLowerCase().replaceAll("。", ".").replaceAll("_", ".");
}

export function filterClauses(
  clauses: InjuryClause[],
  category: SpecialtyCategory,
  keyword: string,
): InjuryClause[] {
  const normalized = normalizeSearchText(keyword);
  return clauses.filter((clause) => {
    if (clause.category !== category) {
      return false;
    }
    if (!normalized) {
      return true;
    }
    const haystack = normalizeSearchText(
      `${clause.code} ${clause.grade} ${clause.summary}`,
    );
    return haystack.includes(normalized);
  });
}
