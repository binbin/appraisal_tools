import { useMemo, useState } from "react";
import { Button, Input, Space } from "antd";
import type { InjuryClause, SpecialtyCategory } from "../types/clause";
import { formatClause } from "../utils/formatClause";
import { ClauseAssistDrawer } from "./ClauseAssistDrawer";
import "./InjuryGradeField.css";

export function InjuryGradeField() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<InjuryClause | null>(null);
  const [inputKey, setInputKey] = useState(0);
  const [inputDefaultValue, setInputDefaultValue] = useState("");
  const [activeCategory, setActiveCategory] =
    useState<SpecialtyCategory>("neuro_psych");

  const selectedIds = useMemo(
    () => (selected ? [selected.id] : []),
    [selected],
  );

  function handleSelect(clause: InjuryClause): void {
    setSelected(clause);
    setInputDefaultValue(formatClause(clause));
    setInputKey((previous) => previous + 1);
  }

  return (
    <div className="injury-grade-field">
      <Space.Compact className="injury-grade-field__input-row">
        <Input
          key={inputKey}
          name="injuryGrade"
          placeholder="尚未选择条款"
          defaultValue={inputDefaultValue}
        />
        <Button type="primary" onClick={() => setOpen(true)}>
          辅助工具
        </Button>
      </Space.Compact>
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
