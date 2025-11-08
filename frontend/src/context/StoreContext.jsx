import { createContext, useEffect, useState } from "react";
// import { food_list } from "../assets/assets";
import axios from 'axios';

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

    const url = "https://food-del-backend-88wj.onrender.com";

    // state for the adding and removing the items
    const [cartItems, setCartItems] = useState({});

    // backend url
    // const url = "http://localhost:4000";

    const [token, setToken] = useState("");

    // this is the state for fetching food data on the frontend
    const [food_list, setFoodList] = useState([]);


    // adding to cart
    const addToCart = async (itemId) => {
        // if item is not present in the cartItems then
        // set the count to 1
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
        }
        // if item already exists then
        // increment the count to 1 to the existing count
        else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        }

        // integrating the cart apis to frontend
        // if the user loggein then we generate a token
        if(token){
            // from the backend we are calling the addToCart
            await axios.post(url+"/api/cart/add",{itemId},{headers:{token}});
        }
    }

    // removing from cart
    // if you want to remove then decrease the current count of that particular
    // item to 1 if the count will be 0, then it will get removed from cart
    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));

        // integrating the cart apis to frontend
        // token available the user is logged in
        if(token){
            await axios.post(url+"/api/cart/remove", {itemId}, {headers:{token}});
        }
    }

    // to load the cartData
    const loadCartData = async (token) => {
        const response = await axios.post(url+"/api/cart/get",{}, {headers:{token}});
        // then set the response for the setCartItems or is to fetch the cartData
        // fetching the current cart Items data on the cart page even after refresh
        setCartItems(response.data.cartData);
    }


    // to check the cartItems we are using the useEffect
    // useEffect(() => {
    //      console.log(cartItems);
    // },[cartItems])

    // To caluculate the total cart value
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            // if the count of particular item is greater than 0 then we can add
            if (cartItems[item] > 0) {
                // first we need the price of that particular item, using the food_list
                // by using this we can get complete object of that particular item
                // so we can access properties of the object
                let itemInfo = food_list.find((product) => product._id === item);
                totalAmount += itemInfo.price * cartItems[item];
                // cartItems[item] to get the quantity
            }
        }
        return totalAmount;
    }


    // this is the function for fetching food items on the frontend
    const fetchFoodList = async () => {
        const response = await axios.get(url +"/api/food/list");
        setFoodList(response.data.data);
    }

    // after we are login on the website, if we reload we are getting loggedout
    // so for this we need to set the localStorage token to the setToken because as long
    // as the token avaialable we are not going to logged out unless we logut ourselves
    // for this we are using useEffect()

    useEffect(() => {
        // to load the data
        async function loadData() {
            await fetchFoodList();

            // means if a token is available in localStorage
            // then set it as a token
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"))

                // the cartItems remains same with their count even
                // after we refresh the page
                await loadCartData(localStorage.getItem("token"));
            }
        }
        loadData();
    }, []);

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;
