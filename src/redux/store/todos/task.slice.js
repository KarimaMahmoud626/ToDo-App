import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getListTasks, addTask, editTask, deleteTask } from "../../api/taskApi";
import { extractApiError } from "../../../utils/apiError";

export const getTasks = createAsyncThunk(
  "tasks/getListTasks",
  async (taskListId, { rejectWithValue }) => {
    try {
      const response = await getListTasks(taskListId);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(extractApiError(error));
    }
  },
);

export const addNewTask = createAsyncThunk(
  "tasks/addTask",
  async (
    { taskListId, title, description, priority, dueDate, status },
    { rejectWithValue },
  ) => {
    try {
      const response = await addTask({
        taskListId,
        title,
        description,
        priority,
        dueDate,
        status,
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(extractApiError(error));
    }
  },
);

export const editATask = createAsyncThunk(
  "tasks/editTask",
  async (
    { id, taskListId, title, description, priority, dueDate, status },
    { rejectWithValue },
  ) => {
    try {
      const response = await editTask(id, {
        taskListId,
        title,
        description,
        priority,
        dueDate,
        status,
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(extractApiError(error));
    }
  },
);

export const deleteATask = createAsyncThunk(
  "tasks/deleteTask",
  async (id, { rejectWithValue }) => {
    try {
      const response = await deleteTask(id);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(extractApiError(error));
    }
  },
);

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearTasks: (state) => {
      state.tasks = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // getTasks
      .addCase(getTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(getTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // addTask
      .addCase(addNewTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addNewTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks.push(action.payload);
      })
      .addCase(addNewTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // editTask
      .addCase(editATask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editATask.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.tasks.findIndex(
          (task) => task.id === action.payload.id,
        );
        if (index !== -1) state.tasks[index] = action.payload;
      })
      .addCase(editATask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // deleteTask
      .addCase(deleteATask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteATask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      })
      .addCase(deleteATask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const { clearTasks } = taskSlice.actions;
export default taskSlice.reducer;
