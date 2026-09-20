import {
  getClauseBodySystems,
  getClauseCategories,
  type InjuryClause,
  type SpecialtyCategory,
} from "../types/clause";

function normalizeSearchText(text: string): string {
  return text.trim().toLowerCase().replaceAll("。", ".").replaceAll("_", ".");
}

function buildSearchHaystack(clause: InjuryClause): string {
  const parts = [
    clause.code,
    clause.grade,
    clause.summary,
    ...(clause.keywords ?? []),
    ...(clause.synonyms ?? []),
    ...getClauseBodySystems(clause),
  ];
  return normalizeSearchText(parts.join(" "));
}

export type FilterClausesOptions = {
  bodySystem?: string | null;
};

export function filterClauses(
  clauses: InjuryClause[],
  category: SpecialtyCategory,
  keyword: string,
  options: FilterClausesOptions = {},
): InjuryClause[] {
  const normalized = normalizeSearchText(keyword);
  const bodySystem = options.bodySystem?.trim() || null;
  return clauses.filter((clause) => {
    if (!getClauseCategories(clause).includes(category)) {
      return false;
    }
    if (
      bodySystem &&
      !getClauseBodySystems(clause).includes(bodySystem)
    ) {
      return false;
    }
    if (!normalized) {
      return true;
    }
    return buildSearchHaystack(clause).includes(normalized);
  });
}

/** 当前门类下可选的身体系统（按出现频次降序） */
export function listBodySystemsForCategory(
  clauses: readonly InjuryClause[],
  category: SpecialtyCategory,
): string[] {
  const counts = new Map<string, number>();
  for (const clause of clauses) {
    if (!getClauseCategories(clause).includes(category)) {
      continue;
    }
    for (const system of getClauseBodySystems(clause)) {
      counts.set(system, (counts.get(system) ?? 0) + 1);
    }
  }
  return [...counts.entries()]
    .sort((left, right) => {
      if (right[1] !== left[1]) {
        return right[1] - left[1];
      }
      return left[0].localeCompare(right[0], "zh-CN");
    })
    .map(([system]) => system);
}
