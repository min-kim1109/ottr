# comments.py
from app.models import db, User, Post, environment, SCHEMA
from app.models.comment import Comment

def seed_comments():
    marnie = User.query.filter_by(username='marnie').first()
    demo_post = Post.query.filter_by(post_name='Family outing').first()

    marnie_comment = Comment(
        user=marnie,
        post=demo_post,
        description='Great post! I enjoyed reading it.'
    )

    db.session.add(marnie_comment)
    db.session.commit()

def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM comments")
    db.session.commit()
