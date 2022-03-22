import React, { useState, useContext } from "react";
import { login, getUser, passwordReset } from "../../lib/requests_auth";
import { useNavigate, Link } from "react-router-dom";
import { authContext } from "../../contexts/AuthContext";


const Login = () => {
    const [input, setInput] = useState({
        "email": '',
        "password": '',
    })
    const navigate = useNavigate();
    const [error, setError] = useState('')
    const [resetEmail, setResetEmail] = useState('')
    const { setAuthData } = useContext(authContext);
    const [loading, setLoading] = useState(false)
    const [resetSent, setResetSent] = useState(false)
    const [resetError, setResetError] = useState('')

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

    function changeEmail(event){
        setResetEmail(event.target.value)
    }

    async function sendResetEmail(){
        if (resetEmail.length === 0){
            return
        }
        setLoading(true)
        let [data, isError] = await passwordReset({
            "email": resetEmail
        })
        if (!isError){
            setResetSent(true)
            setResetError("")
        } else {
            setResetError(data.data.detail)
        }
        setResetEmail("")
        setLoading(false)
        console.log(data);
    }

    return (
        <>
        <h1 className="text-2xl text-center mt-24">Login</h1>
        <div className="max-w-2xl mx-auto mt-3.5">
            <div className="m-5">
                <form onSubmit={handleSubmit}>
                    <div className="relative z-0 mb-6 w-full group">
                        <label htmlFor="email" className="">Email</label>
                        <input onChange = {handleChange} name='email' type="email" id="email" placeholder="email@gmail.com" className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-900 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" required />
                    </div>
                    <div className="relative z-0 mb-6 w-full group">
                        <label htmlFor="password">Password</label>
                        <input onChange = {handleChange} name='password' type="password" placeholder="password" id="floating_password" className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-900 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" required />
                    </div>
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                </form>
            </div>
        </div>
        <div className="w-full flex flex-row justify-center">
            <p>Don't have an account? <Link to='/register' className="underline">Register Here</Link></p>
        </div>
        <div className="w-full flex flex-row justify-center mt-2">
            <p className="text-red-700">{error}</p>
        </div>
        <div className="max-w-2xl mx-auto mt-5">
            <div className="m-5 flex flex-col gap-2 justify-center">
                <p>Forgotten password?</p>
                <input onChange={changeEmail} type="email" placeholder="enter email..." value={resetEmail} className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-900 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" />
                <button disabled={resetSent} onClick = {sendResetEmail} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{loading ? 'sending reset email...' : resetSent ? 'Reset Email Sent!' : 'Send Reset Email'}</button>
            </div>
        </div>
        <div className="w-full flex flex-row justify-center mt-2">
            <p className="text-red-700">{resetError}</p>
        </div>
        </>
    )
}

export default Login