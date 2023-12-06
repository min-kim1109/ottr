from flask import Blueprint, jsonify
from app.models import Post

post_routes = Blueprint('posts', __name__)

@post_routes.route('/')
def get_posts():
    # Get all posts
    posts = Post.query.all()
    return {"posts": [post.to_dict() for post in posts]}


@post_routes.route('/<int:post_id>')
def get_post(post_id):
    # Get post by post id
    post = Post.query.get(post_id)

    if post is None:
        return jsonify({'error': 'Post not found'}), 404

    return jsonify(post.to_dict())
