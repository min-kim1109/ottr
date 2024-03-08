# comments.py
from app.models import db, User, Post, environment, SCHEMA
from app.models.comment import Comment

def seed_comments():
    # Query Users
    marnie = User.query.filter_by(username='marnie').first()
    bobbie = User.query.filter_by(username='bobbie').first()

    #Query posts by their names
    demo_post1 = Post.query.filter_by(post_name='Family outing').first()
    lazy_sunday_post = Post.query.filter_by(post_name='Lazy Sunday').first()
    brotterhood_post = Post.query.filter_by(post_name='Brotterhood').first()

    # Marnie's comment on the "Family outing" post
    marnie_comment = Comment(
        user=marnie,
        post=demo_post1,
        description='Great post! I enjoyed reading it.'
    )

    # Bobbie's comment on the "Lazy Sunday" post
    bobbie_comment = Comment(
        user=bobbie,
        post=lazy_sunday_post,
        description="Lazy sundays are truly the best, can't wait to sleep in today!"
    )

    # Marnie's comment on the "Brotterhood" post
    marnie_comment = Comment(
        user=marnie,
        post=brotterhood_post,
        description="Family bonding at it's finest :)"
    )

     # Marnie's comment on the "Brotterhood" post
    bobbie_comment = Comment(
        user=bobbie,
        post=brotterhood_post,
        description="Love how that one otter is sticking out his tongue! So funny haha"
    )


    db.session.add(marnie_comment)
    db.session.add(bobbie_comment)
    db.session.commit()

def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM comments")
    db.session.commit()
