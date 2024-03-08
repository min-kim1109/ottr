from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text
from app.models.post import Post

# Seed Posts
def seed_posts():
    demo = User.query.filter_by(username='Demo').first()
    marnie = User.query.filter_by(username='marnie').first()
    bobbie = User.query.filter_by(username='bobbie').first()

    # POST 1
    demo_post1 = Post(
        user_id=demo.id,
        post_name='Family outing',
        description='Mother and cub otter floating in water',
        views=1234,
        upload_date='2023-12-04',
        url='https://example.com/demo-post1',
        preview=True,
        image_url='https://i.imgur.com/FRI4045.jpg'
    )

    # POST 2
    marnie_post = Post(
        user_id=marnie.id,
        post_name='Lazy Sunday',
        description='Sleek otter drying off in the sun',
        views=1234,
        upload_date='2023-12-05',
        url='https://example.com/marnie-post',
        preview=True,
        image_url='https://i.imgur.com/qar6087.jpg'
    )

    # POST 3
    bobbie_post = Post(
        user_id=bobbie.id,
        post_name='Curiosity',
        description='Cute otter floating in the water',
        views=1234,
        upload_date='2023-12-05',
        url='https://example.com/bobbie-post',
        preview=True,
        image_url='https://i.imgur.com/t26Q9kW.jpg'
    )

    # POST 4
    demo_post2 = Post(
        user_id=demo.id,
        post_name='Sleepy Otter Yawning',
        description='After a long slumber, a well-rested otter yawns as the warm morning sunlight hits his fur',
        views=1234,
        upload_date='2023-12-04',
        url='https://example.com/demo-post2',
        preview=True,
        image_url='https://i.imgur.com/iXx2ZUA.png'
    )

    # POST 5
    bobbie_post2 = Post(
        user_id=bobbie.id,
        post_name='Brotterhood',
        description='Two close sibling otters patiently await their mother to return with food atop a mossy rock in a river bank',
        views=1234,
        upload_date='2023-12-04',
        url='https://example.com/demo-post2',
        preview=True,
        image_url='https://i.imgur.com/uFZ2sv0.png'
    )

    # POST 6
    bobbie_post3 = Post(
        user_id=bobbie.id,
        post_name='Triplets',
        description='Three small and fluffy baby otters stack ontop of one another into one cute and adorable pyramid',
        views=1234,
        upload_date='2023-12-04',
        url='https://example.com/demo-post2',
        preview=True,
        image_url='https://i.imgur.com/4SnFlEG.jpg'
    )

    # POST 7
    marnie_post2 = Post(
        user_id=marnie.id,
        post_name='Awareness',
        description='While the other otters in the family are distracted by other artifacts in nature, one particular otter stares attentively at the human holding a camera',
        views=1234,
        upload_date='2023-12-05',
        url='https://example.com/marnie-post',
        preview=True,
        image_url='https://i.imgur.com/J5csF9o.png'
    )

    # POST 8
    marnie_post3 = Post(
        user_id=marnie.id,
        post_name='Clean Otter',
        description='After a long day of rolling around in the mud, a clean bath is just what this otter needed',
        views=1234,
        upload_date='2023-12-04',
        url='https://example.com/demo-post2',
        preview=True,
        image_url='https://i.imgur.com/GQB178s.png'
    )

    # POST 9
    marnie_post4 = Post(
        user_id=marnie.id,
        post_name='Hard at work',
        description='In the midst of building a dam, the otter takes a break atop his log to look for his companion ',
        views=1234,
        upload_date='2023-12-04',
        url='https://example.com/demo-post2',
        preview=True,
        image_url='https://i.imgur.com/mbB9d3C.png'
    )

    # POST 10
    marnie_post5 = Post(
        user_id=marnie.id,
        post_name='Animated Sprite Otter',
        description='The origin of the animated logo of this site',
        views=1234,
        upload_date='2023-12-04',
        url='https://example.com/demo-post2',
        preview=True,
        image_url='https://i.imgur.com/kPEtdtJ.gif'
    )

    # POST 11
    marnie_post6 = Post(
        user_id=marnie.id,
        post_name='Measurements',
        description='An otter floats in water, playfully examining a stone in its paws, its fur gleaming under the sun\'s rays.',
        views=1234,
        upload_date='2023-12-04',
        url='https://example.com/demo-post2',
        preview=True,
        image_url='https://i.imgur.com/7MDv9Xm.png'
    )



    # POST 13
    marnie_post8 = Post(
        user_id=marnie.id,
        post_name='Playful otter',
        description='A baby otter peeks over a ledge, its eyes full of curiosity and tiny paws gripping the edge.',
        views=1234,
        upload_date='2023-12-04',
        url='https://example.com/demo-post2',
        preview=True,
        image_url='https://i.imgur.com/pBb5zbz.png'
    )

    # POST 14
    marnie_post9 = Post(
        user_id=marnie.id,
        post_name='Maternal instincts',
        description='A sea otter mother floats on her back, cradling her sleeping pup on her chest in calm waters.',
        views=1234,
        upload_date='2023-12-04',
        url='https://example.com/demo-post2',
        preview=True,
        image_url='https://i.imgur.com/qfbYB9e.png'
    )

    # POST 15
    marnie_post10 = Post(
        user_id=marnie.id,
        post_name='Cold Winter Day',
        description='An otter strides across icy ground, its fur wet and glossy against the snowy backdrop.',
        views=1234,
        upload_date='2023-12-04',
        url='https://example.com/demo-post2',
        preview=True,
        image_url='https://i.imgur.com/rsT3LMz.png'
    )

    # POST 16
    marnie_post11 = Post(
        user_id=marnie.id,
        post_name='Snowy outing',
        description='A group of otters on a snowy riverbank, alert and observing their surroundings.',
        views=1234,
        upload_date='2023-12-04',
        url='https://example.com/demo-post2',
        preview=True,
        image_url='https://i.imgur.com/IdymzQH.png'
    )

    # POST 17
    marnie_post12 = Post(
        user_id=marnie.id,
        post_name='Hard day at work',
        description='An otter slides down a wet log in a river, splashing water droplets into the air.',
        views=1234,
        upload_date='2023-12-04',
        url='https://example.com/demo-post2',
        preview=True,
        image_url='https://i.imgur.com/2O9anQI.png'
    )

    # POST 18
    marnie_post13= Post(
        user_id=marnie.id,
        post_name='Socializing',
        description='Three otters float on their backs in clear blue water, one with its mouth open as if mid-chatter.',
        views=1234,
        upload_date='2023-12-04',
        url='https://example.com/demo-post2',
        preview=True,
        image_url='https://i.imgur.com/7Ouz9hH.png'
    )

    # POST 19
    marnie_post14= Post(
        user_id=marnie.id,
        post_name='Aocializing',
        description='A baby otter lies on a white towel, chewing on colorful plastic rings, next to a blue crate on a ledge.',
        views=1234,
        upload_date='2023-12-04',
        url='https://example.com/demo-post2',
        preview=True,
        image_url='https://i.imgur.com/sY7UcXn.png'
    )




    db.session.add(demo_post1)
    db.session.add(marnie_post)
    db.session.add(bobbie_post)
    db.session.add(demo_post2)
    db.session.add(bobbie_post2)
    db.session.add(bobbie_post3)
    db.session.add(marnie_post2)
    db.session.add(marnie_post3)
    db.session.add(marnie_post4)
    db.session.add(marnie_post5)
    db.session.add(marnie_post6)
    db.session.add(marnie_post8)
    db.session.add(marnie_post9)
    db.session.add(marnie_post10)
    db.session.add(marnie_post11)
    db.session.add(marnie_post12)
    db.session.add(marnie_post13)
    db.session.add(marnie_post14)

    db.session.commit()

def undo_posts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.posts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM posts"))
    db.session.commit()
