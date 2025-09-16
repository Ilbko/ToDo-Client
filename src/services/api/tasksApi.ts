import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { TaskItem, CreateTaskDto, UpdateTaskDto } from "../../types/task";
import { toDoTasksApiRoute } from "../../constants/routes";

const baseUrl = import.meta.env.VITE_API_BASE_URL; 

export const tasksApi = createApi({
  reducerPath: "tasksApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ["Tasks"],

  endpoints: (builder) => ({
    getTasks: builder.query<TaskItem[], void>({
      query: () => ({url: toDoTasksApiRoute}),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Tasks" as const, id })),
              { type: "Tasks", id: "LIST" },
            ]
          : [{ type: "Tasks", id: "LIST" }],
    }),

    createTask: builder.mutation<TaskItem, CreateTaskDto>({
      query: (task) => ({
        url: toDoTasksApiRoute,
        method: "POST",
        body: task,
      }),
      invalidatesTags: [{ type: "Tasks", id: "LIST" }],
    }),

    updateTask: builder.mutation<TaskItem, { id: string; data: UpdateTaskDto }>({
      query: ({ id, data }) => ({
        url: `${toDoTasksApiRoute}/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: "Tasks", id }],
    }),

    deleteTask: builder.mutation<void, string>({
      query: (id) => ({
        url: `${toDoTasksApiRoute}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: "Tasks", id },
        { type: "Tasks", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetTasksQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = tasksApi;
