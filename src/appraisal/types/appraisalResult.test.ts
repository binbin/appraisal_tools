import { describe, expect, it } from "vitest";
import {
  isInjuryResultOption,
  nonWorkResultFromInjuryGrade,
} from "./appraisalResult";

describe("appraisalResult helpers", () => {
  it("recognizes injury grade options", () => {
    expect(isInjuryResultOption("一级")).toBe(true);
    expect(isInjuryResultOption("无级别")).toBe(true);
    expect(isInjuryResultOption("十一级")).toBe(false);
  });

  it("maps injury grades to non-work results", () => {
    expect(nonWorkResultFromInjuryGrade("三级")).toBe("完全丧失劳动能力");
    expect(nonWorkResultFromInjuryGrade("六级")).toBe(
      "大部分丧失劳动能力",
    );
    expect(nonWorkResultFromInjuryGrade("七级")).toBeNull();
  });
});
