import React, { useContext, useState } from "react";
import styled from "styled-components";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";

const Fooditem = ({id,name,price,description,image}) => {
    
    // const [itemCount, setItemCount] = useState(0);
    // 0 is false then !0 is true then if true show the add icon
    // clicking on the add icon makes the condition false by incrementing the count
    // so we have to show the green ad red icons to increment and decrement

    const {cartItems, addToCart, removeFromCart, url} = useContext(StoreContext);

    return(
        <FoodItemContainer>

            <div className="food-item-img-container">
               {/* width url+/images we get all the images and by adding field image, we will get the particular image
                that is url/images/imagename */}
                <img className="food-item-img" src={url+"/images/"+image} alt="" />
                 {
                  !cartItems[id]
                      ? <img className="add" 
                        //  onClick={() => setItemCount(prev => prev + 1)} 
                        onClick={() => addToCart(id)}
                         src={assets.add_icon_white} />

                      : <div className="food-item-counter">
                          <img 
                          //  onClick={() => setItemCount(prev => prev - 1)} 
                           onClick={() => removeFromCart(id)}
                           src={assets.remove_icon_red}/>

                          <p>{cartItems[id]}</p>

                          <img 
                          //  onClick={() => setItemCount(prev => prev + 1)} 
                          onClick={() => addToCart(id)}
                           src={assets.add_icon_green}/>
                        </div>
                }
            </div>

            <div className="food-item-info">

                <div className="food-item-name-rating">
                    <p>{name}</p>
                    <img src={assets.rating_starts} alt="" />
                </div>

                <p className="food-item-desc">{description}</p>
                <p className="food-item-price">₹{price}</p>

            </div>
            
        </FoodItemContainer>
    )
}

export default Fooditem;

const FoodItemContainer = styled.div`
      width: 100%;
      margin: auto;
      border-radius: 15px;
      box-shadow: 0px 0px 10px #00000015;
      transition: 0.3s;
      animation: fadeIn 1s;

      .food-item-img{
        width: 100%;
        border-radius: 15px 15px 0px 0px;
      }

      .food-item-name-rating{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
      }
      .food-item-name-rating p{
        font-size: 20px;
        font-weight: 500;
      }
      .food-item-name-rating img{
        width: 70px;
      }

      .food-item-desc{
        color: #676767;
        font-size: 12px;
      }

      .food-item-price{
        color: tomato;
        font-size: 22px;
        font-weight: 500;
        margin: 10px 0px;
      }

      .food-item-img-container{
        position: relative;
      }

      .food-item-img-container .add{
        position: absolute;
        width: 35px;
        bottom: 15px;
        right: 15px;
        cursor: pointer;
        border-radius: 50%;
      }

      .food-item-counter{
        position: absolute;
        bottom: 15px;
        right: 15px;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 10px;
        background-color: white;
        padding: 6px;
        border-radius: 50px;
      }
      .food-item-counter img{
        width: 35px;
      }
`;