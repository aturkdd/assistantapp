'use client'
import { useState, useEffect } from "react";
import './index.css'

import UserServices from "@/utilis/UserServices";

import Link from "next/link";
const SubjectGrid = () => {
   
    const [categories,setCategories] = useState([])

    const loadCategories = async () => {
        const res = await UserServices.getCategories();
        console.log(res);
        setCategories(res);
      };
      useEffect(() => {
        loadCategories();
      }, []);

return (
    <div className="subjectcontainer">
        
    <div className="subjectGrid-component">
     {
        categories?.map ((item,index) => 
        <div key= {index} className="subjectDiv"> 
         <div className={`${index%2 === 0? ' triangleHead purpleDiv':' triangleHead greenDiv' }`}></div>
             <div className=  "innerDiv">
           
          </div>
          <div className="rectanglediv">
          <Link href={`subject/${item.id}`}>
            {item.nameEnglish}
            </Link>
          </div> 
          </div> 
        )
     }
     
</div>

</div>

);
};

export default SubjectGrid