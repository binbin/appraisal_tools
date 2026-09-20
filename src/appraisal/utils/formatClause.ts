import type { InjuryClause } from "../types/clause";

/** 工伤条款依据前缀 */
export const INJURY_CITATION_PREFIX = "GB/T 16180—2014 ";

/** 辅助工具「不适用」写入 Input 的文案 */
export const INJURY_NOT_APPLICABLE_TEXT =
  "不符合GB/T 16180—2014相关条款";

/** 已选文本展示：依据前缀 + 编号 + 条款原文 */
export function formatClause(
  clause: Pick<InjuryClause, "code" | "summary">,
): string {
  return `${INJURY_CITATION_PREFIX}${clause.code} ${clause.summary}`;
}
