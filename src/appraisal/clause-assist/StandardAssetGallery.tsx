import { Image, Table, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import {
  getAppendixCMatrix,
  GRADE_COLUMN_KEYS,
  GRADE_COLUMN_LABELS,
  type AppendixCMatrixRow,
} from "../data/appendix-c-tables";
import {
  getAssetsForCategory,
  type StandardAsset,
  type StandardFigureAsset,
  type StandardTableAsset,
} from "../data/standard-assets";
import type { InjuryClause, SpecialtyCategory } from "../types/clause";
import "./StandardAssetGallery.css";

export type StandardAssetGalleryProps = {
  category: SpecialtyCategory;
  appendix: "A" | "B" | "C";
  onSelectClause?: (clause: InjuryClause) => void;
};

export function StandardAssetGallery({
  category,
  appendix,
}: StandardAssetGalleryProps) {
  if (appendix === "C") {
    return <AppendixCAntdTable category={category} />;
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
      scroll={{ x: true, y: 420 }}
      rowKey={(_, index) => `${asset.id}-${index}`}
      columns={asset.columns.map((column) => ({
        title: column.title,
        dataIndex: column.dataIndex,
        width: column.width,
        ellipsis: true,
        fixed: column.dataIndex === asset.columns[0]?.dataIndex ? "left" : undefined,
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

function AppendixCAntdTable({ category }: { category: SpecialtyCategory }) {
  const table = getAppendixCMatrix(category);

  const columns: ColumnsType<AppendixCMatrixRow> = [
    {
      title: "伤残类别",
      dataIndex: "category",
      key: "category",
      width: 140,
      fixed: "left",
      render: (value: string) => (
        <span className="appendix-c-category">{value}</span>
      ),
    },
    {
      title: "分级",
      children: GRADE_COLUMN_KEYS.map((key, index) => ({
        title: GRADE_COLUMN_LABELS[index],
        dataIndex: key,
        key,
        width: 160,
        render: (value: string) => (
          <div className="appendix-c-cell">{value || ""}</div>
        ),
      })),
    },
  ];

  return (
    <section className="asset-card appendix-c-table-card">
      <Typography.Title level={5} className="asset-card__title">
        {table.title}
      </Typography.Title>
      <Typography.Paragraph type="secondary" className="asset-card__note">
        原表结构：伤残类别 × 分级（一～十）。表头与首列已固定，可横向/纵向滚动。
      </Typography.Paragraph>
      <Table<AppendixCMatrixRow>
        size="small"
        bordered
        pagination={false}
        scroll={{ x: 140 + 160 * 10, y: 520 }}
        rowKey={(row) => row.category}
        columns={columns}
        dataSource={table.rows}
      />
    </section>
  );
}
