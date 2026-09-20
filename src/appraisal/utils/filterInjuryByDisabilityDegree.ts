import type { InjuryClause } from "../types/clause";
import type { DisabilityDegree } from "../types/nonWorkDisability";

/** 完全丧失劳动能力 ↔ 工伤 1～4 级 */
const COMPLETE_GRADES = new Set(["一级", "二级", "三级", "四级"]);

/** 大部分丧失劳动能力 ↔ 工伤 5～6 级；七级及以下不展示 */
const MAJOR_GRADES = new Set(["五级", "六级"]);

const NON_WORK_GB_GRADES = new Set([
  ...COMPLETE_GRADES,
  ...MAJOR_GRADES,
]);

export function gradesForDisabilityDegree(
  degree: DisabilityDegree,
): ReadonlySet<string> {
  return degree === "complete" ? COMPLETE_GRADES : MAJOR_GRADES;
}

export function filterInjuryClausesByDisabilityDegree(
  clauses: readonly InjuryClause[],
  degree: DisabilityDegree,
): InjuryClause[] {
  const allowedGrades = gradesForDisabilityDegree(degree);
  return clauses.filter((clause) => allowedGrades.has(clause.grade));
}

/** 非因工引用 GB/T：仅展示 1～6 级，不再按完全/大部分分栏 */
export function filterInjuryClausesForNonWorkGb(
  clauses: readonly InjuryClause[],
): InjuryClause[] {
  return clauses.filter((clause) => NON_WORK_GB_GRADES.has(clause.grade));
}
