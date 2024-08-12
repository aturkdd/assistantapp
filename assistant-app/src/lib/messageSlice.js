'use client'
import { createSlice } from '@reduxjs/toolkit';
import UserHelper from '../utilis/userHelper.js'

const initialState = {
    success : false,
   failure: false,
  message: ''
 
 
};

export const message = createSlice({
  name: 'message',
  initialState,
  reducers: {
    setmessage: (state, action) => {
      console.log('3',action.payload)
      state.success = action.payload?.success? action.payload.success:false ;
      state.failure = action.payload?.failure? action.payload.failure:false ;
      state.message = action.payload?.message;
      console.log(state,'oooo')
    },

    resetMessage: (state) => {
       console.log('del')
            state.success = false ;
            state.failure = false;
            state.message = '';
          
       
    },
  },
});

export const { setmessage, resetMessage } = message.actions;

export default message.reducer;
