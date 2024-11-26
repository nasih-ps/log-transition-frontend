import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export const LoginPage = () => {
 const [formData, setFormData] = useState({ email: '', password: '' });
 const [showPassword, setShowPassword] = useState(false);
 const [error, setError] = useState('');
 const navigate = useNavigate();

 const handleChange = (e) => {
   setFormData({ ...formData, [e.target.name]: e.target.value });
   setError('');
 };

 const handleSubmit = async (e) => {
   e.preventDefault();
   try {
     const response = await fetch('http://localhost:8000/login', {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify(formData),
     });

     if (!response.ok) throw new Error('Invalid credentials');

     const data = await response.json();
     console.log('Login successful');

     // Store user data in localStorage
     localStorage.setItem('user', JSON.stringify(data));

     // Redirect to home page
     navigate('/home');
   } catch (err) {
     setError(err.message);
   }
 };

 return (
   <div className="auth-container">
     <h2>Sign in to your account</h2>
     <form onSubmit={handleSubmit}>
       {error && <div className="error">{error}</div>}
       <input type="email" name="email" placeholder="Email address" value={formData.email} onChange={handleChange} required />
       <input type={showPassword ? 'text' : 'password'} name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
       <button type="submit" className="account-button">Sign in</button>
       <p>
          <Link to="/register">Don't have an account? Register</Link>
       </p>
     </form>
   </div>
 );
};