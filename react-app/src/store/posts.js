import { normalizeObj } from "./normalize"

export const SET_POSTS = 'SET_POSTS';

export const setPosts = (posts) => ({
    type: SET_POSTS,
    posts
});

export const fetchPosts = () => async (dispatch) => {
    const res = await fetch('/api/posts')
    if (res.ok) {
        const { posts } = await res.json();
        dispatch(setPosts(posts))
        return posts
    } else {
        const data = await res.json();
        console.log(data)
        return data
    }
};


const initialState = {}



const postsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case SET_POSTS:
            newState = { ...state }
            newState.posts = normalizeObj(action.posts)
            return newState
        default:
            return state;
    }
};

export default postsReducer;
