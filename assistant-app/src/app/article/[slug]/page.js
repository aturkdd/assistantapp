"use client";

import Article from "@/component/Article/article";
import "./index.css";
import { MdFavorite } from "react-icons/md";
import { AiFillPrinter } from "react-icons/ai";
import { useState, useEffect } from "react";
import UserServices from "@/utilis/UserServices";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import LoadingSpinner from "@/component/Loading/LoadingSpinner";
import { resetMessage, setmessage } from "@/lib/messageSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation.js";
import { resetUser } from "@/lib/slices";
import { useTranslation } from "react-i18next";
import langUtils from "@/utilis/langUtils";
import userHelper from "@/utilis/userHelper";
export default function ArticleItem() {
  const { t } = useTranslation();
  const route = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [data, setData] = useState({});
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const lang = langUtils.currentLanguage()
  const fetchArticle = async () => {
    try {
      await UserServices.getOneArticle(setData, params.slug);

      setLoading(false);
    } catch (e) {
      let errorMessage;

      if (e?.response?.request?.status == 401) {
        errorMessage = "logInAgainAndTryAgain";
        userHelper.removeToken();
        dispatch(resetUser());
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

    fetchArticle();
  }, []);

  useEffect(() => {
    const checkFavorite = async () => {
      try {
        await UserServices.isfavorite(user.id, params.slug, setIsFavorite);
      } catch (e) {
        let errorMessage;

        if (e?.response?.request?.status == 401) {
          errorMessage = "logInAgainAndTryAgain";
          userHelper.removeToken();
          dispatch(resetUser());
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

    checkFavorite();
  }, []);

  const handlePrint = () => {
    window.print();
  };
  const handleAdd = async () => {
    const action = isFavorite ? "remove" : "add";
    try {
      const res = await UserServices.addRemoveVaforite(
        action,
        params.slug,
        user.id
      );
       let message  = (action ==="remove")? "removedSuccessfully":"addedSuccessfuly"
      setIsFavorite(!isFavorite);
      dispatch(
        setmessage({
          success: true,
          failure: false,
          message: ` ${t(message)}`,
        })
      );
      setTimeout(() => {
        dispatch(resetMessage());
      }, 10000);
    } catch (e) {
      let errorMessage;

      if (e?.response?.request?.status == 401) {
        errorMessage = "logInAgainAndTryAgain";
        userHelper.removeToken();
        dispatch(resetUser());
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
    <div className="content-View">
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="contentBar">
            
            <div className="buttonDiv">
              <button className="greenButton" onClick={handleAdd}>
                {" "}
                {isFavorite ? (
                  <p> {t("removeFromFavotite")}</p>
                ) : (
                  <p>{t("addToFavorite")}</p>
                )}
                <MdFavorite color={isFavorite ? "yellow" : null} />{" "}
              </button>
              <button className="greenButton" onClick={handlePrint}>
                {" "}
                <p>{t("print")}</p> <AiFillPrinter />{" "}
              </button>
            </div>
          </div>
          <div className="contentBar2">
            <h5 className="subjectTitle">
              {data?.category ?  (lang==='en') ? data.category[0].nameEnglish :data.category[0].nameSwedish:""}
            </h5>
            <h5 className="subjectTitle">
            {t('numberOfViews')}: {data?.numberofViews}
            </h5>
          </div>
          <div className="title">
            <h1> {data?.title} </h1>
          </div>
          <Article data={data.content} />
        </>
      )}
    </div>
  );
}
