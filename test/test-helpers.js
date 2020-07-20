const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const date = new Date();

function makeUsersArray() {
  return [{
    id: 1,
    user_name: 'test-user-1',
    full_name: 'User One',
    email:'userone@gmail.cover-empty',
    password: '@password1', // unsure of why this is not encrypted here.
    date_created: date.toISOString(),
    date_modified:null
  },
  {
    id: 2,
    user_name: 'test-user-2',
    full_name: 'User Two',
    email:'usertwo@gmail.com',
    password: '@password1',
    date_created: date.toISOString(),
    date_modified:null
  },
  {
    id: 3,
    user_name: 'test-user-3',
    full_name: 'User Three',
    email:'userthree@gmail.com',
    password: '@password1',
    date_created: date.toISOString(),
    date_modified:null
  },
  {
    id: 4,
    user_name: 'test-user-4',
    full_name: 'User Four',
    email:'userfour@gmail.com',
    password: '@password1',
    date_created: date.toISOString(),
    date_modified:null
  },
]
}

function makeVideosArray(users) {
  return [
    {
      id: 1,
      title: 'First test video',
      link: 'https://www.youtube.com/watch?v=uiBxYDyyb14',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?', 
      date_created: '2029-01-22T16:28:32.615Z',
      user_id: users[0].id,
      comments: ['great', 'awesome'],
      rating: [2, 4, 1],
    },
    {
      id: 2,
      title: 'Second test video',
      link: 'https://www.youtube.com/watch?v=qM_r-cJ-JZI',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum, exercitationem cupiditate dignissimos est perspiciatis, nobis commodi alias saepe atque facilis labore sequi deleniti. Sint, adipisci facere! Velit temporibus debitis rerum.',
      date_created: '2100-05-22T16:28:32.615Z',
      user_id: users[1].id,
      comments: ['super', 'thank you'],
      rating: [3, 4, 2],
    },
    {
      id: 3,
      title: 'Third test video',
      link: 'https://www.youtube.com/watch?v=T6NFckh8K9k',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus, voluptate? Necessitatibus, reiciendis? Cupiditate totam laborum esse animi ratione ipsa dignissimos laboriosam eos similique cumque. Est nostrum esse porro id quaerat.',
      date_created: '1919-12-22T16:28:32.615Z',
      user_id: users[2].id,
      comments: ['woot', 'right on!'],
      rating: [1, 4, 3],
    },
    {
      id: 4,
      title: 'Fourth test video!',
      link: 'https://www.youtube.com/watch?v=Sh2R5lOliZE',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum molestiae accusamus veniam consectetur tempora, corporis obcaecati ad nisi asperiores tenetur, autem magnam. Iste, architecto obcaecati tenetur quidem voluptatum ipsa quam?',
      date_created: '1919-12-22T16:28:32.615Z',
      user_id: users[3].id,
      comments: ['nice', 'that sucked'],
      rating: [1, 3, 1],
    },
  ];
}

function makeInteractionsArray(users) {
  return [
    {
      id: 1,
      comment: 'great', 
      date_created: '2020-05-29 13:52:49',
      rating: 3,
      user_id: users[1].id,
      media_id: 1,
    },
    {
      id: 2,
      comment: 'awesome', 
      date_created: '2020-04-29 13:52:49',
      rating: 4,
      user_id: users[0].id,
      media_id: 2,
    },
    {
      id: 3,
      comment: 'thank you', 
      date_created: '2020-03-29 13:52:49',
      rating: 2,
      user_id: users[2].id,
      media_id: 3,
    },
    {
      id: 4,
      comment: 'sweet', 
      date_created: '2020-02-29 13:52:49',
      rating: 3,
      user_id: users[1].id,
      media_id: 2,
    },
  ]}

function makeMaliciousVideo() {
  const maliciousVideo = {
    id: 911,
    date_published: new Date().toISOString(),
    title: 'Naughty naughty very naughty <script>alert("xss");</script>',
    link: 'https://www.thisisabslink.com/watch?v=Sh2R5lOliZE',
    description: `Bad image <img src="https://url.to.file.which/does-not.exist" onerror="alert(document.cookie);">. But not <strong>all</strong> bad.`
  }
  const expectedVideo = {
    ...maliciousVideo,
    title: 'Naughty naughty very naughty &lt;script&gt;alert(\"xss\");&lt;/script&gt;',
    description: `Bad image <img src="https://url.to.file.which/does-not.exist">. But not <strong>all</strong> bad.`
  }
  return {
    maliciousVideo,
    expectedVideo,
  }
}

function makeVideosFixtures() {
  const testUsers = makeUsersArray();
  const testVideos = makeVideosArray(testUsers);
  const testInteractions = makeInteractionsArray(testUsers);
  return {
    testUsers,
    testVideos,
    testInteractions
  }
}

function cleanTables(db) {
  return db.transaction(trx =>
    trx.raw(
      `TRUNCATE
      openmic_users,
      media,
      openmic_interactions
    `
    )
      .then(() =>
        Promise.all([
          trx.raw(`ALTER SEQUENCE openmic_users_id_seq minvalue 0 START WITH 1`),
          trx.raw(`ALTER SEQUENCE media_id_seq minvalue 0 START WITH 1`),
          trx.raw(`ALTER SEQUENCE openmic_interactions_id_seq minvalue 0 START WITH 1`),
          trx.raw(`SELECT setval('openmic_users_id_seq', 0)`),
          trx.raw(`SELECT setval('media_id_seq', 0)`),
          trx.raw(`SELECT setval('openmic_interactions_id_seq', 0)`),
        ])
      )
  )
}

function seedUsers(db, users) {
  const hashedUsers = users.map(user => ({
    ...user,
    password: bcrypt.hashSync(user.password, 1)
  }));
  return db.into('openmic_users').insert(hashedUsers)
    .then(() =>
      db.raw(
        `SELECT setval('openmic_users_id_seq', ?)`,
        users[users.length - 1].id
      )
    );
};

function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
  const token = jwt.sign({
    user_id: user.id,
  }, secret, {
    subject: user.user_name,
    algorithm: 'HS256',
  });
  return `Bearer ${token}`;
}

function seedMediaTable(db, users, videos = []) {
  return db.transaction(async trx => {
    await seedUsers(trx, users)
    await trx.into('media').insert(videos)
    await trx.raw(
      `SELECT setval('media_id_seq', ?)`,
      [media[media.length - 1].id]
    )
  })
}

module.exports = {
  makeVideosArray,
  makeMaliciousVideo,
  makeInteractionsArray,
  makeUsersArray,
  makeVideosFixtures,
  cleanTables,
  seedUsers,
  seedMediaTable,
  makeAuthHeader,
}