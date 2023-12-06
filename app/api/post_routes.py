from flask import Blueprint, jsonify
from app.models import Post

post_routes = Blueprint('posts', __name__)

@post_routes.route('/')
def get_posts():
    posts = Post.query.all()
    return {"posts": [post.to_dict() for post in posts]}
