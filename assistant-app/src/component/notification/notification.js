'use client'
import React, { useEffect, useState } from 'react';
import './index.css'; 
import { useSelector } from "react-redux";
import Modal from 'react-modal';
import FadeIn from 'react-fade-in/lib/FadeIn';
const Notification = () => {
  const [isOpen,setIsOpen ] = useState(false)
  const message = useSelector((state) => state.message);
  console.log(message,'ÅÅÅÅÅÅÅÅÅÅ')
  useEffect (()=>{
    if ((message.success)||(message.failure)) 
      setIsOpen(true)
    else setIsOpen(false)
  },[message])

 console.log('pass')
  return (
   <div className={isOpen? 'move': 'hidden'}>
    <FadeIn  visible={isOpen} transitionDuration='1000'
    className={  message.success? " notification success":"notification failure"}>
      <span>{message.message}</span>
     
    </FadeIn>
    </div>
  );
};

export default Notification;
