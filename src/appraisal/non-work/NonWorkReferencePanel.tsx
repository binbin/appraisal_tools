import { Table, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import {
  getNonWorkCriteriaBlocks,
  getNonWorkReferenceSection,
  type NonWorkCriteriaTableBlock,
  type NonWorkReferenceKind,
} from "../data/non-work-disability-reference";
import "../shared/reference-panel.css";

export type NonWorkReferencePanelProps = {
  kind: NonWorkReferenceKind;
};

function CriteriaTable({
  block,
}: {
  block: NonWorkCriteriaTableBlock;
}) {
  const columns: ColumnsType<Record<string, string>> = block.columns.map(
    (column, columnIndex) => ({
      title: column.title,
      dataIndex: column.dataIndex,
      key: column.dataIndex,
      width: column.width,
      fixed: columnIndex === 0 ? "left" : undefined,
      onCell: () => ({
        style: { whiteSpace: "pre-wrap", wordBreak: "break-word" },
      }),
    }),
  );

  return (
    <section className="non-work-criteria-table">
      <Typography.Title level={5} className="non-work-criteria-table__title">
        {block.title}
      </Typography.Title>
      <Table<Record<string, string>>
        size="small"
        bordered
        pagination={false}
        scroll={{ x: true }}
        rowKey={(row) => row.key ?? String(row.item ?? row.stage)}
        columns={columns}
        dataSource={block.rows}
      />
      {block.footnote ? (
        <Typography.Paragraph
          type="secondary"
          className="non-work-criteria-table__footnote"
        >
          {block.footnote}
        </Typography.Paragraph>
      ) : null}
    </section>
  );
}

function CriteriaBlocksView() {
  const blocks = getNonWorkCriteriaBlocks();
  return (
    <div className="appendix-panel__body appendix-panel__body--blocks">
      {blocks.map((block, blockIndex) => {
        if (block.type === "text") {
          return (
            <pre
              key={`text-${blockIndex}`}
              className="non-work-criteria-text"
            >
              {block.content}
            </pre>
          );
        }
        return <CriteriaTable key={block.id} block={block} />;
      })}
    </div>
  );
}

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
      {kind === "criteria" ? (
        <CriteriaBlocksView />
      ) : (
        <pre className="appendix-panel__body">{section.body}</pre>
      )}
    </div>
  );
}
