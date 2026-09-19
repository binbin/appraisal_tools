import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ClauseAssistDrawer } from "./ClauseAssistDrawer";

describe("ClauseAssistDrawer", () => {
  it("lists category tabs and selects a clause", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(
      <ClauseAssistDrawer
        open
        onClose={vi.fn()}
        selectedIds={[]}
        activeCategory="ortho_plastic"
        onCategoryChange={vi.fn()}
        onSelect={onSelect}
      />,
    );

    expect(
      screen.getByText("骨科、整形外科、烧伤科门"),
    ).toBeInTheDocument();
    expect(screen.getByText("5.3.2_1 三级")).toBeInTheDocument();

    await user.click(screen.getByText("5.3.2_1 三级"));
    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onSelect.mock.calls[0][0].id).toBe("5.3.2_1");
  });

  it("filters by keyword within category", async () => {
    const user = userEvent.setup();
    render(
      <ClauseAssistDrawer
        open
        onClose={vi.fn()}
        selectedIds={[]}
        activeCategory="ortho_plastic"
        onCategoryChange={vi.fn()}
        onSelect={vi.fn()}
      />,
    );

    await user.type(
      screen.getByPlaceholderText("搜索条款编号、等级或摘要"),
      "截瘫",
    );
    expect(screen.getByText("5.3.2_1 三级")).toBeInTheDocument();
    expect(screen.queryByText("5.1.2_1 一级")).not.toBeInTheDocument();
  });

  it("marks selected clauses with highlight class", () => {
    render(
      <ClauseAssistDrawer
        open
        onClose={vi.fn()}
        selectedIds={["5.3.2_1"]}
        activeCategory="ortho_plastic"
        onCategoryChange={vi.fn()}
        onSelect={vi.fn()}
      />,
    );
    expect(document.querySelector(".clause-item--selected")).toBeTruthy();
  });
});
