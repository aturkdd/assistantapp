'use client'
import React, { useState } from "react";
import UsersForm from "../UsersForm/UserForms.js";
import AddArticle from "../AddArticle/AddArticle.js";
import CategoryForm from "../CategoryForm/CategoryForm.js";
import Statistic from "../Statistics/Statistics.js";
import { useTranslation } from 'react-i18next';
import ArticlesForm from "../ArticlesForm/ArticlesForm.js";
import "./index.css";
const ControlPanel = ({user}) => {
  const { t} = useTranslation();

  const [showStaticForm, setShowStaticForm] = useState(true);
  const [showUsersForm, setShowUsersForm] = useState(false);
  const [showAddArticleForm, setShowAddArticleForm] = useState(false);
  const [showArticlesForm, setShowArticlesForm] = useState(false);
  const [showMangeCategoriesForm, setShowMangeCategoriesForm] = useState(false);
 
  const reset = () => {
    setShowAddArticleForm(false);
    setShowUsersForm(false);
    setShowMangeCategoriesForm(false);
    setShowStaticForm(false);
    setShowArticlesForm(false);
    
  };



  return (
    <div className="account-container">
      <div className="headerTitle">
        <h2>{t('controlPanel')}</h2>
      </div>
      <div className="sidebar">
        <button
          style={{
            backgroundColor: showStaticForm ? "rgb(218 203 220 / 24%)" : "unset",
          }}
          onClick={() => {
            reset();
            setShowStaticForm(true);
          }}
        >
          {t('statistics')} 
        </button>
        <button
          style={{
            backgroundColor: showUsersForm ? "rgb(218 203 220 / 24%)" : "unset",
          }}
          onClick={() => {
            reset();
            setShowUsersForm(true);
          }}
        >
        {t('users')}
        </button>
        <button
          style={{
            backgroundColor: showMangeCategoriesForm ? "rgb(218 203 220 / 24%)" : "unset",
          }}
          onClick={() => {
            reset();
            setShowMangeCategoriesForm(true);
          }}
        >
         {t('categories')}
        </button>
          <button
          style={{
            backgroundColor: showMangeCategoriesForm ? "rgb(218 203 220 / 24%)" : "unset",
          }}
          onClick={() => {
            reset();
            setShowArticlesForm(true);
          }}
        >
         {t('articles')}
        </button>
        <button
          style={{
            backgroundColor: showAddArticleForm ? "rgb(218 203 220 / 24%)" : "unset",
          }}
          onClick={() => {
            reset();
            setShowAddArticleForm(true);
          }}
        >
         {('addArticle')}
        </button>
      </div>
      <div className="main-content">
        {showStaticForm && <Statistic  user={user} />}
        {showUsersForm && (
          <UsersForm  />
        )}
        {showMangeCategoriesForm && (
          <CategoryForm  />
        )}
        {showArticlesForm && (
          <ArticlesForm  />
        )}
        {showAddArticleForm && (
          <AddArticle
            
          user = {user}
          />
        )}
      </div>
    </div>
  );
};

export default ControlPanel;
