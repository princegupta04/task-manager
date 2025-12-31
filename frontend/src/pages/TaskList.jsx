import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";

const colors = {
  high: "red",
  medium: "orange",
  low: "green",
};

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    api.get(`/tasks?page=${page}`).then((res) => {
      setTasks(res.data.tasks);
    });
  }, [page]);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-bg)' }}>
      <Navbar />
      <Hero />
      <div className="container" style={{ paddingBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>My Tasks</h2>
          <Link to="/create" className="btn-primary" style={{ padding: '0.5rem 1rem', borderRadius: '0.5rem', textDecoration: 'none', display: 'inline-block' }}>
            + Create Task
          </Link>
        </div>

        <div style={{ display: 'grid', gap: '1rem' }}>
          {tasks.length === 0 ? (
            <p style={{ textAlign: 'center', color: 'gray', marginTop: '2rem' }}>No tasks found. Create one to get started!</p>
          ) : (
            tasks.map((task) => (
              <div
                key={task._id}
                className="card"
                style={{ 
                  borderLeft: `5px solid ${colors[task.priority]}`,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '1.5rem'
                }}
              >
                <div>
                  <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.2rem' }}>
                    <Link to={`/task/${task._id}`} style={{ color: 'var(--color-text)' }}>{task.title}</Link>
                  </h4>
                  <span style={{ 
                    fontSize: '0.85rem', 
                    padding: '0.25rem 0.5rem', 
                    borderRadius: '1rem', 
                    backgroundColor: 'rgba(0,0,0,0.05)',
                    border: '1px solid var(--color-border)'
                  }}>
                    {task.status}
                  </span>
                </div>
                <Link to={`/task/${task._id}`} style={{ color: 'var(--color-primary)', fontSize: '0.9rem' }}>View Details →</Link>
              </div>
            ))
          )}
        </div>

        <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', gap: '1rem' }}>
          <button onClick={() => setPage(page - 1)} disabled={page === 1} style={{ opacity: page === 1 ? 0.5 : 1 }}>
            Previous
          </button>
          <button onClick={() => setPage(page + 1)} disabled={tasks.length === 0}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskList;
