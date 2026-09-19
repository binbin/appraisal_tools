import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import type { InjuryClause } from "../types/clause";
import { SelectedClauseList } from "./SelectedClauseList";

const CLAUSE: InjuryClause = {
  id: "5.3.2_1",
  code: "5.3.2_1",
  grade: "三级",
  summary: "截瘫肌力≤4级",
  category: "ortho_plastic",
};

describe("SelectedClauseList", () => {
  it("shows placeholder when empty", () => {
    render(<SelectedClauseList clauses={[]} onRemove={vi.fn()} />);
    expect(screen.getByText("尚未选择条款")).toBeInTheDocument();
  });

  it("renders formatted clause and removes on click", async () => {
    const user = userEvent.setup();
    const onRemove = vi.fn();
    render(
      <SelectedClauseList clauses={[CLAUSE]} onRemove={onRemove} />,
    );
    expect(screen.getByText("5.3.2_1 三级")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "删除条款" }));
    expect(onRemove).toHaveBeenCalledWith("5.3.2_1");
  });
});
