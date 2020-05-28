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
1- POST comment

2- POST rating

3- PATCH rating

4- DELETE video as auth

5- PATH description/title as auth

6- POST video as auth

7- GET user data

****

1- show 2 Most Recent comments **DONE**

2- logout user **DONE**

3- sort by rating high to low **DONE**

4- Best Rated displays "create account" button for unauth

5- My Videos displays "share video link" button for unauth

6- Upload Video nav link and Upload Video page **DONE**

7- My Videos displays title and description as editable boxes for auth

8- My Videos displays "update" & "delete" buttons on video card for auth

9- create Page Not Found Route/component

**QUESTIONS FOR TA**
- Do I need to implement Xss?


# CAPSTONE REQUIREMENTS
1. App must do something interesting/useful

2. App must be a fullstack app (React, CSS, Node, Express, PostgreSQL)

3. App must not use a third-party API

4. Client and API deployed separately, stored in separate GitHub repos

5. Both client- and server-side code must be tested. At a minimum, you should test the happy path for each endpoint in your API and include a smoke test for each component in your React client

6. Your app must be responsive and work just as well on mobile devices as it does on desktop devices.

7. All code must be high quality, error-free, commented as necessary, and clean. When a hiring manager looks at your code, you want them to think, "This person has great coding habits". There should be no errors in the console.

8. The styling on your client must be polished. That means choosing fonts and colors that make sense, correctly sizing different components, and ensuring that it looks great on both mobile and desktop devices.

9. The content of your app must be clear and readable.

10. You must use vanilla CSS for styling capstones. Frameworks like Bootstrap are not permitted. We've found that employers prefer to see candidates who demonstrate a true understanding of CSS.

11. You must have comprehensive README files for both GitHub repos (we'll discuss this step in detail at the end of this module).

12. Your app must have a landing page that explains what the app does and how to get started, in addition to pages required to deliver the main functionality.

13. You must deploy a live, publicly-accessible version of your app.

14. Your app must live at a custom URL and include a Favicon (we'll cover this later in the module).

15. Your app must work across different browsers (Chrome, Firefox, and Safari at a minimum)

16. If you choose to include an authentication system in your app, you must set up a demo user account and indicate on the landing page how to use it.