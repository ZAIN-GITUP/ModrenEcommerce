// app/lib/feature/slices/userSlice.ts
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  email: null,
  verifycode: null,
  token: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    storeUser: (state, action) => {
      state.user = action.payload;
    },
    storeEmail: (state, action) => {
      state.email = action.payload;
    },
    storeverifycode: (state, action) => {
      state.verifycode = action.payload;
    },
    clearVerifyCode: (state) => {
      state.verifycode = null;
    },
    storeToken: (state, action) => { // Add action to store token
      state.token = action.payload;
  },


}});

export const { storeUser, storeEmail, storeverifycode, clearVerifyCode,storeToken } = userSlice.actions;
export default userSlice.reducer;
