import { Collapse, Empty, Typography } from "antd";
import {
  APPENDIX_DATASET,
  getAppendixSection,
  type AppendixKind,
} from "../data/gb-t16180-appendices";
import { INJURY_CLAUSES } from "../data/gb-t16180-2014";
import type { InjuryClause, SpecialtyCategory } from "../types/clause";
import { formatClause } from "../utils/formatClause";
import "./AppendixReferencePanel.css";

const GRADE_ORDER = [
  "一级",
  "二级",
  "三级",
  "四级",
  "五级",
  "六级",
  "七级",
  "八级",
  "九级",
  "十级",
] as const;

export type AppendixReferencePanelProps = {
  kind: AppendixKind;
  category: SpecialtyCategory;
  onSelectClause?: (clause: InjuryClause) => void;
};

export function AppendixReferencePanel({
  kind,
  category,
  onSelectClause,
}: AppendixReferencePanelProps) {
  if (kind === "C") {
    return (
      <AppendixCView category={category} onSelectClause={onSelectClause} />
    );
  }

  const section = getAppendixSection(kind, category);
  if (!section) {
    return <Empty description="暂无该门类附录内容" />;
  }

  return (
    <div className="appendix-panel">
      <div className="appendix-panel__role">{section.role}</div>
      <Typography.Title level={5} className="appendix-panel__title">
        {section.title}
      </Typography.Title>
      <pre className="appendix-panel__body">{section.body}</pre>
    </div>
  );
}

export function AppendixFrameworkHint() {
  return (
    <div className="appendix-framework">
      <div className="appendix-framework__title">标准结构（辅助理解）</div>
      <ul className="appendix-framework__list">
        {APPENDIX_DATASET.framework.map((item) => (
          <li key={item.part}>
            <strong>{item.part}</strong>
            <span className="appendix-framework__role">{item.role}</span>
            <span>{item.desc}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

type AppendixCViewProps = {
  category: SpecialtyCategory;
  onSelectClause?: (clause: InjuryClause) => void;
};

function AppendixCView({ category, onSelectClause }: AppendixCViewProps) {
  const clauses = INJURY_CLAUSES.filter(
    (clause) => clause.category === category,
  );
  const grouped = GRADE_ORDER.map((grade) => ({
    grade,
    items: clauses.filter((clause) => clause.grade === grade),
  })).filter((group) => group.items.length > 0);

  return (
    <div className="appendix-panel">
      <div className="appendix-panel__role">
        规范性附录：按门类整理的正文条款查询索引（对应表 C.1～C.5）
      </div>
      <Typography.Paragraph type="secondary" style={{ marginBottom: 12 }}>
        下列为本门类条款按等级归集，点击可直接选入鉴定结果。最终依据仍是正文条款。
      </Typography.Paragraph>
      {grouped.length === 0 ? (
        <Empty description="本门类暂无条款" />
      ) : (
        <Collapse
          size="small"
          defaultActiveKey={[grouped[0].grade]}
          items={grouped.map((group) => ({
            key: group.grade,
            label: `${group.grade}（${group.items.length}）`,
            children: (
              <ul className="appendix-c-list">
                {group.items.map((clause) => (
                  <li key={clause.id}>
                    <button
                      type="button"
                      className="appendix-c-item"
                      onClick={() => onSelectClause?.(clause)}
                    >
                      {formatClause(clause)}
                    </button>
                  </li>
                ))}
              </ul>
            ),
          }))}
        />
      )}
    </div>
  );
}
