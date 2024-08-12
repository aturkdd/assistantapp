'use client'
import Image from "next/image";

import heroImage from "@/assets/th-3.jpg";

import { ArticlesList } from "@/component/ArticlesList/ArticlesList";
import SearchBar from "@/component/SearchBar/SearchBar";

import UserServices from "@/utilis/UserServices";
import { useParams } from "next/navigation";

import { useEffect, useState } from "react";
import LoadingSpinner from "@/component/Loading/LoadingSpinner";
export default function page() {
  const params = useParams();

  const [articlesArray, setArticlesArray] = useState([]);
  const [query, setQuery] = useState({search: "", subject : params.slug});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    console.log("Fetching articles...");
    const fetchArticles = async () => {
      try {
       await UserServices.getArticles(
         setArticlesArray,
         query
       );
       console.log(articlesArray,'ooo')
        
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    fetchArticles();
  }, [query]);
 

  useEffect (()=> {
    setLoading(false);
  },[articlesArray])
  console.log(articlesArray, "lk");
  return (
    <div style={{height: "100%", width : "100%"}}>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          

          <SearchBar setQuery={setQuery} subject={params.slug}></SearchBar>
          <ArticlesList data={articlesArray} />
        </>
      )}
    </div>
  );
}
