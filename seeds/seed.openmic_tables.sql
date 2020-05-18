BEGIN;

TRUNCATE
  openmic_media,
  openmic_users,
  openmic_ratings
  RESTART IDENTITY CASCADE;

INSERT INTO openmic_media (title, link, user_id)
VALUES
  ('Frozen Margarita', 'https://www.youtube.com/watch?v=-0JDlAn2Y5Y', 1), 
  ('Call on Jah', 'https://www.youtube.com/watch?v=kMKwkDDtlfI', 2),
  ('Country Road', 'https://www.youtube.com/watch?v=SEx2PzrRUfY', 1),
  ('Gina Chavez', 'https://www.youtube.com/watch?v=sRZi4QQEGBI', 3),
  ('Poor Man', 'https://www.youtube.com/watch?v=2uwpaxTkDrY', 2),
  ('Streets', 'https://www.youtube.com/watch?v=0hD-Z1q_ZyI', 1);


INSERT INTO openmic_users (user_name, first_name, last_name, email)
VALUES
  ('Digital Dave', 'David', 'Maui', 'dave@yahoo.com'),
  ('Rowdy Russell', 'Russell', 'Govinda', 'russ@yahoo.com'),
  ('SamanthaSings', 'Samantha', 'Teton', 'lovetosing@gmail.com');

INSERT INTO openmic_ratings (
  rating,
  media_id,
  user_id
) VALUES
  (
    4,
    4,
    2
  ),
  (
    2,
    2,
    3
  ),
  (
    3,
    4,
    1
  ),
  (
    1,
    2,
    1
  ),
  (
    3,
    2,
    3
  );

COMMIT;
