import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import { FaCheck } from 'react-icons/fa'
/*import './CustomersUpdateStyle.css'*/


export function ProductsUpdate() {
    let navigate = useNavigate();
    const { id } = useParams();
    const URL = 'https://localhost:7114/api/products'
    const [data, setData] = useState({
        id: "",
        name: "",
        price: "",

    })


    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: response } = await axios.get(URL + '/' + ':id');
                setData(response);
            } catch (error) {
                console.error(error.message);
            }
        }

        fetchData();
    }, []);



    useEffect(() => {
        loadProduct();
    }, []);



    function changeHandler(e) {
        setData({ ...data, [e.target.name]: e.target.value });
    };


    const submitHandler = async (e) => {
        e.preventDefault();
        await axios.put(`https://localhost:7114/api/products/${id}`, data);
        navigate("/products");
    };

    const loadProduct = async () => {
        const result = await axios.get(`https://localhost:7114/api/products/${id}`)
        setData(result.data)
    }


    return (
        <>
            <form
                onSubmit={(e) => submitHandler(e)}
                className="ui form">
                <h1>Update Product</h1>
                <div className="field">
                    <label>Id</label>
                    <input
                        onChange={(e) => changeHandler(e)}
                        value={data.id}
                        type="number"
                        id="id"
                        placeholder="id" />
                </div>
                <div className="field">
                    <label>Name</label>
                    <input
                        onChange={(e) => changeHandler(e)}
                        value={data.name}
                        name="name"
                        type="text"
                        id="name"
                        placeholder="Name" />
                </div>
                <div className="field">
                    <label>Price</label>
                    <input
                        onChange={(e) => changeHandler(e)}
                        value={data.price}
                        name="price"
                        type="text"
                        id="price"
                        placeholder="price" />
                </div>
                <button className="ui blue button" type="submit"><FaCheck />Update</button>
                <button className="ui black button">Close</button>
            </form>
        </>
    )
}



export default ProductsUpdate;