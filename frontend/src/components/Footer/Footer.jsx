import React from "react";
import styled from "styled-components";
import { assets } from "../../assets/assets";

const Footer = () => {
    return(
        <FooterContainer id="footer">

            <div className="footer-content">

                <div className="footer-content-left">
                    <img src={assets.logo} />
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Distinctio corrupti reprehenderit eveniet, corporis blanditiis error, ullam exercitationem id officiis ipsa velit aperiam aut. Repellat, quae?</p>
                    <div className="footer-social-icons">
                        <img src={assets.facebook_icon} />
                        <img src={assets.twitter_icon}  />
                        <img src={assets.linkedin_icon} />
                    </div>
                </div>

                <div className="footer-content-center">
                    <h2>COMPANY</h2>
                    <ul>
                        <li>Home</li>
                        <li>About Us</li>
                        <li>Delivery</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>

                <div className="footer-content-right">
                    <h2>GET IN TOUCH</h2>
                    <ul>
                        <li>+1-202-145-7890</li>
                        <li>contact@tomato.com</li>
                    </ul>
                </div>
            </div>
            <hr />
            <p className="footer-copy-right">
                Copyright 2025 @ Tomato.com - All Rights Reserved
            </p>
        </FooterContainer>
    )
}
export default Footer;

const FooterContainer = styled.div`
      color: #d9d9d9;
      background-color: #323232;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;
      padding: 20px 8vw;
      padding-top: 80px;
      margin-top: 100px;

      .footer-content{
        width: 100%;
        display: grid;
        grid-template-columns: 2fr 1fr 1fr;
        gap: 80px;
      }

      .footer-content-left, .footer-content-center, .footer-content-right{
        display: flex;
        flex-direction: column;
        align-items: start;
        gap: 20px;
      }

      .footer-content-center li, .footer-content-right li{
        list-style: none;
        margin-bottom: 10px;
        cursor: pointer;
      }

      .footer-content-center h2, .footer-content-right h2{
        color: white;
      }

      .footer-social-icons img{
        width: 40px;
        margin-right: 15px;
        cursor: pointer;
      }

      hr{
        width: 100%;
        height: 2px;
        margin: 20px 0px;
        background-color: gray;
        border: none;
      }

      @media (max-width:750px){
        .footer-content{
          display: flex;
          flex-direction: column;
          gap: 35px;
        }

        .footer-copy-right{
          text-align: center;
        }
      }
`;