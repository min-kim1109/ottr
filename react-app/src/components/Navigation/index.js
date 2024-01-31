import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
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

	return (
		<div className="nav-container">
			<div className="ottr-button-container">
				<NavLink exact to="/" className="ottr-link">
					Ottr
				</NavLink>
			</div>
			{isLoaded && (
				<div className="profile-button">
					<ProfileButton user={sessionUser} />
				</div>
			)}
			{isLoaded && sessionUser && (
				<div className="create-post-button">
					<CreatePostLink />
				</div>
			)}
		</div>
	);
}

export default Navigation;
