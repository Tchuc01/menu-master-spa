import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './assets/stylesheets/style.css';
import Admin from './pages/Admin';
import Home from './pages/Index';
import Login from './pages/Login';
import Register from './pages/Register';
import Restaurant from './pages/Restaurant';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/:username" element={<Restaurant />} />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
