"use client";
import Image from "next/image";
import userHelper from "@/utilis/userHelper";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import heroImage from "@/assets/th-3.jpg";
import { resetMessage, setmessage } from "@/lib/messageSlice";
import { ArticlesList } from "@/component/ArticlesList/ArticlesList";
import SearchBar from "@/component/SearchBar/SearchBar";
import "./index.css";
import { useRouter } from "next/navigation.js";
import UserServices from "@/utilis/UserServices";
import { useEffect, useState } from "react";
import LoadingSpinner from "@/component/Loading/LoadingSpinner";
import { resetUser } from "../../lib/slices.js";
export default function Articles() {
  const [articlesArray, setArticlesArray] = useState([]);
  const [query, setQuery] = useState({});
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const route = useRouter();
  const { t } = useTranslation();
  const loadArticles = async () => {
    try {
      const res = await UserServices.getArticles(setArticlesArray, query);
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
    loadArticles();
  }, [query]);

  return (
    <div className="content-container">
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="Image-div">
            <Image  alt = 'Articles page image' src={heroImage} />
          </div>

          <SearchBar setQuery={setQuery}></SearchBar>
          <ArticlesList data={articlesArray} />
        </>
      )}
    </div>
  );
}
