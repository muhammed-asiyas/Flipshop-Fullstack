import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./index.css";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    const res = await fetch(`https://flipshop-backend.onrender.com/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (res.ok) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      onLogin();
      navigate("/", { replace: true });
    } else {
      setMsg(data.message || "Login failed");
    }
  };

  return (
    <div className="app-container">
      <form className="login-container" onSubmit={submit}>
        <h2 className="login-signup-text">Login</h2>
        <input
          className="input-field"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="input-field"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="login-button" type="submit">Login</button>
        {msg && <p className="error-message">{msg}</p>}
        <Link className="link-item" to="/signup">
        <p className="change-user-text">New to user? Please go to signup</p>
      </Link>
      </form>
    </div>
  );
}