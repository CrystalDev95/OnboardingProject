import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import './ProductsCreateStyle.css'
import { FaInfoCircle } from 'react-icons/fa'



export function ProductsCreate({ closeModal }) {
    let navigate = useNavigate();

    const PRODUCT_REGEX = /^[A-z][A-z]{2,23}$/;
    const PRICE_REGEX = /^\d+(,\d{1,2})?$/;
    

    const productRef = useRef();
    const priceRef = useRef();
    const errRef = useRef();

    const [id, setId] = useState('');


    const [product, setProduct] = useState('');
    const [validProduct, setValidProduct] = useState(false);
    const [productFocus, setProductFocus] = useState(false);

    const [price, setPrice] = useState('');
    const [validPrice, setValidPrice] = useState(false);
    const [priceFocus, setPriceFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    const URL = 'https://localhost:7114/api/products'



    useEffect(() => {
        productRef.current.focus();
    }, [])

    useEffect(() => {
        setValidProduct(PRODUCT_REGEX.test(product));
    }, [product])

    useEffect(() => {
        setValidPrice(PRICE_REGEX.test(price));
    }, [price])



    useEffect(() => {
        setErrMsg('');
    }, [product, price])




    const submitHandler = async (e) => {
        e.preventDefault();
        const v1 = PRODUCT_REGEX.test(product);
        const v2 = PRICE_REGEX.test(price);
        if (!v1 || !v2) {
            setErrMsg("Invalid Entry");
            return;
        }
        try {
            const response = await axios.post(URL, {
                id: id,
                name: product,
                price: price
            })
            navigate("/products");
            console.log(response?.product);
            console.log(JSON.stringify(response))
            setSuccess(true);
            setProduct('');
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Error, please try again');
            } else {
                setErrMsg('Registration Failed')
            }
            errRef.current.focus();
        }
    }




    return (
        <div>
            <section>
                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            </section>
            <form
                onSubmit={submitHandler}
                className="ui form">
                <div className="field">
                    <label>Id</label>
                    <input
                        onChange={(e) => setId(e.target.value)}
                        value={product.id}
                        type="number"
                        id="id"
                        placeholder="id" />
                </div>
                <div className="field">
                    <label>Product</label>
                    <input
                        onChange={(e) => setProduct(e.target.value)}
                        value={product.name}
                        type="text"
                        id="name"
                        placeholder="Product Name"
                        ref={productRef}
                        required
                        aria-invalid={validProduct ? "false" : "true"}
                        aria-describedby="uidnote"
                        onFocus={() => setProductFocus(true)}
                        onBlur={() => setProductFocus(false)}
                    />
                    <p id="uidnote" className={productFocus && product && !validProduct ? "instructions" : "offscreen"}>
                        4 to 24 characters.<br />
                        Must begin with a letter.<br />
                        Only letters are allowed.
                    </p>
                </div>
                <div className="field">
                    <label>Price</label>
                    <input
                        onChange={(e) => setPrice(e.target.value)}
                        value={product.price}
                        type="number"
                        id="price"
                        placeholder="Product price"
                        ref={priceRef}
                        required
                        aria-invalid={validPrice ? "false" : "true"}
                        aria-describedby="uidnote"
                        onFocus={() => setPriceFocus(true)}
                        onBlur={() => setPriceFocus(false)}
                    />
                    <p id="pricenote" className={priceFocus && !validPrice ? "instructions" : "offscreen"}>
                        <FaInfoCircle />
                        include numbers only<br />
                    </p>
                </div>
                <button
                    className="ui green button"
                    type="submit"
                    disabled={!validProduct ? true : false}>
                    Add Product
                </button>
                <button
                    className="ui black button"
                    onClick={() => closeModal(false)} >
                    Close
                </button>
            </form>
        </div>

    )
}

export default ProductsCreate;