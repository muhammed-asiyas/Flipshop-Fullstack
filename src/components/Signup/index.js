import { useState } from 'react';
import { Link } from 'react-router-dom';
import './index.css';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    const res = await fetch(`https://flipshop-backend.onrender.com/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      window.location.href = '/';
    } else {
      setMsg(data.message || JSON.stringify(data));
    }
  };

  return (
    <div className="app-container">
      <form className="login-container" onSubmit={submit}>
        <h2 className="login-signup-text">Create Account</h2>

        <input
          className={`input-field ${msg ? "input-error" : ""}`}
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className={`input-field ${msg ? "input-error" : ""}`}
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className={`input-field ${msg ? "input-error" : ""}`}
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="login-button" type="submit">
          Sign Up
        </button>

        {msg && <p className="error-message">{msg}</p>}

        <p className="change-user-text">
          Already registered?{" "}
          <Link className="link-item" to="/login">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}