import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { toast } from "react-toastify";

const List = ({url}) => {


    const [list, setList] = useState([]);

    const fetchList = async () => {

        const response = await axios.get(`${url}/api/food/list`);
        // console.log(response.data);
        if(response.data.success){
            setList(response.data.data);
        }else{
            toast.error("Error");
        }
    }

    useEffect(() => {
        fetchList();
    },[])

    // removing the FoodItems by using the cross
    const removeFood = async (foodId) => {

        const response = await axios.post(`${url}/api/food/remove`,{id:foodId});

        if(response.data.success){
            toast.success(response.data.message);
        }
        else{
            toast.error("Error");
        }
        // after removing the item we again need to fetch the data for that
        await fetchList();
    }

    return(
        <ListContainer>
            <p className="food-list">All Foods List</p>
            <div className="list-table">
                <div className="list-table-format title">
                    <b>Image</b>
                    <b>Name</b>
                    <b>Category</b>
                    <b>Price</b>
                    <b>Action</b>
                </div>
                {/* for displaying the items using the list array */}
                {
                    list.map((item,index) => {
                        return(
                            <div key={index} className="list-table-format">
                                <img src={`${url}/images/` + item.image} alt="" />
                                <p>{item.name}</p>
                                <p>{item.category}</p>
                                <p>{item.price}</p>
                                <p onClick={() => removeFood(item._id)} className="cross">X</p>
                            </div>
                        )
                    })
                }
            </div>
        </ListContainer>
    )
}

export default List;

const ListContainer = styled.div`
      margin:50px;
      width: 100%;

      .food-list{
        margin-bottom: 15px;
        font-weight: 600;
      }

      .list-table-format{
        display: grid;
        grid-template-columns: 0.5fr 2fr 1fr 1fr 0.5fr;
        align-items: center;
        gap: 10px;
        padding: 12px 15px;
        border: 1px solid #cacaca;
      }
      .list-table-format.title{
        background-color: #f9f9f9;
      }

      .list-table-format img{
        width: 50px;
      }

      /* making responsive */
      @media (max-width:600px){
        .list-table-format{
            grid-template-columns:1fr 3fr 1fr ;
            gap: 15px;
        }
        .list-table-format.title{
            display: none;
        }
      }
`;