**Monday 5.18.2020**
1. Rework User Stories:

2. Add additional elements to Wireframes:

**Tuesday 5.19.2020**

List of Endpoints:
Media
1. Get all videos -> api/media GET
---> (Most Recent is the default/initial request) SELECT * FROM media order by created_at;

2. GET video -> api/media/:media_id

3. POST video -> api/media

4. POST interaction -> api/interactions
--> This could be someone who just gave a rating
    or someone who just left a comment, or both

What about when someone wants to see what user commented on or rated their video?


ADD A DESCRIPTION COLUMN TO MEDIA TABLE

**Wednesday 5.20.2020**

1 Currently using github -> thinkful-ed -> blogful-api-auth -> Branch: login-endpoint 

**Thursday 5.21.2020**
1- Get all POSTS working!
---> POST comment; POST rating; POST video;

2- Get user login up and running 

**Saturday 5.23.2020**
MVP User Stories:
1- A user can watch videos--DONE
    a. anonymous user can only watch videos/see description.

2- A logged in user can comment/rate

3- A user can login

4- An auth user can post video 

5- user can see average rating

6- Auth user can see last 2 reviews

7- Auth user can delete videos

8- Auth user can update rating

9- SECONDARY- An unAuth user can create account