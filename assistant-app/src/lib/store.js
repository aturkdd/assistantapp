'use client'
import { configureStore } from '@reduxjs/toolkit';

import auth from './slices.js';
import  message  from './messageSlice.js';

export const  store = () =>{
  const cs = configureStore({
    reducer:{
      auth,
      message,
    }
  })
  return cs 
}

