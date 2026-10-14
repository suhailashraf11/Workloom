
import { Routes, Route, Navigate } from 'react-router';

import Login from './pages/Login/Login.jsx';
import Signup from './pages/Signup/Signup.jsx';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword.jsx';

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to="/login" replace />}
      />

      <Route path="/login" element={<Login />} />

      <Route path="/signup" element={<Signup />} />

      <Route
        path="/forgot-password"
        element={<ForgotPassword />}
      />
    </Routes>
  );
}

export default App;
