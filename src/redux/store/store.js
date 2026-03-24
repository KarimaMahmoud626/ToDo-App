import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./auth/auth.slice";
import taskReducer from "./todos/task.slice";
import taskListReducer from "./todos/taskList.slice";

export const store = configureStore({
  reducer: { user: userReducer, task: taskReducer, taskList: taskListReducer },
});
