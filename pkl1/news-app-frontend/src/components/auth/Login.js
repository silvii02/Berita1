import React, { useState } from 'react';
import axios from 'axios';

  const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
        const response = await axios.post('http://localhost:8000/api/login', {
          email,
          password
        });
        console.log(response.data.user); // Untuk debug
        localStorage.setItem('token', response.data.token);
        // localStorage.setItem('userid', response.data.user.id);
      } catch (error) {
        if (error.response && error.response.data) {
          setError(error.response.data.message);
        } else {
          setError('Login failed. Please check your credentials.');
        }
      }
    };

  return (
    <div className="login-container">
      <img className="logo" src="/image/logo.png" alt="Logo" />
      <form onSubmit={handleSubmit}>
        <div>
          <label className="email"></label>
          <input 
          placeholder='email'
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            name="email"
          />
        </div>
        <div>
          <label className="password"></label>
          <input placeholder='password'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <a href="/Passwordreset" className="forgot-password">Lupa Password?</a>
        <button type="submit">Login</button>
        {/* {error && <p className="error">{error}</p>} */}
        {/* {success && <p className="success">{success}</p>} */}
      </form>

      <style>
        {`
            body {
            display: flex; 
            justify-content: center; 
            align-items: center; 
            height: 100vh; 
            margin: 0; 
          }

          .logo {
            height: 190px;
            display: block;
            margin: 0 auto 20px; 
          }

          .login-container {
            max-width: 400px;
            margin: auto;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            background-color: #fffffff;
          }


          .login-container form {
            display: flex;
            flex-direction: column;
          }

          .login-container label {
            margin-bottom: 5px;
            font-weight: bold;
            color: #555;
          }

          .login-container input {
            padding: 10px;
            margin-bottom: 15px;
            border: 1px solid #ccc;
            border-radius: 15px;
            width: 95%;
            box-sizing: border-box;
          }

          .login-container button {
             padding: 10px;
             border-radius: 15px;
             background-color: #21409A;
             color: #fff;
             font-size: 16px;
             width: 220px;
             margin: 0 auto;
             cursor: pointer;
           }

          .login-container button:hover {
            background-color: #21409A;
          }
          .forgot-password {
          margin-right: 145px;
          color: black;
          font-size: 14px;
          position: relative; 
          top: -10px;

          .login-container p {
            text-align: center;
            font-size: 14px;
            margin-top: 10px;
          }

          .login-container p.error {
            color: red;
          }

          .login-container p.success {
            color: green;
          }
        `}
      </style>
    </div>
  );
};

export default Login;