/**
 * 劳社部发〔2002〕8号《职工非因工伤残或因病丧失劳动能力程度鉴定标准(试行)》
 * 判定原则、判定基准与使用说明。
 * 主来源：https://www.gov.cn/gongbao/content/2003/content_62585.htm
 * 表1～表3在公报网页中为图片/空缺，按同文发布稿补全，以 antd Table 展示。
 */

export type NonWorkReferenceKind =
  | "principles"
  | "criteria"
  | "usage_notes";

export type NonWorkReferenceSection = {
  kind: NonWorkReferenceKind;
  title: string;
  body: string;
};

export type NonWorkTableColumn = {
  title: string;
  dataIndex: string;
  width?: number;
};

export type NonWorkCriteriaTextBlock = {
  type: "text";
  content: string;
};

export type NonWorkCriteriaTableBlock = {
  type: "table";
  id: "table1" | "table2" | "table3";
  title: string;
  columns: NonWorkTableColumn[];
  rows: Record<string, string>[];
  footnote?: string;
};

export type NonWorkCriteriaBlock =
  | NonWorkCriteriaTextBlock
  | NonWorkCriteriaTableBlock;

/** 表1 呼吸困难分级 */
export const NON_WORK_TABLE_1: NonWorkCriteriaTableBlock = {
  type: "table",
  id: "table1",
  title: "表1 呼吸困难分级",
  columns: [
    { title: "项目", dataIndex: "item", width: 220 },
    { title: "轻度", dataIndex: "mild", width: 160 },
    { title: "中度", dataIndex: "moderate", width: 140 },
    { title: "重度", dataIndex: "severe", width: 160 },
    { title: "严重度", dataIndex: "critical", width: 140 },
  ],
  rows: [
    {
      key: "clinical",
      item: "临床表现",
      mild: "平路快步或登山、上楼时气短明显",
      moderate: "平路步行100米即气短",
      severe: "稍活动(穿衣、谈话)即气短",
      critical: "静息时气短",
    },
    {
      key: "obstructive",
      item: "阻塞性通气功能减退：一秒钟用力呼气量占预计值百分比",
      mild: "≥80%",
      moderate: "50—79%",
      severe: "30—49%",
      critical: "＜30%",
    },
    {
      key: "restrictive",
      item: "限制性通气功能减退：肺活量",
      mild: "≥70%",
      moderate: "60—69%",
      severe: "50—59%",
      critical: "＜50%",
    },
    {
      key: "po2",
      item: "血氧分压",
      mild: "—",
      moderate: "—",
      severe: "60—87毫米汞柱",
      critical: "＜60毫米汞柱",
    },
  ],
  footnote:
    "*血气分析氧分压60—87毫米汞柱时，需参考其他肺功能结果。",
};

/** 表2 肝功能损害的分级 */
export const NON_WORK_TABLE_2: NonWorkCriteriaTableBlock = {
  type: "table",
  id: "table2",
  title: "表2 肝功能损害的分级",
  columns: [
    { title: "项目", dataIndex: "item", width: 140 },
    { title: "轻度", dataIndex: "mild", width: 180 },
    { title: "中度", dataIndex: "moderate", width: 180 },
    { title: "重度", dataIndex: "severe", width: 180 },
  ],
  rows: [
    {
      key: "albumin",
      item: "血浆白蛋白",
      mild: "3.1—3.5克/分升",
      moderate: "2.5—3.0克/分升",
      severe: "＜2.5克/分升",
    },
    {
      key: "bilirubin",
      item: "血清胆红质",
      mild: "1.5—5毫克/分升",
      moderate: "5.1—10毫克/分升",
      severe: "＞10毫克/分升",
    },
    {
      key: "ascites",
      item: "腹水",
      mild: "无",
      moderate: "或少量，治疗后消失",
      severe: "顽固性",
    },
    {
      key: "encephalopathy",
      item: "脑症",
      mild: "无",
      moderate: "轻度",
      severe: "明显",
    },
    {
      key: "pt",
      item: "凝血酶原时间",
      mild: "稍延长(较对照组＞3秒)",
      moderate: "延长(较对照组＞6秒)",
      severe: "明显延长(较对照组＞9秒)",
    },
  ],
};

/** 表3 肾功能损害程度分期 */
export const NON_WORK_TABLE_3: NonWorkCriteriaTableBlock = {
  type: "table",
  id: "table3",
  title: "表3 肾功能损害程度分期",
  columns: [
    { title: "分期", dataIndex: "stage", width: 160 },
    { title: "肌酐清除率", dataIndex: "clearance", width: 120 },
    { title: "血尿素氮", dataIndex: "bun", width: 140 },
    { title: "血肌酐", dataIndex: "creatinine", width: 140 },
    { title: "其他临床症状", dataIndex: "symptoms", width: 220 },
  ],
  rows: [
    {
      key: "compensation",
      stage: "肾功能不全代偿期",
      clearance: "50—80毫升/分",
      bun: "正常",
      creatinine: "正常",
      symptoms: "无症状",
    },
    {
      key: "decompensation",
      stage: "肾功能不全失代偿期",
      clearance: "20—50毫升/分",
      bun: "20—50毫克/分升",
      creatinine: "2—5毫克/分升",
      symptoms: "乏力；轻度贫血；食欲减退",
    },
    {
      key: "failure",
      stage: "肾功能衰竭期",
      clearance: "10—20毫升/分",
      bun: "50—80毫克/分升",
      creatinine: "5—8毫克/分升",
      symptoms: "贫血；代谢性酸中毒；水电解质紊乱",
    },
    {
      key: "uremia",
      stage: "尿毒症期",
      clearance: "＜10毫升/分",
      bun: "＞80毫克/分升",
      creatinine: "＞8毫克/分升",
      symptoms: "严重酸中毒和全身各系统症状",
    },
  ],
  footnote:
    "注：血尿素氮水平受多种因素影响，一般不单独作为衡量肾功能损害轻重的指标。",
};

