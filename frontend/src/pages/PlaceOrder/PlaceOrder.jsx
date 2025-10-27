import React, { useContext } from "react";
import styled from "styled-components";
import { StoreContext } from "../../context/StoreContext";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PlaceOrder = () => {

  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);

  // this state is to store the info that  is form in the place order page
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    phone: ""
  })

  // onChange event to handle the input values
  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }))
  }

  // to check our data
  // useEffect(() => {
  //   console.log(data);
  // },[data]);

  const placeOrder = async (event) => {
    // to avoid the reloading of the page, whenever we submit
    event.preventDefault();

    let orderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        // here item is the object contains all info about the cart item
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    })

    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 5,
    }

    let response = await axios.post(url + "/api/order/place", orderData, { headers: { token } });
    if (response.data.success) {
      const { session_url } = response.data;
      window.location.replace(session_url);
    }
    else {
      alert("Error");
    }

  }

  // if the user is in login state and if the cart amount is > 0 then we can show the
  // my order page or place orders page otherwise redirect the user back to the cart page
  // using useNavigate()

  const navigate = useNavigate();

  useEffect(() => {
    // token not available means user is logged out
    if(!token){
      navigate('/cart');
    }
    // cart is empty
    else if(getTotalCartAmount()===0){
      navigate('/cart');
    }
  },[token]);


  return (
    <OrderContainer>
      <form onSubmit={placeOrder} className="place-order">

        <div className="place-order-left">
          <p className="title">Delivery Information</p>

          <div className="multi-fields">

            <input required name="firstName" onChange={onChangeHandler}
              value={data.firstName} type="text" placeholder="First Name" />

            <input required name="lastName" onChange={onChangeHandler}
              value={data.lastName} type="text" placeholder="Last Name" />

          </div>

          <input required name="email" onChange={onChangeHandler}
            value={data.email} type="email" placeholder="Email Address" />

          <input required name="street" onChange={onChangeHandler}
            value={data.street} type="text" placeholder="Street" />

          <div className="multi-fields">
            <input required name="city" onChange={onChangeHandler}
              value={data.city} type="text" placeholder="City" />

            <input required name="state" onChange={onChangeHandler}
              value={data.state} type="text" placeholder="State" />
          </div>

          <div className="multi-fields">
            <input required name="pincode" onChange={onChangeHandler}
              value={data.pincode} type="text"
              placeholder="PIN code" />

            <input required name="country" onChange={onChangeHandler}
              value={data.country} type="text"
              placeholder="Country" />
          </div>

          <input required name="phone" onChange={onChangeHandler}
            value={data.phone} type="text"
            placeholder="Phone" />
        </div>


        <div className="place-order-right">

          <div className="cart-total">
            <h2>Cart Totals</h2>
            <div>
              <div className="cart-total-details">
                <p>SubTotal</p>
                <p>₹{getTotalCartAmount()}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Delivery Fee</p>
                <p>₹{getTotalCartAmount() === 0 ? 0 : 5}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Total</p>
                <p>₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 5}</p>
              </div>
            </div>
            {/* by clicking the proceed to checkout we get the place order page 
                          which is helpful for providing the user information for order conformation */}
            <button type="submit">PROCEED TO PAYMENT</button>
          </div>

        </div>

      </form>
    </OrderContainer>
  )
}

export default PlaceOrder;

const OrderContainer = styled.div`
      
      .place-order{
        display: flex;
        align-items: start;
        justify-content: space-between;
        gap: 50px;
        margin-top: 100px;
      }

      .place-order-left{
        width: 100%;
        max-width: max(30%,500px);
      }

      .place-order-left .title{
        font-size: 30px;
        font-weight: 600;
        margin-bottom: 50px;
      }
      .place-order-left input{
        margin-bottom: 15px;
        width: 100%;
        padding: 10px;
        border: 1px solid #c5c5c5;
        border-radius: 4px;
        outline-color: tomato;
      }

      .place-order-left .multi-fields{
        display: flex;
        gap: 10px;
      }

      .place-order-right{
        width: 100%;
        max-width: max(40%, 500px);
      }

      .place-order-right .cart-total{
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 20px;
      }

      .place-order-right .cart-total-details{
        display: flex;
        justify-content: space-between;
        color: #555;
      }

      .place-order-right .cart-total hr{
        margin: 10px 0px;
      }

      .place-order-right .cart-total button{
        border: none;
        color: white;
        width: max(15vw,200px);
        background-color: tomato;
        padding: 12px 0px;
        border-radius: 4px;
        cursor: pointer;
      }

      /* making responsive */
      @media (max-width:750px){
        .place-order{
            display: flex;
            flex-direction: column;
            margin-top: 40px;
        }

        .place-order-left .title{
            margin-bottom: 30px;
        }
      }
`;