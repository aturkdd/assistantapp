'use client'
import logo from "@/assets/logoIcon.png";
import Image from "next/image";
import React, { useEffect } from 'react';
import userHelper from "@/utilis/userHelper";
import UserServices from "@/utilis/UserServices";

import './Footer.css';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';

const Footer = () => {

  useEffect(()=>{
    if (typeof window !== "undefined")
       UserServices.addView()
      
  },[])
  return(
  <footer className="footer">
    <div className="footer-content">
      <div className="footer-column">
        <Image alt="logo" src={logo} width={100} height={100} />
      </div>
      <div className="footer-column">
        <h2 className="footer-heading">About Us</h2>
        <p className="footer-description">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. 
        </p>
      </div>
      <div className="footer-column">
        <h2 className="footer-heading">Contact Us</h2>
        <div className="footer-item">
          <span className="footer-label">Phone:</span>
          <span className="footer-value">123-456-7890</span>
        </div>
        <div className="footer-item">
          <span className="footer-label">Email:</span>
          <span className="footer-value">y_a@gmail.com</span>
        </div>
        <div className="footer-item social-icons">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <Facebook />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <Twitter />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <Instagram />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <LinkedIn />
          </a>
        </div>
      </div>
    </div>
    <p className="footer-copyright">&copy; 2024. All rights reserved.</p>
  </footer>
);}

export default Footer;
