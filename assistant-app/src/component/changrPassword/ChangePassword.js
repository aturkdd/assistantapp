"use client";

import React, { useState } from "react";
import { BiSolidErrorAlt } from "react-icons/bi";

const ChangePasswordForm = ({ onChangePassword }) => {
  const style = {
    div: {
      margin: "1%",
      display: "grid",
      gridTemplateColumns: "1fr 2fr 1fr",
      gap: "10px",
    },
    buttonDiv: {
      paddingLeft: "20%",
      paddingTop: "10%",
    },
    label: {
      padding: "0.5%",
      margin: "1%",
      color: "#1C923B",
      fontWeight: "1000",
      justifyContent: "center",
      fontSize: "1rem",
    },
    input: {
      borderWidth: "0px 0px 1px 0px",
      borderColor: "C18FC2",
   
      borderStyle: "dotted",
      paddingLeft: "10%",
      color: "black",
      
    },
  };
  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);

  const handleChange = (e) => {
    if (e.target.name === "newPassword") setNewPassword(e.target.value);
    else setOldPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    try {
      e.preventDefault();
      console.log(newPassword, oldPassword);
      if (newPassword === "" || oldPassword === "") setErrorMessage(true);
      else {
        onChangePassword(newPassword, oldPassword);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3 className="subAddress"> Change Password</h3>
      <div style={style.div}>
        <label style={style.label}> Old Password</label>
        <input
          style={style.input}
          name="oldPassword"
          type="password"
          value={oldPassword}
          onChange={handleChange}
        />
        {errorMessage && oldPassword === "" && <BiSolidErrorAlt color="red" />}
      </div>
      <div style={style.div}>
        <label style={style.label}> New password</label>
        <input
          style={style.input}
          name="newPassword"
          type="password"
          value={newPassword}
          onChange={handleChange}
        />
        {errorMessage && newPassword === "" && <BiSolidErrorAlt color="red" />}
      </div>
      <div style={style.buttonDiv}>
        <button className="standardButton" type="submit">
          Change Password
        </button>
      </div>
    </form>
  );
};

export default ChangePasswordForm;
