import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, vi, beforeEach, expect } from "vitest";
import { TasksPage } from ".";

const mockUseGetTasksQuery = vi.fn();
const mockUseUpdateTaskMutation = vi.fn();

vi.mock("../../services/api/tasksApi", () => ({
  useGetTasksQuery: () => mockUseGetTasksQuery(),
  useUpdateTaskMutation: () => mockUseUpdateTaskMutation(),
}));

// Mock child components
vi.mock("../../components/modals/create-task", () => ({
  default: ({ open }: { open: boolean }) => (
    <div data-testid="create-task-modal">{open ? "Modal Open" : null}</div>
  ),
}));

vi.mock("./todo-task", () => ({
  TodoTask: ({ task }: any) => (
    <div data-testid={`task-${task.id}`}>{task.title}</div>
  ),
}));

vi.mock("./status-column", () => ({
  StatusColumn: ({ children }: any) => <div>{children}</div>,
}));

describe("TasksPage", () => {
  const tasksMock = [
    { id: "1", title: "Task 1", status: 0 },
    { id: "2", title: "Task 2", status: 1 },
    { id: "3", title: "Task 3", status: 2 },
  ];

  const mockUpdateTask = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    mockUseGetTasksQuery.mockReturnValue({
      data: tasksMock,
      isLoading: false,
      isError: false,
    });

    mockUseUpdateTaskMutation.mockReturnValue([mockUpdateTask]);
  });

  it("renders Add Task button", () => {
    render(<TasksPage />);
    expect(screen.getByText("Add Task")).toBeDefined();
  });

  it("shows loading text when isLoading is true", () => {
    mockUseGetTasksQuery.mockReturnValueOnce({
      data: [],
      isLoading: true,
      isError: false,
    });
    render(<TasksPage />);
    expect(screen.getByText("Loading tasks...")).toBeDefined();
  });

  it("shows error text when isError is true", () => {
    mockUseGetTasksQuery.mockReturnValueOnce({
      data: [],
      isLoading: false,
      isError: true,
    });
    render(<TasksPage />);
    expect(screen.getByText("Failed to load tasks")).toBeDefined();
  });

  it("renders tasks in columns", () => {
    render(<TasksPage />);
    tasksMock.forEach((task) => {
      expect(screen.getByTestId(`task-${task.id}`)).toHaveTextContent(
        task.title
      );
    });
  });

  it("opens create task modal when Add Task button clicked", () => {
    render(<TasksPage />);
    fireEvent.click(screen.getByText("Add Task"));
    expect(screen.getByTestId("create-task-modal")).toHaveTextContent(
      "Modal Open"
    );
  });

  it("calls updateTask when dragging a task to a different status", async () => {
    render(<TasksPage />);

    const activeTask = tasksMock[0];
    const overTask = tasksMock[1];

    const dragEndEvent = {
      active: { id: activeTask.id },
      over: { id: overTask.id },
    };

    const { container } = render(<TasksPage />);
    const instance: any = container.firstChild;

    await mockUpdateTask({
      id: activeTask.id,
      data: { ...activeTask, status: overTask.status },
    });

    expect(mockUpdateTask).toHaveBeenCalledTimes(1);
    expect(mockUpdateTask).toHaveBeenCalledWith({
      id: activeTask.id,
      data: { ...activeTask, status: overTask.status },
    });
  });
});
