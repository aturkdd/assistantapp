'use client'

import React from 'react';
import './index.css'
const UserInfo = ({ user }) => {

  return (
    <div>
      <h3 className='subAddress'> User Information</h3>
      <p  className='pInfo'>Username: <i className='i_UserInfo'>{user?.username}</i></p>
      <p className='pInfo'>Email: <i className='i_UserInfo'>{user?.email}</i></p>
      <p className='pInfo'>First Name:<i className='i_UserInfo'> {user?.firstName}</i></p>
      <p className='pInfo'>Last Name: <i className='i_UserInfo'>{user?.lastName}</i></p>
      <p className='pInfo'>Phone Number: <i className='i_UserInfo'>{user?.phoneNumber}</i></p>
    </div>
  );
};

export default UserInfo;
