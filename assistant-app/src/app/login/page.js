"use client";
import React, { useState } from "react";
import Image from "next/image";
import logo from "@/assets/logoIcon.png";
import UserServices from "../../utilis/UserServices.js";
import { resetMessage, setmessage } from "@/lib/messageSlice";
import { useTranslation } from "react-i18next";
import Link from "next/link.js";
import "./index.css";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../lib/slices.js";
import { useRouter } from "next/navigation.js";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [incorrectPassword, setIncorrectPassword] = useState("");
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const route = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "password") setPassword(value);
    else setUsername(value);
  };

  const handleSubmit = async (e) => {
    setIncorrectPassword("");
    e.preventDefault();

    if (username === "" || password === "") {
      setIncorrectPassword(t("usernameAndPasswordAreRequrired"));
    } else {
      try {
        const res = await UserServices.handleLogin(username, password);
        dispatch(setUser(res));
        dispatch(setmessage({
          success: true,
          failure: false,
          message: t("youSuccessfullyLoggedIn")
        }));
        setTimeout(() => {
          dispatch(resetMessage());
        }, 10000);
        route.push("/home");
      } catch (e) {
        let errorMessage;
        if (e?.response?.request?.status === 401) {
          errorMessage = "passwordOrUsernameisWrong";
        } else {
          errorMessage = "somethingGoesWrongTryAgain";
        }
        dispatch(setmessage({
          success: false,
          failure: true,
          message: ` ${t(errorMessage)}`,
        }));
        setTimeout(() => {
          dispatch(resetMessage());
        }, 10000);
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="logoDiv">
            <Image alt="logo" src={logo} />
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
          </div>
          <p className="error-message">{incorrectPassword}</p>
          <button type="submit" className="standard-button signin-button">
            {t("login")}
          </button>
          <div className="signup-link-container">
            <small className="not-member">
              {t("notAMember")}?{" "}
              <Link href="/register" className="signup-link">
                {t("signup")}
              </Link>
            </small>
          </div>
        </form>
      </div>
    </div>
  );
}
