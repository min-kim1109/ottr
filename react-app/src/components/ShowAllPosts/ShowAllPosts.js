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

        <div>
            {posts.map((post) => (
                <div key={post.id}>
                    <div className="main-image-container">
                        {post.image_url && <img src={post.image_url} alt="Post Image" />}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ShowAllPosts;
