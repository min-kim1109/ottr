import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../../store/posts';
import { Link } from 'react-router-dom'

const ShowAllPosts = () => {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts.posts);

    useEffect(() => {
        dispatch(fetchPosts()); // Fetch posts when component mounts
    }, [dispatch]);

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
