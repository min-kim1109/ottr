import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { fetchPosts, createNewComment, deletePost } from '../../store/posts';
import DeleteConfirmationModal from '../DeletePostModal/DeletePostModal';

const SinglePost = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { postId } = useParams();
    const post = useSelector((state) =>
        state.posts.posts.find((post) => post.id === parseInt(postId))
    );
    const sessionUser = useSelector((state) => state.session.user);
    const [commentText, setCommentText] = useState('');
    const [comments, setComments] = useState(post ? post.comments : []);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (!post) {
            dispatch(fetchPosts());
        } else {
            setComments(post.comments);
        }
    }, [dispatch, postId, post]);

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (commentText.trim()) {
            const commentData = { description: commentText, post_id: postId };
            const response = await dispatch(createNewComment(postId, commentData));
            if (response && !response.error) {
                setCommentText('');
                setComments([...comments, response]);
            } else {
                console.error('Error creating comment:', response);
            }
        }
    };

    if (!post) {
        return <div>Loading...</div>;
    }

    const handleDeleteConfirm = async () => {
        await dispatch(deletePost(post.id));
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
                        {comment.user_name} || {comment.description}
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
