# Full Stack Project (Ottr)
This is my fullstack project, Ottr, a Flickr webapp clone created to allow users to upload and post pictures of various otters in nature. Explore the plethora of diverse otters that have been captured for your viewing pleasure. Register on the site to enrich your user experience by uploading, commenting, and editing your own otter posts! Enjoy your time!

**Click on the link below to visit the live site!** <br>
[![Render](https://img.shields.io/badge/Render-%46E3B7.svg?style=for-the-badge&logo=render&logoColor=white)
](https://ottr.onrender.com/)

**Technologies and Languages Used:** <br>
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Python](https://img.shields.io/badge/python-%233776AB.svg?style=for-the-badge&logo=python&logoColor=white)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![React](https://img.shields.io/badge/react-%2361DAFB.svg?style=for-the-badge&logo=react&logoColor=white)
![Redux](https://img.shields.io/badge/redux-%23764ABC.svg?style=for-the-badge&logo=redux&logoColor=white)
![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white)
![SQLAlchemy](https://img.shields.io/badge/sqlalchemy-%23333.svg?style=for-the-badge&logo=sqlalchemy&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/postgresql-%23336791.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![AWS](https://img.shields.io/badge/aws-%23232F3E.svg?style=for-the-badge&logo=amazonaws&logoColor=white)

## Database Schema Design
![flickr-database-schema]

[flickr-database-schema]: https://i.imgur.com/kxu0RIG.png

## Wireframe Design
![wireframe-design1]
![wireframe-design2]
![wireframe-design3]


[wireframe-design1]: https://i.imgur.com/CGj3xdo.png
[wireframe-design2]: https://i.imgur.com/LWl7S2d.png
[wireframe-design3]: https://i.imgur.com/6zCL9lN.png

## User Stories
**1st Core Feature**
Create new post
- As a logged in verified account, I want to be able to create a new post on my site.
    - When I'm on the `/posts/new` page:
        - I would like to be able to enter the name of my post and the description of the picture I'm uploading so that anyone looking for my post will be able to search for it clearly.

Viewing all posts
- As a logged in *or* logged out user, I want to be able to view a selection of all the posts that users have uploaded.
    - When I'm on the `/posts/:id` page:
        - I can view all the pictures that users have posted onto the site.

Updating Post
- As a logged in user with the post owner status, I want to be able to edit my post(s) by clicking an edit button associated with the post
    - When I'm on the `/posts/current` page:
        - I can click "edit" to make permanent changes to the posts I have uploaded, so that I can fix any errors I make

Deleting Post
- As a logged in user with the post owner status, I want to be able to delete my product by clicking a delete button associated with the post
    - When I'm on the `/posts/current` page:
        - I can click "delete" to permanently delete a post I have uploaded

**2nd Core Feature**
Create new comment
- As a logged in verified account, I want to be able to create a comment on any uploaded post
    - When I'm on the `/posts/:id` page:
        - I would like to be able to leave a comment for that post regarging my feedback/opinions

Viewing all comments on a post
- As a logged in or logged out user, I want to be able to view all of the comments left on a specific post
    - When I'm on the `/posts/:id` page:
        - I can view all of the most recent reviews left on a post

Updating a comment for a post
- As a logged in user that has left a comment for a specific post, I want to be able to edit my comment by clicking an edit button
    - When I'm on the `/posts/:id` pages:
        - I can click "edit" to make permanent changes to the comments I have posted.

Deleting a comment for a post
- As a logged in user that has left a comment for a specific post, I want to be able to delete my comment by clicking a delete button
    - When I'm on the `/posts/:id` pages:
        - I can click "delete" to make permanent changes to the comments I have posted.
