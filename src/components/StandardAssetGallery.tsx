import { Image, Table, Typography } from "antd";
import {
  getAssetsForCategory,
  type StandardAsset,
  type StandardFigureAsset,
  type StandardTableAsset,
} from "../data/standard-assets";
import { INJURY_CLAUSES } from "../data/gb-t16180-2014";
import type { InjuryClause, SpecialtyCategory } from "../types/clause";
import { formatClause } from "../utils/formatClause";
import "./StandardAssetGallery.css";

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

export type StandardAssetGalleryProps = {
  category: SpecialtyCategory;
  appendix: "A" | "B" | "C";
  onSelectClause?: (clause: InjuryClause) => void;
};

export function StandardAssetGallery({
  category,
  appendix,
  onSelectClause,
}: StandardAssetGalleryProps) {
  if (appendix === "C") {
    return (
      <AppendixCTables category={category} onSelectClause={onSelectClause} />
    );
  }

  const assets = getAssetsForCategory(category, appendix);
  if (assets.length === 0) {
    return (
      <div className="asset-empty">
        本门类暂无结构化表/图，请结合上方附录正文阅读。
      </div>
    );
  }

  return (
    <div className="asset-gallery">
      {assets.map((asset) => (
        <AssetCard key={asset.id} asset={asset} />
      ))}
    </div>
  );
}

function AssetCard({ asset }: { asset: StandardAsset }) {
  return (
    <section className="asset-card" id={`asset-${asset.id}`}>
      <Typography.Title level={5} className="asset-card__title">
        {asset.title}
      </Typography.Title>
      {asset.note ? (
        <Typography.Paragraph type="secondary" className="asset-card__note">
          {asset.note}
        </Typography.Paragraph>
      ) : null}
      {asset.kind === "table" ? (
        <TableAssetView asset={asset} />
      ) : (
        <FigureAssetView asset={asset} />
      )}
    </section>
  );
}

function TableAssetView({ asset }: { asset: StandardTableAsset }) {
  return (
    <Table
      size="small"
      pagination={false}
      scroll={{ x: true }}
      rowKey={(_, index) => `${asset.id}-${index}`}
      columns={asset.columns.map((column) => ({
        title: column.title,
        dataIndex: column.dataIndex,
        width: column.width,
        ellipsis: true,
      }))}
      dataSource={asset.rows}
      bordered
    />
  );
}

function FigureAssetView({ asset }: { asset: StandardFigureAsset }) {
  return (
    <div className="asset-figure">
      <Image
        src={asset.imageSrc}
        alt={asset.imageAlt}
        style={{ maxWidth: "100%" }}
      />
    </div>
  );
}

type AppendixCTablesProps = {
  category: SpecialtyCategory;
  onSelectClause?: (clause: InjuryClause) => void;
};

function AppendixCTables({
  category,
  onSelectClause,
}: AppendixCTablesProps) {
  const tableIdByCategory: Record<SpecialtyCategory, string> = {
    neuro_psych: "C.1",
    ortho_plastic: "C.2",
    eye_ent_oral: "C.3",
    general_urology: "C.4",
    occupational: "C.5",
  };
  const tableId = tableIdByCategory[category];
  const clauses = INJURY_CLAUSES.filter(
    (clause) => clause.category === category,
  );

  const rows = GRADE_ORDER.flatMap((grade) =>
    clauses
      .filter((clause) => clause.grade === grade)
      .map((clause) => ({
        key: clause.id,
        grade: clause.grade,
        code: clause.code,
        summary: clause.summary,
        clause,
      })),
  );

  return (
    <section className="asset-card">
      <Typography.Title level={5} className="asset-card__title">
        表 {tableId}（本门类正文条款索引）
      </Typography.Title>
      <Typography.Paragraph type="secondary" className="asset-card__note">
        对应附录 C 分级表。点击行可选入鉴定结果；最终依据仍是正文条款。
      </Typography.Paragraph>
      <Table
        size="small"
        pagination={{ pageSize: 20, showSizeChanger: false }}
        rowKey="key"
        bordered
        onRow={(record) => ({
          onClick: () => onSelectClause?.(record.clause),
          style: { cursor: "pointer" },
        })}
        columns={[
          { title: "等级", dataIndex: "grade", width: 72 },
          { title: "编号", dataIndex: "code", width: 80 },
          {
            title: "条款内容",
            dataIndex: "summary",
            render: (_value, record) => formatClause(record.clause),
          },
        ]}
        dataSource={rows}
      />
    </section>
  );
}
