import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { message } from "antd";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { InjuryGradeField } from "./InjuryGradeField";

const SELECTED_LABEL = "1_3 重度非肢体瘫运动障碍";

describe("InjuryGradeField", () => {
  beforeEach(() => {
    vi.spyOn(message, "info").mockImplementation(
      () => ({ then: () => undefined }) as never,
    );
  });

  it("appends clause text, dedupes, and supports delete", async () => {
    const user = userEvent.setup();
    render(<InjuryGradeField />);

    expect(screen.getByText("尚未选择条款")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "辅助工具" }));
    const clauseMeta = await screen.findByText("1_3 一级");
    await user.click(clauseMeta);

    await waitFor(() => {
      expect(
        document.querySelector(".selected-clause-text")?.textContent,
      ).toBe(SELECTED_LABEL);
    });
    expect(screen.queryByText("尚未选择条款")).not.toBeInTheDocument();

    expect(
      screen.getByText("工伤伤残等级条款（GB/T 16180—2014）"),
    ).toBeInTheDocument();

    await user.click(clauseMeta);
    expect(message.info).toHaveBeenCalledWith("已添加");
    expect(document.querySelectorAll(".selected-clause-text")).toHaveLength(1);

    await user.click(screen.getByRole("button", { name: "删除条款" }));
    expect(screen.getByText("尚未选择条款")).toBeInTheDocument();
  });
});
