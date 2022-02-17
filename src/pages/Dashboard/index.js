import React from "react";
import { Route, Routes, Link } from "react-router-dom";
import { Posts, Account } from "..";
import { Nav } from "../../components";

const Dashboard = () => {

    return (
        <>
        <Nav/>
        <Routes>
            <Route path="account" element={<Account />} />
            <Route path="posts" element={<Posts />} />
        </Routes>
        </>
    )
}

export default Dashboard