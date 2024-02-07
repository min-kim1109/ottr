from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text
from app.models.post import Post

def seed_posts():
    demo = User.query.filter_by(username='Demo').first()

    demo_post = Post(
        user_id=1,
        post_name='Family outing',
        description='Mother and cub otter floating in water',
        views=1234,
        upload_date='2023-12-04',
        url='https://example.com/demo-post',
        preview=True,
        image_url='https://i.imgur.com/FRI4045.jpg'  # Add the image URL
    )

    marnie_post = Post(
        user_id=2,
        post_name='Lazy Sunday',
        description='Sleek otter drying off in the sun',
        views=1234,
        upload_date='2023-12-05',
        url='https://example.com/demo-post',
        preview=True,
        image_url='https://i.imgur.com/qar6087.jpg'  # Add the image URL
    )

    bobbie_post = Post(
        user_id=3,
        post_name='Curiosity',
        description='Cuter otter floating in the water',
        views=1234,
        upload_date='2023-12-05',
        url='https://example.com/demo-post',
        preview=True,
        image_url='https://i.imgur.com/t26Q9kW.jpg'  # Add the image URL
    )

    db.session.add(demo_post)
    db.session.add(marnie_post)
    db.session.add(bobbie_post)

    db.session.commit()

def undo_posts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.posts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM posts"))
    db.session.commit()
