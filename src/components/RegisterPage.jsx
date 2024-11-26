import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      const response = await fetch('http://localhost:8000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error('Registration failed');
      console.log('Registration successful');
      
      // Navigate to login page after successful registration
      navigate('/login');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-container">
      <h2>Create your account</h2>
      <form onSubmit={handleSubmit}>
        {error && <div className="error">{error}</div>}
        <input type="text" name="name" placeholder="Full name" value={formData.name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email address" value={formData.email} onChange={handleChange} required />
        <input type={showPassword ? 'text' : 'password'} name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
        <input type={showConfirmPassword ? 'text' : 'password'} name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required />
        <button type="submit" className="account-button">Create account</button>
        <p>
          <Link to="/login">Already have an account? Login</Link>
        </p>
      </form>
    </div>
  );
};