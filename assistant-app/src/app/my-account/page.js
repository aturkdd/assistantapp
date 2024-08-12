'use client'

import { useSelector} from 'react-redux';
import { useEffect, useState } from 'react';

import MyAccount from "@/component/MyAccount/MyAccount";

const MyAccountPage = () => {
  const [user,setUser] = useState(null)
    const data  = useSelector((state)=> state.auth.user)

    useEffect(()=>{
      setUser(data)
    },[])

  return (
    <div>
    
      <MyAccount user = {user} />
    
  
    </div>
  );
};

export default MyAccountPage;
