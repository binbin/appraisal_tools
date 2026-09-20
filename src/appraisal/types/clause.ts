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
  category: SpecialtyCategory;
};

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
