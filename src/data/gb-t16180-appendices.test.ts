import { describe, expect, it } from "vitest";
import { CATEGORY_OPTIONS } from "../types/clause";
import {
  APPENDIX_DATASET,
  getAppendixSection,
} from "./gb-t16180-appendices";

describe("APPENDIX_DATASET", () => {
  it("explains the A/B/C framework", () => {
    expect(APPENDIX_DATASET.framework.length).toBe(4);
    expect(
      APPENDIX_DATASET.framework.map((item) => item.part).join(","),
    ).toContain("附录A");
  });

  it("covers appendix A and B for all five categories", () => {
    for (const option of CATEGORY_OPTIONS) {
      const sectionA = getAppendixSection("A", option.key);
      const sectionB = getAppendixSection("B", option.key);
      expect(sectionA?.body.length).toBeGreaterThan(100);
      expect(sectionB?.body.length).toBeGreaterThan(100);
    }
  });
});
