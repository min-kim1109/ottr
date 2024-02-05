
//! ACTION CONSTANTS ---------------------------------------------------------
// Action Constants for Post
export const SET_POSTS = 'SET_POSTS';
export const SET_SINGLE_POST = 'SET_SINGLE_POST';
export const CREATE_POST = 'CREATE_POST';
export const UPDATE_POST = 'UPDATE_POST';
export const DELETE_POST = 'DELETE_POST';

// Action Constants for Comment
export const CREATE_COMMENT = 'CREATE_COMMENT';
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT';


//! ACTION CREATOR ---------------------------------------------------------
// Action Creator for Post
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

export const updatePostAction = (post) => ({
    type: UPDATE_POST,
    post
})

export const deletePostAction = (postId) => ({
    type: DELETE_POST,
    postId
});

// Action Creator for Comment
export const createComment = (comment) => ({
    type: CREATE_COMMENT,
    comment
})

export const editCommentAction = (comment) => ({
    type: EDIT_COMMENT,
    comment
});

export const deleteCommentAction = (commentId) => ({
    type: DELETE_COMMENT,
    commentId
});


//! THUNKS ---------------------------------------------------------
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

// thunk to create a new post
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
        return newPost; // Make sure to return the newPost object here
    } else {
        const error = await response.json();
        console.log(error);
        return error; // Return error so the calling function can handle it
    }
};

// thunk for updating a post
export const updateExistingPost = (postId, updatedPostData) => async (dispatch) => {
    const response = await fetch(`/api/posts/${postId}/edit`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedPostData)
    });

    if (response.ok) {
        const updatedPost = await response.json();
        dispatch(updatePostAction(updatedPost));
        return updatedPost;
    } else {
        const error = await response.json();
        console.log(error);
        return error;
    }
};

// thunk for deleting a post
export const deletePost = (postId) => async (dispatch) => {
    const response = await fetch(`/api/posts/${postId}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        dispatch(deletePostAction(postId));
        return postId;
    } else {
        const error = await response.json();
        console.log(error);
        return error;
    }
};

//thunk for creating a new comment
export const createNewComment = (post_id, commentData) => async (dispatch) => {
    const response = await fetch('/api/comments/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...commentData, post_id })
    });

    if (response.ok) {
        const newComment = await response.json();
        dispatch(createComment(newComment));
        return newComment;
    } else {
        const error = await response.json();
        console.log('Error creating comment:', error);
        return error;
    }
};

// thunk for editing a comment
export const editComment = (commentId, updatedCommentData) => async (dispatch) => {
    const response = await fetch(`/api/comments/${commentId}/edit`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedCommentData)
    });

    if (response.ok) {
        const updatedComment = await response.json();
        dispatch(editCommentAction(updatedComment));
        return updatedComment;
    } else {
        const error = await response.json();
        console.error('Error editing comment:', error);
        return error;
    }
};

// Thunk for deleting a comment
export const deleteComment = (commentId) => async (dispatch) => {
    const response = await fetch(`/api/comments/${commentId}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        dispatch(deleteCommentAction(commentId));
        return commentId;
    } else {
        const error = await response.json();
        console.error('Error deleting comment:', error);
        return error;
    }
};

//! REDUCER ---------------------------------------------------------
const initialState = {
    posts: [],
    singlePost: null,
    comments: [],
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
        case UPDATE_POST:
            return {
                ...state,
                posts: state.posts.map(post =>
                    post.id === action.post.id ? action.post : post),
                singlePost: action.post
            };
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(post => post.id !== action.postId),
                singlePost: state.singlePost && state.singlePost.id === action.postId ? null : state.singlePost
            };


        case CREATE_COMMENT:
            return {
                ...state,
                comments: [...state.comments, action.comment]
            }
        case EDIT_COMMENT:
            return {
                ...state,
                comments: state.comments.map(comment =>
                    comment.id === action.comment.id ? action.comment : comment)
            };
        case DELETE_COMMENT:
            return {
                ...state,
                comments: state.comments.filter(comment => comment.id !== action.commentId)
            };




        default:
            return state;
    }
};

export default postsReducer;
