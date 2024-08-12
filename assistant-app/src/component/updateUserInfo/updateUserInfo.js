"use client";

import React, { useState } from "react";

const UpdateUserForm = ({ user, onUpdateUser }) => {
  const style = {
    div: {
      margin: "1%",
      display: "grid",
      gridTemplateColumns: "1fr 2fr",
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
      borderWidth: "0px 0px 2px 0px",
      borderColor: "#5c7564",
     
      borderStyle: "dotted",
      paddingLeft: "10%",
      color: "black",
   
    },
  };

  const [updatedUser, setUpdatedUser] = useState(user);

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    if (name === "messageSubscribed")
      setUpdatedUser((prevUser) => ({ ...prevUser, [name]: checked }));
    else setUpdatedUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onUpdateUser(updatedUser);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3 className="subAddress"> Update User information</h3>
      <div style={style.div}>
        <label style={style.label} className="nlabel">
          {" "}
          First Name
        </label>
        <input
          style={style.input}
          type="text"
          name="firstName"
          value={updatedUser?.firstName}
          onChange={handleChange}
        />
      </div>
      <div style={style.div}>
        <label style={style.label}> Last Name</label>
        <input
          style={style.input}
          type="text"
          name="lastName"
          value={updatedUser?.lastName}
          onChange={handleChange}
        />
      </div>
      <div style={style.div}>
        <label style={style.label}> Phone Number : </label>
        <input
          style={style.input}
          type="text"
          name="phoneNumber"
          value={updatedUser?.phoneNumber}
          onChange={handleChange}
        />
      </div>
      <div style={style.div}>
        <label style={style.label}> Email : </label>
        <input
          style={style.input}
          type="email"
          name="email"
          value={updatedUser?.email}
          onChange={handleChange}
        />
      </div>
      <div>
        <label style={style.label}>message Subscribed</label>
        <input
          name="messageSubscribed"
          type="checkbox"
          checked={updatedUser?.messageSubscribed}
          onChange={handleChange}
        />
      </div>
      <div style={style.buttonDiv}>
        <button className="standardButton" type="submit">
          Update
        </button>
      </div>
    </form>
  );
};

export default UpdateUserForm;
