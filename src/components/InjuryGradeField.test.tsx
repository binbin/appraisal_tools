import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { message } from "antd";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { InjuryGradeField } from "./InjuryGradeField";

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
    const clauseMeta = await screen.findByText("3_1 三级");
    await user.click(clauseMeta);

    await waitFor(() => {
      expect(
        document.querySelector(".selected-clause-text")?.textContent,
      ).toBe("3_1 三级");
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
