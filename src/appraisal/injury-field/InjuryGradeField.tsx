import { useMemo, useState } from "react";
import { Button, Input, Space } from "antd";
import {
  INJURY_RESULT_OPTIONS,
  NON_WORK_RESULT_OPTIONS,
  isInjuryResultOption,
  nonWorkResultFromInjuryGrade,
  type InjuryResultOption,
  type NonWorkResultOption,
} from "../types/appraisalResult";
import type { InjuryClause, SpecialtyCategory } from "../types/clause";
import type {
  DisabilityDegree,
  NonWorkDisabilityClause,
} from "../types/nonWorkDisability";
import {
  formatClause,
  INJURY_CITATION_PREFIX,
  INJURY_NOT_APPLICABLE_TEXT,
} from "../utils/formatClause";
import {
  formatNonWorkClause,
  formatNonWorkInjuryClause,
  NON_WORK_NOT_APPLICABLE_TEXT,
} from "../utils/formatNonWorkClause";
import { ClauseAssistDrawer } from "../clause-assist/ClauseAssistDrawer";
import { NonWorkDisabilityDrawer } from "../non-work/NonWorkDisabilityDrawer";
import { ResultOptionBar } from "./ResultOptionBar";
import "./InjuryGradeField.css";

const { TextArea } = Input;

function degreeFromNonWorkResult(
  result: NonWorkResultOption,
): DisabilityDegree | null {
  if (result === "完全丧失劳动能力") {
    return "complete";
  }
  if (result === "大部分丧失劳动能力") {
    return "major";
  }
  return null;
}

