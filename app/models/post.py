from .db import db, environment, SCHEMA, add_prefix_for_prod

class Post(db.Model):
    __tablename__ = 'posts'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    post_name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    views = db.Column(db.Integer, default=0)
    comment_count = db.Column(db.Integer, default=0)
    upload_date = db.Column(db.String(50), nullable=False)
    url = db.Column(db.String(255), nullable=False)
    preview = db.Column(db.Boolean, default=False)

    # Add a new field for the image path or URL
    image_url = db.Column(db.String(255))

    user = db.relationship('User', back_populates='posts')
    comments = db.relationship('Comment', back_populates='post', cascade="all, delete")

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'post_name': self.post_name,
            'description': self.description,
            'views': self.views,
            'comment_count': len(self.comments),
            'upload_date': self.upload_date,
            'url': self.url,
            'preview': self.preview,
            'image_url': self.image_url  # Include the image URL in the dictionary
        }
