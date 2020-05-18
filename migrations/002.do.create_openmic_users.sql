SET TIME ZONE 'UTC';

CREATE TABLE openmic_users (
  id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  full_name TEXT NOT NULL,
  user_name TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  email TEXT NOT NULL, 
  date_created TIMESTAMP DEFAULT now() NOT NULL,
  date_modified TIMESTAMP,
);


