import { describe, expect, it } from "vitest";
import { CATEGORY_OPTIONS } from "../types/clause";
import {
  APPENDIX_C_MATRIX,
  getAppendixCMatrix,
  GRADE_COLUMN_KEYS,
} from "./appendix-c-tables";

describe("APPENDIX_C_MATRIX", () => {
  it("has five specialty matrices with grade columns", () => {
    expect(Object.keys(APPENDIX_C_MATRIX)).toEqual([
      "C.1",
      "C.2",
      "C.3",
      "C.4",
      "C.5",
    ]);
    for (const option of CATEGORY_OPTIONS) {
      const table = getAppendixCMatrix(option.key);
      expect(table.rows.length).toBeGreaterThan(0);
      for (const row of table.rows) {
        expect(row.category.length).toBeGreaterThan(0);
        for (const key of GRADE_COLUMN_KEYS) {
          expect(row).toHaveProperty(key);
        }
      }
    }
  });

  it("keeps C.1 intelligence and epilepsy grade anchors", () => {
    const table = getAppendixCMatrix("neuro_psych");
    const intelligence = table.rows.find((row) => row.category === "智能损伤");
    expect(intelligence).toMatchObject({
      g1: "极重度",
      g2: "重度",
      g4: "中度",
      g6: "轻度",
    });
    const epilepsy = table.rows.find((row) => row.category === "癫痫");
    expect(epilepsy).toMatchObject({
      g4: "重度",
      g6: "中度",
      g9: "轻度",
    });
  });
});
