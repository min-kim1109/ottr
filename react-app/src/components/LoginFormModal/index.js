import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
      closeModal()
    }
  };

  const handleDemoLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission
    const demoEmail = 'demo@aa.io';
    const demoPassword = 'password';
    const data = await dispatch(login(demoEmail, demoPassword));
    if (!data) {
      closeModal(); // Close the modal if login is successful
    } else {
      setErrors(data); // Set errors if there are any
    }
  };

  const passwordErrors = errors.filter(error => error.toLowerCase().includes('password'));

  return (
    <>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="error-validations">
          {errors.map((error, idx) => {
            if (!error.toLowerCase().includes('password')) {
              return <div key={idx}>{error}</div>;
            }
            return null;
          })}
        </div>
        <label className="email-input">
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <div className="error-validations">
          {passwordErrors.map((error, idx) => (
            <div key={`password-error-${idx}`}>{error}</div>
          ))}
        </div>
        <label className="password-input">
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <div className="login-buttons">
          <button type="submit" className="login-button">Log In</button>

          <button onClick={handleDemoLogin} className="demo-login-button">Log in as Demo User</button>
        </div>
      </form>
    </>
  );
}

export default LoginFormModal;
