import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const containerStyle = {
    textAlign: 'center',
    padding: '4rem 2rem',
    background: 'linear-gradient(135deg, var(--color-primary-dark) 0%, var(--color-primary) 100%)',
    color: '#ffffff',
    marginBottom: '2rem',
    borderRadius: '0 0 2rem 2rem',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
  };

  const headingStyle = {
    fontSize: '3rem',
    marginBottom: '1rem',
    fontWeight: '800',
    letterSpacing: '-0.025em'
  };

  const subtextStyle = {
    fontSize: '1.25rem',
    marginBottom: '2rem',
    opacity: '0.9',
    maxWidth: '600px',
    margin: '0 auto 2rem'
  };

  const buttonStyle = {
    backgroundColor: '#ffffff',
    color: 'var(--color-primary)',
    padding: '0.75rem 2rem',
    fontSize: '1.125rem',
    fontWeight: '600',
    borderRadius: '9999px',
    border: 'none',
    cursor: 'pointer',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.2s'
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>Manage Your Work with Ease</h1>
      <p style={subtextStyle}>
        Stay organized, focused, and get more done with TaskFlow. The modern way to track your productivity.
      </p>
      <Link to="/create">
        <button style={buttonStyle}>Get Started</button>
      </Link>
    </div>
  );
};

export default Hero;
