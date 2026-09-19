import type { InjuryClause } from "../types/clause";

/**
 * GB/T 16180—2014 代表性子条款子集。
 * 编号规则：5.{等级}.{门类}_{条目序号}，如 5.3.2_1
 * 门类：1 神经 2 骨科 3 眼耳口 4 普外 5 职业病
 */
export const INJURY_CLAUSES: InjuryClause[] = [
  // 神经内科、神经外科、精神科门（.1）
  {
    id: "5.1.1_1",
    code: "5.1.1_1",
    grade: "一级",
    summary: "极重度智能损伤",
    category: "neuro_psych",
  },
  {
    id: "5.2.1_1",
    code: "5.2.1_1",
    grade: "二级",
    summary: "重度智能损伤",
    category: "neuro_psych",
  },
  {
    id: "5.4.1_1",
    code: "5.4.1_1",
    grade: "四级",
    summary: "中度智能损伤",
    category: "neuro_psych",
  },
  {
    id: "5.6.1_1",
    code: "5.6.1_1",
    grade: "六级",
    summary: "轻度智能损伤",
    category: "neuro_psych",
  },
  {
    id: "5.9.1_1",
    code: "5.9.1_1",
    grade: "九级",
    summary: "癫痫轻度",
    category: "neuro_psych",
  },

  // 骨科、整形外科、烧伤科门（.2）
  {
    id: "5.1.2_1",
    code: "5.1.2_1",
    grade: "一级",
    summary: "四肢瘫肌力≤3级或三肢瘫肌力≤2级",
    category: "ortho_plastic",
  },
  {
    id: "5.3.2_1",
    code: "5.3.2_1",
    grade: "三级",
    summary: "截瘫肌力≤4级",
    category: "ortho_plastic",
  },
  {
    id: "5.3.2_2",
    code: "5.3.2_2",
    grade: "三级",
    summary: "双手全肌瘫肌力≤3级",
    category: "ortho_plastic",
  },
  {
    id: "5.5.2_1",
    code: "5.5.2_1",
    grade: "五级",
    summary: "一手功能完全丧失",
    category: "ortho_plastic",
  },
  {
    id: "5.7.2_1",
    code: "5.7.2_1",
    grade: "七级",
    summary: "一拇指指间关节离断",
    category: "ortho_plastic",
  },
  {
    id: "5.9.2_1",
    code: "5.9.2_1",
    grade: "九级",
    summary: "一拇指远侧指间关节离断",
    category: "ortho_plastic",
  },
  {
    id: "5.10.2_1",
    code: "5.10.2_1",
    grade: "十级",
    summary: "一手除拇指外，任何一指远侧指间关节离断",
    category: "ortho_plastic",
  },

  // 眼科、耳鼻喉科、口腔科门（.3）
  {
    id: "5.1.3_1",
    code: "5.1.3_1",
    grade: "一级",
    summary: "双眼无光感或仅有光感但光定位不准者",
    category: "eye_ent_oral",
  },
  {
    id: "5.4.3_1",
    code: "5.4.3_1",
    grade: "四级",
    summary: "一眼有或无光感，另眼矫正视力≤0.05",
    category: "eye_ent_oral",
  },
  {
    id: "5.7.3_1",
    code: "5.7.3_1",
    grade: "七级",
    summary: "一眼矫正视力≤0.3，另眼矫正视力＞0.6",
    category: "eye_ent_oral",
  },
  {
    id: "5.8.3_1",
    code: "5.8.3_1",
    grade: "八级",
    summary: "双耳听力损失≥41dBHL",
    category: "eye_ent_oral",
  },
  {
    id: "5.10.3_1",
    code: "5.10.3_1",
    grade: "十级",
    summary: "双耳听力损失≥26dBHL",
    category: "eye_ent_oral",
  },

  // 普外科、胸外科、泌尿生殖科门（.4）
  {
    id: "5.3.4_1",
    code: "5.3.4_1",
    grade: "三级",
    summary: "一侧全肺切除并胸廓改形",
    category: "general_urology",
  },
  {
    id: "5.5.4_1",
    code: "5.5.4_1",
    grade: "五级",
    summary: "胃切除3/4",
    category: "general_urology",
  },
  {
    id: "5.7.4_1",
    code: "5.7.4_1",
    grade: "七级",
    summary: "胃切除1/2",
    category: "general_urology",
  },
  {
    id: "5.8.4_1",
    code: "5.8.4_1",
    grade: "八级",
    summary: "脾切除",
    category: "general_urology",
  },
  {
    id: "5.9.4_1",
    code: "5.9.4_1",
    grade: "九级",
    summary: "一侧睾丸创伤后萎缩",
    category: "general_urology",
  },

  // 职业病内科门（.5）
  {
    id: "5.2.5_1",
    code: "5.2.5_1",
    grade: "二级",
    summary: "职业性肺癌伴肺功能中度损伤",
    category: "occupational",
  },
  {
    id: "5.4.5_1",
    code: "5.4.5_1",
    grade: "四级",
    summary: "尘肺Ⅲ期伴肺功能轻度损伤",
    category: "occupational",
  },
  {
    id: "5.6.5_1",
    code: "5.6.5_1",
    grade: "六级",
    summary: "尘肺Ⅱ期伴肺功能轻度损伤",
    category: "occupational",
  },
  {
    id: "5.8.5_1",
    code: "5.8.5_1",
    grade: "八级",
    summary: "职业性皮肤病久治不愈",
    category: "occupational",
  },
  {
    id: "5.10.5_1",
    code: "5.10.5_1",
    grade: "十级",
    summary: "职业性哮喘，喘息基本控制",
    category: "occupational",
  },
];
