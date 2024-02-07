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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');


        const formData = new FormData();
        formData.append('post_name', postName);
        formData.append('description', description);
        if (image) formData.append('image', image);

        setImageLoading(true);

        try {

            const actionResult = await dispatch(createNewPost(formData));
            setImageLoading(false); // Image upload done

            const createdPost = actionResult.post ? actionResult.post : (actionResult.payload ? actionResult.payload : null);

            if (createdPost && createdPost.id) {
                history.push(`/posts/${createdPost.id}`);
            } else {
                setError('Failed to create post or no ID returned');
            }
        } catch (err) {
            setImageLoading(false); // Ensure loading is false on error
            setError(err.message || 'An error occurred while creating the post.');
        }
    };

    return (
        <>
            <div className="container">
                {error && <p className="error">{error}</p>}
                <div className="otter-header">Show Us Your Otter Pictures!</div>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <input type="text" placeholder="Post Name" value={postName} onChange={(e) => setPostName(e.target.value)} required />
                    <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                    <button type="submit">Create Post</button>
                    {imageLoading && <p>Loading...</p>}
                </form>
            </div>
        </>
    );
};

export default CreatePost;
