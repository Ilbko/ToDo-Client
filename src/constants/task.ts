import type { Status } from "../types/task";

export const statusLabels: Record<Status, string> = {
  0: "To Do",
  1: "In Progress",
  2: "Done",
};

export const statusColors: Record<Status, string> = {
  0: "#2196f3",
  1: "#ff9800",
  2: "#4caf50",
};