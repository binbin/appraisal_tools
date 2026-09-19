import type { InjuryClause } from "../types/clause";

export function formatClause(
  clause: Pick<InjuryClause, "code" | "grade">,
): string {
  return `${clause.code} ${clause.grade}`;
}
