import type { InjuryClause } from "../types/clause";

/**
 * GB/T 16180—2014 代表性条款子集，按五大门类组织。
 * 可整表替换扩展，无需改 UI。
 */
export const INJURY_CLAUSES: InjuryClause[] = [
  // 神经内科、神经外科、精神科门
  {
    id: "5.1.1-1",
    code: "5.1.1",
    grade: "一级",
    summary: "极重度智能损伤",
    category: "neuro_psych",
  },
  {
    id: "5.2.1-1",
    code: "5.2.1",
    grade: "二级",
    summary: "重度智能损伤",
    category: "neuro_psych",
  },
  {
    id: "5.4.1-1",
    code: "5.4.1",
    grade: "四级",
    summary: "中度智能损伤",
    category: "neuro_psych",
  },
  {
    id: "5.6.1-1",
    code: "5.6.1",
    grade: "六级",
    summary: "轻度智能损伤",
    category: "neuro_psych",
  },
  {
    id: "5.9.1-1",
    code: "5.9.1",
    grade: "九级",
    summary: "癫痫轻度",
    category: "neuro_psych",
  },

  // 骨科、整形外科、烧伤科门
  {
    id: "5.1.2-1",
    code: "5.1.2",
    grade: "一级",
    summary: "四肢瘫肌力≤3级或三肢瘫肌力≤2级",
    category: "ortho_plastic",
  },
  {
    id: "5.5.2-1",
    code: "5.5.2",
    grade: "五级",
    summary: "一手功能完全丧失",
    category: "ortho_plastic",
  },
  {
    id: "5.7.2-1",
    code: "5.7.2",
    grade: "七级",
    summary: "一拇指指间关节离断",
    category: "ortho_plastic",
  },
  {
    id: "5.9.2-1",
    code: "5.9.2",
    grade: "九级",
    summary: "一拇指远侧指间关节离断",
    category: "ortho_plastic",
  },
  {
    id: "5.10.2-1",
    code: "5.10.2",
    grade: "十级",
    summary: "一手除拇指外，任何一指远侧指间关节离断",
    category: "ortho_plastic",
  },

  // 眼科、耳鼻喉科、口腔科门
  {
    id: "5.1.3-1",
    code: "5.1.3",
    grade: "一级",
    summary: "双眼无光感或仅有光感但光定位不准者",
    category: "eye_ent_oral",
  },
  {
    id: "5.4.3-1",
    code: "5.4.3",
    grade: "四级",
    summary: "一眼有或无光感，另眼矫正视力≤0.05",
    category: "eye_ent_oral",
  },
  {
    id: "5.7.3-1",
    code: "5.7.3",
    grade: "七级",
    summary: "一眼矫正视力≤0.3，另眼矫正视力＞0.6",
    category: "eye_ent_oral",
  },
  {
    id: "5.8.3-1",
    code: "5.8.3",
    grade: "八级",
    summary: "双耳听力损失≥41dBHL",
    category: "eye_ent_oral",
  },
  {
    id: "5.10.3-1",
    code: "5.10.3",
    grade: "十级",
    summary: "双耳听力损失≥26dBHL",
    category: "eye_ent_oral",
  },

  // 普外科、胸外科、泌尿生殖科门
  {
    id: "5.3.4-1",
    code: "5.3.4",
    grade: "三级",
    summary: "一侧全肺切除并胸廓改形",
    category: "general_urology",
  },
  {
    id: "5.5.4-1",
    code: "5.5.4",
    grade: "五级",
    summary: "胃切除3/4",
    category: "general_urology",
  },
  {
    id: "5.7.4-1",
    code: "5.7.4",
    grade: "七级",
    summary: "胃切除1/2",
    category: "general_urology",
  },
  {
    id: "5.8.4-1",
    code: "5.8.4",
    grade: "八级",
    summary: "脾切除",
    category: "general_urology",
  },
  {
    id: "5.9.4-1",
    code: "5.9.4",
    grade: "九级",
    summary: "一侧睾丸创伤后萎缩",
    category: "general_urology",
  },

  // 职业病内科门
  {
    id: "5.2.5-1",
    code: "5.2.5",
    grade: "二级",
    summary: "职业性肺癌伴肺功能中度损伤",
    category: "occupational",
  },
  {
    id: "5.4.5-1",
    code: "5.4.5",
    grade: "四级",
    summary: "尘肺Ⅲ期伴肺功能轻度损伤",
    category: "occupational",
  },
  {
    id: "5.6.5-1",
    code: "5.6.5",
    grade: "六级",
    summary: "尘肺Ⅱ期伴肺功能轻度损伤",
    category: "occupational",
  },
  {
    id: "5.8.5-1",
    code: "5.8.5",
    grade: "八级",
    summary: "职业性皮肤病久治不愈",
    category: "occupational",
  },
  {
    id: "5.10.5-1",
    code: "5.10.5",
    grade: "十级",
    summary: "职业性哮喘，喘息基本控制",
    category: "occupational",
  },
];
