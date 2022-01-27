import React, { useState } from "react";
import { signup } from '../../lib/requests_auth'
import { Link } from "react-router-dom";


const Register = () => {

    const [input, setInput] = useState({
        "first_name": '',
        "last_name": '',
        "email": '',
        "password": '',
        "password2": ''
    })

    const [error, setError] = useState('')

    function handleChange(event){
        let new_input = {
            ...input,
            [event.target.name]: event.target.value
        }
        setInput(new_input)
    }

    async function handleSubmit(event){
        event.preventDefault()
        if (input.password !== input.password2){
            setError('Passwords must match. Please try again.')
        } else {
            let payload = {...input}
            delete payload['password2']
            let data = await signup(payload)
            console.log(data);
        }
    }

    return (
        <>
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
            <input onChange = {handleChange} name='first_name' type='text' placeholder="first name" required></input>
            <input onChange = {handleChange} name='last_name' type='text' placeholder="last name" required></input>
            <input onChange = {handleChange} name='email' type='email' placeholder="email" required></input>
            <input onChange = {handleChange} name='password' type='password' placeholder="password" required></input>
            <input onChange = {handleChange} name='password2' type='password' placeholder="confirm password" required></input>
            <input type="submit" value='Sign Up' />
        </form>
        <p>Already have an account? <Link to='/login'>Sign In</Link></p>
        </>
    )
}

export default Register