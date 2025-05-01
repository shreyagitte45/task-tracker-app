import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../services/api';

export default function Tasks() {
  const { id: projectId } = useParams(); // project ID from URL
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', status: 'Pending' });
  const navigate = useNavigate();

  const fetchTasks = async () => {
    try {
      console.log('Fetching tasks for project:', projectId); // ✅ Debug
      const res = await API.get(`/tasks/${projectId}`);
      setTasks(res.data);
    } catch (err) {
      console.error(err);
      alert('Error fetching tasks');
    }
  };

  const createTask = async () => {
    try {
      await API.post('/tasks', { ...form, projectId });
      setForm({ title: '', description: '', status: 'Pending' });
      fetchTasks();
    } catch (err) {
      alert('Error creating task');
    }
  };

  const updateTaskStatus = async (taskId, newStatus) => {
    try {
      await API.put(`/tasks/${taskId}`, { status: newStatus });
      fetchTasks();
    } catch (err) {
      alert('Error updating task');
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await API.delete(`/tasks/${taskId}`);
      fetchTasks();
    } catch (err) {
      alert('Error deleting task');
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [projectId]);

  return (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ marginBottom: '1rem' }}>🗂️ Tasks for Project ID: {projectId}</h2>

      {/* Add new task form */}
      <div style={{ marginBottom: '1rem' }}>
        <input
          name="title"
          placeholder="Task Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          style={{ padding: '0.5rem', marginRight: '0.5rem', width: '150px' }}
        />
        <input
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          style={{ padding: '0.5rem', marginRight: '0.5rem', width: '200px' }}
        />
        <select
          name="status"
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
          style={{ padding: '0.5rem', marginRight: '0.5rem' }}
        >
          <option>Pending</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>
        <button onClick={createTask} style={{ padding: '0.5rem 1rem' }}>
          ➕ Add Task
        </button>
      </div>

      {/* Task list */}
      {tasks.length === 0 ? (
        <p>No tasks yet for this project. Add one above.</p>
      ) : (
        <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
          {tasks.map((task) => (
            <li
              key={task._id}
              style={{
                background: '#e9e9e9',
                padding: '1rem',
                marginBottom: '0.5rem',
                borderRadius: '8px'
              }}
            >
              <strong>{task.title}</strong> – <em>{task.status}</em>
              <p>{task.description}</p>
              <div style={{ marginTop: '0.5rem' }}>
                {task.status !== 'Completed' && (
                  <button
                    onClick={() => updateTaskStatus(task._id, 'Completed')}
                    style={{ marginRight: '0.5rem', padding: '0.3rem 0.7rem' }}
                  >
                    ✅ Mark Completed
                  </button>
                )}
                <button
                  onClick={() => deleteTask(task._id)}
                  style={{ background: '#ff4d4d', color: '#fff', padding: '0.3rem 0.7rem' }}
                >
                  🗑️ Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <button onClick={() => navigate('/')} style={{ marginTop: '1.5rem' }}>
        ← Back to Dashboard
      </button>
    </div>
  );
}
