import { Empty } from "antd";
import type { InjuryClause } from "../types/clause";
import { formatClauseItemMeta } from "../utils/clauseDisplay";

export type InjuryClauseListProps = {
  selectedIdSet: ReadonlySet<string>;
  clauses: readonly InjuryClause[];
  metaLabel: string;
  onSelect: (clause: InjuryClause) => void;
};

export function InjuryClauseList({
  selectedIdSet,
  clauses,
  metaLabel,
  onSelect,
}: InjuryClauseListProps) {
  if (clauses.length === 0) {
    return (
      <Empty
        description="无匹配条款"
        image={Empty.PRESENTED_IMAGE_SIMPLE}
      />
    );
  }

  return (
    <>
      <div className="clause-list-meta">
        共 {clauses.length} 条{metaLabel}
      </div>
      <ul className="clause-list">
        {clauses.map((clause) => {
          const isSelected = selectedIdSet.has(clause.id);
          return (
            <li key={clause.id}>
              <button
                type="button"
                className={
                  isSelected
                    ? "clause-item clause-item--selected"
                    : "clause-item"
                }
                onClick={() => onSelect(clause)}
              >
                <span className="clause-item__meta">
                  {formatClauseItemMeta(clause)}
                </span>
                <span className="clause-item__summary">{clause.summary}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
}
