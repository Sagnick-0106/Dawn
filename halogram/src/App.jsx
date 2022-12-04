import logo from './logo.svg';
import React, { useEffect } from 'react';
import './App.css';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, shallowEqual } from 'react-redux';
import * as UserService from './services/user';
import Header from './components/header/header';
import Dashboard from './components/dashboard/dashboard';
import Login from './components/auth/login';
import Register from './components/auth/register';

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useSelector(store => store.user, shallowEqual);

  useEffect(() => {
    authenticate();
  }, [location]);

  const authenticate = async () => {
    if (isAuthenticated || ['/login', '/register'].includes(location.pathname)) {
      return;
    }
    const userMetadata = await UserService.authenticate();
    if (!userMetadata?._id) {
      navigate('/login');
    }
  }

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
};
