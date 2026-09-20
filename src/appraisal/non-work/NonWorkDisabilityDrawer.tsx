import { useEffect, useMemo, useState } from "react";
import { Drawer, Empty, Input, Tabs } from "antd";
import { INJURY_CLAUSES } from "../data/gb-t16180-2014";
import { NON_WORK_DISABILITY_CLAUSES } from "../data/non-work-disability-2002";
import type { NonWorkReferenceKind } from "../data/non-work-disability-reference";
import {
  CATEGORY_OPTIONS,
  type InjuryClause,
  type SpecialtyCategory,
} from "../types/clause";
import {
  DEGREE_OPTIONS,
  type DisabilityDegree,
  type NonWorkDisabilityClause,
} from "../types/nonWorkDisability";
import { filterClauses } from "../utils/filterClauses";
import { filterInjuryClausesForNonWorkGb } from "../utils/filterInjuryByDisabilityDegree";
import { filterNonWorkClauses } from "../utils/filterNonWorkClauses";
import { NonWorkReferencePanel } from "./NonWorkReferencePanel";
import { NotApplicableAction } from "../shared/NotApplicableAction";
import "../shared/clause-list.css";

export type NonWorkStandardSource = "labor_2002" | "gb_t16180";

type LaborContentMode = "conditions" | NonWorkReferenceKind;

export type NonWorkDisabilityDrawerProps = {
  open: boolean;
  onClose: () => void;
  selectedIds: ReadonlySet<string> | readonly string[];
  activeDegree: DisabilityDegree;
  onDegreeChange: (degree: DisabilityDegree) => void;
  onSelect: (clause: NonWorkDisabilityClause | InjuryClause) => void;
  onNotApplicable: () => void;
};

const STANDARD_SOURCE_OPTIONS: {
  key: NonWorkStandardSource;
  label: string;
}[] = [
  { key: "labor_2002", label: "依据劳社部发〔2002〕8号" },
  { key: "gb_t16180", label: "GB/T 16180—2014" },
];

const LABOR_CONTENT_MODE_OPTIONS: {
  key: LaborContentMode;
  label: string;
}[] = [
  { key: "conditions", label: "判定条件" },
  { key: "principles", label: "判定原则" },
  { key: "criteria", label: "判定基准" },
  { key: "usage_notes", label: "使用说明" },
];

function toIdSet(
  selectedIds: ReadonlySet<string> | readonly string[],
): ReadonlySet<string> {
  return selectedIds instanceof Set ? selectedIds : new Set(selectedIds);
}

type ClauseListProps = {
  selectedIdSet: ReadonlySet<string>;
  clauses: readonly (NonWorkDisabilityClause | InjuryClause)[];
  metaLabel: string;
  onSelect: (clause: NonWorkDisabilityClause | InjuryClause) => void;
  renderMeta: (clause: NonWorkDisabilityClause | InjuryClause) => string;
};

function ClauseList({
  selectedIdSet,
  clauses,
  metaLabel,
  onSelect,
  renderMeta,
}: ClauseListProps) {
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
                <span className="clause-item__meta">{renderMeta(clause)}</span>
                <span className="clause-item__summary">{clause.summary}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export function NonWorkDisabilityDrawer({
  open,
  onClose,
  selectedIds,
  activeDegree,
  onDegreeChange,
  onSelect,
  onNotApplicable,
}: NonWorkDisabilityDrawerProps) {
  const [keyword, setKeyword] = useState("");
  const [standardSource, setStandardSource] =
    useState<NonWorkStandardSource>("labor_2002");
  const [laborContentMode, setLaborContentMode] =
    useState<LaborContentMode>("conditions");
  const [activeCategory, setActiveCategory] =
    useState<SpecialtyCategory>("neuro_psych");
  const selectedIdSet = toIdSet(selectedIds);
  const isGbSource = standardSource === "gb_t16180";
  const showConditionList =
    isGbSource || laborContentMode === "conditions";

  useEffect(() => {
    if (!open) {
      return;
    }
    setKeyword("");
  }, [activeDegree, open, standardSource, activeCategory, laborContentMode]);

  const visibleNonWorkClauses = useMemo(
    () =>
      filterNonWorkClauses(
        NON_WORK_DISABILITY_CLAUSES,
        activeDegree,
        keyword,
      ),
    [activeDegree, keyword],
  );

  const visibleInjuryClauses = useMemo(() => {
    const byGrade = filterInjuryClausesForNonWorkGb(INJURY_CLAUSES);
    return filterClauses(byGrade, activeCategory, keyword);
  }, [activeCategory, keyword]);

  return (
    <Drawer
      title="非因工伤残或因病丧失劳动能力程度鉴定标准(试行)"
      placement="right"
      size="95%"
      open={open}
      onClose={onClose}
      destroyOnHidden
    >
      <NotApplicableAction onNotApplicable={onNotApplicable} />

      <Tabs
        size="small"
        activeKey={standardSource}
        onChange={(key) => setStandardSource(key as NonWorkStandardSource)}
        items={STANDARD_SOURCE_OPTIONS.map((option) => ({
          key: option.key,
          label: option.label,
        }))}
        style={{ marginBottom: 8 }}
      />

      {!isGbSource ? (
        <Tabs
          size="small"
          activeKey={laborContentMode}
          onChange={(key) => setLaborContentMode(key as LaborContentMode)}
          items={LABOR_CONTENT_MODE_OPTIONS.map((option) => ({
            key: option.key,
            label: option.label,
          }))}
          style={{ marginBottom: 8 }}
        />
      ) : null}

      {showConditionList ? (
        <>
          {!isGbSource ? (
            <Tabs
              activeKey={activeDegree}
              onChange={(key) => onDegreeChange(key as DisabilityDegree)}
              items={DEGREE_OPTIONS.map((option) => ({
                key: option.key,
                label: option.label,
              }))}
            />
          ) : (
            <Tabs
              activeKey={activeCategory}
              onChange={(key) =>
                setActiveCategory(key as SpecialtyCategory)
              }
              items={CATEGORY_OPTIONS.map((option) => ({
                key: option.key,
                label: option.label,
              }))}
            />
          )}

          <Input.Search
            allowClear
            placeholder={
              isGbSource
                ? "搜索条款编号、等级或摘要"
                : "搜索条款编号、程度或摘要"
            }
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
            style={{ marginBottom: 12 }}
          />

          {isGbSource ? (
            <ClauseList
              selectedIdSet={selectedIdSet}
              clauses={visibleInjuryClauses}
              metaLabel="（本门类，一至六级）"
              onSelect={onSelect}
              renderMeta={(clause) =>
                "grade" in clause
                  ? `${clause.code} ${clause.grade}`
                  : clause.code
              }
            />
          ) : (
            <ClauseList
              selectedIdSet={selectedIdSet}
              clauses={visibleNonWorkClauses}
              metaLabel="（本程度档次）"
              onSelect={onSelect}
              renderMeta={(clause) => clause.code}
            />
          )}
        </>
      ) : (
        <NonWorkReferencePanel
          kind={laborContentMode as NonWorkReferenceKind}
        />
      )}
    </Drawer>
  );
}
