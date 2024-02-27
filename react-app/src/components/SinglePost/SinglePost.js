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

    const requestDeleteComment = (commentId) => {
        setDeleteTargetId({ postId, commentId });
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = async () => {
        if (deleteTargetId) {
            const { postId, commentId } = deleteTargetId;
            await dispatch(deleteComment(postId, commentId));
            setIsDeleteModalOpen(false);
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
                        <div key={comment.id} className="comment">
                            {comment.user_name || 'Anonymous'} - {editingCommentId === comment.id ? (
                                <form onSubmit={handleEditCommentSubmit}>
                                    {editingCommentText.length > 175 && (
                                        <div className="character-count">
                                            {editingCommentText.length < 225 ? `${225 - editingCommentText.length} characters left` : "Maximum characters reached!"}
                                        </div>
                                    )}
                                    <textarea
                                        value={editingCommentText}
                                        onChange={(e) => setEditingCommentText(e.target.value)}
                                        maxLength={225}
                                        required
                                    />

                                    <button type="submit" className="editpost-confirm">Confirm</button>
                                    <button type="button" onClick={() => setEditingCommentId(null)} className="editpost-cancel">Cancel</button>
                                </form>
                            ) : (
                                <>
                                    {comment.description}
                                    {sessionUser && sessionUser.id === comment.user_id && (
                                        <>

                                            <button type="button" onClick={() => openEditCommentModal(comment)} title="Edit Comment">
                                                <img src="https://i.imgur.com/WJ9TOV6.png" alt="Edit Comment" />
                                            </button>
                                            <button type="button" onClick={() => requestDeleteComment(comment.id)} title="Delete Comment">
                                                <img src="https://i.imgur.com/SgyQMPj.png" alt="Delete Comment" />
                                            </button>

                                        </>
                                    )}
                                </>
                            )}
                        </div>
                    ))}
                </ul>
                {sessionUser && (
                    <>
                        {commentText.length > 175 && (
                            <div className="character-count">
                                {commentText.length < 225 ? `${225 - commentText.length} characters left` : "Maximum characters reached!"}
                            </div>
                        )}

                        <form onSubmit={handleCommentSubmit}>
                            <textarea
                                placeholder="Leave a comment..."
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                                maxLength={225}
                                required
                            />

                            <button type="submit" className="postcomment">Post Comment</button>
                        </form>
                    </>
                )}
                {sessionUser && sessionUser.id === post.user_id && (
                    <>
                        <button onClick={() => history.push(`/posts/${postId}/edit`)} title="Edit Post">
                            <img src="https://i.imgur.com/gykwnPa.png" alt="Edit Post" />
                        </button>
                        <button onClick={() => setIsDeleteModalOpen(true)} title="Delete Post">
                            <img src="https://i.imgur.com/SgyQMPj.png" alt="Delete Post" />
                        </button>
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

// committing
