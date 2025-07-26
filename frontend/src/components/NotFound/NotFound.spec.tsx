import { render, screen } from "@testing-library/react";
import { NotFound } from "./NotFound";
import { expect, test } from "vitest";

test("loads and displays greeting", async () => {
  render(<NotFound />);
  expect(screen.getByText("404")).toBeDefined();
});
