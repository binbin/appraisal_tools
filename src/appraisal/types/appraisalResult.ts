/** 工伤结论：一至十级，或无级别 */
export const INJURY_RESULT_OPTIONS = [
  "一级",
  "二级",
  "三级",
  "四级",
  "五级",
  "六级",
  "七级",
  "八级",
  "九级",
  "十级",
  "无级别",
] as const;

export type InjuryResultOption = (typeof INJURY_RESULT_OPTIONS)[number];

/** 非因工结论三档 */
export const NON_WORK_RESULT_OPTIONS = [
  "完全丧失劳动能力",
  "大部分丧失劳动能力",
  "不符合完全或大部分丧失劳动能力",
] as const;

export type NonWorkResultOption = (typeof NON_WORK_RESULT_OPTIONS)[number];

const COMPLETE_GRADES = new Set(["一级", "二级", "三级", "四级"]);
const MAJOR_GRADES = new Set(["五级", "六级"]);

export function isInjuryResultOption(
  value: string,
): value is InjuryResultOption {
  return (INJURY_RESULT_OPTIONS as readonly string[]).includes(value);
}

export function nonWorkResultFromInjuryGrade(
  grade: string,
): NonWorkResultOption | null {
  if (COMPLETE_GRADES.has(grade)) {
    return "完全丧失劳动能力";
  }
  if (MAJOR_GRADES.has(grade)) {
    return "大部分丧失劳动能力";
  }
  return null;
}
