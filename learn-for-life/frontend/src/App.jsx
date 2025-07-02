import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Login from './components/auth/Login';
import Register from './components/auth/Register';
import GameWrapper from './components/GameWrapper';
import PrivateRoute from './components/PrivateRoute';
import Welcome from './components/Welcome';
import { WipeProvider } from './components/WipeContext';

function App() {
  return (
    <WipeProvider>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/game"
          element={
            <PrivateRoute>
              <GameWrapper />
            </PrivateRoute>
          }
        />
      </Routes>
    </WipeProvider>
  );
}

export default App;
