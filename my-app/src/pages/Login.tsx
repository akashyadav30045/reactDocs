import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils/utils';

interface LoginInfo {
  email: string;
  password: string;
}

interface LoginResponse {
  success?: boolean;
  message?: string;
  jwtToken?: string;
  name?: string;
  error?: { details?: { message: string }[] };
}

const Login: React.FC = () => {
  const [loginInfo, setLoginInfo] = useState<LoginInfo>({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = loginInfo;

    if (!email || !password) {
      return handleError('Email and password are required');
    }

    try {
      const url = 'http://localhost:3001/auth/login';
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginInfo),
      });

      const result: LoginResponse = await response.json();
      const { success, message, jwtToken, name, error } = result;

      if (success) {
        handleSuccess(message || 'Login successful');
        localStorage.setItem('token', jwtToken || '');
        localStorage.setItem('loggedInUser', name || '');
        setTimeout(() => navigate('/home'), 1000);
      } else if (error?.details) {
        handleError(error.details[0].message);
      } else {
        handleError(message || 'Login failed');
      }

      console.log(result);
    } catch (err: unknown) {
      handleError(err instanceof Error ? err.message : String(err));
    }
  };

  return (
    <div className="container">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            onChange={handleChange}
            type="email"
            name="email"
            placeholder="Enter your email..."
            value={loginInfo.email}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            onChange={handleChange}
            type="password"
            name="password"
            placeholder="Enter your password..."
            value={loginInfo.password}
          />
        </div>
        <button type="submit">Login</button>
        <span>
          Don't have an account? <Link to="/signup">Signup</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
