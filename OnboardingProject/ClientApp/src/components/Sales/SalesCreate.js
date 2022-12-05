import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";



export function SalesCreate() {
    let navigate = useNavigate();

    const [sale, setSale] = useState('');
    const [id, setId] = useState('');
    const [dateSold, setdateSold] = useState('');
    const [storeId, setstoreId] = useState('');
    const [productId, setproductId] = useState('');
    const [customerId, setcustomerId] = useState('');


    const [store, setStore] = useState([]);
    const [product, setProduct] = useState([]);
    const [customer, setCustomer] = useState([]);



    ////Fetch store data
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get('https://localhost:7114/api/stores');
            setStore(result.data);
        }
        fetchData();
    }, []);


    ////Fetch product data
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get('https://localhost:7114/api/products');
            setProduct(result.data);
        }
        fetchData();
    }, []);


    ////Fetch customer data
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get('https://localhost:7114/api/customers');
            setCustomer(result.data);
        }
        fetchData();
    }, []);





    const submitHandler = async (e) => {
        e.preventDefault();
        try { 
            const response = await axios.post('https://localhost:7114/api/sales', {
                id: id,
                productId: productId,
                customerId: customerId,
                storeId: storeId,
                dateSold: dateSold
            })
            navigate("/sales");
            setSale(response.data);
        } catch (err) {
            console.log(err.response.request.response)
            if (!err?.response) {
                console.log('No Server Response');
            }
        }
    }





    return (
        <div>
            <form onSubmit={submitHandler}
                className="ui form">

                <div className="field">
                    <label>Id</label>
                    <input
                        onChange={(e) => setId(e.target.value)}
                        value={sale.id}
                        type="number"
                        id="id"
                        placeholder="id" />
                </div>

                <div className="field">
                <label>ProductId</label>
                <select>
                    {product.map(p => (
                        <option
                            key={p.id}
                            onChange={(e) => setproductId(e.target.value)}
                            value={sale.productId}
                            type="number"
                            id="productId"
                            placeholder="Product id"
                        >
                            {p.id}
                        </option>
                    ))}
                </select>
                </div>


                <div className="field">
                <label>customerId</label>
                <select>
                    {customer.map(c => (
                        <option
                            key={c.id}
                            onChange={(e) => setcustomerId(e.target.value)}
                            value={sale.customerId}
                            type="number"
                            id="customerId"
                            placeholder="Customer id"
                        >
                            {c.id}
                        </option>
                    ))}
                    </select>
                </div>


                <div className="field">
                <label>StoreId</label>
                <select>
                    {store.map(s => (
                        <option
                            key={s.id}
                            onChange={(e) => setstoreId(e.target.value)}
                            value={sale.storeId}
                            type="number"
                            id="storeId"
                            placeholder="Store id"
                        >
                            {s.id}
                        </option>
                    ))}
                    </select>
                                    </div>


                <div className="field">
                    <label>Date Sold</label>
                    <input
                        onChange={(e) => setdateSold(e.target.value)}
                        value={sale.dateSold}
                        id="dateSold"
                        placeholder="Date Sold"
                        type="datetime-local"
                    />
                </div>





                <button
                    className="ui green button"
                    type="submit">
                    Add Sales
                </button>
                <button
                    className="ui black button">
                    Close
                </button>
            </form>
        </div>

    )
}