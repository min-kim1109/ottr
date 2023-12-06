import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../../store/posts';
import "./ShowAllPosts.css"

const ShowAllPosts = () => {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts.posts);

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    if (!posts) return null

    console.log('Fetched Posts:', posts);

    return (
        <div className="main-image-container">
            {posts.map((post) => (
                <img key={post.id} src={post.image_url} alt="Post Image" />
            ))}
        </div>
    );
};

export default ShowAllPosts;
