'use client'
import { createSlice } from '@reduxjs/toolkit';
import UserHelper from '../utilis/userHelper.js'

const initialState = {
  user:  UserHelper.getUser(),
  token: UserHelper.getToken(),
  logged: UserHelper.getToken()
 
 
};

export const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
     
      state.user = action.payload?.user;
      state.token = action.payload?.access_token;
      state.logged= true;
    
      UserHelper.persistUser(action.payload?.user);
      UserHelper.setToken(action.payload?.access_token)
    },

    resetUser: (state) => {
      state.user = UserHelper.getUser();
      state.logged= UserHelper.getToken();
      state.token = UserHelper.getToken();
    },
  },
});

export const { setUser, resetUser } = auth.actions;

export default auth.reducer;
