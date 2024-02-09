import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateExistingPost, fetchSinglePost } from '../../store/posts';
import { useHistory } from 'react-router-dom';
import './UpdatePost.css'

const UpdatePost = ({ postId }) => {
    const [postName, setPostName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null); // Use for file input instead of imageUrl
    const [error, setError] = useState('');
    const [imageLoading, setImageLoading] = useState(false);

    const maxCharacters = 225;

    const dispatch = useDispatch();
    const history = useHistory();


    const post = useSelector((state) =>
        state.posts.posts.find((p) => p.id === parseInt(postId))
    );

    useEffect(() => {
        if (!post) {
            dispatch(fetchSinglePost(postId));
        } else {
            setPostName(post.post_name);
            setDescription(post.description);
            // Don't set image here as it's a file input, not a URL
        }
    }, [post, postId, dispatch]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setImageLoading(true);

        const formData = new FormData();
        formData.append('post_name', postName);
        formData.append('description', description);
        if (image) formData.append('image', image);

        for (let [key, value] of formData.entries()) {
            console.log(key, value);
        }

        try {
            console.log('Form data before dispatch:', formData.get('description'));
            const updated = await dispatch(updateExistingPost(postId, formData));
            setImageLoading(false); // Image upload done

            if (updated) {
                history.push(`/post/${postId}`);
            }
        } catch (err) {
            setImageLoading(false); // Ensure loading is false on error
            setError(err.message || 'An error occurred while updating the post.');
        }
    };

    return (
        <>
            <div className="updatepost-container">
                {error && <p className="error">{error}</p>}
                <div className="otter-header">Update Your Otter Picture Post!</div>
                <form onSubmit={handleSubmit} className="updatepost-form" encType="multipart/form-data">
                    {postName.length > maxCharacters - 50 && (
                        <div className="character-count2">
                            {postName.length < maxCharacters ? `${maxCharacters - postName.length} characters left` : "Maximum characters reached!"}
                        </div>
                    )}
                    <input
                        type="text"
                        className="updatepost-text"
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
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                    <button type="submit" className="updatepost-button">Update Post</button>
                    {imageLoading && <p>Loading...</p>}
                </form>
            </div>
        </>
    );
};

export default UpdatePost;
