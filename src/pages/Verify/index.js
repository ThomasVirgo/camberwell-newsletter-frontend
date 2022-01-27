import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { verify } from "../../lib/requests_auth";

const Verify = () => {
    let params = useParams();
    let [error, setError] = useState('')
    let [isVerified, setIsVerified] = useState(false)
    
    useEffect(() => {
        async function verifyUser(){
            let [data, isError] = await verify(params.code)
            if (isError){
                setError('The code you have used is invalid, please try signing up again.')
            } else {
                setIsVerified(true)
            }
        }
        verifyUser()
    }, [params.code])


    return (
        <>
        <h1>Verifying your account ...</h1>
        <p>{error}</p>
        {isVerified && <p>Your account has been successfully verified, please login <Link to='login'>here</Link></p>}
        </>
    )
}

export default Verify