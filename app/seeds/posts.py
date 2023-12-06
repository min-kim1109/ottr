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
        preview=True,
        image_url='https://upload.wikimedia.org/wikipedia/commons/2/25/The_Krusty_Krab.png'  # Add the image URL
    )

    marnie_post = Post(
        user_id=2,
        post_name='Marnie Post',
        description='This post belongs to Marnie.',
        views=1234,
        upload_date='2023-12-05',
        url='https://example.com/demo-post',
        preview=True,
        image_url='https://static.wikia.nocookie.net/spongebob/images/a/ac/SpongeBob%27sPlace.png'  # Add the image URL
    )

    bobbie_post = Post(
        user_id=3,
        post_name='Bobbie Post',
        description='This post belongs to Bobbie.',
        views=1234,
        upload_date='2023-12-05',
        url='https://example.com/demo-post',
        preview=True,
        image_url='https://thespongeclub.com/wp-content/uploads/2022/08/Chum-Bucket-Guide.png'  # Add the image URL
    )

    db.session.add(demo_post)
    db.session.add(marnie_post)
    db.session.add(bobbie_post)

    db.session.commit()

def undo_posts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM posts"))

    db.session.commit()
