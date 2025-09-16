import { useState } from "react";
import { Typography, Grid, Paper, Box, Button } from "@mui/material";
import {
  DndContext,
  closestCenter,
  type DragEndEvent,
  DragOverlay,
  type DragStartEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { StatusColumn } from "./status-column";
import { TodoTask } from "./todo-task";
import { statusColors, statusLabels } from "../../constants/task";
import CreateTaskModal from "../../components/modals/create-task";
import {
  useGetTasksQuery,
  useUpdateTaskMutation,
} from "../../services/api/tasksApi";
import type { TaskItem, Status } from "../../types/task";

import "./tasks-page.scss";

export const TasksPage = () => {
  const { data: tasks = [], isLoading, isError } = useGetTasksQuery();

  const [updateTask] = useUpdateTaskMutation();

  const [activeTask, setActiveTask] = useState<TaskItem | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleDragStart = (event: DragStartEvent) => {
    const task = tasks.find((t) => t.id === event.active.id);
    if (task) setActiveTask(task);
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveTask(null);
    if (!over) return;

    const activeTaskItem = tasks.find((t) => t.id === active.id);
    if (!activeTaskItem) return;

    const overId = over.id.toString();
    const overTask = tasks.find((t) => t.id === overId);

    if (overTask) {
      if (activeTaskItem.status !== overTask.status) {
        await updateTask({
          id: activeTaskItem.id,
          data: { ...activeTaskItem, status: overTask.status },
        });
      } else {
        const columnTasks = tasks.filter(
          (t) => t.status === activeTaskItem.status
        );
        const oldIndex = columnTasks.findIndex(
          (t) => t.id === activeTaskItem.id
        );
        const newIndex = columnTasks.findIndex((t) => t.id === overTask.id);
        if (oldIndex !== newIndex) {
        }
      }
      return;
    }

    const overStatus = Number(overId) as Status;

    if ([0, 1, 2].includes(overStatus)) {
      await updateTask({
        id: activeTaskItem.id,
        data: { ...activeTaskItem, status: overStatus },
      });
    }
  };

  return (
    <>
      <Box className="add-task-box">
        <Button variant="contained" onClick={() => setIsCreateModalOpen(true)}>
          Add Task
        </Button>
      </Box>
      {isLoading && <Typography>Loading tasks...</Typography>}
      {isError && <Typography color="error">Failed to load tasks</Typography>}
      <DndContext
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <Grid container spacing={2}>
          {(Object.keys(statusLabels) as unknown as Status[]).map((key) => {
            const status = Number(key) as Status;
            return (
              <Grid size={{ xs: 12, md: 4 }} key={status}>
                <Paper elevation={3} className="task-column-paper">
                  <Typography
                    variant="h6"
                    align="center"
                    className="task-column-title"
                    style={{ color: statusColors[status] }}
                  >
                    {statusLabels[status]}
                  </Typography>
                  <SortableContext
                    items={tasks
                      .filter((t) => t.status === status)
                      .map((t) => t.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    <StatusColumn status={status}>
                      {tasks
                        .filter((t) => t.status === status)
                        .map((task) =>
                          task.id === activeTask?.id ? (
                            <Box key={task.id} className="task-placeholder" />
                          ) : (
                            <TodoTask key={task.id} task={task} />
                          )
                        )}
                    </StatusColumn>
                  </SortableContext>
                </Paper>
              </Grid>
            );
          })}
        </Grid>

        <DragOverlay>
          {activeTask ? <TodoTask task={activeTask} /> : null}
        </DragOverlay>
      </DndContext>

      <CreateTaskModal
        open={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </>
  );
};
