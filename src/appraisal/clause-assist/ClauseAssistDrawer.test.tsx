import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ClauseAssistDrawer } from "./ClauseAssistDrawer";

const baseProps = {
  open: true as const,
  onClose: vi.fn(),
  selectedIds: [] as string[],
  activeCategory: "neuro_psych" as const,
  onCategoryChange: vi.fn(),
  onSelect: vi.fn(),
  onNotApplicable: vi.fn(),
};

describe("ClauseAssistDrawer", () => {
  it("lists category tabs and selects a clause", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(<ClauseAssistDrawer {...baseProps} onSelect={onSelect} />);

    expect(
      screen.getByText("神经内科、神经外科、精神科门"),
    ).toBeInTheDocument();
    expect(screen.getByText(/5\.3\.2\(1\) 3级/)).toBeInTheDocument();

    await user.click(screen.getByText(/5\.3\.2\(1\) 3级/));
    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onSelect.mock.calls[0][0].id).toBe("5.3.2(1)");
  });

  it("filters by keyword within category", async () => {
    const user = userEvent.setup();
    render(<ClauseAssistDrawer {...baseProps} />);

    await user.type(
      screen.getByPlaceholderText("搜索编号、等级、摘要、同义词"),
      "精神病性症状",
    );
    expect(screen.getByText(/5\.3\.2\(1\) 3级/)).toBeInTheDocument();
    expect(screen.queryByText(/5\.1\.2\(1\) 1级/)).not.toBeInTheDocument();
  });

  it("marks selected clauses with highlight class", () => {
    render(<ClauseAssistDrawer {...baseProps} selectedIds={["5.3.2(1)"]} />);
    expect(document.querySelector(".clause-item--selected")).toBeTruthy();
  });

  it("invokes onNotApplicable from 不适用 button", async () => {
    const user = userEvent.setup();
    const onNotApplicable = vi.fn();
    render(
      <ClauseAssistDrawer {...baseProps} onNotApplicable={onNotApplicable} />,
    );

    await user.click(screen.getByRole("button", { name: "不适用" }));
    expect(onNotApplicable).toHaveBeenCalledTimes(1);
  });
});
