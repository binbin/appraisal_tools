import { describe, expect, it } from "vitest";
import type { InjuryClause } from "../types/clause";
import { filterClauses, listBodySystemsForCategory } from "./filterClauses";

const SAMPLE: InjuryClause[] = [
  {
    id: "5.1.2(1)",
    code: "5.1.2(1)",
    grade: "1级",
    summary: "极重度智能损伤",
    category: "neuro_psych",
    categories: ["neuro_psych"],
    synonyms: ["重度智力障碍", "痴呆"],
    bodySystem: "颅脑",
    bodySystems: ["颅脑"],
  },
  {
    id: "5.3.2(1)",
    code: "5.3.2(1)",
    grade: "3级",
    summary: "精神病性症状，经系统治疗1年后仍表现为危险或冲动行为者",
    category: "neuro_psych",
    categories: ["neuro_psych"],
    bodySystem: "颅脑",
    bodySystems: ["颅脑"],
  },
  {
    id: "5.5.2(5)",
    code: "5.5.2(5)",
    grade: "5级",
    summary: "一手功能完全丧失",
    category: "ortho_plastic",
    categories: ["ortho_plastic"],
    bodySystem: "上肢",
    bodySystems: ["上肢"],
  },
  {
    id: "5.1.2(2)",
    code: "5.1.2(2)",
    grade: "1级",
    summary: "四肢瘫肌力≤3级或三肢瘫肌力≤2级",
    category: "ortho_plastic",
    categories: ["ortho_plastic", "neuro_psych"],
    synonyms: ["四肢瘫痪"],
    bodySystem: "颅脑",
    bodySystems: ["颅脑"],
  },
];

describe("filterClauses", () => {
  it("filters by category", () => {
    const result = filterClauses(SAMPLE, "ortho_plastic", "");
    expect(result.map((item) => item.id).sort()).toEqual([
      "5.1.2(2)",
      "5.5.2(5)",
    ]);
  });

  it("includes multi-category clauses in every listed category", () => {
    const ortho = filterClauses(SAMPLE, "ortho_plastic", "");
    const neuro = filterClauses(SAMPLE, "neuro_psych", "");
    expect(ortho.some((item) => item.id === "5.1.2(2)")).toBe(true);
    expect(neuro.some((item) => item.id === "5.1.2(2)")).toBe(true);
  });

  it("filters by keyword against code grade summary", () => {
    const result = filterClauses(SAMPLE, "neuro_psych", "智能");
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("5.1.2(1)");
  });

  it("matches synonyms", () => {
    const result = filterClauses(SAMPLE, "neuro_psych", "痴呆");
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("5.1.2(1)");
  });

  it("returns empty when no match", () => {
    expect(filterClauses(SAMPLE, "occupational", "xxx")).toEqual([]);
  });

  it("matches dotted codes when searching with underscore", () => {
    const result = filterClauses(SAMPLE, "ortho_plastic", "5_5");
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("5.5.2(5)");
  });

  it("matches any bodySystem in bodySystems union", () => {
    const withSystems: InjuryClause[] = [
      {
        id: "5.1.2(7)",
        code: "5.1.2(7)",
        grade: "1级",
        summary: "双下肢膝上缺失及一上肢肘上缺失",
        category: "ortho_plastic",
        bodySystem: "下肢",
        bodySystems: ["下肢", "上肢"],
      },
      {
        id: "5.2.2(4)",
        code: "5.2.2(4)",
        grade: "2级",
        summary: "截瘫肌力≤2级",
        category: "neuro_psych",
        categories: ["neuro_psych", "ortho_plastic"],
        bodySystem: "脊柱",
        bodySystems: ["脊柱"],
      },
    ];
    const byArm = filterClauses(withSystems, "ortho_plastic", "", {
      bodySystem: "上肢",
    });
    expect(byArm.map((item) => item.id)).toEqual(["5.1.2(7)"]);

    const byLeg = filterClauses(withSystems, "ortho_plastic", "", {
      bodySystem: "下肢",
    });
    expect(byLeg.map((item) => item.id)).toEqual(["5.1.2(7)"]);
  });

  it("lists body systems for a category by frequency across multi values", () => {
    const systems = listBodySystemsForCategory(
      [
        {
          id: "a",
          code: "a",
          grade: "1级",
          summary: "x",
          category: "ortho_plastic",
          bodySystems: ["上肢", "下肢"],
        },
        {
          id: "b",
          code: "b",
          grade: "2级",
          summary: "y",
          category: "ortho_plastic",
          bodySystems: ["上肢"],
        },
        {
          id: "c",
          code: "c",
          grade: "3级",
          summary: "z",
          category: "neuro_psych",
          bodySystems: ["颅脑"],
        },
      ],
      "ortho_plastic",
    );
    expect(systems).toEqual(["上肢", "下肢"]);
  });
});
