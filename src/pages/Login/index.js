import React, { useState, useContext } from "react";
import { login, getUser } from "../../lib/requests_auth";
import { useNavigate } from "react-router-dom";
import { authContext } from "../../contexts/AuthContext";


const Login = () => {
    const [input, setInput] = useState({
        "email": '',
        "password": '',
    })
    const navigate = useNavigate();
    const [error, setError] = useState('')
    const { setAuthData } = useContext(authContext);

    function handleChange(event){
        let newInput = {
            ...input,
            [event.target.name]: event.target.value
        }
        setInput(newInput)
        setError('')
    }

    async function handleSubmit(event){
        event.preventDefault()
        let [data, isError] = await login(input)
        if (isError){
            setError(data.data.detail)
        } else {
            let [userData, isUserError] = await getUser(data.token)
            setAuthData(userData)
            localStorage.setItem('token', data.token)
            navigate("/dashboard")
        }
    }

    return (
        <>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
            <input onChange={handleChange} name="email" type='email' placeholder="email" required></input>
            <input onChange={handleChange} name="password" type='password' placeholder="password" required></input>
            <input type='submit' value='Login'></input>
        </form>
        <p>{error}</p>
        </>
    )
}

export default Login