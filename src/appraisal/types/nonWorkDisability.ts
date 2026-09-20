/** 劳社部发〔2002〕8号：丧失劳动能力程度档次 */
export type DisabilityDegree = "complete" | "major";

export type NonWorkDisabilityClause = {
  id: string;
  code: string;
  degree: DisabilityDegree;
  degreeLabel: string;
  summary: string;
};

export const DEGREE_OPTIONS: {
  key: DisabilityDegree;
  label: string;
}[] = [
  { key: "complete", label: "完全丧失劳动能力" },
  { key: "major", label: "大部分丧失劳动能力" },
];
