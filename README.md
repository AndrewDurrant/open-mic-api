OPEN-MIC: Hop up on stage and share your talents!

A link to your live app.

Documentation of your API.

Screenshot(s) of your app. This makes your app description much easier to understand.

A summary section. This should have a concise explanation of what your app does. Try to frame this from the standpoint of what the user does, or what the app enables for the user.

A section on the technology used.


PSQL COMMANDS:

**create a database**
createdb -U open_mic open-mic

**create database tables by running sql script**
psql -U open_mic -d open-mic -f ./sql-scripts/create.whopipe-and-amazong.sql

**seed the database with:**
psql -U dunder_mifflin -d blogful -f ./seeds/seed.blogful_articles.sql

**seed heroku database**
$ heroku pg:psql -f ./seeds/seed.openmic_tables.sql