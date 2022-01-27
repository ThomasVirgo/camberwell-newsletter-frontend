import React from "react";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { ProtectedRoute, Login, Register, Verify, Dashboard } from './pages'

const App = () => {
  return (
    <>
      <h1 id='Newsletter Header' className="text-3xl font-bold underline">
        142A Newsletter
      </h1>

      <BrowserRouter>
        <Routes>
            <Route exact path="login" element={<Login />} />
            <Route exact path="register" element={<Register />} />
            <Route exact path="verify/:code" element={<Verify />} />
            <Route element={<ProtectedRoute/>}>
              <Route exact path="dashboard" element={<Dashboard />} />
            </Route>
        </Routes>
      </BrowserRouter>

    </>

  );
}

export default App;
