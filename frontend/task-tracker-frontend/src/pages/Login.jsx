import { useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', form);
      localStorage.setItem('token', res.data.token);
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: '#f7f7f7'
    }}>
      <form
        onSubmit={handleSubmit}
        style={{
          background: 'white',
          padding: '2rem',
          borderRadius: '10px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          width: '300px'
        }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>Login</h2>

        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          required
          style={{
            width: '100%',
            padding: '0.6rem',
            marginBottom: '1rem',
            border: '1px solid #ccc',
            borderRadius: '5px'
          }}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          required
          style={{
            width: '100%',
            padding: '0.6rem',
            marginBottom: '1.2rem',
            border: '1px solid #ccc',
            borderRadius: '5px'
          }}
        />

        <button
          type="submit"
          style={{
            width: '100%',
            padding: '0.7rem',
            background: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Login
        </button>

        <p style={{ textAlign: 'center', marginTop: '1rem' }}>
          No account? <a href="/signup">Signup</a>
        </p>
      </form>
    </div>
  );
}
