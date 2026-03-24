import axiosClient from "./axiosClient";

export const getAllLists = () => axiosClient.get("/task-lists");

export const getOneList = (id) =>
  axiosClient.get(`/task-lists/get-one-task-list?task_list_id=${id}`);

export const addTaskList = (data) =>
  axiosClient.post("/task-lists/create-task-list", data);

export const editTaskList = (id, data) =>
  axiosClient.put(`/task-lists/update-task-list?task_list_id=${id}`, data);

export const deleteTaskList = (id) =>
  axiosClient.delete(`/task-lists/delete-task-list?task_list_id=${id}`);
