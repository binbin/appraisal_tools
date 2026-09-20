import { Typography } from "antd";
import {
  getNonWorkReferenceSection,
  type NonWorkReferenceKind,
} from "../data/non-work-disability-reference";
import "../shared/reference-panel.css";

export type NonWorkReferencePanelProps = {
  kind: NonWorkReferenceKind;
};

export function NonWorkReferencePanel({
  kind,
}: NonWorkReferencePanelProps) {
  const section = getNonWorkReferenceSection(kind);

  return (
    <div className="appendix-panel">
      <div className="appendix-panel__role">
        劳社部发〔2002〕8号 · 参考条文
      </div>
      <Typography.Title level={5} className="appendix-panel__title">
        {section.title}
      </Typography.Title>
      <pre className="appendix-panel__body">{section.body}</pre>
    </div>
  );
}
