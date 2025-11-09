import React, { useContext, useState } from "react";
import styled from 'styled-components';
import { assets } from "../../assets/assets";
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from "../../context/StoreContext";

const Navbar = ({ setShowLogin }) => {

    const [menu, setMenu] = useState("Home");
    
    const {getTotalCartAmount,token, setToken} = useContext(StoreContext);

    const navigate = useNavigate();

    // for logout we need to remove the token from the localStorage
    const logOut = () => {
        localStorage.removeItem("token");
        // set the token as an empty string
        setToken("")
        // then after logut navigate the user to the home page
        navigate("/");
    }

    return (
        <NavbarContainer id="navbar">
            {/* If we click on the logo we get the home by using the route / */}
            <Link to="/">
                
                {/* <img src={assets.logo} className="logo" /> */}
                <p className="logo">TVANAMM</p>
            </Link>


            <ul className="navbar-menu">
                <Link to="/" onClick={() => setMenu("Home")} className={menu === "Home" ? "active" : ""}>Home</Link>
                <a href="#explore-menu" onClick={() => setMenu("Menu")} className={menu === "Menu" ? "active" : ""}>Menu</a>
                <a href="#app-download" onClick={() => setMenu("Mobile-App")} className={menu === "Mobile-App" ? "active" : ""}>Mobile-App</a>
                <a href="#footer" onClick={() => setMenu("Contact Us")} className={menu === "Contact Us" ? "active" : ""}>Contact Us</a>
            </ul>

            <div className="navbar-right">
                <img src={assets.search_icon} alt="" />

                <div className="navbar-search-icon">
                    {/* we are adding the route /cart to the basket icon on clicking of the img we
                    get the cart page */}
                    <Link to="/cart">
                        <img src={assets.basket_icon} alt="" />
                    </Link>
                    {/* if the totalCartAmount is greater than 0 then we need to show the red dot on the basket icon 
                      these helps us with knowing that if the basket containts items or not */}
                    <div className={getTotalCartAmount() === 0 ? "":"dot"}></div>
                </div>


                {/* we need to change the button display name based on login and register
                 these can be done using the token value, because if a user logins a token will get generated */}

                 {!token ? <button onClick={() => setShowLogin(true)}>Sign In</button> 

                  : <div className="navbar-profile">
                     <img src={assets.profile_icon} alt="" />

                     <ul className="nav-profile-dropdown">
                        {/* added the naviagte to myorder on the onclick of the bag icon */}
                        <li onClick={() => navigate('/myorders')}>
                            <img src={assets.bag_icon} alt="" />
                            <p>Orders</p>
                        </li>
                        <hr />
                        {/* for logout by making token to null and navigate to home page */}
                        <li onClick={logOut}>
                            <img src={assets.logout_icon} alt="" />
                            <p>Logout</p>
                        </li>
                     </ul>

                  </div> }
                
            </div>
        </NavbarContainer>
    )
}

export default Navbar;

const NavbarContainer = styled.div`
    padding: 20px 0px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .logo{
        width: 150px;
        color: green;
        font-weight: bold;
        font-size: 26px;
    }

    .navbar-menu{
        display: flex;
        list-style: none;
        gap: 20px;
        color: #3b53a2;
        font-size: 18px;
    }

    .navbar-right{
        display: flex;
        align-items: center;
        gap: 40px;
    }

    .navbar-right button{
        background: transparent;
        color: #3b53a2;
        font-size: 16px;
        border: 1px solid tomato;
        padding: 10px 30px;
        border-radius: 50px;
        cursor: pointer;
        transition: 0.3s;
    }
    .navbar-right button:hover{
        background-color: #fff4f2;
    }

    .active{
        padding-bottom: 2px;
        border-bottom: 2px solid #3b53a2;
    }

    .navbar-menu li{
        cursor: pointer;
    }

    .navbar-search-icon{
        position: relative;
    }

    .navbar-search-icon .dot{
        position: absolute;
        min-height: 10px;
        min-width: 10px;
        background-color: tomato;
        border-radius: 5px;
        top: -8px;
        right: -8px;
    }

    /* after backend */
    .navbar-profile{
        position: relative;
    }

    .nav-profile-dropdown{
        position: absolute;
        display: none;
        right: 0;
        z-index: 1;
    }

    /* if we hover the profile then the orders and logout icons should visible */
    .navbar-profile:hover .nav-profile-dropdown{
        display: flex;
        flex-direction: column;
        gap: 10px;
        background-color: #fff2ef;
        padding: 12px 25px;
        border-radius: 4px;
        border: 1px solid tomato;
        outline: 2px solid white;
        list-style: none;
    }

    .nav-profile-dropdown li{
        display: flex;
        align-items: center;
        gap: 10px;
        cursor: pointer;
    }

    .nav-profile-dropdown img{
        width: 20px;
    }
    .nav-profile-dropdown li:hover{
        color: tomato;
    }

    /* Making responsive */
    @media (max-width:1050px){
        .logo{
            width: 140px;
        }
        .navbar-menu{
            gap: 20px;
            font-size: 17px;
        }
        .navbar-right{
            gap: 30px;
        }
        .navbar-right img{
            width: 22px;
        }
        .navbar-right button{
            padding: 8px 25px;
        }
    }

    @media (max-width:900px){
        .logo{
            width: 120px;
        }
        .navbar-menu{
            gap: 15px;
            font-size: 16px;
        }
        .navbar-right{
            gap: 20px;
        }
        .navbar-right img{
            width: 20px;
        }
        .navbar-right button{
            padding: 7px 20px;
            font-size: 15px;
        }
    }

    @media (max-width:750px) {
        .navbar-menu{
            display: none;
        }
    }
`;