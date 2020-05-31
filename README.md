**OPEN-MIC: App for sharing your musical performances through external video links**

Live Website: https://open-mic.now.sh/

__SETTING UP__

- Install dependencies: npm install
- Create development and test databases: `createdb open-mic`, `createdb open-mic-test`
- Create database user: `createuser postgres`
- Grant privileges to new user in psql:  
  - `GRANT ALL PRIVILEGES ON DATABASE open-mic TO postgres`
  - `GRANT ALL PRIVILEGES ON DATABASE "open-mic-test" TO postgres`
- Prepare environment file: `cp example.env .env`
- Replace values in `.env` with your custom values.
- Bootstrap development database: `npm run migrate`
- Bootstrap test database: `npm run migrate:test`

__Configuring Postgres__

For tests involving time to run properly, your Postgres database must be configured to run in the UTC timezone.
  1. Locate the postgresql.conf file for your Postgres installation
    - OS X, Homebrew: /usr/local/var/postgres/postgresql.conf
  2. Uncomment the timezone line and set it to UTC as follows:  
  ` - Locale and Formatting - `  

      `datestyle = 'iso, mdy'`
      `#intervalstyle = 'postgres'`
      `timezone = 'UTC'`
      `#timezone_abbreviations = 'Default'  #Select the set of available time zone`

__Sample Data__

- To seed the database for development: `psql -U open_mic -d open-mic -f ./seeds/seed.openmic_tables.sql`


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