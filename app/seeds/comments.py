# comments.py
from app.models import db, User, Post, environment, SCHEMA
from app.models.comment import Comment

def seed_comments():
    marnie = User.query.filter_by(username='marnie').first()
    demo_post = Post.query.filter_by(post_name='Demo Post').first()

    marnie_comment = Comment(
        user=marnie,
        post=demo_post,
        description='Great post! I enjoyed reading it.'
    )

    db.session.add(marnie_comment)
    db.session.commit()

def undo_comments():
    # Add undo logic for comments if needed
    pass
