import { useMemo, useState } from "react";
import { Button, message } from "antd";
import type { InjuryClause, SpecialtyCategory } from "../types/clause";
import { ClauseAssistDrawer } from "./ClauseAssistDrawer";
import { SelectedClauseList } from "./SelectedClauseList";
import "./InjuryGradeField.css";

export function InjuryGradeField() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<InjuryClause[]>([]);
  const [activeCategory, setActiveCategory] =
    useState<SpecialtyCategory>("neuro_psych");

  const selectedIds = useMemo(
    () => selected.map((clause) => clause.id),
    [selected],
  );

  function handleSelect(clause: InjuryClause): void {
    const alreadySelected = selected.some((item) => item.id === clause.id);
    if (alreadySelected) {
      message.info("已添加");
      return;
    }
    setSelected((previous) => [...previous, clause]);
  }

  function handleRemove(id: string): void {
    setSelected((previous) => previous.filter((clause) => clause.id !== id));
  }

  return (
    <div className="injury-grade-field">
      <Button type="primary" onClick={() => setOpen(true)}>
        辅助工具
      </Button>
      <SelectedClauseList clauses={selected} onRemove={handleRemove} />
      <ClauseAssistDrawer
        open={open}
        onClose={() => setOpen(false)}
        selectedIds={selectedIds}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        onSelect={handleSelect}
      />
    </div>
  );
}
