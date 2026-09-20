import { describe, expect, it } from "vitest";
import {
  isInjuryResultOption,
  nonWorkResultFromInjuryGrade,
} from "./appraisalResult";

describe("appraisalResult helpers", () => {
  it("recognizes injury grade options", () => {
    expect(isInjuryResultOption("1级")).toBe(true);
    expect(isInjuryResultOption("无级别")).toBe(true);
    expect(isInjuryResultOption("一级")).toBe(false);
    expect(isInjuryResultOption("十一级")).toBe(false);
  });

  it("maps injury grades to non-work results", () => {
    expect(nonWorkResultFromInjuryGrade("3级")).toBe("完全丧失劳动能力");
    expect(nonWorkResultFromInjuryGrade("6级")).toBe(
      "大部分丧失劳动能力",
    );
    expect(nonWorkResultFromInjuryGrade("7级")).toBeNull();
  });
});
