import React, { useState, useEffect } from "react";
import { login, setUser } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import './LoginForm.css';

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  // Add a useEffect to log the sessionUser when it changes
  useEffect(() => {
    console.log("sessionUser:", sessionUser);
  }, [sessionUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await dispatch(login(email, password));
      if (response && response.data) {
        const user = response.data;
        // Assuming setUser will store the user object in the Redux state
        dispatch(setUser(user));
        // Redirect or perform any other action upon successful login
      } else {
        console.error("Invalid response structure:", response);
        setErrors(["An error occurred. Please try again."]);
      }
    } catch (error) {
      console.error("Error in handleSubmit:", error);
      setErrors(["An error occurred. Please try again."]);
    }
  };

  // Check if sessionUser is defined and has user_name property
  if (sessionUser?.user_name) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Log In</button>
      </form>
    </>
  );
}

export default LoginFormPage;
