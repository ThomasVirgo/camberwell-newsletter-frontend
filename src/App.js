import React from "react";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { ProtectedRoute, Login, Register, Verify, Dashboard, ResetPassword } from './pages'

const App = () => {
  return (
      

      <BrowserRouter>
        <Routes>
            <Route exact path="" element={<Login />} />
            <Route exact path="login" element={<Login />} />
            <Route exact path="login/:code" element={<ResetPassword />} />
            <Route exact path="register" element={<Register />} />
            <Route exact path="verify/:code" element={<Verify />} />
            <Route element={<ProtectedRoute/>}>
              <Route exact path="dashboard/*" element={<Dashboard />} />
            </Route>
        </Routes>
      </BrowserRouter>


  );
}

export default App;
