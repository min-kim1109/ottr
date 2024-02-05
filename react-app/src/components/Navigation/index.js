import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import './Navigation.css';

function CreatePostLink() {
	return (
		<NavLink to="/posts/new" className="create-post-link">
			Create Post
		</NavLink>
	);
}

function Navigation({ isLoaded }) {
	const sessionUser = useSelector((state) => state.session.user);
	// State hooks for modal visibility
	const [showLoginModal, setShowLoginModal] = useState(false);
	const [showSignupModal, setShowSignupModal] = useState(false);

	useEffect(() => {
		if (sessionUser) {
			setShowLoginModal(false);
			setShowSignupModal(false);
		}
	}, [sessionUser]);

	// Function to close the login modal
	const closeLoginModal = () => setShowLoginModal(false);

	// Function to close the signup modal
	const closeSignupModal = () => setShowSignupModal(false);

	return (
		<div className="nav-container">
			<div className="ottr-button-container">
				<NavLink exact to="/" className="ottr-link">
					Ottr
				</NavLink>
			</div>
			{isLoaded && !sessionUser && (
				<>
					<button className="auth-button" onClick={() => setShowLoginModal(true)}>Log In</button>
					<button className="auth-button" onClick={() => setShowSignupModal(true)}>Sign Up</button>
				</>
			)}
			{isLoaded && sessionUser && (
				<>
					<div className="profile-button">
						<ProfileButton user={sessionUser} />
					</div>
					<div className="create-post-button">
						<CreatePostLink />
					</div>
				</>
			)}

			{/* Modal Backdrop */}
			{showLoginModal && (
				<div className="modal-backdrop" onClick={closeLoginModal}>
					<div className="modal" onClick={e => e.stopPropagation()}>
						<LoginFormModal closeModal={closeLoginModal} />
					</div>
				</div>
			)}
			{showSignupModal && (
				<div className="modal-backdrop" onClick={closeSignupModal}>
					<div className="modal" onClick={e => e.stopPropagation()}>
						<SignupFormModal closeModal={closeSignupModal} />
					</div>
				</div>
			)}
		</div>
	);
}

export default Navigation;
