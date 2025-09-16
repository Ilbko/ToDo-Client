import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Box,
  Button,
  Dialog,
  DialogTitle,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import type { TaskItem } from "../../../types/task";
import { statusColors } from "../../../constants/task";
import EditTaskModal from "../../../components/modals/update-task";
import { useDeleteTaskMutation } from "../../../services/api/tasksApi";

import "./todo-task.scss";

export const TodoTask = ({ task }: { task: TaskItem }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task.id });

  const [openEdit, setOpenEdit] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [deleteTask] = useDeleteTaskMutation();

  const handleOpenEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenEdit(true);
  };

  const handleOpenConfirm = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenConfirm(true);
  };

  const handleDelete = async () => {
    try {
      await deleteTask(task.id).unwrap();
      setOpenConfirm(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Card
        ref={setNodeRef}
        className="todo-task-card"
        style={{
          transform: CSS.Transform.toString(transform),
          transition,
          borderLeft: `6px solid ${statusColors[task.status]}`,
        }}
      >
        <CardContent className="todo-task-card-content">
          <div className="todo-task-details">
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              {task.title}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              className="description"
            >
              {task.description}
            </Typography>
            <Typography
              variant="caption"
              color={isDateOverdue(task.deadline) ? "error" : "text.secondary"}
            >
              Deadline: {getFormattedDate(task.deadline)}
            </Typography>
          </div>
          <Box className="todo-task-actions">
            <div>
              <IconButton size="small" onClick={handleOpenEdit}>
                <EditIcon fontSize="small" />
              </IconButton>
              <IconButton size="small" onClick={handleOpenConfirm}>
                <DeleteIcon fontSize="small" />
              </IconButton>
            </div>
            <Box {...listeners} {...attributes} className="drag-handle">
              <DragIndicatorIcon fontSize="small" />
            </Box>
          </Box>
        </CardContent>
      </Card>
      <EditTaskModal
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        task={task}
      />
      <Dialog open={openConfirm} onClose={() => setOpenConfirm(false)}>
        <DialogTitle>Are you sure you want to delete this task?</DialogTitle>
        <Box className="confirm-dialog-actions">
          <Button onClick={() => setOpenConfirm(false)}>Cancel</Button>
          <Button onClick={handleDelete} color="error">
            Delete
          </Button>
        </Box>
      </Dialog>
    </>
  );
};

const getFormattedDate = (date: string) => {
  return new Date(date).toLocaleString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const isDateOverdue = (date: string) => {
  return new Date(date) < new Date();
};
