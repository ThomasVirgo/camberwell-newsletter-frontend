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

    const [loading, setLoading] = useState(false)
    const [complete, setComplete] = useState(false)
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
            setLoading(true)
            let data = await signup(payload)
            setLoading(false)
            setComplete(true)
            setInput({
                "first_name": '',
                "last_name": '',
                "email": '',
                "password": '',
                "password2": ''
            })
            console.log(data);
        }
    }

    return (
        <>
        <h1 className="text-2xl text-center mt-24">Register</h1>
        <div className="max-w-2xl mx-auto mt-3.5">
            <div className="m-5">
                <form onSubmit={handleSubmit}>
                    <div className="relative z-0 mb-6 w-full group">
                        <label htmlFor="email" className="">Email</label>
                        <input value={input.email} onChange = {handleChange} name='email' type="email" id="email" placeholder="email" className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-900 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" required />
                    </div>
                    <div className="relative z-0 mb-6 w-full group">
                        <label htmlFor="password" className="">Password</label>
                        <input value={input.password} onChange = {handleChange} name='password' type="password" id="floating_password" placeholder="password" className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-900 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" required />
                    </div>
                    <div className="relative z-0 mb-6 w-full group">
                        <label htmlFor="password2" className="">Confirm password</label>
                        <input value={input.password2} onChange = {handleChange} name='password2' type='password' id="floating_repeat_password" placeholder="confirm password" className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-900 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" required />
                    </div>
                    <div className="grid xl:grid-cols-2 xl:gap-6">
                        <div className="relative z-0 mb-6 w-full group">
                            <label htmlFor="first_name" className="">First name</label>
                            <input value={input.first_name} type="text" onChange = {handleChange} name='first_name' id="floating_first_name" placeholder="first name" className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-900 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" required />
                        </div>
                        <div className="relative z-0 mb-6 w-full group">
                            <label htmlFor="last_name" className="">Last name</label>
                            <input value={input.last_name} type="text" onChange = {handleChange} name='last_name' id="floating_last_name" placeholder="last name" className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-900 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" required />
                        </div>
                    </div>
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{loading ? 'loading...' : 'Submit'}</button>
                    {complete && 
                    <div className="w-full flex flex-row justify-center">
                    <p className="m-5">Email sent! Please go to your email to verify your account.</p>
                    </div>
                    }
                </form>
            </div>
        </div>
        <div className="w-full flex flex-row justify-center">
            <p>Already have an account? <Link to='/login' className="underline">Sign In</Link></p>
        </div>
        </>
    )
}

export default Register