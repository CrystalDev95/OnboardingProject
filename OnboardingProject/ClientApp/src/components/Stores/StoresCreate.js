import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import './StoresCreateStyle.css'
import { FaInfoCircle } from 'react-icons/fa'



export function StoresCreate() {
    let navigate = useNavigate();

    const USER_REGEX = /^([a-zA-z0-9/\\''(),-\s]{2,255})$/;
    const ADD_REGEX = /^([a-zA-z0-9/\\''(),-\s]{2,255})$/;

    const userRef = useRef();
    const addressRef = useRef();
    const errRef = useRef();

    const [id, setId] = useState('');

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [address, setAddress] = useState('');
    const [validAddress, setValidAddress] = useState(false);
    const [addressFocus, setAddressFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    const URL = 'https://localhost:7114/api/stores'



    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setValidName(USER_REGEX.test(user));
    }, [user])

    useEffect(() => {
        setValidAddress(ADD_REGEX.test(address));
    }, [address])



    useEffect(() => {
        setErrMsg('');
    }, [user, address])




    const submitHandler = async (e) => {
        e.preventDefault();
        const v1 = USER_REGEX.test(user);
        const v2 = ADD_REGEX.test(address);
        if (!v1 || !v2) {
            setErrMsg("Invalid Entry");
            return;
        }
        try {
            const response = await axios.post(URL, {
                id: id,
                name: user,
                address: address
            })
            navigate("/stores");
            console.log(response?.user);
            console.log(JSON.stringify(response))
            setSuccess(true);
            setUser('');
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
                        value={user.id}
                        type="number"
                        id="id"
                        placeholder="id" />
                </div>
                <div className="field">
                    <label>Name</label>
                    <input
                        onChange={(e) => setUser(e.target.value)}
                        value={user.name}
                        type="text"
                        id="name"
                        placeholder="Name"
                        ref={userRef}
                        required
                        aria-invalid={validName ? "false" : "true"}
                        aria-describedby="uidnote"
                        onFocus={() => setUserFocus(true)}
                        onBlur={() => setUserFocus(false)}
                    />
                    <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                        4 to 24 characters.<br />
                        Must begin with a letter.<br />
                        Only letters are allowed.
                    </p>
                </div>
                <div className="field">
                    <label>Address</label>
                    <input
                        onChange={(e) => setAddress(e.target.value)}
                        value={user.address}
                        type="text"
                        id="address"
                        placeholder="Address"
                        ref={addressRef}
                        required
                        aria-invalid={validAddress ? "false" : "true"}
                        aria-describedby="uidnote"
                        onFocus={() => setAddressFocus(true)}
                        onBlur={() => setAddressFocus(false)}
                    />
                    <p id="addressnote" className={addressFocus && !validAddress ? "instructions" : "offscreen"}>
                        <FaInfoCircle />
                        8 to 24 characters.<br />
                        Must include letters and numbers<br />
                    </p>
                </div>
                <button
                    className="ui green button"
                    type="submit"
                    disabled={!validName ? true : false}>
                    Add Store
                </button>
                <button
                    className="ui black button">
                    Close
                </button>
            </form>
        </div>

    )
}

export default StoresCreate;