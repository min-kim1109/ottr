import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { fetchPosts } from '../../store/posts';
import { deletePost } from '../../store/posts';
import DeleteConfirmationModal from '../DeletePostModal/DeletePostModal';

const SinglePost = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { postId } = useParams(); // Extract postId from the route parameters
    const posts = useSelector((state) => state.posts.posts);
    const sessionUser = useSelector((state) => state.session.user);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

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

    const handleEdit = () => {
        history.push(`/posts/${postId}/edit`);
    }

    //! this will be the logic to open the delete confirmation modal
    const handleDeleteClick = () => {
        setIsModalOpen(true);
    };

    const handleDeleteConfirm = async () => {
        setIsModalOpen(false);
        await dispatch(deletePost(singlePost.id));
        history.push('/posts')
    };

    const handleModalCancel = () => {
        setIsModalOpen(false);
    };

    console.log('Fetched Single Post:', singlePost);

    return (
        <div>
            <img src={singlePost.image_url} alt={`Post ${singlePost.id} Image`}></img>
            <p>{singlePost.post_name}</p>
            <p>{singlePost.description}</p>

            {sessionUser && sessionUser.id === singlePost.user_id && (
                <button onClick={handleEdit}>Edit Post</button>
            )}

            {sessionUser && sessionUser.id === singlePost.user_id && (
                <button onClick={handleDeleteClick}>Delete Post</button>
            )}

            <DeleteConfirmationModal
                isOpen={isModalOpen}
                onDeleteConfirm={handleDeleteConfirm}
                onCancel={handleModalCancel}
            />
        </div>
    );
};

export default SinglePost;
