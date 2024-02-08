import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { fetchPosts, createNewComment, deletePost, editComment, deleteComment } from '../../store/posts';
import DeleteConfirmationModal from '../DeletePostModal/DeletePostModal';
import './SinglePost.css';

const SinglePost = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { postId } = useParams();
    const post = useSelector((state) => state.posts.posts.find((post) => post.id === parseInt(postId)));
    const sessionUser = useSelector((state) => state.session.user);
    const [commentText, setCommentText] = useState('');
    const [comments, setComments] = useState([]);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [deleteTargetId, setDeleteTargetId] = useState(null);
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editingCommentText, setEditingCommentText] = useState('');

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    useEffect(() => {
        if (post) {
            setComments(post.comments || []);
        }
    }, [postId, post]);

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (commentText.trim()) {
            const commentData = { description: commentText, post_id: postId };
            const response = await dispatch(createNewComment(postId, commentData));
            if (response && !response.error) {
                setCommentText('');
                // Now directly using the response assuming it includes user_name
                const newComments = [...comments, response];
                setComments(newComments);
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
            } else {
                console.error('Error editing comment:', response);
            }
        }
    };

    // Update this function to also consider postId
    const requestDeleteComment = (commentId) => {
        setDeleteTargetId({ postId, commentId }); // Adjust to store both IDs
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = async () => {
        if (deleteTargetId) {
            // Ensure you're using both postId and commentId when calling deleteComment
            const { postId, commentId } = deleteTargetId; // Destructure to get both IDs
            await dispatch(deleteComment(postId, commentId));
            setIsDeleteModalOpen(false);
            // Update local state to remove the deleted comment
            setComments(comments.filter(comment => comment.id !== commentId));
            setDeleteTargetId(null);
        }
    };

    const handleDeletePostConfirm = async () => {
        await dispatch(deletePost(post.id));
        history.push('/posts');
    };

    if (!post) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="photo-container">
                <img src={post.image_url} alt={`Post ${post.id} Image`} />
            </div>
            <div className="information-section">
                <h2 className="post-name">{post.post_name}</h2>
                <p className="post-description">{post.description}</p>
            </div>
            <div className="comments-section">
                Comments:
                <ul>
                    {comments.map((comment) => (
                        <li key={comment.id} className="comment">
                            {comment.user_name || 'Anonymous'}: {editingCommentId === comment.id ? (
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
                                    {sessionUser && sessionUser.id === comment.user_id && (
                                        <>
                                            <button type="button" onClick={() => openEditCommentModal(comment)}>Edit</button>
                                            <button type="button" onClick={() => requestDeleteComment(comment.id)}>Delete</button>
                                        </>
                                    )}
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
                            <button type="submit" className="postcomment">Post Comment</button>
                        </form>
                    </>
                )}
                {sessionUser && sessionUser.id === post.user_id && (
                    <>
                        <button onClick={() => history.push(`/posts/${postId}/edit`)}>Edit Post</button>
                        <button onClick={() => setIsDeleteModalOpen(true)}>Delete Post</button>
                    </>
                )}
            </div>
            <DeleteConfirmationModal
                isOpen={isDeleteModalOpen}
                onDeleteConfirm={deleteTargetId ? confirmDelete : handleDeletePostConfirm}
                onCancel={() => setIsDeleteModalOpen(false)}
            />
        </div>
    );
};

export default SinglePost;
