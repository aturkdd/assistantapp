'use client'
import React from "react";
import './index.css'
import { ArticleItem } from "../ArticleItem/ArticleItem";
export  const  ArticlesList = ({ data }) => {
  
  return (
  <div className="grid-container">
    {data?.map((item,index) => (
      
      
      <ArticleItem data ={item} key={item._id}/>
     
      
    ))}
  </div>);
};
