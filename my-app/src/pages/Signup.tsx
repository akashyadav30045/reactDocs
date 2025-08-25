import React, { useState, type ChangeEvent, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils/utils';

interface SignupInfo {
  name: string;
  email: string;
  password: string;
}

const Signup: React.FC = () => {
  const [signupInfo, setSignupInfo] = useState<SignupInfo>({
    name: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignupInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { name, email, password } = signupInfo;
    if (!name || !email || !password) {
      return handleError('name, email and password are required');
    }

    try {
      const url = 'http://localhost:3001/auth/register';
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(signupInfo)
      });

      const result: {
        success?: boolean;
        message?: string;
        error?: { details?: { message: string }[] };
      } = await response.json();

      const { success, message, error } = result;

      if (success) {
        handleSuccess(message || 'Signup successful');
        setTimeout(() => navigate('/login'), 1000);
      } else if (error?.details) {
        handleError(error.details[0].message);
      } else {
        handleError(message || 'Signup failed');
      }

      console.log(result);
    } catch (err: unknown) {
      handleError(err instanceof Error ? err.message : String(err));
    }
  };

  return (
    <div className="container">
      <h1>Signup</h1>
      <form onSubmit={handleSignup}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            onChange={handleChange}
            type="text"
            name="name"
            autoFocus
            placeholder="Enter your name..."
            value={signupInfo.name}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            onChange={handleChange}
            type="email"
            name="email"
            placeholder="Enter your email..."
            value={signupInfo.email}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            onChange={handleChange}
            type="password"
            name="password"
            placeholder="Enter your password..."
            value={signupInfo.password}
          />
        </div>
        <button type="submit">Signup</button>
        <span>
          Already have an account? <Link to="/login">Login</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Signup;
