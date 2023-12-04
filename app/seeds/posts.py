from app.models import db, User, environment, SCHEMA

from app.models.post import Post

def seed_posts():
    demo = User.query.filter_by(username='Demo').first()

    demo_post = Post(
        user=demo,
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
    # Add undo logic for posts if needed
    pass
