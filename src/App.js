import React from "react";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { ProtectedRoute, Login, Register, Verify, Dashboard } from './pages'

const App = () => {
  return (
      

      <BrowserRouter>
        <Routes>
            <Route exact path="login" element={<Login />} />
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
