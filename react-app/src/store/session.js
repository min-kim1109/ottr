// Constants
const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";

// Action Creators
export const setUser = (user) => ({
	type: SET_USER,
	payload: user,
});

const removeUser = () => ({
	type: REMOVE_USER,
});

const initialState = { user: null };

// Thunks
export const authenticate = () => async (dispatch) => {
	const response = await fetch("/api/auth/", {
		credentials: 'include', // Make sure to include credentials for cookies if using sessions
	});

	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return;
		}
		dispatch(setUser(data));
	}
};

export const login = (email, password) => async (dispatch) => {
	const response = await fetch("/api/auth/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			email,
			password,
		}),
		credentials: 'include', // Include credentials for cookie-based authentication
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(setUser(data));
		return null;
	} else {
		const contentType = response.headers.get("content-type");
		if (contentType && contentType.indexOf("application/json") !== -1) {
			const data = await response.json();
			if (data.errors) {
				return data.errors;
			}
		} else {
			const text = await response.text();
			console.error("Non-JSON response received:", text);
			return ["An error occurred. Please try again."];
		}
	}
};

export const logout = () => async (dispatch) => {
	const response = await fetch("/api/auth/logout", {
		method: "GET", // Ensure this matches the backend expectation
		credentials: 'include',
	});

	if (response.ok) {
		dispatch(removeUser());
	}
};
export const signUp = (username, email, password) => async (dispatch) => {
	const response = await fetch("/api/auth/signup", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			username,
			email,
			password,
		}),
		credentials: 'include',
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(setUser(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

// Reducer
export default function reducer(state = initialState, action) {
	switch (action.type) {
		case SET_USER:
			return { ...state, user: action.payload };
		case REMOVE_USER:
			return { ...state, user: null };
		default:
			return state;
	}
}
