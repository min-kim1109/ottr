from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Comment, User
from app.forms.comment_form import CommentForm

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
