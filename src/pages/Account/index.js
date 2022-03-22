import React, { useState } from "react";
import { changePassword } from "../../lib/requests_auth";

const Account = () => {
    const [input, setInput] = useState({
        "password": "",
        "password2": ""
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    function handleChange(event){
        let newInput = {...input}
        newInput[event.target.name] = event.target.value
        setInput(newInput)
    }

    async function handleSubmit(event){
        event.preventDefault()
        if (input.password !== input.password2){
            setError('Passwords must match.')
            return
        }
    }

    return (
        <>
        <h1 className="text-2xl text-center mt-24">Change Password</h1>
        <div className="max-w-2xl mx-auto mt-3.5">
            <div className="m-5">
                <form onSubmit={handleSubmit}>
                    <div className="relative z-0 mb-6 w-full group">
                        <label htmlFor="password">New Password</label>
                        <input onChange = {handleChange} value={input.password} name='password' type="password" className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-900 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" placeholder="New Password" required />
                    </div>
                    <div className="relative z-0 mb-6 w-full group">
                        <label htmlFor="password">Confirm New Password</label>
                        <input onChange = {handleChange} value={input.password2} name='password2' type="password" className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-900 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" placeholder="Confirm New Password" required />
                    </div>
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                </form>
            </div>
        </div>
        <div className="w-full flex flex-row justify-center mt-2">
            <p className="text-red-700">{error}</p>
        </div>
        </>
    )
}

export default Account