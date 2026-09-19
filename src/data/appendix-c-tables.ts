import type { SpecialtyCategory } from "../types/clause";

export type AppendixCTablePages = {
  id: string;
  title: string;
  category: SpecialtyCategory;
  pages: string[];
};

/** 附录 C 原表页图（由 GB/T 16180—2014 标准页渲染） */
export const APPENDIX_C_TABLES: AppendixCTablePages[] = [
  {
    id: "C.1",
    title: "表 C.1 神经内科、神经外科、精神科门",
    category: "neuro_psych",
    pages: [
      "/gbt16180/tables-c/C1-1.png",
      "/gbt16180/tables-c/C1-2.png",
    ],
  },
  {
    id: "C.2",
    title: "表 C.2 骨科、整形外科、烧伤科门",
    category: "ortho_plastic",
    pages: [
      "/gbt16180/tables-c/C2-1.png",
      "/gbt16180/tables-c/C2-2.png",
      "/gbt16180/tables-c/C2-3.png",
    ],
  },
  {
    id: "C.3",
    title: "表 C.3 眼科、耳鼻喉科、口腔科门",
    category: "eye_ent_oral",
    pages: [
      "/gbt16180/tables-c/C3-1.png",
      "/gbt16180/tables-c/C3-2.png",
      "/gbt16180/tables-c/C3-3.png",
    ],
  },
  {
    id: "C.4",
    title: "表 C.4 普外、胸外、泌尿生殖科门",
    category: "general_urology",
    pages: [
      "/gbt16180/tables-c/C4-1.png",
      "/gbt16180/tables-c/C4-2.png",
      "/gbt16180/tables-c/C4-3.png",
      "/gbt16180/tables-c/C4-4.png",
    ],
  },
  {
    id: "C.5",
    title: "表 C.5 职业病内科门",
    category: "occupational",
    pages: [
      "/gbt16180/tables-c/C5-1.png",
      "/gbt16180/tables-c/C5-2.png",
      "/gbt16180/tables-c/C5-3.png",
    ],
  },
];

export function getAppendixCTable(
  category: SpecialtyCategory,
): AppendixCTablePages {
  const found = APPENDIX_C_TABLES.find((item) => item.category === category);
  if (!found) {
    throw new Error(`Missing appendix C table for ${category}`);
  }
  return found;
}
