from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import DataRequired
from flask_wtf.file import FileField, FileAllowed, FileRequired
from ..api.aws_helper import ALLOWED_EXTENSIONS


class PostForm(FlaskForm):
    post_name = StringField('Post_Name', validators=[DataRequired()])
    description = StringField("description", validators=[DataRequired()])
    submit = SubmitField("Submit")

class CreateImageForm(PostForm):
    image = FileField("Image File", validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
