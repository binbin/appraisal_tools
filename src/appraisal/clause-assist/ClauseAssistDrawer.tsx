import { useEffect, useMemo, useState } from "react";
import { Drawer, Input, Select, Tabs } from "antd";
import { INJURY_CLAUSES } from "../data/gb-t16180-2014";
import type { AppendixKind } from "../data/gb-t16180-appendices";
import {
  CATEGORY_OPTIONS,
  type InjuryClause,
  type SpecialtyCategory,
} from "../types/clause";
import {
  filterClauses,
  listBodySystemsForCategory,
} from "../utils/filterClauses";
import {
  AppendixFrameworkHint,
  AppendixReferencePanel,
} from "./AppendixReferencePanel";
import { InjuryClauseList } from "../shared/InjuryClauseList";
import { NotApplicableAction } from "../shared/NotApplicableAction";
import "../shared/clause-list.css";

export type ClauseAssistDrawerProps = {
  open: boolean;
  onClose: () => void;
  selectedIds: ReadonlySet<string> | readonly string[];
  activeCategory: SpecialtyCategory;
  onCategoryChange: (category: SpecialtyCategory) => void;
  onSelect: (clause: InjuryClause) => void;
  onNotApplicable: () => void;
};

type ContentMode = "clauses" | AppendixKind;

function toIdSet(
  selectedIds: ReadonlySet<string> | readonly string[],
): ReadonlySet<string> {
  return selectedIds instanceof Set ? selectedIds : new Set(selectedIds);
}

export function ClauseAssistDrawer({
  open,
  onClose,
  selectedIds,
  activeCategory,
  onCategoryChange,
  onSelect,
  onNotApplicable,
}: ClauseAssistDrawerProps) {
  const [keyword, setKeyword] = useState("");
  const [bodySystem, setBodySystem] = useState<string | null>(null);
  const [contentMode, setContentMode] = useState<ContentMode>("clauses");
  const selectedIdSet = toIdSet(selectedIds);

  useEffect(() => {
    if (!open) {
      return;
    }
    setKeyword("");
    setBodySystem(null);
  }, [activeCategory, open]);

  const bodySystemOptions = useMemo(
    () => listBodySystemsForCategory(INJURY_CLAUSES, activeCategory),
    [activeCategory],
  );

  const visibleClauses = useMemo(
    () =>
      filterClauses(INJURY_CLAUSES, activeCategory, keyword, {
        bodySystem,
      }),
    [activeCategory, bodySystem, keyword],
  );

  return (
    <Drawer
      title="工伤伤残等级条款（GB/T 16180—2014）"
      placement="right"
      size="95%"
      open={open}
      onClose={onClose}
      destroyOnHidden
    >
      <NotApplicableAction onNotApplicable={onNotApplicable} />

      <AppendixFrameworkHint />

      <Tabs
        size="small"
        activeKey={contentMode}
        onChange={(key) => setContentMode(key as ContentMode)}
        items={[
          { key: "clauses", label: "正文条款" },
          { key: "A", label: "附录A 判定基准" },
          { key: "B", label: "附录B 使用说明" },
          { key: "C", label: "附录C 分级表" },
        ]}
        style={{ marginBottom: 8 }}
      />

      <Tabs
        activeKey={activeCategory}
        onChange={(key) => onCategoryChange(key as SpecialtyCategory)}
        items={CATEGORY_OPTIONS.map((option) => ({
          key: option.key,
          label: option.label,
        }))}
      />

      {contentMode === "clauses" ? (
        <>
          <div className="clause-filters">
            <Input.Search
              allowClear
              className="clause-filters__search"
              placeholder="搜索编号、等级、摘要、同义词"
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
            />
            <Select
              allowClear
              className="clause-filters__system"
              placeholder="身体系统"
              value={bodySystem}
              options={bodySystemOptions.map((system) => ({
                value: system,
                label: system,
              }))}
              onChange={(value) => setBodySystem(value ?? null)}
            />
          </div>
          <InjuryClauseList
            selectedIdSet={selectedIdSet}
            clauses={visibleClauses}
            metaLabel="（本门类正文）"
            onSelect={onSelect}
          />
        </>
      ) : (
        <AppendixReferencePanel
          kind={contentMode}
          category={activeCategory}
          onSelectClause={onSelect}
        />
      )}
    </Drawer>
  );
}
