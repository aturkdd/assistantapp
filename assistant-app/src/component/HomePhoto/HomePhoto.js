"use client";
import React from "react";

import "./HomePhoto.css";

const HomePhoto = ({ data ,style}) => {
  console.log(data.id )

  return (
   <>
   
   <div className="main-wrapper">
      <div
        className={`wrapper ${style === "show" ? "fade-in" : "fade-out"}`}
        style={{
          display: style === "show" ? "flex" : "none",
          flexDirection: "row",
        }}
      >
        <div
          className={`hero-section ${
            style === "show" ? "fade-in" : "fade-out"
          }`}
        >
          <div className="content">
            <h1>{data.title}</h1>
            <br />
            <p>{data.text}</p>
            <div className="curvedLine">
              <div className="curvedLine">
                <div className="curvedLine"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

    
    </div>
 
   </>
  );
};

export default HomePhoto;
