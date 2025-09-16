export type Status = 0 | 1 | 2;

export interface TaskItem {
  id: string;
  title: string;
  description: string;
  deadline: string;
  status: Status;
}

export interface CreateTaskDto {
  title: string;
  description: string;
  deadline: string;
}

export interface UpdateTaskDto extends CreateTaskDto {
  status?: Status;
}