/**
 * 判定基准正文：表1～表3以结构化 Table 插入，其余为纯文本。
 * 对应公报「5 判定基准」章节顺序。
 */
export const NON_WORK_CRITERIA_BLOCKS: NonWorkCriteriaBlock[] = [
  {
    type: "text",
    content: `5.1 运动障碍判定基准

5.1.1 肢体瘫以肌力作为分级标准，划分为0至5级：

0级：肌肉完全瘫痪，无收缩。
1级：可看到或触及肌肉轻微收缩，但不能产生动作。
2级：肌肉在不受重力影响下，可进行运动，即肢体能在床面上移动，但不能抬高。
3级：在和地心引力相反的方向中尚能完成其动作，但不能对抗外加的阻力。
4级：能对抗一定的阻力，但较正常人为低。
5级：正常肌力。

5.1.2 非肢体瘫的运动障碍包括肌张力增高、共济失调、不自主运动、震颤或吞咽肌肉麻痹等。根据其对生活自理的影响程度划分为轻、中、重三度：

(1) 重度运动障碍：不能自行进食、大小便、洗漱、翻身和穿衣。
(2) 中度运动障碍：上述动作困难，但在他人帮助下可以完成。
(3) 轻度运动障碍：完成上述运动虽有一些困难，但基本可以自理。

5.2 呼吸困难及肺功能减退判定基准

5.2.1 呼吸困难分级`,
  },
  NON_WORK_TABLE_1,
  {
    type: "text",
    content: `5.3 心功能判定基准

心功能分级

Ⅰ级：体力活动不受限制。
Ⅱ级：静息时无不适，但稍重于日常生活活动量即致乏力、心悸、气促或心绞痛。
Ⅲ级：体力活动明显受限，静息时无不适，但低于日常活动量即致乏力、心悸、气促或心绞痛。
Ⅳ级：任何体力活动均引起症状，休息时亦可有心力衰竭或心绞痛。

5.4 肝功能损害程度判定基准`,
  },
  NON_WORK_TABLE_2,
  {
    type: "text",
    content: `5.5 慢性肾功能损害程度判定基准`,
  },
  NON_WORK_TABLE_3,
];

export const NON_WORK_REFERENCE_SECTIONS: NonWorkReferenceSection[] = [
  {
    kind: "principles",
    title: "3 判定原则",
    body: `2 总则

2.1 本标准分完全丧失劳动能力和大部分丧失劳动能力两个程度档次。

2.2 本标准中的完全丧失劳动能力，是指因损伤或疾病造成人体组织器官缺失、严重缺损、畸形或严重损害，致使伤病的组织器官或生理功能完全丧失或存在严重功能障碍。

2.3 本标准中的大部分丧失劳动能力，是指因损伤或疾病造成人体组织器官大部分缺失、明显畸形或损害，致使受损组织器官功能中等度以上障碍。

2.4 如果伤病职工同时符合不同类别疾病三项以上(含三项)“大部分丧失劳动能力”条件时，可确定为“完全丧失劳动能力”。

2.5 本标准将《职工工伤与职业病致残程度鉴定》(GB/T16180—1996)中的1至4级和5至6级伤残程度分别列为本标准的完全丧失劳动能力和大部分丧失劳动能力的范围。

3 判定原则

3.1 本标准中劳动能力丧失程度主要以身体器官缺损或功能障碍程度作为判定依据。

3.2 本标准中对功能障碍的判定，以医疗期满或医疗终结时所作的医学检查结果为依据。`,
  },
  {
    kind: "criteria",
    title: "5 判定基准",
    /** 兼容旧消费方；UI 优先渲染 NON_WORK_CRITERIA_BLOCKS */
    body: "见结构化判定基准（表1～表3以表格展示）。",
  },
  {
    kind: "usage_notes",
    title: "正确使用标准的说明",
    body: `1. 本标准条目只列出达到完全丧失劳动能力的起点条件，比此条件严重的伤残或疾病均属于完全丧失劳动能力。

2. 标准中有关条目所指的“长期”是经系统治疗12个月以上(含12个月)。

3. 标准中所指的“系统治疗”是指经住院治疗，或每月二次以上(含二次)到医院进行门诊治疗并坚持服药一个疗程以上，以及恶性肿瘤在门诊进行放射或化学治疗。

4. 对未列出的其他伤病残丧失劳动能力程度的条目，可参照国家标准《职工工伤与职业病致残程度鉴定》(GB/T16180—1996)相应条目执行。`,
  },
];

export function getNonWorkReferenceSection(
  kind: NonWorkReferenceKind,
): NonWorkReferenceSection {
  const section = NON_WORK_REFERENCE_SECTIONS.find(
    (item) => item.kind === kind,
  );
  if (!section) {
    throw new Error(`Unknown non-work reference kind: ${kind}`);
  }
  return section;
}

export function getNonWorkCriteriaBlocks(): readonly NonWorkCriteriaBlock[] {
  return NON_WORK_CRITERIA_BLOCKS;
}
