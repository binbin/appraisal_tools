import {
  getClauseBodySystems,
  type InjuryClause,
} from "../types/clause";

export function formatClauseItemMeta(clause: InjuryClause): string {
  const parts = [clause.code, clause.grade];
  const systems = getClauseBodySystems(clause);
  if (systems.length > 0) {
    parts.push(systems.join("/"));
  }
  return parts.join(" ");
}
