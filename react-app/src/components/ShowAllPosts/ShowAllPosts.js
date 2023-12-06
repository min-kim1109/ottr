// ShowAllPosts.jsx

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { fetchPosts } from '../../store/posts';
import './ShowAllPosts.css';

const ShowAllPosts = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const posts = useSelector((state) => state.posts.posts);

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    if (!posts) return null;

    console.log('Fetched Posts:', posts);

    return (
        <div className="main-image-container">
            {posts.map((post) => (
                <Link key={post.id} to={`/post/${post.id}`}>
                    <div className="post-image">
                        <img
                            src={post.image_url}
                            alt="Post Image"


                        />
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default ShowAllPosts;
