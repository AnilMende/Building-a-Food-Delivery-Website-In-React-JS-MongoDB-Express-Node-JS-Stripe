import React, { useContext } from "react";
import styled from "styled-components";
import { StoreContext } from "../../context/StoreContext";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PlaceOrder = () => {

  const { getTotalCartAmount, token, food_list, cartItems, url, setCartItems } = useContext(StoreContext);

  // this state is to store the info that  is form in the place order page
  // user info state
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

  // payment method
  const [paymentMethod, setpaymentMethod] = useState("");

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

    if (!paymentMethod) {
      alert("Please select a payment method");
      return;
    }


    // let orderItems = [];
    // food_list.map((item) => {
    //   if (cartItems[item._id] > 0) {
    //     // here item is the object contains all info about the cart item
    //     let itemInfo = item;
    //     itemInfo["quantity"] = cartItems[item._id];
    //     orderItems.push(itemInfo);
    //   }
    // })

    const orderData = {
      address: data,
      items: food_list.filter((item) => cartItems[item._id] > 0).map((item) => ({
        name: item.name,
        price: item.price,
        quantity: cartItems[item._id]
      })),
      amount: getTotalCartAmount() + 5,
      paymentMethod,
    };

    try {
      const response = await axios.post(url + "/api/order/place", orderData, { headers: { token } })
      if (response.data.success) {

        if (response.data.cod) {
          alert("Order placed successfully with Cash on Delivery!");
          setCartItems({})
          navigate("/myorders");
          return;
        } else {
          window.location.replace(response.data.session_url);
        }

      } else {
        alert("Something went wrong while placing the order")
      }

    } catch (error) {
      console.log(error)
      alert("Error placing the order");
    }

  }

  // if the user is in login state and if the cart amount is > 0 then we can show the
  // my order page or place orders page otherwise redirect the user back to the cart page
  // using useNavigate()
  const navigate = useNavigate();

  // Redirect to cart if user not loggedin or cart is empty
  useEffect(() => {
    // token not available means user is logged out
    if (!token) {
      navigate('/cart');
    }
    // cart is empty
    else if (getTotalCartAmount() === 0) {
      navigate('/cart');
    }
  }, [token]);


  return (
    <OrderContainer>
      <form onSubmit={placeOrder} className="place-order">

        <div className="place-order-left">
          <p className="title">Delivery Information</p>

          <div className="multi-fields">

            <input
              required
              name="firstName"
              onChange={onChangeHandler}
              value={data.firstName}
              type="text"
              placeholder="First Name"
            />

            <input
              required
              name="lastName"
              onChange={onChangeHandler}
              value={data.lastName}
              type="text"
              placeholder="Last Name" />

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

            {/* Payment Options */}
            <PaymentContainer>
              <h2 className="Title">Payment Options</h2>

              {/* COD Option */}
              <PaymentOptionContainer $active={paymentMethod === "COD"}>
                <input
                  type="radio"
                  name="payment"
                  value="COD"
                  checked={paymentMethod === "COD"}
                  onChange={() => setpaymentMethod("COD")}
                />
                <span>COD (Cash On Delivery)</span>
              </PaymentOptionContainer>

              {/* Stripe Option */}
              <PaymentOptionContainer $active={paymentMethod === "Stripe"}>
                <input
                  type="radio"
                  name="payment"
                  value="Stripe"
                  checked={paymentMethod === "Stripe"}
                  onChange={() => setpaymentMethod("Stripe")}
                />
                <span>Stripe (Credit / Debit)</span>
              </PaymentOptionContainer>
            </PaymentContainer>


            {/* by clicking the proceed to checkout we get the place order page 
                          which is helpful for providing the user information for order conformation */}
            <button type="submit">Place Order</button>
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
        width: max(11vw,150px);
        background-color: tomato;
        padding: 12px 0px;
        border-radius: 4px;
        cursor: pointer;
        font-weight: bold;
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

// for payment options
const PaymentContainer = styled.div`

      width: 320px;
      margin: 10px 0px;

      .Title{
        margin-bottom: 20px;
      }

`;

const PaymentOptionContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px;
  border: ${(props) => (props.$active ? "2px solid #2ecc71" : "1px solid #ccc")};
  border-radius: 10px;
  margin-bottom: 10px;
  cursor: pointer;
  transition: border 0.2s ease-in-out, background-color 0.2s;

  &:hover {
    background-color: rgba(46, 204, 113, 0.05);
  }

  input {
    accent-color: #2ecc71;
  }

  span {
    font-weight: 500;
  }
`;