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

**Monday 5.25.2020**
MVP User Stories:
1- POST comment **DONE**

2- POST rating

3- PATCH rating

4- DELETE video as auth

5- PATCH description/title as auth

6- POST video as auth **DONE**

7- GET user data

****

1- show 2 Most Recent comments **DONE**

2- logout user **DONE**

3- sort by rating high to low **DONE**

4- My Videos displays "share video link" button for unauth

5- Upload Video nav link and Upload Video page **DONE**

6- My Videos displays title and description as editable boxes for auth

7- My Videos displays "update" & "delete" buttons on video card for auth

8- create Page Not Found Route/component **DONE**

**QUESTIONS FOR TA**
- Do I need to implement Xss?


# CAPSTONE REQUIREMENTS
1. App must do something interesting/useful *DONE*

2. App must be a fullstack app (React, CSS, Node, Express, PostgreSQL) *DONE*

3. App must not use a third-party API *DONE*

4. Client and API deployed separately, stored in separate GitHub repos

5. Both client- and server-side code must be tested. At a minimum, you should test the happy path for each endpoint in your API and include a smoke test for each component in your React client

6. Your app must be responsive and work just as well on mobile devices as it does on desktop devices *DONE*

7. Code must be high quality, error-free, commented as necessary, and clean

8. The styling on your client must be polished *DONE*

9. The content of your app must be clear and readable *DONE*

10. You must use vanilla CSS for styling capstones *DONE*

11. You must have comprehensive README files for both GitHub repos

12. Your app must have a landing page that explains what the app does and how to get started, in addition to pages required to deliver the main functionality *DONE*

13. You must deploy a live, publicly-accessible version of your app

14. Your app must live at a custom URL and include a Favicon

15. Your app must work across different browsers (Chrome, Firefox, and Safari at a minimum)

16. If auth in app, you must set up demo user and indicate on landing page how to use it