'use client'

import UserServices from "@/utilis/UserServices";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import LoadingSpinner from "../Loading/LoadingSpinner";
import { RiDeleteBinFill } from "react-icons/ri";

const CategoryForm = () => {
  const [categories, setCategories] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [showAddCategoryForm, setShowAddCategoryForm] = useState(false);
  const [englishName, setEnglishName] = useState("");
  const [swedishName, setSwedishName] = useState("");
  const style = {
    ul: {
      margin: "1%",
      padding: "1%",
    },
    li: {
      margin: "1%",

      gab: "1%",
      backgroundColor: "#e1ebe5",
      display: "flex",
      justifyContent: "center",
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
  const loadCategories = async () => {
    const res = await UserServices.getCategories();
    console.log(res);
    setCategories(res);
    setLoading(false);
  };
  useEffect(() => {
    loadCategories();
  }, []);

  const handleRemove = async (Id) => {
    console.log(Id);
    try {
      const res = await UserServices.deleteCategory(Id);
      if (res) {
        console.log(res, "ÅÅÅÅÅÅÅÅÅÅÅ");
        loadCategories();
      }
    } catch (e) {
      console.log(e);
    }
  };

  const addCategory = async() => {
    try {
       
      const data = {
        nameEnglish:englishName,
        nameSwedish:swedishName
      }
      const res = await UserServices.addCategory(data);
      if (res) {
        console.log(res, "p");
        loadCategories();
        setShowAddCategoryForm(!showAddCategoryForm)
      }
    } catch (e) {
      console.log(e);
    }
  };
  const  handleChange = (e) => {
if (e.target.name === 'englishName')
  setEnglishName(e.target.value)
else
setSwedishName(e.target.value)
  }
  return (
    <div>
      <h3 className="subAddress"> Categories</h3>
      {Loading ? (
        <LoadingSpinner></LoadingSpinner>
      ) : (
        <div>
          <button
            onClick={() => {
              setShowAddCategoryForm(!showAddCategoryForm);
            }}
          >
          &#10148; Add Category 
          </button>
          {showAddCategoryForm && (
            <div >
              <div style={style.div}>
                <label style={style.label}> Enter English category name</label>
                <input style={style.input}
                  type="text"
                  value={englishName}
                  name="englishName"
                  onChange={handleChange}
                ></input>
              </div>
              <div style={style.div}>
                <label style={style.label}> Enter swedish category name</label>

                <input
                style={style.input}
                  type="text"
                  value={swedishName}
                  name="swedishName"
                  onChange={handleChange}
                ></input>
              </div>

              <button  className="standardButton"
              onClick={addCategory}> Add</button>
            </div>
          )}
          <ul style={style.ul}>
            {categories?.map((item, index) => (
              <li key={index} style={style.li}>
                <p style={style.p}>{item.nameEnglish}</p>
                <button
                  className="deleteButton"
                  onClick={() => handleRemove(item.id)}
                >
                  {" "}
                  <RiDeleteBinFill> </RiDeleteBinFill>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CategoryForm;
