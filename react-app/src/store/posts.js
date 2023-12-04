export const SET_POSTS = 'SET_POSTS';

export const setPosts = (posts) => ({
    type: SET_POSTS,
    payload: posts,
});

export const fetchPosts = () => async (dispatch) => {
    try {
        const response = await fetch('/api/posts');
        if (!response.ok) {
            throw new Error('Failed to fetch posts');
        }

        const data = await response.json();

        dispatch(setPosts(data.posts));
    } catch (error) {
        console.error('Error fetching posts:', error);

    }
};


const initialState = {
    posts: [],
};


const postsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_POSTS:
            return { ...state, posts: action.payload };

        default:
            return state;
    }
};

export default postsReducer;
