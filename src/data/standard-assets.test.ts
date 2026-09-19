import { describe, expect, it } from "vitest";
import {
  STANDARD_ASSETS,
  getAssetsForCategory,
  listAllAssetIds,
} from "./standard-assets";

describe("STANDARD_ASSETS", () => {
  it("includes all catalogued A/B tables and figures", () => {
    const ids = listAllAssetIds();
    expect(ids).toEqual(
      expect.arrayContaining([
        "A.1",
        "A.2",
        "A.3",
        "A.4",
        "A.5",
        "A.6",
        "A.7",
        "A.8",
        "B.1",
        "B.2",
        "fig-B.1",
        "fig-B.2",
      ]),
    );
    expect(STANDARD_ASSETS).toHaveLength(12);
  });

  it("keeps table rows non-empty", () => {
    for (const asset of STANDARD_ASSETS) {
      if (asset.kind === "table") {
        expect(asset.rows.length).toBeGreaterThan(0);
        expect(asset.columns.length).toBeGreaterThan(0);
      } else {
        expect(asset.imageSrc).toMatch(/^\/gbt16180\//);
      }
    }
  });

  it("filters assets by specialty category", () => {
    const eyeAssets = getAssetsForCategory("eye_ent_oral", "A");
    expect(eyeAssets.map((asset) => asset.id)).toEqual(
      expect.arrayContaining(["A.1", "A.2", "A.3", "A.4", "A.5", "A.6"]),
    );
    const orthoAssets = getAssetsForCategory("ortho_plastic", "B");
    expect(orthoAssets.map((asset) => asset.id)).toEqual(
      expect.arrayContaining(["B.1", "B.2", "fig-B.1", "fig-B.2"]),
    );
  });

  it("keeps A.3 compensation matrix cells aligned with GB/T 16180", () => {
    const tableA3 = STANDARD_ASSETS.find((asset) => asset.id === "A.3");
    expect(tableA3?.kind).toBe("table");
    if (!tableA3 || tableA3.kind !== "table") {
      return;
    }
    const byLeft = Object.fromEntries(
      tableA3.rows.map((row) => [row.left, row]),
    );
    expect(byLeft["0.15"].c13).toBe("83");
    expect(byLeft["0.1"].c11).toBe("80");
    expect(byLeft["1/15"].c11).toBe("92");
    expect(byLeft["1~0.9"].c1).toBe("0");
    expect(byLeft["<1/20"].c13).toBe("100");
  });

  it("keeps A.4 grade mapping complete", () => {
    const tableA4 = STANDARD_ASSETS.find((asset) => asset.id === "A.4");
    expect(tableA4?.kind).toBe("table");
    if (!tableA4 || tableA4.kind !== "table") {
      return;
    }
    expect(tableA4.rows).toHaveLength(10);
    expect(tableA4.rows[2]).toMatchObject({ grade: "三级", rate: "100" });
    expect(tableA4.rows[9]).toMatchObject({ grade: "十级", rate: "0～7" });
  });
});
