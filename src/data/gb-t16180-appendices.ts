import type { SpecialtyCategory } from "../types/clause";
import rawAppendices from "./gb-t16180-appendices.json";

export type AppendixKind = "A" | "B" | "C";

export type AppendixFrameworkItem = {
  part: string;
  role: string;
  desc: string;
};

export type AppendixSection = {
  id: string;
  appendix: AppendixKind;
  category: SpecialtyCategory;
  title: string;
  role: string;
  body: string;
};

export type AppendixDataset = {
  framework: AppendixFrameworkItem[];
  sections: AppendixSection[];
};

export const APPENDIX_DATASET = rawAppendices as AppendixDataset;

export function getAppendixSection(
  appendix: "A" | "B",
  category: SpecialtyCategory,
): AppendixSection | undefined {
  return APPENDIX_DATASET.sections.find(
    (section) =>
      section.appendix === appendix && section.category === category,
  );
}
