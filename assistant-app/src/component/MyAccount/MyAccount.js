'use client'
import React, { useState } from "react";
import UserInfo from "../UserInfo/userInfo";
import UpdateUserForm from "../updateUserInfo/updateUserInfo";
import ChangePasswordForm from "../changrPassword/ChangePassword";
import Favorite from "../Favorite/Favorite";
import UserServices from "@/utilis/UserServices";
import {resetUser, setUser} from '../../lib/slices.js'
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from "next/navigation";
import userHelper from "@/utilis/userHelper";
import Notification from "@/component/notification/notification";

import "./index.css";
import { resetMessage, setmessage } from "@/lib/messageSlice";
const MyAccount = ({user}) => {

  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [showFavoritesForm, setShowFavoritesForm] = useState(false);
  const [showInfoForm, setShowInfoForm] = useState(true);
  const dispatch= useDispatch()
  const route = useRouter()
  const reset = () => {
    setShowInfoForm(false);
    setShowFavoritesForm(false);
    setShowPasswordForm(false);
    setShowUpdateForm(false);
  };
  const handleUpdateUser = async(updatedUser) => {
  
    try {
    console.log("update");

    const changedFields = {};

  for (const key in updatedUser) {
    if (updatedUser.hasOwnProperty(key) && updatedUser[key] !== user[key]) {
      changedFields[key] = updatedUser[key];
    }
  }

  
    const res = await UserServices.updateOneUser(user.id,changedFields)
     if (res)
       {
       
        dispatch(setUser(res))
       
   
   
    dispatch(setmessage({success: true,failure : false ,message: 'user information updated'}))
    setTimeout(() => {
      dispatch(resetMessage())
    }, 10000);
       }
  }catch (e){
    console.log(e.response.data.message)
    dispatch(setmessage({success: false,failure : true ,message:  e.response?.data?.message? e.response.data.message : "something goes wrong try again"}))
    setTimeout(() => {
      dispatch(resetMessage())
    }, 10000);
  }
  };

  const handleChangePassword = async  (newPassword,oldPassword) => {
    try{
    console.log("_________________:", newPassword,oldPassword);
    
     await UserServices.updatePassword(user.id, {oldPassword:oldPassword,newPassword:newPassword})
    userHelper.removeToken()
    dispatch(resetUser())
    dispatch(setmessage({success: true,failure : false ,message: 'passWord  changed successfuly'}))
    setTimeout(() => {
      dispatch(resetMessage())
    }, 10000);
     route.push('/login')
  }catch(e){
    console.log(e)

    dispatch(setmessage({success: false,failure : true ,message: 'passWord  wrong try again '}))
    setTimeout(() => {
      dispatch(resetMessage())
    }, 10000);

  }

  };



  return (
    <div className="account-container">
      
      <div className="headerTitle">
        <h2>My Account</h2>
        
      </div>
      <div className="sidebar">
        <button
          style={{
            backgroundColor: showInfoForm ? "rgb(218 203 220 / 24%)" : "unset",
          }}
          onClick={() => {
            reset();
            setShowInfoForm(true);
          }}
        >
          user Information
        </button>
        <button
          style={{
            backgroundColor: showUpdateForm ? "rgb(218 203 220 / 24%)" : "unset",
          }}
          onClick={() => {
            reset();
            setShowUpdateForm(true);
          }}
        >
          Update Information
        </button>
        <button
          style={{
            backgroundColor: showPasswordForm ? "rgb(218 203 220 / 24%)" : "unset",
          }}
          onClick={() => {
            reset();
            setShowPasswordForm(true);
          }}
        >
          Change Password
        </button>
        <button
          style={{
            backgroundColor: showFavoritesForm ? "rgb(218 203 220 / 24%)" : "unset",
          }}
          onClick={() => {
            reset();
            setShowFavoritesForm(true);
          }}
        >
          Manage Favorites
        </button>
      </div>
      <div className="main-content">
        {showInfoForm && <UserInfo user={user} />}
        {showUpdateForm && (
          <UpdateUserForm user={user} onUpdateUser={handleUpdateUser} />
        )}
        {showPasswordForm && (
          <ChangePasswordForm onChangePassword={handleChangePassword} />
        )}
        {showFavoritesForm && (
          <Favorite
            
          user = {user}
          />
        )}
      </div>
    </div>
  );
};

export default MyAccount;
