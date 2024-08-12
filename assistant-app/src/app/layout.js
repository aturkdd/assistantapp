'use client';
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/component/Footer/Footer";
import Header from "@/component/Header/Header";
import { store } from '../lib/store.js';
import { Provider } from 'react-redux';
import Notification from "@/component/notification/notification";
import CookiePolicy from "@/component/CookiePolicy/CookiePolicy"
import { useEffect, useState } from "react";





const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const [isClient,setIsClient] = useState(false)



 useEffect (()=> {
  if (typeof window !== "undefined") 
    setIsClient(true);

 },[])
 
  
  return (
    <html >
      <head>
        <title>LäroTeket</title>
        <link rel="icon" href="/logoIcon.png" sizes="any" />
      </head>
      <body >
      
       <Provider store={store()}>
      {isClient && (<Notification></Notification>)}
      {isClient &&(<CookiePolicy/>)}
       {isClient &&( <Header></Header>)}
        {isClient && (<main > {children}</main> )}
      
        {isClient &&  (<Footer></Footer>)}
        </Provider>
      </body>
    </html>
  );

}
