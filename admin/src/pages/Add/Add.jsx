import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { assets } from "../../assets/assets";
import axios from 'axios';
import { toast } from "react-toastify";

const Add = ({url}) => {

    // this state is for uploading the image
    const [image, setImage] = useState(false);
    // to set the default category as salad using the data state
    const [data, setData] = useState({
        name: "",
        description: "",
        price: "",
        category: "Salad"
    })

    // this onChangehandler helpful in updating the existing value with the new value
    // of the name, price, description and category
    // in below name is fields and value is the new value
    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        // here name is the field name, we will update it with
        // the new updated value
        setData((data) => ({ ...data, [name]: value }))
    }

    // to check whether our data is getting updated or not
    // we are using the useEffect
    // useEffect(() => {
    //     console.log(data);
    // }, [data])


    // if we submit the form the onSubmitHandler will gets executed
    const onSubmitHandler = async (event) => {
        // to prevent the page from reloading we are using preventDefault()
        event.preventDefault();

        const formData = new FormData();
        // append the filedname and value to formData
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("price", Number(data.price));
        formData.append("category", data.category);
        // here image is the state
        formData.append("image", image);

        // to call the api we use axios
        // /api/food/add is the path for adding food items
        // formData is added in the database
        // and image will be stored in the backend folder
        const response = await axios.post(`${url}/api/food/add`, formData);
        // checking whether our response is success or not
        if (response.data.success) {
            // if response is success then reset all the filed values
            // this implies that our data is successfully added into the database
            setData({
                name: "",
                description: "",
                price: "",
                category: "Salad"
            })
            // setting setImage to false will reset the image
            setImage(false);
            // for displaying the food added upon the successful response
            toast.success(response.data.message)
        }else{

        }
    }

    return (
        <AddContainer>

            <form className="flex-col" onSubmit={onSubmitHandler}>

                <div className="add-img-upload flex-col">
                    <p>Upload Image</p>

                    <label htmlFor="image">
                        {/* to make the selected image display in the place of default upload image */}
                        {/* if we have uploaded image it will be displayed else it will be default upload image */}
                        <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
                    </label>

                    <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden required />
                </div>

                <div className="add-product-name flex-col">
                    <p>Product Name</p>
                    <input onChange={onChangeHandler} value={data.name} type="text" name="name" placeholder="Type Here" />
                </div>

                <div className="add-product-description flex-col">
                    <p>Product Description</p>
                    <textarea onChange={onChangeHandler} value={data.description} name="description" rows="6" placeholder="Write Content Here"></textarea>
                </div>

                <div className="add-category-price">
                    <div className="add-category flex-col">
                        <p>Product Category</p>
                        <select onChange={onChangeHandler} name="category">
                            <option value="Salad">Salad</option>
                            <option value="Rolls">Rolls</option>
                            <option value="Deserts">Deserts</option>
                            <option value="Sandwich">Sandwich</option>
                            <option value="Cake">Cake</option>
                            <option value="Pure Veg">Pure Veg</option>
                            <option value="Pasta">Pasta</option>
                            <option value="Noodles">Noodles</option>
                        </select>
                    </div>
                    <div className="add-price flex-col">
                        <p>Product Price</p>
                        <input onChange={onChangeHandler} value={data.price} type="Number" name="price" placeholder="$20" />
                    </div>

                </div>
                <button type="submit" className="add-btn">ADD</button>
            </form>
        </AddContainer>
    )
}

export default Add;

const AddContainer = styled.div`
      width: 70%;
      margin-left: max(5vw,25px);
      margin-top: 50px;
      color: #6d6d6d;
      font-size: 16px;

      form{
        gap: 20px;
      }

      .add-img-upload img{
        width: 120px;
        cursor: pointer;
      }

      .add-product-name, .add-product-description{
        width: max(40%, 280px);
      }

      .add-product-name input, .add-product-description textarea{
        padding: 10px;
      }

      .add-category-price{
        display: flex;
        gap: 30px;
      }

      .add-category-price select, .add-category-price input{
        max-width: 120px;
        padding: 10px;
      }

      .add-btn{
        max-width: 120px;
        border: none;
        padding: 10px;
        background-color: black;
        color: white;
        cursor: pointer;
      }
`;