import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateExistingPost, fetchSinglePost } from '../../store/posts';
import { useHistory } from 'react-router-dom';


const UpdatePost = ({ postId }) => {
    const [postName, setPostName] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [error, setError] = useState('');

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
            setImageUrl(post.image_url);
        }
    }, [post, postId, dispatch]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedPost = {
            post_name: postName,
            description: description,
            image_url: imageUrl, // Assuming your backend expects an image_url field
        };

        try {
            const updated = await dispatch(updateExistingPost(postId, updatedPost));
            if (updated) {
                history.push(`/post/${postId}`);
            }
        } catch (err) {
            setError(err.message || 'An error occurred while updating the post.');
        }
    };

    return (
        <>
            <div className="container">
                {error && <p className="error">{error}</p>}
                <div className="otter-header">Update Your Otter Picture Post!</div>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <input type="text" placeholder="Post Name" value={postName} onChange={(e) => setPostName(e.target.value)} required />
                    <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
                    <input type="text" placeholder="Image URL" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
                    <button type="submit">Update Post</button>
                </form>
            </div>
        </>
    );
};

export default UpdatePost;
