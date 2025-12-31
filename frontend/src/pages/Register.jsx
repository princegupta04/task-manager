import { useState } from "react";
import api from "../api/axios";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    await api.post("/auth/register", {
      name,
      email,
      password,
    });
    navigate("/login");
  };

  return (
    <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
      <form onSubmit={submitHandler} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%', maxWidth: '400px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>Create Account</h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label style={{ fontSize: '0.9rem', fontWeight: '500' }}>Name</label>
          <input
            placeholder="Enter your name"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label style={{ fontSize: '0.9rem', fontWeight: '500' }}>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label style={{ fontSize: '0.9rem', fontWeight: '500' }}>Password</label>
          <input
            type="password"
            placeholder="Create a password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn-primary" style={{ marginTop: '1rem' }}>Get Started</button>

        <div style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.9rem' }}>
          <p>Already have an account? <Link to="/login" style={{ color: 'var(--color-primary)', fontWeight: 'bold' }}>Login</Link></p>
        </div>
      </form>
    </div>
  );
};

export default Register;
