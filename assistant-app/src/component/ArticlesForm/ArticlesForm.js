"use client";
import Link from "next/link";
import UserServices from "@/utilis/UserServices";
import React, { useEffect, useState } from "react";
import LoadingSpinner from "../Loading/LoadingSpinner";
import { RiDeleteBinFill } from "react-icons/ri";
import { FaEye } from "react-icons/fa";
import { resetMessage, setmessage } from "@/lib/messageSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation.js";
import { resetUser} from '../../lib/slices.js'
import { useTranslation } from "react-i18next";
import userHelper from "@/utilis/userHelper";
const ArticlesForm = () => {
  const { t } = useTranslation();
  const [articles, setArticles] = useState([]);
  const [Loading, setLoading] = useState(true);
  const route = useRouter();
  const dispatch = useDispatch();

  const style = {
    ul: {
      margin: "1%",
      padding: "1%",
    },
    li: {
      margin: "1%",

      gab: "2%",
      backgroundColor: "#e1ebe5",
      display: "flex",
      justifyContent: "space-around",
    },
    p: {
      margin: "1%",
      color: "green",
    },

    div: {
      margin: "1%",
      display: "grid",
      gridTemplateColumns: "1fr 2fr",
    },
    buttonDiv: {
      paddingLeft: "10%",
      paddingTop: "10%",
    },
    label: {
      padding: "0.5%",
      margin: "1%",
      color: "#5c7564",
      fontWeight: "1000",
      justifyContent: "center",
      fontSize: "1rem",
    },
    input: {
      borderWidth: "0px 0px 2px 0px",
      borderColor: "#5c7564",
      opacity: "70%",
      borderStyle: "dotted",
      paddingLeft: "10%",
      color: "black",
      backgroundColor: "#faf9fa",
    },
  };

  const loadArticles = async () => {
    try {
      const res = await UserServices.getArticles(setArticles, {});
       setLoading(false);
    } catch (e) {
      let errorMessage;
     
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
  useEffect(() => {
    loadArticles();
  }, []);

  const handleRemove = async (Id) => {
    console.log(Id);
    try {
      const res = await UserServices.deleteArticle(Id);
      if (res) {
        loadArticles();
        dispatch(
          setmessage({
            success: true,
            failure: false,
            message: ` ${t("deletedSuccessfully")}`,
          })
        );
        setTimeout(() => {
          dispatch(resetMessage());
        }, 10000);
      }
    } catch (e) {
        let errorMessage;
        console.log(e.response.request.status);
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

  return (
    <div>
      <h3 className="subAddress"> {t("articles")} </h3>
      {Loading ? (
        <LoadingSpinner></LoadingSpinner>
      ) : (
        <div>
          <ul style={style.ul}>
            {articles?.map((item, index) => (
              <li key={index} style={style.li}>
                <div>
                  <FaEye title="number of views" color=" #760C7A" />
                  <p>{item.numberofViews}</p>
                </div>
                <Link style={style.link} href={`/article/${item._id}`}>
                  {item.title}
                </Link>

                <button
                  className="deleteButton"
                  onClick={() => handleRemove(item._id)}
                >
                  <RiDeleteBinFill useTranslation> </RiDeleteBinFill>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ArticlesForm;
