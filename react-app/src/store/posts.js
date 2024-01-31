import Cookies from 'js-cookie';

//action constant
export const SET_POSTS = 'SET_POSTS';
export const SET_SINGLE_POST = 'SET_SINGLE_POST';
export const CREATE_POST = 'CREATE_POST';

//action creators
export const setPosts = (posts) => ({
    type: SET_POSTS,
    posts
});

export const setSinglePost = (post) => ({
    type: SET_SINGLE_POST,
    post,
});

export const createPost = (post) => ({
    type: CREATE_POST,
    post
});


//THUNKS
//thunk to get all posts
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

// thunk to get a single post by post id
export const fetchSinglePost = (postId) => async (dispatch) => {
    try {
        const res = await fetch(`/api/posts/${postId}`);
        if (res.ok) {
            const { post } = await res.json();
            dispatch(setSinglePost(post));
            return post;
        } else {
            const data = await res.json();
            console.log(data);
            return data;
        }
    } catch (error) {
        console.error(`Error fetching post ${postId}:`, error);
    }
};

export const createNewPost = (post) => async (dispatch) => {
    const response = await fetch('/api/posts/new', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(post)
    });

    if (response.ok) {
        const newPost = await response.json();
        dispatch(createPost(newPost));
        return newPost;
    } else {
        const error = await response.json();
        console.log(error);
        return error;
    }
};

const initialState = {
    posts: [],
    singlePost: null,
};

const postsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_POSTS:
            return {
                ...state,
                posts: action.posts
            };
        case SET_SINGLE_POST:
            return {
                ...state,
                singlePost: action.post,
            };
        case CREATE_POST:
            return {
                ...state,
                posts: [...state.posts, action.post]
            };

        default:
            return state;
    }
};

export default postsReducer;
