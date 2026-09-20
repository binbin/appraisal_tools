import type { NonWorkDisabilityClause } from "../types/nonWorkDisability";

/**
 * 依据劳社部发〔2002〕8号
 * 《职工非因工伤残或因病丧失劳动能力程度鉴定标准(试行)》第 4 章判定条件。
 * 来源：https://www.gov.cn/gongbao/content/2003/content_62585.htm
 */
export const NON_WORK_DISABILITY_CLAUSES: NonWorkDisabilityClause[] = [
  {
    id: "4.1.1(1)",
    code: "4.1.1(1)",
    degree: "complete",
    degreeLabel: "完全丧失劳动能力",
    summary: "单肢瘫，肌力2级以下(含2级)",
  },
  {
    id: "4.1.1(2)",
    code: "4.1.1(2)",
    degree: "complete",
    degreeLabel: "完全丧失劳动能力",
    summary: "两肢或三肢瘫，肌力3级以下(含3级)",
  },
  {
    id: "4.1.1(3)",
    code: "4.1.1(3)",
    degree: "complete",
    degreeLabel: "完全丧失劳动能力",
    summary: "双手或双足全肌瘫，肌力2级以下(含2级)",
  },
  {
    id: "4.1.1(4)",
    code: "4.1.1(4)",
    degree: "complete",
    degreeLabel: "完全丧失劳动能力",
    summary: "完全性(感觉性或混合性)失语",
  },
  {
    id: "4.1.1(5)",
    code: "4.1.1(5)",
    degree: "complete",
    degreeLabel: "完全丧失劳动能力",
    summary: "非肢体瘫的中度运动障碍",
  },
  {
    id: "4.1.2",
    code: "4.1.2",
    degree: "complete",
    degreeLabel: "完全丧失劳动能力",
    summary: "长期重度呼吸困难",
  },
  {
    id: "4.1.3",
    code: "4.1.3",
    degree: "complete",
    degreeLabel: "完全丧失劳动能力",
    summary: "心功能长期在Ⅲ级以上。左室疾患左室射血分数≤50%",
  },
  {
    id: "4.1.4",
    code: "4.1.4",
    degree: "complete",
    degreeLabel: "完全丧失劳动能力",
    summary: "恶性室性心动过速经治疗无效",
  },
  {
    id: "4.1.5",
    code: "4.1.5",
    degree: "complete",
    degreeLabel: "完全丧失劳动能力",
    summary:
      "各种难以治愈的严重贫血，经治疗后血红蛋白长期低于6克/分升以下(含6克/分升)者",
  },
  {
    id: "4.1.6",
    code: "4.1.6",
    degree: "complete",
    degreeLabel: "完全丧失劳动能力",
    summary: "全胃切除或全结肠切除或小肠切除3/4",
  },
  {
    id: "4.1.7",
    code: "4.1.7",
    degree: "complete",
    degreeLabel: "完全丧失劳动能力",
    summary: "慢性重度肝功能损害",
  },
  {
    id: "4.1.8",
    code: "4.1.8",
    degree: "complete",
    degreeLabel: "完全丧失劳动能力",
    summary: "不可逆转的慢性肾功能衰竭期",
  },
  {
    id: "4.1.9",
    code: "4.1.9",
    degree: "complete",
    degreeLabel: "完全丧失劳动能力",
    summary:
      "各种代谢性或内分泌疾病、结缔组织疾病或自身免疫性疾病所导致心、脑、肾、肺、肝等一个以上主要脏器严重合并症，功能不全失代偿期",
  },
  {
    id: "4.1.10",
    code: "4.1.10",
    degree: "complete",
    degreeLabel: "完全丧失劳动能力",
    summary:
      "各种恶性肿瘤(含血液肿瘤)经综合治疗、放疗、化疗无效或术后复发",
  },
  {
    id: "4.1.11",
    code: "4.1.11",
    degree: "complete",
    degreeLabel: "完全丧失劳动能力",
    summary: "一眼有光感或无光感，另眼矫正视力<0.2或视野半径≤20度",
  },
  {
    id: "4.1.12",
    code: "4.1.12",
    degree: "complete",
    degreeLabel: "完全丧失劳动能力",
    summary: "双眼矫正视力<0.1或视野半径≤20度",
  },
  {
    id: "4.1.13",
    code: "4.1.13",
    degree: "complete",
    degreeLabel: "完全丧失劳动能力",
    summary:
      "慢性器质性精神障碍，经系统治疗2年仍有下述症状之一，并严重影响职业功能者：痴呆(中度智能减退)；持续或经常出现的妄想和幻觉，持续或经常出现的情绪不稳定以及不能自控的冲动攻击行为",
  },
  {
    id: "4.1.14",
    code: "4.1.14",
    degree: "complete",
    degreeLabel: "完全丧失劳动能力",
    summary:
      "精神分裂症，经系统治疗5年仍不能恢复正常者；偏执性精神障碍，妄想牢固，持续5年仍不能缓解，严重影响职业功能者",
  },
  {
    id: "4.1.15",
    code: "4.1.15",
    degree: "complete",
    degreeLabel: "完全丧失劳动能力",
    summary:
      "难治性的情感障碍，经系统治疗5年仍不能恢复正常，男性年龄50岁以上(含50岁)，女性45岁以上(含45岁)，严重影响职业功能者",
  },
  {
    id: "4.1.16",
    code: "4.1.16",
    degree: "complete",
    degreeLabel: "完全丧失劳动能力",
    summary:
      "具有明显强迫型人格发病基础的难治性强迫障碍，经系统治疗5年无效，严重影响职业功能者",
  },
  {
    id: "4.1.17",
    code: "4.1.17",
    degree: "complete",
    degreeLabel: "完全丧失劳动能力",
    summary: "符合《职工工伤与职业病致残程度鉴定》标准1至4级者",
  },
  {
    id: "4.2.1(1)",
    code: "4.2.1(1)",
    degree: "major",
    degreeLabel: "大部分丧失劳动能力",
    summary: "单肢瘫，肌力3级",
  },
  {
    id: "4.2.1(2)",
    code: "4.2.1(2)",
    degree: "major",
    degreeLabel: "大部分丧失劳动能力",
    summary: "两肢或三肢瘫，肌力4级",
  },
  {
    id: "4.2.1(3)",
    code: "4.2.1(3)",
    degree: "major",
    degreeLabel: "大部分丧失劳动能力",
    summary: "单手或单足全肌瘫，肌力2级",
  },
  {
    id: "4.2.1(4)",
    code: "4.2.1(4)",
    degree: "major",
    degreeLabel: "大部分丧失劳动能力",
    summary: "双手或双足全肌瘫，肌力3级",
  },
  {
    id: "4.2.2",
    code: "4.2.2",
    degree: "major",
    degreeLabel: "大部分丧失劳动能力",
    summary: "长期中度呼吸困难",
  },
  {
    id: "4.2.3",
    code: "4.2.3",
    degree: "major",
    degreeLabel: "大部分丧失劳动能力",
    summary: "心功能长期在Ⅱ级",
  },
  {
    id: "4.2.4",
    code: "4.2.4",
    degree: "major",
    degreeLabel: "大部分丧失劳动能力",
    summary: "中度肝功能损害",
  },
  {
    id: "4.2.5",
    code: "4.2.5",
    degree: "major",
    degreeLabel: "大部分丧失劳动能力",
    summary: "各种疾病造瘘者",
  },
  {
    id: "4.2.6",
    code: "4.2.6",
    degree: "major",
    degreeLabel: "大部分丧失劳动能力",
    summary: "慢性肾功能不全失代偿期",
  },
  {
    id: "4.2.7",
    code: "4.2.7",
    degree: "major",
    degreeLabel: "大部分丧失劳动能力",
    summary: "一眼矫正视力≤0.05，另眼矫正视力≤0.3",
  },
  {
    id: "4.2.8",
    code: "4.2.8",
    degree: "major",
    degreeLabel: "大部分丧失劳动能力",
    summary: "双眼矫正视力≤0.2或视野半径≤30度",
  },
  {
    id: "4.2.9",
    code: "4.2.9",
    degree: "major",
    degreeLabel: "大部分丧失劳动能力",
    summary: "双耳听力损失≥91分贝",
  },
  {
    id: "4.2.10",
    code: "4.2.10",
    degree: "major",
    degreeLabel: "大部分丧失劳动能力",
    summary: "符合《职工工伤与职业病致残程度鉴定》标准5至6级者",
  },
];
