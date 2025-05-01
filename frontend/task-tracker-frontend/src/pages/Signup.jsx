import { useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '', country: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/signup', form);
      localStorage.setItem('token', res.data.token);
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.message || 'Signup failed');
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
        <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>📝 Sign Up</h2>

        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <input
          name="email"
          placeholder="Email"
          type="email"
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <input
          name="password"
          placeholder="Password"
          type="password"
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <input
          name="country"
          placeholder="Country"
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <button
          type="submit"
          style={{
            width: '100%',
            padding: '0.7rem',
            background: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Register
        </button>

        <p style={{ textAlign: 'center', marginTop: '1rem' }}>
          Already have an account? <a href="/login">Login</a>
        </p>
      </form>
    </div>
  );
}


const inputStyle = {
  width: '100%',
  padding: '0.6rem',
  marginBottom: '1rem',
  border: '1px solid #ccc',
  borderRadius: '5px'
};
