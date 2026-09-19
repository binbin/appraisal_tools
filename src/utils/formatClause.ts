import type { InjuryClause } from "../types/clause";

/** 已选文本列表展示：编号 + 条款原文 */
export function formatClause(
  clause: Pick<InjuryClause, "code" | "summary">,
): string {
  return `${clause.code} ${clause.summary}`;
}
