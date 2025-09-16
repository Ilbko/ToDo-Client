import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, beforeEach, expect, vi } from "vitest";
import BaseModal from ".";
import "@testing-library/jest-dom";

describe("BaseModal", () => {
  const mockOnClose = vi.fn();
  const mockOnSubmit = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("does not render when open is false", () => {
    render(
      <BaseModal open={false} title="My Modal" onClose={mockOnClose}>
        <div>Content</div>
      </BaseModal>
    );

    expect(screen.queryByText("My Modal")).not.toBeInTheDocument();
    expect(screen.queryByText("Content")).not.toBeInTheDocument();
  });

  it("renders title and children when open is true", () => {
    render(
      <BaseModal open={true} title="My Modal" onClose={mockOnClose}>
        <div>Modal content</div>
      </BaseModal>
    );

    expect(screen.getByText("My Modal")).toBeInTheDocument();
    expect(screen.getByText("Modal content")).toBeInTheDocument();
  });

  it("calls onClose when Cancel button is clicked", () => {
    render(
      <BaseModal open={true} title="My Modal" onClose={mockOnClose}>
        <div>Modal content</div>
      </BaseModal>
    );

    const cancelBtn = screen.getByText("Cancel");
    fireEvent.click(cancelBtn);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("renders submit button when onSubmit is provided", () => {
    render(
      <BaseModal
        open={true}
        title="My Modal"
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
        submitLabel="Save Task"
      >
        <div>Modal content</div>
      </BaseModal>
    );

    const submitBtn = screen.getByText("Save Task");
    expect(submitBtn).toBeInTheDocument();

    fireEvent.click(submitBtn);
    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
  });

  it("does not render submit button if onSubmit is not provided", () => {
    render(
      <BaseModal open={true} title="My Modal" onClose={mockOnClose}>
        <div>Modal content</div>
      </BaseModal>
    );

    expect(screen.queryByText("Save")).not.toBeInTheDocument();
  });

  it("uses default submit label 'Save' when none is passed", () => {
    render(
      <BaseModal
        open={true}
        title="My Modal"
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
      >
        <div>Modal content</div>
      </BaseModal>
    );

    expect(screen.getByText("Save")).toBeInTheDocument();
  });
});