export function InjuryGradeField() {
  const [injuryOpen, setInjuryOpen] = useState(false);
  const [injurySelected, setInjurySelected] = useState<InjuryClause | null>(
    null,
  );
  const [injuryResult, setInjuryResult] = useState<InjuryResultOption | null>(
    null,
  );
  // 打开即只读：结论按钮与 TextArea 仅由辅助工具写入，不可手改
  const [injuryLocked, setInjuryLocked] = useState(true);
  const [injuryInputKey, setInjuryInputKey] = useState(0);
  const [injuryInputDefaultValue, setInjuryInputDefaultValue] = useState("");
  const [activeCategory, setActiveCategory] =
    useState<SpecialtyCategory>("neuro_psych");

  const [nonWorkOpen, setNonWorkOpen] = useState(false);
  const [nonWorkSelected, setNonWorkSelected] = useState<
    NonWorkDisabilityClause | InjuryClause | null
  >(null);
  const [nonWorkResult, setNonWorkResult] =
    useState<NonWorkResultOption | null>(null);
  const [nonWorkLocked, setNonWorkLocked] = useState(true);
  const [nonWorkInputKey, setNonWorkInputKey] = useState(0);
  const [nonWorkInputDefaultValue, setNonWorkInputDefaultValue] =
    useState("");
  const [activeDegree, setActiveDegree] =
    useState<DisabilityDegree>("complete");

  const injurySelectedIds = useMemo(
    () => (injurySelected ? [injurySelected.id] : []),
    [injurySelected],
  );

  const nonWorkSelectedIds = useMemo(
    () => (nonWorkSelected ? [nonWorkSelected.id] : []),
    [nonWorkSelected],
  );

  function lockInjury(
    result: InjuryResultOption,
    inputValue: string,
    clause: InjuryClause | null,
  ): void {
    setInjurySelected(clause);
    setInjuryResult(result);
    setInjuryInputDefaultValue(inputValue);
    setInjuryInputKey((previous) => previous + 1);
    setInjuryLocked(true);
    setInjuryOpen(false);
  }

  function lockNonWork(
    result: NonWorkResultOption,
    inputValue: string,
    clause: NonWorkDisabilityClause | InjuryClause | null,
  ): void {
    setNonWorkSelected(clause);
    setNonWorkResult(result);
    setNonWorkInputDefaultValue(inputValue);
    setNonWorkInputKey((previous) => previous + 1);
    setNonWorkLocked(true);
    setNonWorkOpen(false);
    const degree = degreeFromNonWorkResult(result);
    if (degree) {
      setActiveDegree(degree);
    }
  }

  function handleInjurySelect(clause: InjuryClause): void {
    if (!isInjuryResultOption(clause.grade)) {
      return;
    }
    lockInjury(clause.grade, formatClause(clause), clause);
  }

  function handleInjuryResultSelect(result: InjuryResultOption): void {
    if (injuryLocked) {
      return;
    }
    const inputValue =
      result === "无级别"
        ? "无级别"
        : `${INJURY_CITATION_PREFIX}${result}`;
    lockInjury(result, inputValue, null);
  }

  function handleNonWorkSelect(
    clause: NonWorkDisabilityClause | InjuryClause,
  ): void {
    if ("category" in clause) {
      const result = nonWorkResultFromInjuryGrade(clause.grade);
      if (!result) {
        return;
      }
      lockNonWork(result, formatNonWorkInjuryClause(clause), clause);
      return;
    }
    const result: NonWorkResultOption =
      clause.degree === "complete"
        ? "完全丧失劳动能力"
        : "大部分丧失劳动能力";
    lockNonWork(result, formatNonWorkClause(clause), clause);
  }

  function handleNonWorkResultSelect(result: NonWorkResultOption): void {
    if (nonWorkLocked) {
      return;
    }
    lockNonWork(result, result, null);
  }

  function handleInjuryNotApplicable(): void {
    lockInjury("无级别", INJURY_NOT_APPLICABLE_TEXT, null);
  }

  function handleNonWorkNotApplicable(): void {
    lockNonWork(
      "未达到完全或大部分丧失劳动能力",
      NON_WORK_NOT_APPLICABLE_TEXT,
      null,
    );
  }

  return (
    <div className="injury-grade-field">
      <section className="appraisal-block">
        <h2 className="appraisal-block__title">工伤判定</h2>
        <ResultOptionBar
          options={INJURY_RESULT_OPTIONS}
          selected={injuryResult}
          locked={injuryLocked}
          onSelect={handleInjuryResultSelect}
        />
        <div className="appraisal-input-field">
          <label className="appraisal-input-field__label" htmlFor="injuryGrade">
            鉴定依据
          </label>
          <Space.Compact className="injury-grade-field__input-row">
            <TextArea
              key={injuryInputKey}
              id="injuryGrade"
              name="injuryGrade"
              placeholder="尚未选择工伤条款"
              defaultValue={injuryInputDefaultValue}
              readOnly={injuryLocked}
              autoSize={{ minRows: 1, maxRows: 6 }}
              className={
                injuryLocked ? "appraisal-input--readonly" : undefined
              }
            />
            <Button
              type="primary"
              autoInsertSpace={false}
              onClick={() => setInjuryOpen(true)}
            >
              选择
            </Button>
          </Space.Compact>
        </div>
      </section>

      <section className="appraisal-block">
        <h2 className="appraisal-block__title">
          非因工伤残或因病丧失劳动能力判定
        </h2>
        <ResultOptionBar
          options={NON_WORK_RESULT_OPTIONS}
          selected={nonWorkResult}
          locked={nonWorkLocked}
          onSelect={handleNonWorkResultSelect}
        />
        <div className="appraisal-input-field">
          <label
            className="appraisal-input-field__label"
            htmlFor="nonWorkDisability"
          >
            鉴定依据
          </label>
          <Space.Compact className="injury-grade-field__input-row">
            <TextArea
              key={nonWorkInputKey}
              id="nonWorkDisability"
              name="nonWorkDisability"
              placeholder="尚未选择非因工条款"
              defaultValue={nonWorkInputDefaultValue}
              readOnly={nonWorkLocked}
              autoSize={{ minRows: 1, maxRows: 6 }}
              className={
                nonWorkLocked ? "appraisal-input--readonly" : undefined
              }
            />
            <Button
              type="primary"
              autoInsertSpace={false}
              onClick={() => setNonWorkOpen(true)}
            >
              选择
            </Button>
          </Space.Compact>
        </div>
      </section>

      <ClauseAssistDrawer
        open={injuryOpen}
        onClose={() => setInjuryOpen(false)}
        selectedIds={injurySelectedIds}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        onSelect={handleInjurySelect}
        onNotApplicable={handleInjuryNotApplicable}
      />

      <NonWorkDisabilityDrawer
        open={nonWorkOpen}
        onClose={() => setNonWorkOpen(false)}
        selectedIds={nonWorkSelectedIds}
        activeDegree={activeDegree}
        onDegreeChange={setActiveDegree}
        onSelect={handleNonWorkSelect}
        onNotApplicable={handleNonWorkNotApplicable}
      />
    </div>
  );
}
