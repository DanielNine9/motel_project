import { createSlice } from "@reduxjs/toolkit";
const authSlice = createSlice({
  name: "auth",
  initialState: {
    userInfo: null,
  },
  reducers: {
    loginSuccess(state, action) {
      state.userInfo = action.payload;
    },
  },
});

export const { loginSuccess } = authSlice.actions;
export default authSlice.reducer;
