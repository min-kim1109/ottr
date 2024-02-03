from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Post
from app.forms.post_form import PostForm
from datetime import datetime

post_routes = Blueprint('posts', __name__)

# Route to fetch all posts
@post_routes.route('/', methods=['GET'])
def get_posts():
    try:
        posts = Post.query.all()
        posts_dict = [post.to_dict() for post in posts]
        return jsonify({"posts": posts_dict}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Route to fetch a specific post by ID
@post_routes.route('/<int:post_id>', methods=['GET'])
def get_post(post_id):
    try:
        post = Post.query.get(post_id)

        if post:
            return jsonify(post.to_dict()), 200
        else:
            return jsonify({'error': 'Post not found'}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@post_routes.route('/new', methods=['POST'])
@login_required
def create_post():
    try:
        if not current_user.is_authenticated:
            return jsonify({"error": "Unauthorized"}), 401

        data = request.get_json()

        form = PostForm()

        form['csrf_token'].data = request.cookies['csrf_token']

        form.post_name.data = data.get('post_name')
        form.description.data = data.get('description')
        form.image_url.data = data.get('image_url')

        if form.validate():
            new_post = Post(
                user_id=current_user.get_id(),
                post_name=form.post_name.data,
                description=form.description.data,
                image_url=form.image_url.data,
                upload_date=datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            )
            db.session.add(new_post)
            db.session.commit()
            return jsonify({"post": new_post.to_dict()}), 201
        else:
            errors = form.errors
            return jsonify({"errors": errors}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@post_routes.route('/<int:post_id>/edit', methods=['PUT'])
@login_required
def update_post(post_id):
    try:
        if not current_user.is_authenticated:
            return jsonify({"error": "Unauthorized"}), 401

        post = Post.query.get(post_id)
        if not post:
            return jsonify({'error': 'Post not found'}), 404

        data = request.get_json()

        form = PostForm()

        form['csrf_token'].data = request.cookies['csrf_token']

        form.post_name.data = data.get('post_name', post.post_name)
        form.description.data = data.get('description', post.description)
        form.image_url.data = data.get('image_url', post.image_url)

        if form.validate():

            post.post_name = form.post_name.data
            post.description = form.description.data
            post.image_url = form.image_url.data
            post.upload_date = datetime.now().strftime("%Y-%m-%d %H:%M:%S")


            db.session.commit()
            return jsonify({"post": post.to_dict()}), 200
        else:
            errors = form.errors
            return jsonify({"errors": errors}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@post_routes.route("/<int:post_id>", methods=["DELETE"])
@login_required
def delete_post(post_id):
    """
    Delete post (while logged in)
    """
    currentPost = Post.query.get(post_id)

    if not currentPost:
        return jsonify({'error': 'Post does not exist'}), 404

    if currentPost.user_id != current_user.id:
        return jsonify({'error': 'You do not have permission to delete this post'}), 401

    db.session.delete(currentPost)
    try:
        db.session.commit()
        return jsonify({'message': 'Post successfully deleted'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500
