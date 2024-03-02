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



**Site Preview**
![flickr-database-schema]

[flickr-database-schema]: https://i.imgur.com/UjVCVUQ.jpeg



## What can you do on Ottr?

**1. Check out users pictures and comments of otter posts** <br>

- Navigate through the webapp as either an unregistered or registered user.
- Register an account on the site or log in as the demo user for easy access
- View all otter posts and related comments that other users have left

**2. Benefits of being a registered user!** <br>

- Create your own otter post to share with the rest of the community
- Edit or delete the posts you have created
- Other users can leave comments on your post
- You may post comments on other people's posts

## How to download Ottr on your local computer

1. In the root folder:

- create an .env file
- copy over .envexample content into the new .env file
- run these commands in terminal

  ```bash
  pipenv requirements > requirements.txt
  pipenv install
  pipenv shell
  flask db upgrade
  flask seed all
  flask run
  ```

2. cd into the root folder and then run `pipenv run flask run` to start the back-end

3. cd into the react-app folder and then run `npm start` to start the front-end

# Site Overview

## Landing Page
- This is the homepage of Ottr, where users can see their options to either login/sign up in the navigation header bar. Also contains a footer with all relevant information regarding the site, contact information for the developer, as well as the list of technologies used to develop the webapp.

## Sign Up
- Unregistered users have the option to create an account through the dropdown menu located at the top-right corner
- In the event a user attempts to input invalid information, error messages will populate to guide the user to resolve them accurately
- Upon successful completion of the Sign Up form, the new user will be logged in automatically

## Log In
- Existing users can access their accounts through the designated login portal through the dropdown menu located at the top-right corner
- To gain full access to Ottr quickly, simply click the "Sign In as Demo User" button. This will allow you to creating new posts, manage created posts, and leave comments on other's posts

## Main Page
- From the landing page, click "Search for Otters" button to navigate to this page
- This page presents all of the already existing otter posts that other users have uploaded onto the site.
- This page is accessible to all users regardless of registered or unregistered.

## Create Post
- As a logged-in user, create a post on Ottr
- Each new post requires a post name, description, and image file (depending on what you try to upload, the file type may not be supported!)

## Update/Edit Posts
- If user created a post, they may update or delete the post directly through the post UI (user-interface)
- When updating, the user is sent to a post almost identical to the create post page and has flexibility on what they want to change (post name, description, image file)
- When deleting a post, the user is prompted if they are sure they want to permanently delete their post

## Leave Comment
- Registered users only, can leave comments on any existing post. There is no limit to how many comments they can post, but there are character limits set in place
- Newly submitted comments dynamically appear on the current page
- Users may choose to modify or delete their comment conveniently through the post UI
- When deleting a comment, the user is prompted if they are sure they want to permanently delete their comment
