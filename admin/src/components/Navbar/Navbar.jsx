import React from "react";
import styled from "styled-components";
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <NavbarContainer>
      {/*<img src={assets.logo} alt="" className="logo" />*/}
      <p className="logo">TVANAMM <span className="caption">Admin Panel</span></p>
      <img src={assets.profile_image} alt="" className="profile" />
    </NavbarContainer>
  )
}

export default Navbar;

const NavbarContainer = styled.div`
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px 4%;

      .logo{
        width: 150px;
        color: #21bb21;
        font-weight: bold;
        font-size: 26px;
        cursor: pointer;
    }

    .caption{
      color: #212020;
      font-size: 16px;
      margin-top: 0%;
    }
      .profile{
        width: 40px;
      }
`;