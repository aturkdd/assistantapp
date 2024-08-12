'use client'
import React, { useEffect, useState } from "react";
import "./Header.css";
import Image from "next/image";
import logo from "@/assets/logoIcon.png";
import { useRouter } from "next/navigation";
import Link from "next/link";
import userHelper from "@/utilis/userHelper";
import langUtils from "@/utilis/langUtils";

import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { resetUser } from '../../lib/slices.js';
import { Login as LoginIcon } from '@mui/icons-material';

const Header = () => {
  const route = useRouter();
  const dispatch = useDispatch();
  const userinfo = useSelector((state) => state.auth.user);
  const loggedinfo = useSelector((state) => state.auth.logged);
  const [logged, setLogged] = useState(false);
  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { t } = useTranslation();
  const lang = langUtils.currentLanguage();

  useEffect(() => {
    setLogged(loggedinfo);
    setUser(userinfo);
  }, [loggedinfo, userinfo]);

  useEffect(() => {
    if (lang === 'en') {
      langUtils.switchLanguage(lang);
    } else {
      langUtils.switchLanguage('sv');
    }
  }, [lang]);

  const changeLanguage = () => {
    if (lang === 'en') {
      langUtils.switchLanguage('sv');
    } else {
      langUtils.switchLanguage('en');
    }
  };

  const logout = () => {
    setLogged(false);
    route.push("/home");
    userHelper.removeToken();
    dispatch(resetUser());
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <header className="headerContainer">
      <div className="logo">
        <Image alt="logo" src={logo} />
      </div>
      <nav className={`nav ${sidebarOpen ? 'open' : ''}`}>
        <ul>
          <li>
            <button onClick={changeLanguage} className={`${lang ? lang : ''} icon`}></button>
          </li>
          <li>
            <Link href="/">{t('home')}</Link>
          </li>
          {!logged && (
            <li>
              <Link href="/register">{t('signup')}</Link>
            </li>
          )}
          {logged && (
            <>
              <li>
                <Link href="/my-account">{t('myAccount')}</Link>
              </li>
              <li>
                <Link href="/article">{t('articles')}</Link>
              </li>
              {userinfo?.role === "admin" && (
                <li>
                  <Link href="/controlPanel">{t('controlPanel')}</Link>
                </li>
              )}
            </>
          )}
          <li className="sidebarButton">
            {!logged ? (
              <Link href="/login">
                <LoginIcon />
              </Link>
            ) : (
              <button onClick={logout}>Logout</button>
            )}
          </li>
        </ul>
        <button className="closeSidebar" onClick={toggleSidebar}>✕</button>
      </nav>
      <div className="headerButtons">
        {!logged ? (
          <Link className="standardButton hideOnMobile" href="/login">
            <LoginIcon />
          </Link>
        ) : (
          <button className="standardButton hideOnMobile" onClick={logout}>
            Logout
          </button>
        )}
        <button className="hamburger" onClick={toggleSidebar}>☰</button>
      </div>
    </header>
  );
};

export default Header;
