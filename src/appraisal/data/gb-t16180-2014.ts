import type { InjuryClause } from "../types/clause";
import rawClauses from "./gb-t16180-2014.json";

/**
 * 自 GB/T 16180—2014 第 5 章条款系列解析的全量条目（共 530 条）。
 * 编号：5.{等级}.2({序号})，例如 5.5.2(5)、5.7.2(36)、5.1.2(4)。
 * 门类不互斥：`categories` 为可检索并集，歧义条目可属多个门类；
 * `category` 为主门类。身体系统同理：`bodySystems` 可多值。
 * 检索还可用 keywords / synonyms。
 */
export const INJURY_CLAUSES: InjuryClause[] = rawClauses as InjuryClause[];
