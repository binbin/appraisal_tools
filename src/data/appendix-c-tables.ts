import type { SpecialtyCategory } from "../types/clause";
import matrixData from "./appendix-c-matrix.json";

export type AppendixCMatrixRow = {
  category: string;
  g1: string;
  g2: string;
  g3: string;
  g4: string;
  g5: string;
  g6: string;
  g7: string;
  g8: string;
  g9: string;
  g10: string;
};

export type AppendixCMatrixTable = {
  title: string;
  rows: AppendixCMatrixRow[];
};

export const APPENDIX_C_MATRIX = matrixData as Record<
  string,
  AppendixCMatrixTable
>;

const CATEGORY_TO_TABLE_ID: Record<SpecialtyCategory, string> = {
  neuro_psych: "C.1",
  ortho_plastic: "C.2",
  eye_ent_oral: "C.3",
  general_urology: "C.4",
  occupational: "C.5",
};

export function getAppendixCMatrix(
  category: SpecialtyCategory,
): AppendixCMatrixTable & { id: string } {
  const tableId = CATEGORY_TO_TABLE_ID[category];
  const table = APPENDIX_C_MATRIX[tableId];
  if (!table) {
    throw new Error(`Missing appendix C matrix ${tableId}`);
  }
  return { id: tableId, ...table };
}

export const GRADE_COLUMN_KEYS = [
  "g1",
  "g2",
  "g3",
  "g4",
  "g5",
  "g6",
  "g7",
  "g8",
  "g9",
  "g10",
] as const;

export const GRADE_COLUMN_LABELS = [
  "一",
  "二",
  "三",
  "四",
  "五",
  "六",
  "七",
  "八",
  "九",
  "十",
] as const;
