import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { fetchPosts, createNewComment, deletePost, editComment } from '../../store/posts'; // Import editComment
import DeleteConfirmationModal from '../DeletePostModal/DeletePostModal';

const SinglePost = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { postId } = useParams();
    const post = useSelector((state) => state.posts.posts.find((post) => post.id === parseInt(postId)));
    const sessionUser = useSelector((state) => state.session.user);
    const [commentText, setCommentText] = useState('');
    const [comments, setComments] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCommentId, setEditingCommentId] = useState(null); // State to track editing comment ID
    const [editingCommentText, setEditingCommentText] = useState(''); // State to track editing comment text

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    useEffect(() => {
        if (post) {
            const storedComments = localStorage.getItem(`comments_${postId}`);
            if (storedComments) {
                setComments(JSON.parse(storedComments));
            } else {
                setComments(post.comments || []); // Ensure fallback to empty array
            }
        }
    }, [postId, post]);

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (commentText.trim()) {
            const commentData = { description: commentText, post_id: postId };
            const response = await dispatch(createNewComment(postId, commentData));
            if (response && !response.error) {
                setCommentText('');
                const newComments = [...comments, response];
                setComments(newComments);
                localStorage.setItem(`comments_${postId}`, JSON.stringify(newComments));
            } else {
                console.error('Error creating comment:', response);
            }
        }
    };

    const openEditCommentModal = (comment) => {
        setEditingCommentId(comment.id);
        setEditingCommentText(comment.description);
    };

    const handleEditCommentSubmit = async (e) => {
        e.preventDefault();
        if (editingCommentText.trim()) {
            const updatedCommentData = { description: editingCommentText };
            const response = await dispatch(editComment(editingCommentId, updatedCommentData));
            if (!response.error) {
                setEditingCommentId(null);
                setEditingCommentText('');
                const updatedComments = comments.map(comment => comment.id === editingCommentId ? { ...comment, description: editingCommentText } : comment);
                setComments(updatedComments);
                localStorage.setItem(`comments_${postId}`, JSON.stringify(updatedComments));
            } else {
                console.error('Error editing comment:', response);
            }
        }
    };

    if (!post) {
        return <div>Loading...</div>;
    }

    const handleDeleteConfirm = async () => {
        await dispatch(deletePost(post.id));
        localStorage.removeItem(`comments_${postId}`);
        history.push('/posts');
        setIsModalOpen(false);
    };

    return (
        <div>
            <img src={post.image_url} alt={`Post ${post.id} Image`} />
            <p>{post.post_name}</p>
            <p>{post.description}</p>
            <div>Comments:</div>
            <ul>
                {comments.map((comment) => (
                    <li key={comment.id}>
                        {comment.user_name} || {editingCommentId === comment.id ? (
                            <form onSubmit={handleEditCommentSubmit}>
                                <textarea
                                    value={editingCommentText}
                                    onChange={(e) => setEditingCommentText(e.target.value)}
                                    required
                                />
                                <button type="submit">Confirm</button>
                                <button type="button" onClick={() => setEditingCommentId(null)}>Cancel</button>
                            </form>
                        ) : (
                            <>
                                {comment.description}
                                <button type="button" onClick={() => openEditCommentModal(comment)}>Edit</button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
            {sessionUser && (
                <>
                    <form onSubmit={handleCommentSubmit}>
                        <textarea
                            placeholder="Leave a comment..."
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            required
                        />
                        <button type="submit">Post Comment</button>
                    </form>
                </>
            )}
            {sessionUser && sessionUser.id === post.user_id && (
                <>
                    <button onClick={() => history.push(`/posts/${postId}/edit`)}>Edit Post</button>
                    <button onClick={() => setIsModalOpen(true)}>Delete Post</button>
                </>
            )}
            <DeleteConfirmationModal
                isOpen={isModalOpen}
                onDeleteConfirm={handleDeleteConfirm}
                onCancel={() => setIsModalOpen(false)}
            />
        </div>
    );
};

export default SinglePost;
