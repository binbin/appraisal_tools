import { describe, expect, it } from "vitest";
import {
  getNonWorkCriteriaBlocks,
  getNonWorkReferenceSection,
  NON_WORK_REFERENCE_SECTIONS,
  NON_WORK_TABLE_1,
  NON_WORK_TABLE_2,
  NON_WORK_TABLE_3,
} from "./non-work-disability-reference";

describe("non-work-disability-reference", () => {
  it("covers principles, criteria and usage notes", () => {
    expect(NON_WORK_REFERENCE_SECTIONS.map((item) => item.kind)).toEqual([
      "principles",
      "criteria",
      "usage_notes",
    ]);
  });

  it("includes judgment principle articles", () => {
    const section = getNonWorkReferenceSection("principles");
    expect(section.body).toContain("3.1");
    expect(section.body).toContain("医疗期满或医疗终结");
  });

  it("exposes criteria tables as structured blocks for antd Table", () => {
    const blocks = getNonWorkCriteriaBlocks();
    const tables = blocks.filter((block) => block.type === "table");
    expect(tables.map((block) => block.id)).toEqual([
      "table1",
      "table2",
      "table3",
    ]);
    expect(NON_WORK_TABLE_1.title).toBe("表1 呼吸困难分级");
    expect(NON_WORK_TABLE_2.title).toBe("表2 肝功能损害的分级");
    expect(NON_WORK_TABLE_3.title).toBe("表3 肾功能损害程度分期");
    expect(NON_WORK_TABLE_1.rows).toHaveLength(4);
    expect(NON_WORK_TABLE_2.rows).toHaveLength(5);
    expect(NON_WORK_TABLE_3.rows).toHaveLength(4);
    expect(blocks.some((block) =>
      block.type === "text" && block.content.includes("5.3 心功能判定基准"),
    )).toBe(true);
  });
});
