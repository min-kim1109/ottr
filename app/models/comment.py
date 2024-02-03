from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.orm import relationship

class Comment(db.Model):
    __tablename__ = 'comments'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(255), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('posts.id')), nullable=False)

    user = relationship('User', back_populates='comments')
    post = relationship('Post', back_populates='comments')

    def to_dict(self, include_user=False):
        comment_dict = {
            'id': self.id,
            'description': self.description,
            'user_id': self.user_id,
            'post_id': self.post_id
        }
        if include_user:
            # Assuming the User model has a 'username' field
            comment_dict['user_name'] = self.user.username
        return comment_dict

    def update(self, description=None):
        if description is not None:
            self.description = description
