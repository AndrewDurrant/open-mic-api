SET TIME ZONE 'UTC';

CREATE TABLE media (
  id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  title TEXT NOT NULL,
  link TEXT NOT NULL,
  description TEXT NOT NULL,
  date_created TIMESTAMP DEFAULT now() NOT NULL,
  date_modified TIMESTAMP DEFAULT now() NOT NULL,
  user_id INTEGER 
    REFERENCES openmic_users(id) ON DELETE CASCADE
);  
    