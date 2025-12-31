import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../api/axios";

const EditTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "medium",
    assignedTo: "",
  });
  const [users, setUsers] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.role === "admin") {
      setIsAdmin(true);
      api.get("/users").then((res) => setUsers(res.data));
    }

    api.get(`/tasks/${id}`).then((res) =>
      setTask({
        ...res.data,
        dueDate: res.data.dueDate.split("T")[0],
      })
    );
  }, [id]);

  const submitHandler = async (e) => {
    e.preventDefault();
    await api.put(`/tasks/${id}`, task);
    navigate(`/task/${id}`);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-bg)' }}>
      <Navbar />
      <div className="container" style={{ padding: '2rem 1rem', display: 'flex', justifyContent: 'center' }}>
        <form onSubmit={submitHandler} className="card" style={{ width: '100%', maxWidth: '600px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '0.5rem' }}>Edit Task</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontWeight: '600', fontSize: '0.9rem' }}>Title</label>
            <input 
              value={task.title}
              onChange={(e) => setTask({ ...task, title: e.target.value })}
              required
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontWeight: '600', fontSize: '0.9rem' }}>Description</label>
            <textarea
              value={task.description}
              onChange={(e) => setTask({ ...task, description: e.target.value })}
              style={{ 
                backgroundColor: 'var(--color-bg)',
                color: 'var(--color-text)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius)',
                padding: '0.75rem',
                minHeight: '100px',
                fontFamily: 'inherit',
                fontSize: '1rem'
              }}
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontWeight: '600', fontSize: '0.9rem' }}>Due Date</label>
              <input 
                type="date" 
                value={task.dueDate}
                onChange={(e) => setTask({ ...task, dueDate: e.target.value })} 
                required 
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontWeight: '600', fontSize: '0.9rem' }}>Priority</label>
              <select 
                value={task.priority}
                onChange={(e) => setTask({ ...task, priority: e.target.value })}
                style={{
                  backgroundColor: 'var(--color-bg)',
                  color: 'var(--color-text)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius)',
                  padding: '0.5rem 1rem',
                  fontSize: '1rem',
                  height: '42px'
                }}
              >
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>

          {isAdmin && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontWeight: '600', fontSize: '0.9rem' }}>Assign To (Admin Only)</label>
              <select 
                value={task.assignedTo || ""}
                onChange={(e) => setTask({ ...task, assignedTo: e.target.value })}
                style={{
                  backgroundColor: 'var(--color-bg)',
                  color: 'var(--color-text)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius)',
                  padding: '0.5rem 1rem',
                  fontSize: '1rem',
                  height: '42px'
                }}
              >
                <option value="">Select User</option>
                {users.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.name} ({user.email})
                  </option>
                ))}
              </select>
            </div>
          )}

          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
             <button type="button" onClick={() => navigate(`/task/${id}`)} style={{ flex: 1, backgroundColor: 'transparent', color: 'var(--color-text)', border: '1px solid var(--color-border)' }}>Cancel</button>
             <button type="submit" className="btn-primary" style={{ flex: 2 }}>Update Task</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTask;
