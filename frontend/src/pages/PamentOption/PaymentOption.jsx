import React from "react";
import { useState } from "react";
import styled from "styled-components";

const PaymentOption = () => {

    const [selected, setSelected] = useState('cod');

    return (
        <PaymentContainer>
            <h2 className="Title">Payment Method</h2>

            <PaymentOptionContainer selected={selected === "cod"}>
                <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={selected === "cod"}
                    onChange={() => setSelected("cod")}
                />
                <span>COD (Cash On Delivery)</span>
            </PaymentOptionContainer>

            <PaymentOptionContainer selected={selected === "stripe"}>
                <input
                    type="radio"
                    name="payment"
                    value="stripe"
                    checked={selected === "stripe"}
                    onChange={() => setSelected("stripe")}
                />
                <span>Stripe (Credit / Debit)</span>
            </PaymentOptionContainer>

        </PaymentContainer>
    )
}

export default PaymentOption;

const PaymentContainer = styled.div`
      width: 320px;
      margin: 10px 0px;

      .Title{
        margin-bottom: 30px;
      }
`;

const PaymentOptionContainer = styled.label`
      display: flex;
      align-items: center;
      gap: 10px;
      border: 1.5px solid ${({selected}) =>(selected ? "#ff7f50":"#b1aaaa")};
      background-color: ${({selected}) => (selected ? "#ffeae0" : "#fff")};
      padding: 12px 18px;
      margin-bottom: 10px;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.2s ease;

      input{
        accent-color: tomato;
        cursor: pointer;
        transform: scale(1.1);
      }

      span{
        font-size: 0.95rem;
      }

      &:hover{
        border-color: #ff5f50;
        background-color: #fff4ee;
      }
`;

