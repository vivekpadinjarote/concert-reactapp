import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null || JSON.parse(window.localStorage.getItem("user")),
  },

  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;

      window.localStorage.setItem("user", JSON.stringify(action.payload));
    },
    removeUser: (state) => {
      state.user = null;
      window.localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("tokenExpiry");
    },
    setUserFromLocalStorage: (state) => {
      var user = window.localStorage.getItem("user");
      var tokenExpiry = localStorage.getItem("tokenExpiry");
      if (user && tokenExpiry && Date.now() < parseInt(tokenExpiry)) {
        user = JSON.parse(user);
        state.user = user;
      } else {
        state.user = null;
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        localStorage.removeItem("tokenExpiry");
      }
    },
  },
});

export const { setUser, removeUser, setUserFromLocalStorage } =
  authSlice.actions;

export default authSlice.reducer;
