import { describe, expect, it } from "vitest";
import { CATEGORY_OPTIONS } from "../types/clause";
import {
  APPENDIX_C_TABLES,
  getAppendixCTable,
} from "./appendix-c-tables";

describe("APPENDIX_C_TABLES", () => {
  it("covers five specialty tables with original page images", () => {
    expect(APPENDIX_C_TABLES).toHaveLength(5);
    for (const option of CATEGORY_OPTIONS) {
      const table = getAppendixCTable(option.key);
      expect(table.pages.length).toBeGreaterThan(0);
      for (const page of table.pages) {
        expect(page).toMatch(/^\/gbt16180\/tables-c\/C\d-\d\.png$/);
      }
    }
  });
});
