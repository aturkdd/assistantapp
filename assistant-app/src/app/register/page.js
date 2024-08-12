"use client";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { BiSolidErrorAlt } from "react-icons/bi";
import UserServices from "../../utilis/UserServices.js";
import { useTranslation } from "react-i18next";
import { resetMessage, setmessage } from "@/lib/messageSlice";
import { useRouter } from "next/navigation.js";
import "./index.css";

export default function Register() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const route = useRouter();
  const [data, setData] = useState({});
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: name === "messageSubscribed" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !data ||
      !data.firstName ||
      !data.lastName ||
      !data.email ||
      !data.username ||
      !data.phoneNumber ||
      !data.password
    ) {
      setError(true);
    } else if (data.password.length < 5) {
      setError(true);
    } else {
      setError(false);

      try {
        await UserServices.handlesignup(data);
        dispatch(
          setmessage({
            success: true,
            failure: false,
            message: t("youSuccessfullyRegistered"),
          })
        );
        setTimeout(() => {
          dispatch(resetMessage());
        }, 10000);
        route.push("./login");
      } catch (e) {
        dispatch(
          setmessage({
            success: false,
            failure: true,
            message: e.response?.data?.message
              ? e.response.data.message
              : t("somethingGoesWrongTryAgain"),
          })
        );
        setTimeout(() => {
          dispatch(resetMessage());
        }, 10000);
      }
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="header-title">
          <h1>{t("signup")}</h1>
        </div>
        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <div className="input-div">
              <label className="input-label">{t("firstName")}</label>
              <input
                name="firstName"
                type="text"
                className="input-field"
                onChange={handleChange}
                placeholder={t("enterYourFirstName")}
              />
              {error && !data?.firstName && <BiSolidErrorAlt className="error-icon" />}
            </div>
            <div className="input-div">
              <label className="input-label">{t("lastName")}</label>
              <input
                name="lastName"
                type="text"
                className="input-field"
                onChange={handleChange}
                placeholder={t("enterYourLastName")}
              />
              {error && !data?.lastName && <BiSolidErrorAlt className="error-icon" />}
            </div>
            <div className="input-div">
              <label className="input-label">{t("username")}</label>
              <input
                name="username"
                type="text"
                className="input-field"
                onChange={handleChange}
                placeholder={t("enterUserName")}
              />
              {error && !data?.username && <BiSolidErrorAlt className="error-icon" />}
            </div>
            <div className="input-div">
              <label className="input-label">{t("email")}</label>
              <input
                name="email"
                type="email"
                className="input-field"
                onChange={handleChange}
                placeholder={t("enterYourEmail")}
              />
              {error && !data?.email && <BiSolidErrorAlt className="error-icon" />}
            </div>
            <div className="input-div">
              <label className="input-label">{t("phoneNumber")}</label>
              <input
                name="phoneNumber"
                type="tel"
                className="input-field"
                onChange={handleChange}
                placeholder={t("enterYourPhoneNumber")}
              />
              {error && !data?.phoneNumber && <BiSolidErrorAlt className="error-icon" />}
            </div>
            <div className="input-div">
              <label className="input-label">{t("password")}</label>
              <input
                type="password"
                name="password"
                className="input-field"
                onChange={handleChange}
                placeholder={t("enterYourPassword")}
              />
              {error && !data?.password && <BiSolidErrorAlt className="error-icon" />}
            </div>
            {error && data?.password.length < 5 && (
              <small className="error-message">{t("passwordShouldBeAtLeast6Char")}</small>
            )}
            <div className="checkbox-div">
              <label className="checkbox-label">
                {t("messageSubscribed")}
                <input
                  name="messageSubscribed"
                  type="checkbox"
                  onChange={handleChange}
                />
              </label>
            </div>
          </div>
          <button type="submit" className="standard-button">
            {t("signup")}
          </button>
        </form>
      </div>
    </div>
  );
}
