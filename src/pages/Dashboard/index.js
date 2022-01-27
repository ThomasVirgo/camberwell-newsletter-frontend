import React, { useContext } from "react";
import { authContext } from '../../contexts/AuthContext';

const Dashboard = () => {
    const { auth } = useContext(authContext);
    console.log(auth);
    return (
        <>
        <h1>Dashboard</h1>
        </>
    )
}

export default Dashboard