import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { InjuryGradeField } from "./InjuryGradeField";

const FIRST_LABEL = "1.3 重度非肢体瘫运动障碍";
const SECOND_LABEL = "1.1 极重度智能损伤";

describe("InjuryGradeField", () => {
  it("writes one clause into Input and replaces on new select", async () => {
    const user = userEvent.setup();
    render(<InjuryGradeField />);

    expect(screen.getByPlaceholderText("尚未选择条款")).toHaveValue("");

    await user.click(screen.getByRole("button", { name: "辅助工具" }));
    await user.click(await screen.findByText("1.3 一级"));

    await waitFor(() => {
      expect(screen.getByPlaceholderText("尚未选择条款")).toHaveValue(
        FIRST_LABEL,
      );
    });

    await user.click(screen.getByText("1.1 一级"));

    await waitFor(() => {
      expect(screen.getByPlaceholderText("尚未选择条款")).toHaveValue(
        SECOND_LABEL,
      );
    });
  });
});
