// client/src/pages/RegisterPage.js
import React, { useState } from 'react';
import axios from 'axios';

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/users/register', {
        username,
        email,
        password,
        shippingAddress,
      });
      localStorage.setItem('authToken', data.token);
      window.location.href = '/'; // Redirect to the home page after registration
    } catch (error) {
      setError('Registration failed. Please check your details and try again.');
      console.error('Error registering', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Register</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleRegister}>
        <div className="form-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Username"
            value={username}
            onChange={(e) => {
              if (e.target.value.length > 20) {
                alert("Username cannot exceed 20 characters")
              } else {
                setUsername(e.target.value);
              }
            }}
            maxLength="20"  // Maximum character limit
            minLength="3" //Minimum character limit
            required
          />
        </div>
        <div className="form-group mb-3">
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              if (e.target.value.length > 320) {
                alert("Email address cannot exceed 320 characters");
              } else {
                setEmail(e.target.value);
              }
            }}
            maxLength="320"  // Maximum character limit
            required
          />
        </div>
        <div className="form-group mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Shipping Address"
            value={shippingAddress}
            onChange={(e) => {
              if (e.target.value.length > 200) {
                alert("Shipping address cannot exceed 200 characters");
              } else {
                setShippingAddress(e.target.value);
              }
            }}
            maxLength="200"  // Maximum character limit
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
    </div>
  );
}

export default RegisterPage;
