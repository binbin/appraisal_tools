export type SpecialtyCategory =
  | "neuro_psych"
  | "ortho_plastic"
  | "eye_ent_oral"
  | "general_urology"
  | "occupational";

export type InjuryClause = {
  id: string;
  code: string;
  grade: string;
  summary: string;
  /** 主门类（本仓原归类；默认 Tab / 展示用） */
  category: SpecialtyCategory;
  /**
   * 可检索门类并集。门类不互斥：归类有歧义时一条可属多个门类。
   * 缺省时按 `[category]` 处理。
   */
  categories?: SpecialtyCategory[];
  /** 检索关键词（来自条款实体抽取） */
  keywords?: string[];
  /** 同义词 / 近义词（扩展检索） */
  synonyms?: string[];
  /** 主身体系统（展示用；筛选以 bodySystems 为准） */
  bodySystem?: string;
  /**
   * 可检索身体系统并集。一条可对应多个部位（如上下肢同时缺损）。
   * 缺省时按 bodySystem 单值处理。
   */
  bodySystems?: string[];
  /** 判定通常依赖功能障碍佐证（数据保留，UI 不展示） */
  needFunctionTest?: boolean;
};

/** 返回条款可出现的门类列表（至少含主门类） */
export function getClauseCategories(
  clause: Pick<InjuryClause, "category" | "categories">,
): SpecialtyCategory[] {
  if (clause.categories && clause.categories.length > 0) {
    return clause.categories;
  }
  return [clause.category];
}

/** 返回条款可出现的身体系统列表 */
export function getClauseBodySystems(
  clause: Pick<InjuryClause, "bodySystem" | "bodySystems">,
): string[] {
  if (clause.bodySystems && clause.bodySystems.length > 0) {
    return clause.bodySystems;
  }
  const primary = clause.bodySystem?.trim();
  return primary ? [primary] : [];
}

export const CATEGORY_OPTIONS: {
  key: SpecialtyCategory;
  label: string;
}[] = [
  {
    key: "neuro_psych",
    label: "神经内科、神经外科、精神科门",
  },
  {
    key: "ortho_plastic",
    label: "骨科、整形外科、烧伤科门",
  },
  {
    key: "eye_ent_oral",
    label: "眼科、耳鼻喉科、口腔科门",
  },
  {
    key: "general_urology",
    label: "普外科、胸外科、泌尿生殖科门",
  },
  {
    key: "occupational",
    label: "职业病内科门",
  },
];
