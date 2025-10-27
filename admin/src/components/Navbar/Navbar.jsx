import React from "react";
import styled from "styled-components";
import {assets} from '../../assets/assets'

const Navbar = () => {
    return(
        <NavbarContainer>
            <img src={assets.logo} alt="" className="logo" />
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
        width: max(10%,80px);
      }

      .profile{
        width: 40px;
      }
`;