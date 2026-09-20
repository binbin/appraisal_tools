import { render, screen } from "@testing-library/react";
import { beforeAll, describe, expect, it, vi } from "vitest";
import { AppendixReferencePanel } from "./AppendixReferencePanel";

beforeAll(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
});

describe("AppendixReferencePanel", () => {
  it("hides structured tables tab when category has no assets", () => {
    render(
      <AppendixReferencePanel kind="A" category="neuro_psych" />,
    );

    expect(
      screen.queryByRole("tab", { name: "表 / 图（结构化）" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("tab", { name: "附录正文" }),
    ).not.toBeInTheDocument();
    expect(
      screen.getByText("附录A · 神经内科、神经外科、精神科门"),
    ).toBeInTheDocument();
  });

  it("shows structured tables tab when category has assets", () => {
    render(
      <AppendixReferencePanel kind="A" category="eye_ent_oral" />,
    );

    expect(
      screen.getByRole("tab", { name: "表 / 图（结构化）" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("tab", { name: "附录正文" }),
    ).toBeInTheDocument();
  });
});
