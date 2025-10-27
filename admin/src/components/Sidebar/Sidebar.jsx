import React from "react";
import styled from 'styled-components';
import { assets } from "../../assets/assets";
import {NavLink} from 'react-router-dom';

const Sidebar = () => {
    return (
        <SideBarContainer>

            <div className="sidebar-options">

                <NavLink to="/add" className="sidebar-option">
                    <img src={assets.add_icon} alt="" />
                    <p>Add Items</p>
                </NavLink>

                <NavLink to="/list" className="sidebar-option">
                    <img src={assets.order_icon} alt="" />
                    <p>List Items</p>
                </NavLink>

                <NavLink to="/orders" className="sidebar-option">
                    <img src={assets.order_icon} alt="" />
                    <p>Orders</p>
                </NavLink>

            </div>
        </SideBarContainer>
    )
}
export default Sidebar;

const SideBarContainer = styled.div`
      width: 18%;
      min-height: 100vh;
      border: 1.5px solid #a9a9a9;
      border-top: 0;
      font-size: max(1vw, 10px);

      .sidebar-options{
        display: flex;
        flex-direction: column;
        padding-top:50px;
        padding-left: 20%;
        gap: 20px;
      }

      .sidebar-option{
        display: flex;
        align-items: center;
        gap: 12px;
        border: 1px solid #a9a9a9;
        border-right: 0;
        padding: 8px 10px;
        border-radius: 3px 0px 0px 3px;
        cursor: pointer;
      }

      /* when we click on the icon it gets a class .active because of NavLink
      and the img gets highlighted */
      .sidebar-option.active{
        background-color: tomato;
      }

      /* making responsive */
      @media (max-width:900px) {
        .sidebar-option p{
            display: none;
        }
      }
`;