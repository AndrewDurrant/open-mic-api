BEGIN;

TRUNCATE
  media,
  openmic_users,
  openmic_interactions
  RESTART IDENTITY CASCADE;

INSERT INTO openmic_users (user_name, full_name, password, email)
VALUES
  ('digital dave', 'David Maui', '$2a$12$Vs5n4xTCPRCe5SqI80hy6.sawBpxhBxeKW3Si6gPz7KeJ.n5ltX.6', 'dave@yahoo.com'),
  ('russ365', 'Russell Govinda', '$2a$12$BuyDh/0w01bOEeIb6ri91e/lsgSKajXdIDPrraCkSQqMVpqIP5gKe', 'russ@yahoo.com'),
  ('eddy river', 'Edward Thames', '$2a$12$fGvz9sjVgc8WFIjZ14xXKuRK1q5NUccMSdA2XZHjOkAJLWAJQD0y6', 'water@gmail.com'),
  ('samanthasings', 'Samantha Teton', '$2a$12$OMb7LP.V2CiPf/bz0Jpf1OA8iDUYnO3feDfUwsqXjs7FAnrqRmV6q', 'lovetosing@gmail.com');

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
  (1, 'This is not good.', 5, 3), 
  (2, 'pretty good.', 6, 1),
  (3, 'hana ho!', 3, 4), 
  (4, 'I love your voice', 6, 2), 
  (3, 'Thank you for sharing this.', 2, 3);

COMMIT;
