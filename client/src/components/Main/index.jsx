import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './styles.module.css';

const Main = () => {
  const [tasks, setTasks] = useState([]);
  const [data, setData] = useState({ title: '', description: '', deadline: '', priority: 'Medium' });
  const [error, setError] = useState('');

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem('token');
      try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/tasks`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTasks(data);
      } catch (error) {
        console.error('Error fetching tasks', error);
      }
    };

    fetchTasks();
  }, []);

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const { data: res } = await axios.post(`${process.env.REACT_APP_API_URL}/tasks`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks([...tasks, res.task]);
      setData({ title: '', description: '', deadline: '', priority: 'Medium' });
    } catch (error) {
      if (error.response && error.response.status >= 400 && error.response.status <= 500) {
        setError(error.response.data.message);
      }
    }
  };

  const handleUpdateTask = async (id) => {
    const token = localStorage.getItem('token');
    try {
      const { data: res } = await axios.put(`${process.env.REACT_APP_API_URL}/tasks/${id}`, { status: 'Completed' }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(tasks.map((task) => (task._id === id ? res : task)));
    } catch (error) {
      console.error('Error updating task', error);
    }
  };

  const handleDeleteTask = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error('Error deleting task', error);
    }
  };

  return (
    <div className={styles.main_container}>
      <nav className={styles.navbar}>
        <h1>Task Management</h1>
        <button className={styles.white_btn} onClick={handleLogout}>
          Logout
        </button>
      </nav>
      <div className={styles.task_container}>
        <div className={styles.task_form_container}>
          <form className={styles.form_container} onSubmit={handleCreateTask}>
            <h1>Create New Task</h1>
            <input
              type="text"
              placeholder="Title"
              name="title"
              onChange={handleChange}
              value={data.title}
              required
              className={styles.input}
            />
            <input
              type="text"
              placeholder="Description"
              name="description"
              onChange={handleChange}
              value={data.description}
              className={styles.input}
            />
            <input
              type="date"
              name="deadline"
              onChange={handleChange}
              value={data.deadline}
              required
              className={styles.input}
            />
            <select name="priority" onChange={handleChange} value={data.priority} className={styles.input}>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
            {error && <div className={styles.error_msg}>{error}</div>}
            <button type="submit" className={styles.green_btn}>
              Create Task
            </button>
          </form>
        </div>
        <ul className={styles.task_list}>
          {tasks.map((task) => (
            <li key={task._id} className={styles.task_item}>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <p>{new Date(task.deadline).toLocaleDateString()}</p>
              <p>{task.priority}</p>
              <p>{task.status}</p>
              <button
                className={styles.complete_btn}
                onClick={() => handleUpdateTask(task._id)}
              >
                Complete
              </button>
              <button
                className={styles.delete_btn}
                onClick={() => handleDeleteTask(task._id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Main;
