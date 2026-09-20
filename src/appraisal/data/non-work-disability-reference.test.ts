import { describe, expect, it } from "vitest";
import {
  getNonWorkReferenceSection,
  NON_WORK_REFERENCE_SECTIONS,
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

  it("includes judgment criteria tables", () => {
    const section = getNonWorkReferenceSection("criteria");
    expect(section.body).toContain("表1 呼吸困难分级");
    expect(section.body).toContain("表2 肝功能损害的分级");
    expect(section.body).toContain("表3 肾功能损害程度分期");
    expect(section.body).toContain("5.3 心功能判定基准");
  });
});
