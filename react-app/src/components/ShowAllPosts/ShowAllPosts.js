import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../../store/posts';

const ShowAllPosts = () => {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts.posts);

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    if (!posts) return null

    console.log('Fetched Posts:', posts);

    return (
        <></>
        // <div>
        //     {posts.map((post) => (
        //         <div key={post.id}>
        //             <h3>{post.post_name}</h3>
        //             <p>{post.description}</p>
        //         </div>
        //     ))}
        // </div>
    );
};

export default ShowAllPosts;
