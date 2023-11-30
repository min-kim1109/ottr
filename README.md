# Flickr Clone

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
