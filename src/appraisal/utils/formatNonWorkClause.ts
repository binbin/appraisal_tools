import type { InjuryClause } from "../types/clause";
import type { NonWorkDisabilityClause } from "../types/nonWorkDisability";

/** 选自劳社部发〔2002〕8号正文条款 */
export const LABOR_2002_CITATION_PREFIX = "劳社部发〔2002〕8号";

/**
 * 选自 GB/T 16180—2014 一至四级，对应标准 4.1.17
 * （符合工伤标准 1 至 4 级者 → 完全丧失劳动能力）
 */
export const GB_COMPLETE_CITATION_PREFIX =
  "劳社部发〔2002〕8号4.1.17、GB/T 16180—2014 ";

/**
 * 选自 GB/T 16180—2014 五至六级，对应标准 4.2.10
 * （符合工伤标准 5 至 6 级者 → 大部分丧失劳动能力）
 */
export const GB_MAJOR_CITATION_PREFIX =
  "劳社部发〔2002〕8号4.2.10、GB/T 16180—2014 ";

/** 辅助工具「不适用」写入 Input 的文案 */
export const NON_WORK_NOT_APPLICABLE_TEXT =
  "不符合劳社部发〔2002〕8号相关条款";

const COMPLETE_GRADES = new Set(["1级", "2级", "3级", "4级"]);

/** 劳社部发条款：依据前缀 + 编号 + 原文 */
export function formatNonWorkClause(
  clause: Pick<NonWorkDisabilityClause, "code" | "summary">,
): string {
  return `${LABOR_2002_CITATION_PREFIX}${clause.code} ${clause.summary}`;
}

/** GB/T 条款：按等级引用 4.1.17 或 4.2.10 + 编号 + 原文 */
export function formatNonWorkInjuryClause(
  clause: Pick<InjuryClause, "code" | "grade" | "summary">,
): string {
  const citationPrefix = COMPLETE_GRADES.has(clause.grade)
    ? GB_COMPLETE_CITATION_PREFIX
    : GB_MAJOR_CITATION_PREFIX;
  return `${citationPrefix}${clause.code} ${clause.summary}`;
}
