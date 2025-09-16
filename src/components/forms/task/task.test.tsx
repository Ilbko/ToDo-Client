import { render, screen } from "@testing-library/react";
import { describe, it, vi, expect } from "vitest";
import TaskForm from "./index";
import type { CreateTaskDto } from "../../../types/task";

describe("TaskForm", () => {
  const initialValues: CreateTaskDto = {
    title: "",
    description: "",
    deadline: "",
  };

  const filledValues: CreateTaskDto = {
    title: "Test Task",
    description: "Some description",
    deadline: "2025-09-20T12:00",
  };

  it("renders all fields and submit button", () => {
    render(
      <TaskForm
        initialValues={initialValues}
        onSubmit={vi.fn()}
        submitLabel="Create"
      />
    );

    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/deadline/i)).toBeInTheDocument();
    expect(screen.getByText(/create/i)).toBeInTheDocument();
  });

  it("disables submit button when isLoading is true", () => {
    render(
      <TaskForm
        initialValues={filledValues}
        onSubmit={vi.fn()}
        submitLabel="Save"
        isLoading={true}
      />
    );

    const button = screen.getByText(/save/i).closest("button");
    expect(button).toBeDisabled();
  });
});
