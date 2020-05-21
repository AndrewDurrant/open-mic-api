BEGIN;

TRUNCATE
  media,
  openmic_users,
  openmic_interactions
  RESTART IDENTITY CASCADE;

INSERT INTO openmic_users (user_name, full_name, password, email)
VALUES
  ('Digital Dave', 'David Maui', 'digital', 'dave@yahoo.com'),
  ('Russ365', 'Russell Govinda', 'abc123', 'russ@yahoo.com'),
  ('Eddy River', 'Edward Thames', 'river', 'water@gmail.com'),
  ('SamanthaSings', 'Samantha Teton', 'mountain', 'lovetosing@gmail.com');

INSERT INTO media (title, link, description,user_id)
VALUES 
  ('Poor Man', 'https://www.youtube.com/watch?v=2uwpaxTkDrY', 'Wrote this with a good friend of mine. I hope you like it!', 2),
  ('Country Road', 'https://www.youtube.com/watch?v=SEx2PzrRUfY', 'One of my all time favorite covers to sing.', 1),
  ('Call on Jah', 'https://www.youtube.com/watch?v=kMKwkDDtlfI', 'When times are tough and living is rough, you know what to do.', 2),
  ('Frozen Margarita', 'https://www.youtube.com/watch?v=-0JDlAn2Y5Y', 'I was inspired to write this song one night while drinking warm sake.', 4),
  ('Gina Chavez', 'https://www.youtube.com/watch?v=sRZi4QQEGBI', 'These lyrics were inspired from a trip to Bali.', 3),
  ('Streets', 'https://www.youtube.com/watch?v=0hD-Z1q_ZyI', 'What can I say. I am Doja Cat. Moo!', 1);



INSERT INTO openmic_interactions (
  rating,
  comment,
  media_id,
  user_id) 
VALUES
  (4, 'loved this!', 4, 2), 
  (2, 'Not bad.', 3, 3), 
  (3, 'This had me dancing!', 4, 4), 
  (1, 'I want my time back.', 2, 1), 
  (4, 'I want to play guitar like that!', 1, 2), 
  (3, 'Thank you for sharing this.', 2, 3);

COMMIT;
