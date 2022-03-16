import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { passwordResetVerify } from "../../lib/requests_auth";

const ResetPassword = () => {
    let params = useParams();
    const [error, setError] = useState("")
    const [input, setInput] = useState({
        "password": "",
        "password2": ""
    })
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)

    async function handleSubmit(event){
        event.preventDefault()
        if (input.password !== input.password2){
            setError('Passwords must match.')
            setInput({
                "password": "",
                "password2": ""
            })
            return
        }
        let payload = {
            "password": input.password,
            "code": params.code,
        }
        setLoading(true)
        const [data, isError] = await passwordResetVerify(payload)
        setLoading(false)
        if (isError){
            setError(data.data.detail)
            return
        }
        setSuccess(true)
        setInput({
            "password": "",
            "password2": ""
        })
        console.log(data);
    }

    function handleChange(event){
        let newInput = {...input}
        newInput[event.target.name] = event.target.value
        setInput(newInput)
    }

    return (
        <>
        <h1 className="text-2xl text-center mt-32">Reset Password</h1>
        <div className="max-w-2xl mx-auto mt-3.5">
        <form onSubmit={handleSubmit}>
                <div className="relative z-0 mb-6 w-full group">
                <input value={input.password} onChange = {handleChange} name='password' type="password" id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label htmlFor="password" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">New Password</label>
                </div>
                <div className="relative z-0 mb-6 w-full group">
                    <input value={input.password2} onChange = {handleChange} name='password2' type="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label htmlFor="password2" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm New Password</label>
                </div>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{loading ? 'loading...': 'Submit'}</button>
        </form>
        <div className="w-full flex flex-row justify-center mt-2">
                <p className="text-red-700">{error}</p>
        </div>
        <div className="w-full flex flex-row justify-center mt-2">
                {success && <p className="text-green-700">Your password has been successfully reset, please login <Link className="underline" to='/login'>here</Link></p>}
        </div>
        </div>
        </>
    )
}

export default ResetPassword;
