import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'; // Import useSelector
import { updateExistingPost, fetchSinglePost } from '../../store/posts';
import { useHistory } from 'react-router-dom';

const UpdatePost = ({ postId }) => {
    // State variables for the post fields
    const [postName, setPostName] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    // Dispatch and history for Redux actions and navigation
    const dispatch = useDispatch();
    const history = useHistory();

    // Access the post data from the Redux store
    const post = useSelector((state) =>
        state.posts.posts.find((p) => p.id === parseInt(postId))
    );

    useEffect(() => {
        // If the post isn't in the Redux store, fetch it
        if (!post) {
            dispatch(fetchSinglePost(postId));
        } else {
            // Otherwise, use the post data to set the state variables
            setPostName(post.post_name);
            setDescription(post.description);
            setImageUrl(post.image_url);
        }
    }, [post, postId, dispatch]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedPost = {
            post_name: postName,
            description,
            image_url: imageUrl,
        };
        const updated = await dispatch(updateExistingPost(postId, updatedPost));
        if (updated) {
            history.push(`/post/${postId}`); // Redirect to the updated post's page
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Post Name"
                value={postName}
                onChange={(e) => setPostName(e.target.value)}
                required
            />
            <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Image URL"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
            />
            <button type="submit">Update Post</button>
        </form>
    );
};

export default UpdatePost;
