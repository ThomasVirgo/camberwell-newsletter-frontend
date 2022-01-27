import React, { createContext, useState, useEffect } from 'react';
import { getUser } from '../lib/requests_auth';

export const authContext = createContext({});

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ loading: true, data: null });

  const setAuthData = (data) => {
    setAuth({data: data});
  };

  useEffect(() => {
      async function verifyUser(){
          const [data, isError] = await getUser()
          if (!isError){
              setAuth({ loading: false, data: data});
          } else {
              setAuth({ loading: false, data: null})
          }
      }
      verifyUser()
  }, []);

  // if auth data changes, update this in localstorage
  useEffect(() => {
    localStorage.setItem('authData', JSON.stringify(auth.data));
  }, [auth.data]);

  return (
    <authContext.Provider value={{ auth, setAuthData }}>
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;