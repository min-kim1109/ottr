from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import DataRequired


class PostForm(FlaskForm):
    post_name = StringField('Post_Name', validators=[DataRequired()])
    description = StringField("description", validators=[DataRequired()])
    image_url = StringField("image_url", validators=[DataRequired()])
    submit = SubmitField("Submit")
