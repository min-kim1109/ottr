from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Comment, User
from app.forms.comment_form import CommentForm
from datetime import datetime

comment_routes = Blueprint('comments', __name__)

@comment_routes.route('/', methods=['POST'])
@login_required
def create_comment():
    data = request.get_json()

    form = CommentForm(formdata=None)
    form.description.data = data.get('description')
    post_id = data.get('post_id')

    form.csrf_token.data = request.cookies.get('csrf_token')

    if form.validate():
        if not post_id:
            return jsonify({'error': 'Missing post_id'}), 400

        new_comment = Comment(
            description=form.description.data,
            user_id=current_user.get_id(),
            post_id=post_id
        )

        db.session.add(new_comment)
        try:
            db.session.commit()
            # Include user_name in the response by setting include_user=True
            return jsonify(new_comment.to_dict(include_user=True)), 201
        except Exception as e:
            db.session.rollback()
            return jsonify({'error': 'Database error', 'message': str(e)}), 500
    else:
        return jsonify(form.errors), 400

@comment_routes.route('/<int:comment_id>/edit', methods=['PUT'])
@login_required
def update_comment(comment_id):
    try:
        # Check if the user is authenticated
        if not current_user.is_authenticated:
            return jsonify({"error": "Unauthorized"}), 401

        # Retrieve the comment to be updated
        comment = Comment.query.get(comment_id)
        if not comment:
            return jsonify({'error': 'Comment not found'}), 404

        # Check if the current user is the owner of the comment
        if comment.user_id != current_user.id:
            return jsonify({"error": "Unauthorized"}), 403

        data = request.get_json()

        # Initialize the form and populate with data
        form = CommentForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        form.description.data = data.get('description', comment.description)

        # Validate the form data
        if form.validate():
            # Update the comment
            comment.description = form.description.data
            comment.edited_at = datetime.now()  # Assuming you have an edited_at field

            db.session.commit()
            return jsonify({"comment": comment.to_dict()}), 200
        else:
            errors = form.errors
            return jsonify({"errors": errors}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@comment_routes.route('/<int:comment_id>', methods=['DELETE'])
@login_required
def delete_comment(comment_id):
    comment = Comment.query.get(comment_id)
    if not comment:
        return jsonify({'error': 'Comment not found'}), 404

    if comment.user_id != current_user.get_id():
        return jsonify({'error': 'Unauthorized'}), 403

    db.session.delete(comment)
    try:
        db.session.commit()
        return jsonify({'message': 'Comment deleted successfully'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Database error', 'message': str(e)}), 500
