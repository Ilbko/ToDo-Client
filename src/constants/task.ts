import type { Status } from "../types/task";

export const statusLabels: Record<Status, string> = {
  0: "To Do",
  1: "In Progress",
  2: "Done",
};

// Map status IDs to colors
export const statusColors: Record<Status, string> = {
  0: "#2196f3",   // Todo
  1: "#ff9800",   // In Progress
  2: "#4caf50",   // Done
};