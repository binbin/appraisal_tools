import type { InjuryClause } from "../types/clause";
import rawClauses from "./gb-t16180-2014.json";

/**
 * 自 GB/T 16180—2014 第 5 章条款系列解析的全量条目（共 530 条）。
 * 编号：5.{等级}.2({序号})，例如 5.5.2(5)、5.7.2(36)、5.1.2(4)。
 * 门类由条文关键词归类，便于辅助检索；以标准原文为准。
 */
export const INJURY_CLAUSES: InjuryClause[] = rawClauses as InjuryClause[];
