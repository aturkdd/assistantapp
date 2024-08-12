"use client";
import { useState, useEffect } from "react";
import { AiOutlineFileSearch } from "react-icons/ai";
import UserServices from "@/utilis/UserServices";
import { resetMessage, setmessage } from "@/lib/messageSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation.js";
import { resetUser } from "../../lib/slices.js";
import { useTranslation } from "react-i18next";
import userHelper from "@/utilis/userHelper";
import langUtils from "@/utilis/langUtils";

import "./index.css";
const SearchBar = ({ setQuery, subject }) => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [categories, setCategories] = useState([]);
  const route = useRouter();
  const dispatch = useDispatch();
  const lang =langUtils.currentLanguage();

  const loadCategories = async () => {
    try {
      const res = await UserServices.getCategories();

      setCategories(res);
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
    loadCategories();
  }, []);

  return (
    <div className="search-component">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder={t("search")}
      />
      {!subject && <p style={{ color: "green" }}> {t("chooseSubject")}</p>}
      {!subject && (
        <select
          name="subject"
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
        >
          <option key="selection" value={""}></option>
          {categories?.map((subject) => (
            <option key={subject.id} value={subject.id}>
              {lang === "en" ? subject.nameEnglish : subject.nameSwedish}
            </option>
          ))}
        </select>
      )}
      <button
        onClick={() =>
          setQuery({
            search: searchTerm,
            subject: subject ? subject : selectedSubject,
          })
        }
      >
        <p> {t("search")}</p>
        <AiOutlineFileSearch />
      </button>
    </div>
  );
};

export default SearchBar;
