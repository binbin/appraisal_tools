/** 工伤结论：1 至 10 级，或无级别 */
export const INJURY_RESULT_OPTIONS = [
  "1级",
  "2级",
  "3级",
  "4级",
  "5级",
  "6级",
  "7级",
  "8级",
  "9级",
  "10级",
  "无级别",
] as const;

export type InjuryResultOption = (typeof INJURY_RESULT_OPTIONS)[number];

/** 非因工结论三档 */
export const NON_WORK_RESULT_OPTIONS = [
  "完全丧失劳动能力",
  "大部分丧失劳动能力",
  "未达到完全或大部分丧失劳动能力",
] as const;

export type NonWorkResultOption = (typeof NON_WORK_RESULT_OPTIONS)[number];

const COMPLETE_GRADES = new Set(["1级", "2级", "3级", "4级"]);
const MAJOR_GRADES = new Set(["5级", "6级"]);

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
