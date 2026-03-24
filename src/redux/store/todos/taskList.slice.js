import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllLists,
  getOneList,
  addTaskList,
  editTaskList,
  deleteTaskList,
} from "../../api/taskListApi";
import { extractApiError } from "../../../utils/apiError";

export const getLists = createAsyncThunk(
  "taskLists/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllLists();
      return response.data.data;
    } catch (error) {
      return rejectWithValue(extractApiError(error));
    }
  },
);

export const getList = createAsyncThunk(
  "taskLists/getList",
  async (id, { rejectWithValue }) => {
    try {
      const response = await getOneList(id);
      console.log("getOneList response:", response.data);
      return response.data.data;
    } catch (error) {
      console.log("getOneList error:", error);
      return rejectWithValue(extractApiError(error));
    }
  },
);

export const addList = createAsyncThunk(
  "taskLists/addList",
  async ({ title, description }, { rejectWithValue }) => {
    try {
      const response = await addTaskList({ title, description });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(extractApiError(error));
    }
  },
);

export const editList = createAsyncThunk(
  "taskLists/editList",
  async ({ id, title, description }, { rejectWithValue }) => {
    try {
      const response = await editTaskList(id, { title, description });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(extractApiError(error));
    }
  },
);

export const deleteList = createAsyncThunk(
  "taskLists/deleteList",
  async (id, { rejectWithValue }) => {
    try {
      const response = await deleteTaskList(id);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(extractApiError(error));
    }
  },
);

const taskListSlice = createSlice({
  name: "taskLists",
  initialState: {
    lists: [],
    selectedList: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearSelectedList: (state) => {
      state.selectedList = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // getLists
      .addCase(getLists.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getLists.fulfilled, (state, action) => {
        state.loading = false;
        state.lists = action.payload;
      })
      .addCase(getLists.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // getOneList
      .addCase(getList.fulfilled, (state, action) => {
        state.selectedList = action.payload;
      })

      // addList
      .addCase(addList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addList.fulfilled, (state, action) => {
        state.loading = false;
        state.lists.push(action.payload);
      })
      .addCase(addList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // editList
      .addCase(editList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editList.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.lists.findIndex(
          (list) => list.id === action.payload.id,
        );
        if (index !== -1) state.lists[index] = action.payload;
      })
      .addCase(editList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // deleteList
      .addCase(deleteList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteList.fulfilled, (state, action) => {
        state.loading = false;
        state.lists = state.lists.filter((list) => list.id !== action.payload);
        if (state.selectedList?.id === action.payload) {
          state.selectedList = null;
        }
      })
      .addCase(deleteList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSelectedList } = taskListSlice.actions;
export default taskListSlice.reducer;
