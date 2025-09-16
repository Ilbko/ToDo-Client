import { TextField, Stack } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import type { CreateTaskDto, UpdateTaskDto } from "../../../types/task";

const validationSchema = Yup.object({
  title: Yup.string()
    .required("Title is required")
    .max(50, "Title must be at most 50 characters"),
  description: Yup.string().max(
    250,
    "Description must be at most 250 characters"
  ),
  deadline: Yup.string().required("Deadline is required"),
});

interface TaskFormProps {
  initialValues: CreateTaskDto | UpdateTaskDto;
  onSubmit: (values: CreateTaskDto | UpdateTaskDto) => Promise<void>;
  submitLabel: string;
  isLoading?: boolean;
}

export default function TaskForm({
  initialValues,
  onSubmit,
  submitLabel,
  isLoading,
}: TaskFormProps) {
  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack spacing={2} mt={1}>
        <TextField
          label="Title"
          name="title"
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.title && Boolean(formik.errors.title)}
          helperText={formik.touched.title && formik.errors.title}
          fullWidth
          required
        />
        <TextField
          label="Description"
          name="description"
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.description && Boolean(formik.errors.description)
          }
          helperText={formik.touched.description && formik.errors.description}
          multiline
          rows={3}
          fullWidth
        />
        <TextField
          label="Deadline"
          name="deadline"
          type="datetime-local"
          value={formik.values.deadline}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.deadline && Boolean(formik.errors.deadline)}
          helperText={formik.touched.deadline && formik.errors.deadline}
          slotProps={{ inputLabel: { shrink: true } }}
          fullWidth
          required
        />
      </Stack>
      <button type="submit" hidden disabled={isLoading}>
        {submitLabel}
      </button>
    </form>
  );
}
