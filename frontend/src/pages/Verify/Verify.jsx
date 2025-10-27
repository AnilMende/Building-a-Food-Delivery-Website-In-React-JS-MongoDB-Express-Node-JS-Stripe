import React, { useEffect } from "react";
import styled from "styled-components";
import { useContext } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

const Verify =  () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const success = searchParams.get("true");
    const orderId = searchParams.get("orderId");

    // importing the backend url from the context api
    const {url} = useContext(StoreContext);
    const navigate = useNavigate();

    const verifyPayment = async() => {
        const response = await axios.post(url+"/api/order/verify", {success, orderId});

        if(response.data.success){
            navigate("/myOrders")
        }else{
            navigate("/")
        }
    }

    useEffect(() => {
        verifyPayment();
    },[])

    return(
        <VerifyContainer>

            <div className="spinner">

            </div>
        </VerifyContainer>
    )
}

export default Verify;

const VerifyContainer = styled.div`
      min-height: 60vh;
      display: grid;

      .spinner{
         width: 100px;
         height: 100px;
         place-self: center;
         border: 5px solid #bdbdbd;
         border-top-color: tomato;
         border-radius: 50%;
         animation: rotate 1s infinite;
      }

      @keyframes rotate {
        100%{
            transform: rotate(360deg);
        }
      }
`;
