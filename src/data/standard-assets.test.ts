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
});
