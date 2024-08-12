'use client'
import React from "react";
import './index.css'
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
export   const ArticleItem = ({ data }) => {
  const  {t} = useTranslation()
    const route = useRouter()

  
  return (
    <div  className="container">
    <h2 className="subject"><b className="b-color">{data.subject? data.category[0]?.nameEnglish: ""}</b> </h2>
    <br></br>
    <div className="item">
      <h3 className="sub-title">{data.title}</h3>
      <p>{data?.quote.substring(0, 100) + "........."}</p>
      <button  className="readMore-button"  onClick={()=> route.push(`/article/${data._id}`)}>
      {t('readMer')}
      </button>
      </div>
    </div>);
};
