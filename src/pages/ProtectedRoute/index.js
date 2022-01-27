import React, { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { authContext } from '../../contexts/AuthContext';

const ProtectedRoute = () => {

    const { auth } = useContext(authContext);
    const { loading } = auth;

    if (loading){
        return <p>Loading...</p>
    }
    
    if (!auth.data){
        console.log('navigating to login');
        return <Navigate to="/login" />
    }

    return <Outlet/>
    }

export default ProtectedRoute;
