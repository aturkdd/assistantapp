"use client";

import HomePhoto from "@/component/HomePhoto/HomePhoto";
// import heroImage from "@/assets/th.jpg";
// import heroImage1 from "@/assets/th-2.jpg";
// import heroImage2 from "@/assets/th-1.jpg";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import SubjectGrid from "@/component/SubjectGrid/SubjectGrid";
import Cards from "@/component/Cards/Cards";

export default function Home() {
  const [index, setIndex] = useState(0);
  const loggedinfo = useSelector((state) => state.auth.logged);
  const [logged, setLogged] = useState(false);

  const imagesArray = [
    {
      title: " We Help You",
      text: "We assist teachers in discovering the most effective ways to explain concepts and the best methods to make learning easie.Exploring new articles on teaching methodologies opens doors to innovative ways of engaging students and enhancing learning outcomes.",
     
      id: 0,
    },
    {
      title: " Best Resource",
      text: "With us, you can find the latest research articles and the best resources for your studies.Staying updated with the latest research in education helps educators refine their teaching strategies and adapt to evolving student needs.",
    
      id: 1,
    },
    {
      title: " Let Us Help You ",
      text: "We're always here to assist you and your students. Don't hesitate to register on our site! .Techniques such as flipped classrooms, personalized learning paths, and immersive technologies are reshaping traditional teaching approaches.",
   
      id: 2,
    },
    {
      title: " We Help You",
      text: "We assist teachers in discovering the most effective ways to explain concepts and the best methods to make learning easie.Techniques such as flipped classrooms, personalized learning paths, and immersive technologies are reshaping traditional teaching approaches. ",
   
      id: 3,
    },
  ];
  useEffect(() => {
    setLogged(loggedinfo);
  }, [loggedinfo]);
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => {
        let timer = prevIndex + 1;

        return timer % 3 === 0 ? 0 : timer;
      });
    }, 6000);
  }, []);

  return (
    <div>
      <div>
        {imagesArray.map((item, i) => (
          <HomePhoto
            data={item}
            key={i}
            style={index === i ? "show" : "hidden"}
          />
        ))}
      </div>
      {logged && (
        <div>
          <SubjectGrid />
        </div>
      )}

      <Cards/>
    </div>
  );
}
