import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
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
	const location = useLocation(); // Hook to get the current route
	const sessionUser = useSelector((state) => state.session.user);
	const [showLoginModal, setShowLoginModal] = useState(false);
	const [showSignupModal, setShowSignupModal] = useState(false);

	useEffect(() => {
		if (sessionUser) {
			setShowLoginModal(false);
			setShowSignupModal(false);
		}
	}, [sessionUser]);

	const closeLoginModal = () => setShowLoginModal(false);
	const closeSignupModal = () => setShowSignupModal(false);

	const isTransparent = !(location.pathname === '/posts' || location.pathname.startsWith('/post'));

	return (
		<div className={`nav-container ${isTransparent ? '' : 'opaque'}`}>
			<div className="ottr-button-container">
				<NavLink exact to="/" className="ottr-link">
					Ottr
				</NavLink>
			</div>
			<div className="auth-buttons-container">
				{isLoaded && !sessionUser && (
					<>
						<button className="auth-button-login" onClick={() => setShowLoginModal(true)}>Log In</button>
						<button className="auth-button-signup" onClick={() => setShowSignupModal(true)}>Sign Up</button>
					</>
				)}
				{isLoaded && sessionUser && (
					<>
						<CreatePostLink />
						<ProfileButton user={sessionUser} />
					</>
				)}
			</div>

			{/* Modal Backdrop for Login */}
			{showLoginModal && (
				<div className="modal-backdrop" onClick={closeLoginModal}>
					<div className="modal" onClick={e => e.stopPropagation()}>
						<LoginFormModal closeModal={closeLoginModal} />
					</div>
				</div>
			)}

			{/* Modal Backdrop for Signup */}
			{showSignupModal && (
				<div className="modal-backdrop" onClick={closeSignupModal}>
					<div className="modal" onClick={e => e.stopPropagation()}>
						<SignupFormModal closeModal={closeSignupModal} />
					</div>
				</div>
			)
			}
		</div >
	);
}

export default Navigation;
