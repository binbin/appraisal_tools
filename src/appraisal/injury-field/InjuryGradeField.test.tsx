import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { INJURY_CITATION_PREFIX, INJURY_NOT_APPLICABLE_TEXT } from "../utils/formatClause";
import {
  GB_COMPLETE_CITATION_PREFIX,
  LABOR_2002_CITATION_PREFIX,
  NON_WORK_NOT_APPLICABLE_TEXT,
} from "../utils/formatNonWorkClause";
import { InjuryGradeField } from "./InjuryGradeField";

const FIRST_LABEL = `${INJURY_CITATION_PREFIX}1.3 重度非肢体瘫运动障碍`;
const SECOND_LABEL = `${INJURY_CITATION_PREFIX}1.1 极重度智能损伤`;
const NON_WORK_LABEL = `${LABOR_2002_CITATION_PREFIX}4.1.2 长期重度呼吸困难`;
const NON_WORK_GB_LABEL = `${GB_COMPLETE_CITATION_PREFIX}1.3 重度非肢体瘫运动障碍`;

describe("InjuryGradeField", () => {
  it("locks injury grade buttons after clause select but keeps assist openable", async () => {
    const user = userEvent.setup();
    render(<InjuryGradeField />);

    const injuryInput = screen.getByPlaceholderText("尚未选择工伤条款");
    expect(injuryInput).toHaveValue("");
    expect(injuryInput).not.toHaveAttribute("readonly");

    await user.click(
      screen.getByRole("button", { name: "工伤判定辅助工具" }),
    );
    await user.click(await screen.findByText("1.3 一级"));

    await waitFor(() => {
      expect(
        screen.getByPlaceholderText("尚未选择工伤条款"),
      ).toHaveValue(FIRST_LABEL);
    });

    expect(screen.getByRole("button", { name: "一级" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(screen.getByRole("button", { name: "一级" })).toBeDisabled();
    expect(screen.getByPlaceholderText("尚未选择工伤条款")).toHaveAttribute(
      "readonly",
    );
    expect(
      screen.getByPlaceholderText("尚未选择工伤条款"),
    ).toHaveClass("appraisal-input--readonly");
    expect(
      screen.getByRole("button", { name: "工伤判定辅助工具" }),
    ).toBeEnabled();
  });

  it("allows changing injury clause via assist tool after lock", async () => {
    const user = userEvent.setup();
    render(<InjuryGradeField />);

    await user.click(
      screen.getByRole("button", { name: "工伤判定辅助工具" }),
    );
    await user.click(await screen.findByText("1.3 一级"));

    await waitFor(() => {
      expect(
        screen.getByPlaceholderText("尚未选择工伤条款"),
      ).toHaveValue(FIRST_LABEL);
    });

    await user.click(
      screen.getByRole("button", { name: "工伤判定辅助工具" }),
    );
    await user.click(await screen.findByText("1.1 一级"));

    await waitFor(() => {
      expect(
        screen.getByPlaceholderText("尚未选择工伤条款"),
      ).toHaveValue(SECOND_LABEL);
    });
    expect(screen.getByRole("button", { name: "一级" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });

  it("locks injury block when choosing 无级别", async () => {
    const user = userEvent.setup();
    render(<InjuryGradeField />);

    await user.click(screen.getByRole("button", { name: "无级别" }));

    expect(screen.getByPlaceholderText("尚未选择工伤条款")).toHaveValue(
      "无级别",
    );
    expect(screen.getByPlaceholderText("尚未选择工伤条款")).toHaveAttribute(
      "readonly",
    );
    expect(screen.getByRole("button", { name: "无级别" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });

  it("locks non-work block after clause select", async () => {
    const user = userEvent.setup();
    render(<InjuryGradeField />);

    await user.click(
      screen.getByRole("button", {
        name: "非因工伤残或因病丧失判定辅助工具",
      }),
    );
    await user.click(await screen.findByText("4.1.2"));

    await waitFor(() => {
      expect(
        screen.getByPlaceholderText("尚未选择非因工条款"),
      ).toHaveValue(NON_WORK_LABEL);
    });

    expect(
      screen.getByRole("button", { name: "完全丧失劳动能力" }),
    ).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByPlaceholderText("尚未选择非因工条款")).toHaveAttribute(
      "readonly",
    );
  });

  it("locks non-work block after GB/T clause select", async () => {
    const user = userEvent.setup();
    render(<InjuryGradeField />);

    await user.click(
      screen.getByRole("button", {
        name: "非因工伤残或因病丧失判定辅助工具",
      }),
    );
    await user.click(screen.getByText("GB/T 16180—2014"));
    await user.click(await screen.findByText("1.3 一级"));

    await waitFor(() => {
      expect(
        screen.getByPlaceholderText("尚未选择非因工条款"),
      ).toHaveValue(NON_WORK_GB_LABEL);
    });

    expect(
      screen.getByRole("button", { name: "完全丧失劳动能力" }),
    ).toHaveAttribute("aria-pressed", "true");
  });

  it("locks non-work block when choosing 不符合结论", async () => {
    const user = userEvent.setup();
    render(<InjuryGradeField />);

    await user.click(
      screen.getByRole("button", {
        name: "不符合完全或大部分丧失劳动能力",
      }),
    );

    expect(screen.getByPlaceholderText("尚未选择非因工条款")).toHaveValue(
      "不符合完全或大部分丧失劳动能力",
    );
    expect(screen.getByPlaceholderText("尚未选择非因工条款")).toHaveAttribute(
      "readonly",
    );
  });

  it("sets 无级别 via injury assist 不适用", async () => {
    const user = userEvent.setup();
    render(<InjuryGradeField />);

    await user.click(
      screen.getByRole("button", { name: "工伤判定辅助工具" }),
    );
    await user.click(screen.getByRole("button", { name: "不适用" }));

    await waitFor(() => {
      expect(
        screen.getByPlaceholderText("尚未选择工伤条款"),
      ).toHaveValue(INJURY_NOT_APPLICABLE_TEXT);
    });
    expect(screen.getByRole("button", { name: "无级别" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });

  it("sets 不符合结论 via non-work assist 不适用", async () => {
    const user = userEvent.setup();
    render(<InjuryGradeField />);

    await user.click(
      screen.getByRole("button", {
        name: "非因工伤残或因病丧失判定辅助工具",
      }),
    );
    await user.click(screen.getByRole("button", { name: "不适用" }));

    await waitFor(() => {
      expect(
        screen.getByPlaceholderText("尚未选择非因工条款"),
      ).toHaveValue(NON_WORK_NOT_APPLICABLE_TEXT);
    });
    expect(
      screen.getByRole("button", {
        name: "不符合完全或大部分丧失劳动能力",
      }),
    ).toHaveAttribute("aria-pressed", "true");
  });
});
