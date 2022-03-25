import React from "react";
import { Route, Routes } from "react-router-dom";
import { Posts, Account, Meals, Stats } from "..";
import { Nav } from "../../components";

const Dashboard = () => {

    return (
        <>
        <Nav/>
        <Routes>
            <Route path="account" element={<Account />} />
            <Route path="posts" element={<Posts />} />
            <Route path="meals" element={<Meals />} />
            <Route path="stats" element={<Stats />} />
        </Routes>
        </>
    )
}

export default Dashboard