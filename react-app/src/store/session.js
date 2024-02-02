// constants
const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";

const setUser = (user) => ({
	type: SET_USER,
	payload: user,
});

const removeUser = () => ({
	type: REMOVE_USER,
});

const initialState = { user: null };

export const authenticate = () => async (dispatch) => {
	// Check if user data exists in Local Storage
	const user_name = localStorage.getItem('user_name');
	if (user_name) {
		// Dispatch SET_USER with the stored user data
		dispatch(setUser({ user_name }));
	} else {
		// Perform regular authentication request
		const response = await fetch("/api/auth/", {
			// ... (existing code)
		});

		if (response.ok) {
			const data = await response.json();
			if (data.errors) {
				return;
			}

			dispatch(setUser(data));
		}
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
	});

	if (response.ok) {
		const data = await response.json();

		localStorage.setItem('user_name', data.user.user_name);
		dispatch(setUser(data));
		return null;
	} else {
		// Check if the response is JSON
		const contentType = response.headers.get("content-type");
		if (contentType && contentType.indexOf("application/json") !== -1) {
			const data = await response.json();
			if (data.errors) {
				return data.errors;
			}
		} else {
			// Handle non-JSON response (like HTML)
			const text = await response.text();
			console.error("Non-JSON response received:", text);
			return ["An error occurred. Please try again."];
		}
	}
};

export const logout = () => async (dispatch) => {
	const response = await fetch("/api/auth/logout", {
		headers: {
			"Content-Type": "application/json",
		},
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

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case SET_USER:
			return { user: action.payload };
		case REMOVE_USER:
			return { user: null };
		default:
			return state;
	}
}
