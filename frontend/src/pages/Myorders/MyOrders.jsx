import React from "react";
import { useContext } from "react";
import styled from 'styled-components';
import { StoreContext } from "../../context/StoreContext";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { assets } from "../../assets/assets";

const MyOrders = () => {

    const { url, token } = useContext(StoreContext);
    const [data, setData] = useState([]);

    const fetchOrders = async () => {
        const response = await axios.post(url + "/api/order/userorders", {}, { headers: { token } });
        setData(response.data.data);
        // console.log(response.data.data);
    }

    useEffect(() => {
        // if the user is logsin, token is avialable
        // so they can check the orders
        if (token) {
            fetchOrders();
        }
        // whenever the toke gets updated the fetchOrders  will get executed
    }, [token]);

    return (
        <MyOrderContainer>
            <h2>My Orders</h2>
            <div className="container">
                {/* to display the user orders on the frontend */}
                {
                    data.map((order, index) => {
                        return (
                            <div key={index} className="my-orders-order">
                                <img src={assets.parcel_icon} alt="" />
                                <p>{order.items.map((item, index) => {
                                    // if it's the last item don't include the commma
                                    if (index === order.items.length - 1) {
                                        return item.name + " x " + item.quantity
                                    }
                                    else {
                                        return item.name + " x " + item.quantity + ","
                                    }
                                })
                                }</p>
                                <p>₹{order.amount}</p>
                                <p>Items:{order.items.length}</p>
                                <p><span>&#x25cf;</span> <b>{order.status}</b></p>
                                {/* whenever the status changes to update the new status we will click on the Track Order
                                 then the status gets updated this is to avoid the refreshing of the web page */}
                                <button onClick={fetchOrders}>Track Order</button>
                            </div>
                        )
                    })
                }
            </div>
        </MyOrderContainer>
    )
}

export default MyOrders;

const MyOrderContainer = styled.div`
      margin: 50px 0px;
      
      .container{
        display: flex;
        flex-direction: column;
        gap: 20px;
        margin-top: 30px;
      }

      .my-orders-order{
        display: grid;
        grid-template-columns: 0.5fr 2fr 1fr 1fr 2fr 1fr;
        align-items: center;
        gap: 30px;
        font-size: 14px;
        padding: 10px 20px;
        color: #454545;
        border: 1px solid tomato;
      }

      .my-orders-order img{
        width: 50px;
      }
      .my-orders-order p span{
        color: tomato;
      }
      .my-orders-order p b{
        color: #454545;
        font-weight: 500;
      }

      .my-orders-order button{
        border: none;
        padding: 12px 0px;
        border-radius: 4px;
        cursor: pointer;
        background-color: #f4bdbd;
        color: #454545;
      }

      /* making responsive */
      @media (max-width:900px){
        .my-orders-order{
            grid-template-columns: 1fr 2fr 1fr;
            row-gap: 5px;
            font-size: 12px;
        }
        .my-orders-order button{
            font-size: 10px;
        }
      }
`;