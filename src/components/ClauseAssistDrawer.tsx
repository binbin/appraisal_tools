import { useEffect, useMemo, useState } from "react";
import { Drawer, Empty, Input, Tabs } from "antd";
import { INJURY_CLAUSES } from "../appraisal/data/gb-t16180-2014";
import type { AppendixKind } from "../appraisal/data/gb-t16180-appendices";
import {
  CATEGORY_OPTIONS,
  type InjuryClause,
  type SpecialtyCategory,
} from "../appraisal/types/clause";
import { filterClauses } from "../appraisal/utils/filterClauses";
import {
  AppendixFrameworkHint,
  AppendixReferencePanel,
} from "./AppendixReferencePanel";
import { NotApplicableAction } from "./NotApplicableAction";
import "./ClauseAssistDrawer.css";

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
  const [contentMode, setContentMode] = useState<ContentMode>("clauses");
  const selectedIdSet = toIdSet(selectedIds);

  useEffect(() => {
    if (!open) {
      return;
    }
    setKeyword("");
  }, [activeCategory, open]);

  const visibleClauses = useMemo(
    () => filterClauses(INJURY_CLAUSES, activeCategory, keyword),
    [activeCategory, keyword],
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
          <Input.Search
            allowClear
            placeholder="搜索条款编号、等级或摘要"
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
            style={{ marginBottom: 12 }}
          />
          {visibleClauses.length === 0 ? (
            <Empty
              description="无匹配条款"
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
          ) : (
            <>
              <div className="clause-list-meta">
                共 {visibleClauses.length} 条（本门类正文）
              </div>
              <ul className="clause-list">
                {visibleClauses.map((clause) => {
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
                          {clause.code} {clause.grade}
                        </span>
                        <span className="clause-item__summary">
                          {clause.summary}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </>
          )}
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
