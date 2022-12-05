import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import { FaCheck } from 'react-icons/fa'



export function StoresUpdate() {
    let navigate = useNavigate();
    const { id } = useParams();
    const URL = 'https://localhost:7114/api/stores'
    const [data, setData] = useState({
        name: "",
        address: "",

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
        loadStore();
    }, []);



    function changeHandler(e) {
        setData({ ...data, [e.target.name]: e.target.value });
    };


    const submitHandler = async (e) => {
        e.preventDefault();
        await axios.put(`https://localhost:7114/api/stores/${id}`, data);
        navigate("/stores");
    };

    const loadStore = async () => {
        const result = await axios.get(`https://localhost:7114/api/stores/${id}`)
        setData(result.data)
    }

    const closeHandler = () => {
        navigate("/customers");
    }


    return (
        <>
            <form
                onSubmit={(e) => submitHandler(e)}
                className="ui form">
                <h1>Update Store</h1>
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
                    <label>Address</label>
                    <input
                        onChange={(e) => changeHandler(e)}
                        value={data.address}
                        name="address"
                        type="text"
                        id="address"
                        placeholder="Address" />
                </div>
                <button className="ui blue button" type="submit"><FaCheck />Update</button>
                <button className="ui black button" onChange={(e) => closeHandler(e)}>Close</button>
            </form>
        </>
    )
}



export default StoresUpdate;