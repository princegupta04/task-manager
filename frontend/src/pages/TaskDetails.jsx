import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../api/axios";

const TaskDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);

  useEffect(() => {
    api.get(`/tasks/${id}`).then((res) => setTask(res.data));
  }, [id]);

  const deleteTask = async () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      await api.delete(`/tasks/${id}`);
      navigate("/");
    }
  };

  const toggleStatus = async () => {
    const newStatus = task.status === "pending" ? "completed" : "pending";
    const { data } = await api.patch(`/tasks/${id}/status`, {
      status: newStatus,
    });
    setTask(data);
  };

  const priorityColor = {
    high: 'red',
    medium: 'orange',
    low: 'green'
  };

  if (!task) return <div className="container" style={{ paddingTop: '2rem', textAlign: 'center' }}>Loading...</div>;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-bg)' }}>
      <Navbar />
      <div className="container" style={{ padding: '2rem 1rem' }}>
        <div className="card" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '1rem' }}>
            <div>
              <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{task.title}</h2>
              <span style={{ 
                padding: '0.25rem 0.75rem', 
                borderRadius: '1rem', 
                backgroundColor: 'rgba(0,0,0,0.05)', 
                border: `1px solid ${priorityColor[task.priority]}`,
                color: priorityColor[task.priority],
                fontSize: '0.875rem',
                fontWeight: '600',
                textTransform: 'capitalize'
              }}>
                {task.priority} Priority
              </span>
            </div>
            <button onClick={() => navigate('/')} style={{ background: 'transparent', color: 'var(--color-text)', border: '1px solid var(--color-border)' }}>
              Back to List
            </button>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <h4 style={{ color: 'var(--color-text)', opacity: 0.7, marginBottom: '0.5rem' }}>Description</h4>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>{task.description}</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem', background: 'rgba(0,0,0,0.02)', padding: '1rem', borderRadius: '0.5rem' }}>
            <div>
              <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '0.9rem', opacity: 0.7 }}>Due Date</h4>
              <p style={{ margin: 0, fontWeight: '600' }}>{task.dueDate.split("T")[0]}</p>
            </div>
            <div>
              <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '0.9rem', opacity: 0.7 }}>Status</h4>
              <p style={{ margin: 0, fontWeight: '600', textTransform: 'capitalize' }}>{task.status}</p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
            <button 
              onClick={toggleStatus}
              style={{ 
                backgroundColor: task.status === 'pending' ? 'green' : 'orange',
              }}
            >
              Mark as {task.status === "pending" ? "Completed" : "Pending"}
            </button>
            <button onClick={() => navigate(`/edit/${task._id}`)} className="btn-primary">Edit Task</button>
            <button 
              onClick={deleteTask}
              style={{ backgroundColor: 'red' }}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
