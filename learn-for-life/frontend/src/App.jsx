import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import GameWrapper from "./components/GameWrapper";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Главная — только для авторизованных */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <GameWrapper />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
