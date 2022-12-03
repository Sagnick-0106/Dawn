import React, { useState } from 'react';
import TextInput from '../fields/textInput/textInput';
import Button from '../fields/button/button';
import * as UserService from '../../services/user';
import { useNavigate } from 'react-router-dom';

import './auth.css';

export default function Login () {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const onLogin = async () => {
    const userMetadata = await  UserService.login(email, password);
    if (userMetadata?._id) {
      navigate('/');
    }
  };

  const onRegister = () => navigate('/register');

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2 className="text-center">Welcome back!</h2>
        <form>
          <TextInput
            label="Email"
            value={email}
            setValue={setEmail}
            type="email"
            name="email"
          />
          <TextInput
            label="Password"
            value={password}
            setValue={setPassword}
            type="password"
            name="password"
          />
          <Button onClick={onLogin}>
            Log In
          </Button>
        </form>
        <div className="help-text">
          <span>Need an account? </span>
          <span
            onClick={onRegister}
            className="text-link"
            >
              Register
          </span>
        </div>
      </div>
    </div>
  );
};
