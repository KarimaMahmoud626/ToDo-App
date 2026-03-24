import axiosClient from "./axiosClient";

export const getListTasks = (taskListId) =>
  axiosClient.get(`/tasks/list-tasks?task_list_id=${taskListId}`);

export const addTask = (data) => axiosClient.post("/tasks/create-task", data);

export const editTask = (id, data) =>
  axiosClient.put(`/tasks/update-task?task_id=${id}`, data);

export const deleteTask = (id) =>
  axiosClient.delete(`/tasks/delete-task?task_id=${id}`);
