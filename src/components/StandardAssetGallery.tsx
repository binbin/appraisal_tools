import { Image, Table, Typography } from "antd";
import { getAppendixCTable } from "../data/appendix-c-tables";
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
    return <AppendixCOriginalTables category={category} />;
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

function AppendixCOriginalTables({
  category,
}: {
  category: SpecialtyCategory;
}) {
  const table = getAppendixCTable(category);

  return (
    <section className="asset-card">
      <Typography.Title level={5} className="asset-card__title">
        {table.title}
      </Typography.Title>
      <Typography.Paragraph type="secondary" className="asset-card__note">
        原表结构：伤残类别 × 分级（一～十）。可点击放大查看；选条款请切回「正文条款」。
      </Typography.Paragraph>
      <Image.PreviewGroup>
        <div className="appendix-c-pages">
          {table.pages.map((src, index) => (
            <Image
              key={src}
              src={src}
              alt={`${table.title} 第 ${index + 1} 页`}
              className="appendix-c-page"
            />
          ))}
        </div>
      </Image.PreviewGroup>
    </section>
  );
}
