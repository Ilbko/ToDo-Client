import BaseModal from "..";
import { useUpdateTaskMutation } from "../../../services/api/tasksApi";
import type { TaskItem, UpdateTaskDto } from "../../../types/task";
import TaskForm from "../../forms/task";

interface EditTaskModalProps {
  open: boolean;
  onClose: () => void;
  task: TaskItem;
}

export default function EditTaskModal({
  open,
  onClose,
  task,
}: EditTaskModalProps) {
  const [updateTask, { isLoading }] = useUpdateTaskMutation();

  const handleSubmit = async (values: UpdateTaskDto) => {
    await updateTask({ id: task.id, data: values }).unwrap();
    onClose();
  };

  return (
    <BaseModal
      open={open}
      title="Edit Task"
      onClose={onClose}
      onSubmit={() =>
        document
          .querySelector<HTMLButtonElement>("form button[type=submit]")
          ?.click()
      }
      submitLabel={isLoading ? "Saving..." : "Save"}
    >
      <TaskForm
        initialValues={{
          title: task.title,
          description: task.description,
          deadline: task.deadline,
        }}
        onSubmit={handleSubmit}
        submitLabel="Save"
        isLoading={isLoading}
      />
    </BaseModal>
  );
}
