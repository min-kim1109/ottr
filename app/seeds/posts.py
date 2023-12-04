from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text
from app.models.post import Post

def seed_posts():
    demo = User.query.filter_by(username='Demo').first()

    demo_post = Post(
        user_id=1,
        post_name='Demo Post',
        description='This is a demo post.',
        views=1234,
        upload_date='2023-12-04',
        url='https://example.com/demo-post',
        preview=True
    )

    db.session.add(demo_post)
    db.session.commit()

def undo_posts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM posts"))

    db.session.commit()
