import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();

	const isValidEmail = (email) => {
		return /\S+@\S+\.\S+/.test(email);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		let newErrors = [];

		if (!isValidEmail(email)) {
			newErrors.push("Please enter a valid email address");
		}

		if (password !== confirmPassword) {
			newErrors.push("Confirm Password field must be the same as the Password field.");
		}

		if (newErrors.length > 0) {
			setErrors(newErrors);
			return;
		}

		const data = await dispatch(signUp(username, email, password));
		if (data) {
			setErrors(data);
		} else {
			closeModal();
		}
	};

	const emailErrors = errors.filter(error => error.toLowerCase().includes('email'));
	const passwordErrors = errors.filter(error => error.toLowerCase().includes('password'));

	return (
		<>
			<h1>Sign Up</h1>
			<form onSubmit={handleSubmit} className="signup-form">
				<div className="email-error">
					{emailErrors.map((error, idx) => (
						<div key={`email-error-${idx}`}>{error}</div>
					))}
				</div>
				<label className="signup-email">
					Email
					<input
						type="text"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</label>
				<label className="signup-username">
					Username
					<input
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
					/>
				</label>
				<label className="signup-password">
					Password
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</label>
				<div className="pw-error">
					{passwordErrors.map((error, idx) => (
						<div key={`password-error-${idx}`}>{error}</div>
					))}
				</div>
				<label className="signup-confirmpw">
					Confirm Password
					<input
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					/>
				</label>
				<button type="submit" className="signup-button">Sign Up</button>
			</form>
		</>
	);
}

export default SignupFormModal;
