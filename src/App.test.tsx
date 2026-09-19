import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "./App";

describe("App", () => {
  it("renders page title", () => {
    render(<App />);
    expect(screen.getByText("工伤级别选择工具")).toBeInTheDocument();
  });
});
