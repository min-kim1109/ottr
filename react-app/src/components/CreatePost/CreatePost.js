import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom'
import { createNewPost } from '../../store/posts';

const CreatePost = () => {
    const [postName, setPostName] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const dispatch = useDispatch();
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPost = {
            post_name: postName,
            description,
            image_url: imageUrl,
        };
        await dispatch(createNewPost(newPost));
        history.push('/posts');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Post Name" value={postName} onChange={(e) => setPostName(e.target.value)} required />
            <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
            <input type="text" placeholder="Image URL" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
            <button type="submit">Create Post</button>
        </form>
    );
};

export default CreatePost;
