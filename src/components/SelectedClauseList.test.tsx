import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import type { InjuryClause } from "../types/clause";
import { SelectedClauseList } from "./SelectedClauseList";

const CLAUSE: InjuryClause = {
  id: "1_3",
  code: "1_3",
  grade: "一级",
  summary: "重度非肢体瘫运动障碍",
  category: "neuro_psych",
};

describe("SelectedClauseList", () => {
  it("shows placeholder when empty", () => {
    render(<SelectedClauseList clauses={[]} onRemove={vi.fn()} />);
    expect(screen.getByText("尚未选择条款")).toBeInTheDocument();
  });

  it("renders code with summary and removes on click", async () => {
    const user = userEvent.setup();
    const onRemove = vi.fn();
    render(
      <SelectedClauseList clauses={[CLAUSE]} onRemove={onRemove} />,
    );
    expect(
      screen.getByText("1_3 重度非肢体瘫运动障碍"),
    ).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "删除条款" }));
    expect(onRemove).toHaveBeenCalledWith("1_3");
  });
});
