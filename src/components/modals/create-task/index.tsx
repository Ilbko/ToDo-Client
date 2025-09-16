import BaseModal from "..";
import { useCreateTaskMutation } from "../../../services/api/tasksApi";
import type { CreateTaskDto } from "../../../types/task";
import TaskForm from "../../forms/task";

interface CreateTaskModalProps {
  open: boolean;
  onClose: () => void;
}

export default function CreateTaskModal({
  open,
  onClose,
}: CreateTaskModalProps) {
  const [createTask, { isLoading }] = useCreateTaskMutation();

  const handleSubmit = async (values: CreateTaskDto) => {
    await createTask(values).unwrap();
    onClose();
  };

  return (
    <BaseModal
      open={open}
      title="Create Task"
      onClose={onClose}
      onSubmit={() =>
        document
          .querySelector<HTMLButtonElement>("form button[type=submit]")
          ?.click()
      }
      submitLabel={isLoading ? "Creating..." : "Create"}
    >
      <TaskForm
        initialValues={{ title: "", description: "", deadline: "" }}
        onSubmit={handleSubmit}
        submitLabel="Create"
        isLoading={isLoading}
      />
    </BaseModal>
  );
}
