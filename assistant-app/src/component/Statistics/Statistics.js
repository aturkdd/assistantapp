"use client";
import React, { useEffect, useState } from "react";
import LoadingSpinner from "../Loading/LoadingSpinner";
import { resetMessage, setmessage } from "@/lib/messageSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation.js";
import { resetUser} from '../../lib/slices.js'
import { useTranslation } from "react-i18next";
import userHelper from "@/utilis/userHelper";
import { FaEye } from "react-icons/fa";
import ChartComp from "../CharComp/Charcomp";
import UserServices from "@/utilis/UserServices";
import Link from "next/link";
const Statistic = ({ user }) => {
  const { t } = useTranslation();
  const dispatch= useDispatch()
  const [summary, setSummary] = useState({
    totalUser: 0,
    subscribers: 0,
    topTenArticles: [],
    totalvisit: 0,
    viewTable: [],
  });
  const [Loading, setLoading] = useState(true);
  const loadSummary = async () => {
    try {
      const res = await UserServices.getSummary(setSummary);
       setLoading(false);
    } catch (e) {
      let errorMessage;
      console.log(e,'ttttttttttt')
      if (e?.response?.request?.status == 401) {
        errorMessage = "logInAgainAndTryAgain";
        userHelper.removeToken();
        dispatch(resetUser())
        route.push("/login");
      } else errorMessage = "somethingGoesWrongTryAgain";
      dispatch(
        setmessage({
          success: false,
          failure: true,
          message: ` ${t(errorMessage)}`,
        })
      );
      setTimeout(() => {
        dispatch(resetMessage());
      }, 10000);
    }
  };
 useEffect (()=>{
  loadSummary()

 },[])


  return (
    <div>
      {Loading ? (
        <LoadingSpinner />
      ) : (
        <div>
          <div className="section">
            <span> {t("totalUser")}</span>
            <p> {summary.totalUser}</p>
          </div>
          <div className="section">
            <span> {t("subscribers")}</span>
            <p> {summary.subscribers}</p>
          </div>
          <div className="section">
            <span> {t("totalvisit")}</span>
            <p> {summary.totalvisit}</p>
          </div>
          <div className="section">
            <p> {t("topTenArticles")}</p>
            {summary.topTenArticles.map(( item,index) => (
              <div  key ={index}>
                {" "}
                <Link   href={`/article/${item.id}`}>  {item.title} :   </Link> <p> <FaEye/> {item.numberofViews} </p>
              </div>
            ))}
          </div>
          <div className="section">
           <ChartComp viewTable={summary.viewTable} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Statistic;
