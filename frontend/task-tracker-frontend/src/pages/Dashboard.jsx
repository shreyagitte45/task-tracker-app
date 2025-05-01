import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../services/api';
import { jwtDecode } from 'jwt-decode';

export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const navigate = useNavigate();

  // Get user info from JWT
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserEmail(decoded.email || 'User');
      } catch (err) {
        console.error('Failed to decode token:', err);
        setUserEmail('User');
      }
    }
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await API.get('/projects');
      setProjects(res.data);
    } catch (err) {
      alert('Error fetching projects');
    }
  };

  const createProject = async () => {
    try {
      if (projects.length >= 4) {
        alert('You can only create up to 4 projects.');
        return;
      }
      await API.post('/projects', { title });
      setTitle('');
      fetchProjects();
    } catch (err) {
      alert('Error creating project');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <>
      {/* Navbar */}
      <div style={{
        background: '#222',
        color: '#fff',
        padding: '1rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <strong style={{ fontSize: '1.2rem' }}>📌 Task Tracker</strong>
        <div>
          <span style={{ marginRight: '1rem' }}>👋 {userEmail}</span>
          <button onClick={handleLogout} style={{ padding: '0.4rem 0.8rem', cursor: 'pointer' }}>
            🔓 Logout
          </button>
        </div>
      </div>

      {/* Main content */}
      <div style={{ padding: '2rem' }}>
        <h2 style={{ marginBottom: '1rem' }}>📁 My Projects ({projects.length}/4)</h2>

        {/* Create project form */}
        <div style={{ marginBottom: '1rem' }}>
          <input
            placeholder="New project title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ padding: '0.5rem', marginRight: '0.5rem', width: '200px' }}
          />
          <button onClick={createProject} style={{ padding: '0.5rem 1rem' }}>
            ➕ Create Project
          </button>
        </div>

        {/* Project list */}
        <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
          {projects.map((project) => (
            <li
              key={project._id}
              style={{
                background: '#f3f3f3',
                padding: '1rem',
                marginBottom: '0.5rem',
                borderRadius: '8px',
              }}
            >
              <strong>{project.title}</strong>
              <div style={{ marginTop: '0.5rem' }}>
                <Link to={`/projects/${project._id}`}>
                  <button style={{ padding: '0.4rem 0.8rem' }}>📋 View Tasks</button>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
