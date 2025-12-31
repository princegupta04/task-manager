import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ThemeContext } from './ThemeProvider';
import logo from '../assets/logo.png';

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const navStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    backgroundColor: 'var(--color-bg)',
    borderBottom: '1px solid var(--color-border)',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    transition: 'background-color 0.3s ease'
  };

  const logoStyle = {
    height: '40px',
    marginRight: '0.5rem'
  };

  const brandStyle = {
    display: 'flex',
    alignItems: 'center',
    fontSize: '1.25rem',
    fontWeight: 'bold',
    color: 'var(--color-text)'
  };

  const linkStyle = {
    marginLeft: '1.5rem',
    color: 'var(--color-text)',
    fontWeight: '500'
  };

  return (
    <nav style={navStyle}>
      <Link to="/" style={brandStyle}>
        <img src={logo} alt="TaskFlow Logo" style={logoStyle} />
        TaskFlow
      </Link>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {token ? (
          <>
            <span style={{ marginRight: '1rem', color: 'var(--color-text)', fontWeight: '600' }}>
              Hello, {user ? user.name : 'User'}
            </span>
            <Link to="/" style={linkStyle}>My Tasks</Link>
            <Link to="/create" style={linkStyle}>New Task</Link>
            <button 
              onClick={handleLogout}
              style={{
                marginLeft: '1.5rem',
                backgroundColor: 'transparent',
                border: '1px solid var(--color-primary)',
                color: 'var(--color-primary)',
                padding: '0.5rem 1rem',
                borderRadius: 'var(--radius)',
                cursor: 'pointer'
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" style={linkStyle}>Login</Link>
        )}
        <button 
          onClick={toggleTheme} 
          style={{ marginLeft: '1.5rem', padding: '0.5rem', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          aria-label="Toggle Dark Mode"
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
