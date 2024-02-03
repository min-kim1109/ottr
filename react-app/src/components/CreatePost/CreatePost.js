import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createNewPost } from '../../store/posts';

const CreatePost = () => {
    const [postName, setPostName] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [error, setError] = useState(''); // State to hold error messages
    const dispatch = useDispatch();
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Reset error message on new submission

        const newPost = {
            post_name: postName,
            description,
            description,
            image_url: imageUrl,
        };

        try {
            // Dispatch createNewPost and wait for the new post object to be returned
            const actionResult = await dispatch(createNewPost(newPost));
            const createdPost = actionResult.post ? actionResult.post : (actionResult.payload ? actionResult.payload : null);

            // Check if the new post has an ID and redirect to the new post's page
            if (createdPost && createdPost.id) {
                history.push(`/posts/${createdPost.id}`);
            } else {
                // Handle the case where post creation failed or didn't return an ID
                setError('Failed to create post or no ID returned');
            }
        } catch (err) {
            // Catch and display any errors that occur during the post creation process
            setError(err.message || 'An error occurred while creating the post.');
        }
    };

    return (
        <>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Post Name" value={postName} onChange={(e) => setPostName(e.target.value)} required />
                <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
                <input type="text" placeholder="Image URL" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
                <button type="submit">Create Post</button>
            </form>
        </>
    );
};

export default CreatePost;
