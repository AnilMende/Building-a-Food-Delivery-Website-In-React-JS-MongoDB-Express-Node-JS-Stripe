import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../../assets/assets.js';

const Orders = ({ url }) => {

    const [orders, setOrders] = useState([]);

    const fetchAllOrders = async () => {
        const response = await axios.get(url + "/api/order/list")
        if (response.data.success) {
            setOrders(response.data.data);
            console.log(response.data.data);
        }
        else {
            toast.error("Error");
        }
    }

    // to hamdle the order status
    const statusHandler = async(event, orderId) => {
        const response = await axios.post(url+"/api/order/status",{
            orderId,
            status:event.target.value
        })

        if(response.data.success){
            await fetchAllOrders();
        }
    }

    useEffect(() => {
        fetchAllOrders();
    }, [])

    return (
        <OrderContainer>

            <h3>Order Page</h3>
            <div className="order-list">
                {
                    orders.map((order, index) => (
                        <div key={index} className="order-item">
                            <img src={assets.parcel_icon} alt="" />
                            <div>
                                <p className="order-item-food">
                                    {
                                        order.items.map((item, index) => {
                                            if (index === order.items.length - 1) {
                                                return item.name + " x " + item.quantity
                                            }
                                            else {
                                                return item.name + " x " + item.quantity + " , "
                                            }
                                        })
                                    }
                                </p>
                                <p className="order-item-name">{order.address.firstName + " " + order.address.lastName}</p>
                                <div className="order-item-address">
                                    <p>{order.address.street + ","}</p>
                                    <p>{order.address.city + "," + order.address.state + "," + order.address.country + "," + order.address.pincode}</p>
                                </div>
                                <p className="order-item-phone">{order.address.phone}</p>
                            </div>
                            <p className="order-item-length">Items: {order.items.length}</p>
                            <p className="order-item-price">₹{order.amount}</p>

                            {/* to directly update the staus in the admin panel */}
                            <select onChange={(event) => statusHandler(event, order._id)} value={order.status}>
                                <option value="Food Processing">Food Processing</option>
                                <option value="Out for delivery">Out For Delivery</option>
                                <option value="Delivered">Delivered</option>
                            </select>
                        </div>
                    ))
                }
            </div>
        </OrderContainer>
    )
}

export default Orders;
const OrderContainer = styled.div`
      margin-left: max(5vw,25px);
      margin-top: 50px;
      width: 70%;

      .order-item{
        display: grid;
        grid-template-columns: 0.5fr 2fr 1fr 1fr 1fr;
        align-items: start;
        gap: 30px;
        border: 1px solid tomato;
        padding: 20px;
        margin: 30px 0px;
        font-size: 14px;
        color: #505050;
      }

      .order-item-food, .order-item-name{
        font-weight: 600;
      }

      .order-item-name{
        margin-top: 30px;
        margin-bottom: 5px;
      }
      
      .order-item-address{
        margin-bottom: 10px;
      }

      .order-item-price, .order-item-length{
        font-weight: 600;
      }

      .order-item select{
        border: 1px solid tomato;
        background-color: #ffe8e4;
        width: max-content(10vw, 120px);
        padding: 10px;
        outline: none;
      }

      /* making responsive */
      @media (max-width:1000px){
        .order-item{
            font-size: 12px;
            grid-template-columns:0.5fr 2fr 1fr;
            padding: 15px 8px;
        }

        .order-item select{
            padding: 15px;
            font-size: 12px;
        }

        .order-item img{
            width: 40px;
        }
      }
`;