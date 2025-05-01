import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div style={{
      background: '#333',
      color: 'white',
      padding: '1rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <Link to="/" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>
        Task Tracker
      </Link>
      <button onClick={handleLogout} style={{ padding: '0.4rem 0.8rem', cursor: 'pointer' }}>
        🔓 Logout
      </button>
    </div>
  );
}
