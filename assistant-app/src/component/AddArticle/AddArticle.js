
'use client'

import UserServices from "@/utilis/UserServices";
import React, { useEffect, useState } from "react";
import { MdAddchart } from "react-icons/md";
import LoadingSpinner from "../Loading/LoadingSpinner";
import { RiDeleteBinFill } from "react-icons/ri";
import Article from "../Article/article";
import VideoComp from "../VideoComp/VideoComp";

const AddArticle = ({ user }) => {
  const style = {
    div: {
      margin: "1%",
      display: "grid",
      height: "auto",
      gridTemplateColumns: "1fr 2fr",
    },
    img: {
      margin: "1%",
    },
    divBorder: {
      margin: "1%",
      display: "grid",
      height: "auto",
      gridTemplateColumns: "1fr 2fr",

      borderColor: "black",
      borderColor: "#395845",
      borderWidth: "1px 0px 1px 0px",
      padding: "2%",
      margin: "2%",
    },
    buttonDiv: {
      paddingLeft: "20%",
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
      height: "auto",
    },
    select: {
      padding: "1%",
      justifyContent: "center",

      borderWidth: "0px 0px 2px 0px",
      borderColor: "#5c7564",
      opacity: "70%",
      borderStyle: "dotted",
      paddingLeft: "10%",
      color: "black",
      backgroundColor: "#faf9fa",
    },
    textarea: {
      fieldSizing: "content",
      padding: "1%",
      backgroundColor: "#faf9fa",
      opacity: "70%",
    },
  };
  const [data, setData] = useState({});
  const [categories, setCategories] = useState([]);
  const [selectedType, setSelectedType] = useState("");

  const contentTypes = [
    { photo: "Photo" },
    { photo_lift_text: "Text and Image In left" },
    { photo_right_text: "Text and Image in the right" },
    { video: "Video" },
    { text: "Text" },
    {sub_address : "Sub Address"}
  ];
  const [content, setContent] = useState({});
  const [subAddress, setSubAddress] = useState();


  const loadCategories = async () => {
    const res = await UserServices.getCategories();
    console.log(res);
    setCategories(res);
  };
  useEffect(() => {
    loadCategories();
  }, []);
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const addContent = () => {
    console.log(content);
    setData(() => {
      let addresses = []
      if (data.subaddresses &&  subAddress)
            addresses = [...data.subAddress,subAddress]
            else if (subAddress)
              addresses =[subAddress]
            else 
            addresses = data.subaddresses
      return {
        ...data,
        content: data.content ? [...data.content, content] : [content],
        subaddresses :addresses
      };
    });
    setContent({});
    setSubAddress(null)
    setSelectedType("");
    console.log(data);
  };
  async function encodeFileAsURL(element) {
    
      let file = element.files[0];

      
      let reader = new FileReader();
      await  reader.readAsDataURL(file);
      reader.onloadend = function () {
        if (element.name ==='image')
        setContent({ ...content, imagSRC: reader.result });
        else 
       {
        
         setContent({ ...content, mediaURL: reader.result });
}
      };
    
    console.log(content);
  }
  const handleSubmit = async(e) => {
    try {
       e.preventDefault()
   
      const res = await UserServices.addArticle(data);
      if (res) {
       setData({})
      }
    } catch (e) {
      console.log(e);
    }

  };
  return (
    <div>
      <h3> Add Article </h3>
      <form onSubmit={handleSubmit}>
        <div style={style.div}>
          <label style={style.label}> Article Title </label>
          <input
            style={style.input}
            type="text"
            name="title"
            value={data?.title? data.title:''}
            onChange={handleChange}
          />
        </div>
        <div style={style.div}>
          <label style={style.label}> Choose the subject </label>

          <select style={style.select} name="subject" onChange={handleChange}>
            <option key="selection" value={""}></option>
            {categories?.map((subject) => (
              <option key={subject.id} value={subject.id}>
                {subject.nameEnglish}
              </option>
            ))}
          </select>
        </div>
     
     
        <div style={style.div}>
          <label style={style.label}> Add quote </label>
          <textarea
            style={style.input}
            type="text"
            name="quote"
            value={data?.quote? data.quote:''}
            onChange={handleChange}
          ></textarea>
        </div>
        <div style={{backgroundColor: "white"}}>
        <Article data= {data?.content}/>
        </div>
        <div>
          <h3>   &#10148; Add Paragraph</h3>
        </div>
        <div style={style.div}>
          <label style={style.label}> choose the Type of Paragraph : </label>
          <select
            style={style.select}
            name="subject"
            value={selectedType}
            onChange={(e) => {
              setSelectedType(e.target.value);
              setContent({ ...content, type: e.target.value });
            }}
          >
            <option key="typeselection" value={""}></option>
            {contentTypes?.map((item) => (
              <option key={Object.keys(item)} value={Object.keys(item)}>
                {Object.values(item)}
              </option>
            ))}
          </select>
        </div>
        {selectedType === "text" && (
          <div style={style.divBorder}>
            <label style={style.label}> Enter the Text </label>

            <textarea
              style={style.textarea}
              type="text"
              name="text"
              onChange={(e) => setContent({ ...content, text: e.target.value })}
            />
          
          </div>
        )}
        {selectedType === "photo" && (
          <div style={style.divBorder}>
            <p>Load Image</p>
            <input
              type="file"
              accept="image/*"
              multiple
              name="image"
              onChange={(e) => encodeFileAsURL(e.target)}
            />

            {content.imagSRC && <div style={style.div}></div>}
            {content.imagSRC && (
              <img style={style.img} src={content.imagSRC}></img>
            )}

          
          </div>
        )}
          {selectedType === "sub_address" && (
          <div style={style.divBorder}>
            <p>add Sub  title</p>
            <input
            className="input-field"
              type="text"
              name="text"
              onChange={(e) => {
                setSubAddress(e.target.value)
                setContent({ ...content, text: e.target.value })}}
            />

            {content.imagSRC && <div style={style.div}></div>}
            {content.imagSRC && (
              <img style={style.img} src={content.imagSRC}></img>
            )}

          
          </div>
        )}{}
        {(selectedType === "photo_right_text" ||
          selectedType === "photo_lift_text") && (
          <div style={style.divBorder}>
            <label> add text</label>
            <textarea
              style={style.textarea}
              type="text"
              name="text"
              onChange={(e) => setContent({ ...content, text: e.target.value })}
            />

            <p>Load Image</p>
            <input
              type="file"
              accept="image/*"
              multiple
              name="image"
              onChange={(e) => encodeFileAsURL(e.target)}
            />

            {content.imagSRC && <div style={style.div}></div>}
            {content.imagSRC && (
              <img style={style.img} src={content.imagSRC}></img>
            )}
      
          </div>
        )}
    
    {selectedType === "video" && (
          <div style={style.divBorder}>
            <label>Load Video</label>
           
            <input
              type="file"
              accept="video/*"
              multiple
              name="video"
              onChange={(e) => encodeFileAsURL(e.target)}
            />
        
          </div>
        )}
          {(selectedType !== '')&&(
            <div style={style.div}>
            <button
              className="addButton"
              onClick={(e) => {
                e.preventDefault();
                addContent();
              }}
            >
            <span style={{display: "flex", flexDirection:"row",gap: "2px"}}><MdAddchart> </MdAddchart> Add Paragraph 
              </span>
            </button >
            <button 
              className="deleteButton"
              onClick={() => {
                setContent({});
                setSelectedType("");
              }}
            >
              <span style={{display: "flex", flexDirection:"row",gap: "2px"}}>
              <RiDeleteBinFill></RiDeleteBinFill>
              Delete Paragraph
              
              </span>
            </button>
          </div>
          )}
        <div style={style.buttonDiv}>
          
          <button type="submit" className="standardButton">
            Add Article{" "}
          </button>
          <button  className="standardButton" onClick={(e)=>{
            setData({})
            setContent({})
            setSubAddress(null)
            setSelectedType("")
            
          }}>
            Cancel{" "}
          </button>
        </div>
      </form>
         
    </div>
  );
};

export default AddArticle;
