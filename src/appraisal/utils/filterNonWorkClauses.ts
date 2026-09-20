import type {
  DisabilityDegree,
  NonWorkDisabilityClause,
} from "../types/nonWorkDisability";

export function filterNonWorkClauses(
  clauses: readonly NonWorkDisabilityClause[],
  degree: DisabilityDegree,
  keyword: string,
): NonWorkDisabilityClause[] {
  const normalizedKeyword = keyword.trim().toLowerCase();
  return clauses.filter((clause) => {
    if (clause.degree !== degree) {
      return false;
    }
    if (!normalizedKeyword) {
      return true;
    }
    const haystack =
      `${clause.code} ${clause.degreeLabel} ${clause.summary}`.toLowerCase();
    return haystack.includes(normalizedKeyword);
  });
}
