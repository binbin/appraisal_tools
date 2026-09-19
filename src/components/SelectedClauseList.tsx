import { DeleteOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import type { InjuryClause } from "../types/clause";
import { formatClause } from "../utils/formatClause";
import "./SelectedClauseList.css";

export type SelectedClauseListProps = {
  clauses: InjuryClause[];
  onRemove: (id: string) => void;
};

export function SelectedClauseList({
  clauses,
  onRemove,
}: SelectedClauseListProps) {
  if (clauses.length === 0) {
    return (
      <div className="selected-clause-list selected-clause-list--empty">
        尚未选择条款
      </div>
    );
  }

  return (
    <ul className="selected-clause-list">
      {clauses.map((clause) => (
        <li key={clause.id} className="selected-clause-row">
          <Tooltip title={clause.summary}>
            <span className="selected-clause-text">
              {formatClause(clause)}
            </span>
          </Tooltip>
          <Button
            type="text"
            size="small"
            danger
            icon={<DeleteOutlined />}
            aria-label="删除条款"
            onClick={() => onRemove(clause.id)}
          />
        </li>
      ))}
    </ul>
  );
}
