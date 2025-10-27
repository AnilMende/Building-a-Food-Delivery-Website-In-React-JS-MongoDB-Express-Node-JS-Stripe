import React, { useContext } from "react";
import styled from "styled-components";

import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
const Cart = () => {

  const { cartItems, food_list,
          removeFromCart, getTotalCartAmount, url } = useContext(StoreContext);

  const navigate = useNavigate();

  return (

    <CartContainer>

      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {
          food_list.map((item, index) => {
            if (cartItems[item._id] > 0) {

              return (
                <div>

                  <div className="cart-items-title cart-items-item">
                    {/* to display the img we are using the path because we are fetching it from the backend */}
                    <img src={url+"/images/"+item.image} alt="" />
                    <p>{item.name}</p>
                    <p>₹{item.price}</p>
                    {/* for quantity */}
                    <p>{cartItems[item._id]}</p>
                    {/* for total price multiply the quantity with the item price */}
                    <p>₹{item.price * cartItems[item._id]}</p>
                    {/* to remove an item from the cart */}
                    <p onClick={() => removeFromCart(item._id)} className="cross">x</p>
                  </div>
                  <hr />

                </div>

              )
            }
          })
        }
      </div>

      <div className="cart-bottom">

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
              {/* initializing the delivery fee based on cart value */}
              <p>₹{getTotalCartAmount() === 0 ? 0 : 5}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Total</p>
              {/* initializing the total based on the cart value */}
              <p>₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 5}</p>
            </div>

          </div>
          {/* by clicking the proceed to checkout we get the place order page 
               which is helpful for providing the user information for order conformation */}
          <button onClick={() => navigate('/order')}>PROCEED TO CHECKOUT</button>
        </div>

        <div className="cart-promocode">

          <div>
            <p>If you have a promo code, Enter it here</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder="Enter Promo Code" />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </CartContainer>
  )
}

export default Cart;

const CartContainer = styled.div`
      margin-top: 100px;

      .cart-items-title{
        display: grid;
        grid-template-columns:1fr 1.5fr 1fr 1fr 1fr 0.5fr;
        align-items: center;
        color: gray;
        font-size: max(1vw,12px);
      }

      .cart-items-item{
        margin: 10px 0;
        color: black;
      }
      .cart-items-item img{
        width: 50px;
      }

      hr{
        height: 1px;
        background-color: #e2e2e2;
        border: none;
      }

      .cart-items-item .cross{
        cursor: pointer;
      }


      .cart-bottom{
        margin-top: 80px;
        display: flex;
        justify-content: space-between;
        gap: max(12vw,20px);
      }

      .cart-total{
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 20px;
      }

      .cart-total-details{
        display: flex;
        justify-content: space-between;
        color: #555;
      }

      .cart-total hr{
        margin: 10px 0px;
      }
      .cart-total button{
        border: none;
        color: white;
        background-color: tomato;
        width: max(15vw,200px);
        padding: 12px 0px;
        border-radius: 4px;
        cursor: pointer;
      }


      .cart-promocode{
        flex: 1;
      }
      .cart-promocode p{
        color: #555;
      }
      .cart-promocode-input{
        margin-top: 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #eaeaea;
        border-radius: 4px;
      }
      .cart-promocode-input input{
        background: transparent;
        border: none;
        outline: none;
        padding-left: 10px;
      }
      .cart-promocode-input button{
        width: max(10vw,150px);
        padding: 12px 5px;
        background-color: black;
        border: none;
        color: white;
        border-radius: 4px;
        cursor: pointer;
      }

      /* making responsive */
      @media (max-width:750px) {
        .cart-bottom{
          flex-direction: column-reverse;
        }

        .cart-promocode{
          justify-content:start;
        }
      }
`;
