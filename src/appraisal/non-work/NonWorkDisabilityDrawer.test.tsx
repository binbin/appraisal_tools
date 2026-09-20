import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { NonWorkDisabilityDrawer } from "./NonWorkDisabilityDrawer";

const baseProps = {
  open: true as const,
  onClose: vi.fn(),
  selectedIds: [] as string[],
  activeDegree: "complete" as const,
  onDegreeChange: vi.fn(),
  onSelect: vi.fn(),
  onNotApplicable: vi.fn(),
};

describe("NonWorkDisabilityDrawer", () => {
  it("lists degree tabs and selects a labor-2002 clause", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(<NonWorkDisabilityDrawer {...baseProps} onSelect={onSelect} />);

    expect(screen.getByText("依据劳社部发〔2002〕8号")).toBeInTheDocument();
    expect(screen.getByText("GB/T 16180—2014")).toBeInTheDocument();
    expect(screen.getByText("完全丧失劳动能力")).toBeInTheDocument();
    expect(screen.getByText("大部分丧失劳动能力")).toBeInTheDocument();
    expect(screen.getByText("4.1.2")).toBeInTheDocument();

    await user.click(screen.getByText("4.1.2"));
    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onSelect.mock.calls[0][0].id).toBe("4.1.2");
  });

  it("filters labor-2002 clauses by keyword within degree", async () => {
    const user = userEvent.setup();
    render(<NonWorkDisabilityDrawer {...baseProps} />);

    await user.type(
      screen.getByPlaceholderText("搜索条款编号、程度或摘要"),
      "呼吸困难",
    );
    expect(screen.getByText("4.1.2")).toBeInTheDocument();
    expect(screen.queryByText("4.1.3")).not.toBeInTheDocument();
  });

  it("switches to GB/T clauses grades 1-6 without degree tabs", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(<NonWorkDisabilityDrawer {...baseProps} onSelect={onSelect} />);

    await user.click(screen.getByText("GB/T 16180—2014"));
    expect(
      screen.getByText("神经内科、神经外科、精神科门"),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("tab", { name: "完全丧失劳动能力" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("tab", { name: "大部分丧失劳动能力" }),
    ).not.toBeInTheDocument();
    expect(screen.getByText(/5\.1\.2\(3\) 1级/)).toBeInTheDocument();
    expect(screen.getByText(/5\.5\.2\(6\) 5级/)).toBeInTheDocument();
    expect(screen.queryByText(/5\.7\.2\(6\) 7级/)).not.toBeInTheDocument();

    await user.click(screen.getByText(/5\.1\.2\(3\) 1级/));
    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onSelect.mock.calls[0][0].id).toBe("5.1.2(3)");
  });

  it("shows judgment principles and criteria under labor-2002", async () => {
    const user = userEvent.setup();
    render(<NonWorkDisabilityDrawer {...baseProps} />);

    expect(screen.getByText("判定条件")).toBeInTheDocument();
    expect(screen.getByText("判定原则")).toBeInTheDocument();
    expect(screen.getByText("判定基准")).toBeInTheDocument();

    await user.click(screen.getByText("判定原则"));
    expect(screen.getByText("3 判定原则")).toBeInTheDocument();
    expect(screen.getByText(/3\.1/)).toBeInTheDocument();

    await user.click(screen.getByText("判定基准"));
    expect(screen.getByText("5 判定基准")).toBeInTheDocument();
    expect(screen.getByText(/表1 呼吸困难分级/)).toBeInTheDocument();
  });

  it("invokes onNotApplicable from 不适用 button", async () => {
    const user = userEvent.setup();
    const onNotApplicable = vi.fn();
    render(
      <NonWorkDisabilityDrawer
        {...baseProps}
        onNotApplicable={onNotApplicable}
      />,
    );

    await user.click(screen.getByRole("button", { name: "不适用" }));
    expect(onNotApplicable).toHaveBeenCalledTimes(1);
  });
});
