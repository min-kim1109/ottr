import React, { useState, useEffect } from 'react';
import { NavLink, useHistory, useLocation } from 'react-router-dom'; // Removed useLocation as it's no longer directly used
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
	const history = useHistory();
	const location = useLocation();
	const sessionUser = useSelector((state) => state.session.user);
	const [showLoginModal, setShowLoginModal] = useState(false);
	const [showSignupModal, setShowSignupModal] = useState(false);
	const [searchQuery, setSearchQuery] = useState(""); // Added state to hold search query

	useEffect(() => {
		if (sessionUser) {
			setShowLoginModal(false);
			setShowSignupModal(false);
		}
	}, [sessionUser]);

	const closeLoginModal = () => setShowLoginModal(false);
	const closeSignupModal = () => setShowSignupModal(false);

	// Updated to only handle search query state
	const handleSearchChange = (e) => {
		setSearchQuery(e.target.value);
	};

	// New function to handle search when Enter is pressed
	const handleSearchKeyPress = (e) => {
		if (e.key === 'Enter') {
			// Redirects to Show All Posts page with search query
			history.push(`/posts?search=${encodeURIComponent(searchQuery)}`);
			setSearchQuery('');
		}
	};

	const isTransparent = location.pathname === '/';
	const isSpecificPage = location.pathname === '/posts' || location.pathname.startsWith('/post');


	return (
		<div className={`nav-container ${isTransparent ? 'opaque' : ''} ${isSpecificPage ? '' : 'opaque'}`}>
			<div className="ottr-button-container">
				<NavLink exact to="/" className="ottr-link">
					Ottr
					<img id="otter-image" src="https://i.imgur.com/lFonrwq.gif" alt="animated-otter"></img>
				</NavLink>
			</div>
			<div className="search-container">
				<input
					type="text"
					placeholder="Search posts..."
					value={searchQuery}
					onChange={handleSearchChange}
					onKeyPress={handleSearchKeyPress}
				/>
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
			)}
		</div>
	);
}

export default Navigation;
