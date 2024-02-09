import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createNewPost } from '../../store/posts';
import './CreatePost.css';

const CreatePost = () => {
    const [postName, setPostName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [error, setError] = useState('');
    const [imageLoading, setImageLoading] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();

    const maxCharacters = 225;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');


        const formData = new FormData();
        formData.append('post_name', postName);
        formData.append('description', description);
        if (image) {
            formData.append('image', image);
        } else {
            // Set a custom error message if the image is not provided
            setError('Image is required!');
            return; // Exit the function to prevent form submission
        }

        setImageLoading(true);

        try {

            const actionResult = await dispatch(createNewPost(formData));
            setImageLoading(false);

            const createdPost = actionResult.post ? actionResult.post : (actionResult.payload ? actionResult.payload : null);

            if (createdPost && createdPost.id) {
                history.push(`/posts/${createdPost.id}`);
            } else {
                setError('Failed to create post or no ID returned');
            }
        } catch (err) {
            setImageLoading(false);
            setError(err.message || 'An error occurred while creating the post.');
        }
    };

    return (
        <>
            <div className="createpost-container">

                <div className="otter-header">Show Us Your Otter Pictures!</div>

                <form onSubmit={handleSubmit} className="createpost-form" encType="multipart/form-data">
                    {postName.length > maxCharacters - 50 && (
                        <div className="character-count2">
                            {postName.length < maxCharacters ? `${maxCharacters - postName.length} characters left` : "Maximum characters reached!"}
                        </div>
                    )}
                    <input
                        type="text"
                        className="createpost-text"
                        placeholder="Post Name"
                        value={postName}
                        onChange={(e) => setPostName(e.target.value)}
                        maxLength={maxCharacters}
                        required
                    />
                    {description.length > maxCharacters - 50 && (
                        <div className="character-count2">
                            {description.length < maxCharacters ? `${maxCharacters - description.length} characters left` : "Maximum characters reached!"}
                        </div>
                    )}
                    <textarea
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        maxLength={maxCharacters}
                        required
                    />
                    {error && <p className="no-image-error">{error}</p>}
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                    <button type="submit" className="create-post-button">Create Post</button>
                    {imageLoading && <p>Loading...</p>}
                </form>
            </div>
        </>
    );
};

export default CreatePost;
