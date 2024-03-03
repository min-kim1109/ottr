import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../../store/posts';
import { Link, useLocation } from 'react-router-dom'
import './ShowAllPosts.css';

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
}

const ShowAllPosts = () => {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts.posts);
    const query = useQuery();
    const searchQuery = query.get('search') || '';

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    const filteredPosts = posts.filter(post =>
        post.post_name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div>
            <div className="top-text">Everyone's Otter photos</div>
            <div className="main-image-container">

                {filteredPosts.map((post) => (
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
        </div>
    );
};

export default ShowAllPosts;
