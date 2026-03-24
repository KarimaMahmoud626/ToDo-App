import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: {},
  isLoggedIn: false,
  isLoading: false,
  failed: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isLoading = true;
    },
    loginSuccess: (state, action) => {
      state.isLoading = false;
      state.currentUser = action.payload;
      state.isLoggedIn = true;
    },
    loginFailure: (state, action) => {
      state.isLoading = false;
      state.failed = action.payload;  
      state.currentUser = null;        
      state.isLoggedIn = false;
    },
    logout: (state) => {
      state.currentUser = null;
      state.isLoggedIn = false;
    },
  },
});

export const { loginSuccess, loginStart, loginFailure, logout } =
  userSlice.actions;
export default userSlice.reducer;
