import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchPosts } from '../../store/posts';

const SinglePost = () => {
    const dispatch = useDispatch();
    const { postId } = useParams(); // Extract postId from the route parameters
    const posts = useSelector((state) => state.posts.posts);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await dispatch(fetchPosts());
                setLoading(false);
            } catch (error) {
                console.error('Error fetching posts:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, [dispatch]);

    if (loading) {
        return <div>Loading...</div>;
    }

    const singlePost = posts.find((post) => post.id === parseInt(postId));

    if (!singlePost) {
        return <div>Post not found</div>;
    }

    console.log('Fetched Single Post:', singlePost);

    return (
        <div>
            <img src={singlePost.image_url} alt={`Post ${singlePost.id} Image`}></img>
            <p>{singlePost.post_name}</p>
            <p>{singlePost.description}</p>
        </div>
    );
};

export default SinglePost;
