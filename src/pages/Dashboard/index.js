import React, { useContext } from "react";
import { authContext } from '../../contexts/AuthContext';
import { Route, Routes, Link } from "react-router-dom";
import { Posts, Suggestions,Account } from "..";
import { logout } from "../../lib/requests_auth";

const Dashboard = () => {
    const { auth, setAuthData } = useContext(authContext);

    async function logoutUser(){
        const data = await logout()
        localStorage.clear()
        setAuthData(null)
        console.log(data);
    }

    return (
        <>
        <nav>
            <Link to="account">{auth.data.first_name}</Link>
            <Link to="posts">Posts</Link>
            <Link to="suggestions">Suggestion Box</Link>
            <button onClick = {logoutUser}>Logout</button>
        </nav>
        <Routes>
            <Route path="account" element={<Account />} />
            <Route path="posts" element={<Posts />} />
            <Route path="suggestions" element={<Suggestions />} />
        </Routes>
        </>
    )
}

export default Dashboard