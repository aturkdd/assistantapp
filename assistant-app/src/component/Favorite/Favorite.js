"use client"

import UserServices from '@/utilis/UserServices';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import LoadingSpinner from '../Loading/LoadingSpinner';
import { RiDeleteBinFill } from "react-icons/ri";

const FavoritesManagement = ({ user }) => {
  const [favorites, setFavorite] = useState([]);
  const [Loading,setLoading] = useState(true)
  const style = {
    ul:{
      margin : "1%",
      padding: "1%"
    },
    li :{
      margin: "1%",
      
      gab: "1%",
      backgroundColor: "#e1ebe5",
      display: "flex",
      "justifyContent": "center"
    
    },
    link:{
      margin : "1%",
      color:"green",
    }
    }
useEffect(()=> {
const loadFavorities = async()=> {
  const res = await UserServices.getFavorites(user?.id)
  
  setFavorite(res)
  setLoading(false)
}
loadFavorities()
},[])

  const handleRemove = async ( articleId) => {
 console.log(articleId)
try {
    const res = await UserServices.addRemoveVaforite("remove",articleId, user.id)
     if (res)
       {
 
        setFavorite(res)

       }
  }catch (e){
    console.log(e)
  }
  };



  return (
 <div>
  <h3 className='subAddress'> Favorites</h3>
     { Loading ? (<LoadingSpinner></LoadingSpinner>): (  
      <ul style={style.ul}>
        {favorites?.map((fav, index) => (
          <li key={index} style={style.li}>
           <Link style={style.link} href={`/article/${fav._id}`}>{fav.title}</Link> 
            <button className = "deleteButton" onClick={() => handleRemove(fav._id)}> <RiDeleteBinFill  > </RiDeleteBinFill></button>
          </li>
        ))}
      </ul>
     )}
    </div>
  );
};

export default FavoritesManagement;
