import { Empty, Tabs, Typography } from "antd";
import {
  APPENDIX_DATASET,
  getAppendixSection,
  type AppendixKind,
} from "../appraisal/data/gb-t16180-appendices";
import { getAssetsForCategory } from "../appraisal/data/standard-assets";
import type { InjuryClause, SpecialtyCategory } from "../appraisal/types/clause";
import { StandardAssetGallery } from "./StandardAssetGallery";
import "./AppendixReferencePanel.css";

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
      <div className="appendix-panel">
        <div className="appendix-panel__role">
          规范性附录：分级表（伤残类别 × 一～十级，Ant Table）
        </div>
        <StandardAssetGallery
          category={category}
          appendix="C"
          onSelectClause={onSelectClause}
        />
      </div>
    );
  }

  const section = getAppendixSection(kind, category);
  if (!section) {
    return <Empty description="暂无该门类附录内容" />;
  }

  const appendixBody = (
    <>
      <Typography.Title level={5} className="appendix-panel__title">
        {section.title}
      </Typography.Title>
      <pre className="appendix-panel__body">{section.body}</pre>
    </>
  );

  const structuredAssets = getAssetsForCategory(category, kind);
  if (structuredAssets.length === 0) {
    return (
      <div className="appendix-panel">
        <div className="appendix-panel__role">{section.role}</div>
        {appendixBody}
      </div>
    );
  }

  return (
    <div className="appendix-panel">
      <div className="appendix-panel__role">{section.role}</div>
      <Tabs
        size="small"
        items={[
          {
            key: "tables",
            label: "表 / 图（结构化）",
            children: (
              <StandardAssetGallery
                category={category}
                appendix={kind}
                onSelectClause={onSelectClause}
              />
            ),
          },
          {
            key: "text",
            label: "附录正文",
            children: appendixBody,
          },
        ]}
      />
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
