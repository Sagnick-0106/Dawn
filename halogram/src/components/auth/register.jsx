import React, { useState } from 'react';
import TextInput from '../fields/textInput/textInput';
import Button from '../fields/button/button';
import * as UserService from '../../services/User';
import { useNavigate } from 'react-router-dom';

export default function Register () {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const onRegister = async () => {
    const userMetadata = await  UserService.register({ name, email, password });
    if (userMetadata?._id) {
      navigate('/');
    }
  };

  const onLogin = () => navigate('/login');

  return (
    <div className="auth-page">
      <div className="auth-card">
          <h2 className="text-center">Create an account</h2>
          <form>
            <TextInput
              label="Name"
              value={name}
              setValue={setName}
              type="name"
              name="name"
            />
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
            <Button onClick={onRegister}>
              Continue
            </Button>
          </form>
          <div className="help-text">
            <span>Already have an account? </span>
            <span
              onClick={onLogin}
              className="text-link"
              >
                Log In
            </span>
        </div>
      </div>
    </div>
  );
};
