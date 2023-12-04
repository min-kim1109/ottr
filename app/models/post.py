from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.orm import relationship

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

    user = relationship('User', back_populates='posts')
    comments = relationship('Comment', back_populates='post')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'post_name': self.post_name,
            'description': self.description,
            'views': self.views,
            'comment_count': self.comment_count,
            'upload_date': self.upload_date,
            'url': self.url,
            'preview': self.preview
        }
