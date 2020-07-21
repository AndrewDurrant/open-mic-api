const knex = require('knex');
const app = require('../src/app');
const helpers = require('./test-helpers');
const { expect } = require('chai');

describe('Videos Endpoints', function () {
  let db;

  const {
    testUsers,
    testVideos,
    testInteractions
  } = helpers.makeVideosFixtures();

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DATABASE_URL,
    });
    app.set('db', db);
  });

  after('disconnect from db', () => db.destroy());
  
  before('cleanup', () => helpers.cleanTables(db));

  afterEach('cleanup', () => helpers.cleanTables(db));

  describe('GET /api/videos', () => {
    context('Given no videos', () => {

      beforeEach(() => helpers.seedUsers(db, testUsers));

      it('responds with 200 and an empty array', () => {
        return supertest(app)
          .get('/api/videos')
          .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
          .expect(200, []);
      });
    });

    context('Given there are videos in the database', () => {
      const { testUsers, testVideos, hydratedVideos, testInteractions } = helpers.makeVideosFixtures();

      beforeEach('insert users', () => {
        return db
          .into('openmic_users')
          .insert(testUsers);
      });

      beforeEach('insert videos', () => {
        return db
          .into('media')
          .insert(testVideos);
      });

      beforeEach('insert interactions', () => {
        return db
          .into('openmic_interactions')
          .insert(testInteractions);
      });

      it('responds with 200 and all of the videos', () => {
        return supertest(app)
          .get('/api/videos')
          .expect(200, hydratedVideos);
      });
    });
  });

  describe('POST /api/videos', () => {
    this.timeout(15000);
    beforeEach(() => helpers.seedUsers(db, testUsers))

    it('responds with 200 and post video', () => {
      const video = {
        title: 'test video',
        link: 'https://www.youtube.com/watch?v=sRZi4QQEGBI',
        description: 'test video description',
        user_id: testUsers[0],
      }

      const expectedVideo = helpers.makeExpectedVideos(video);
      expectedVideo.id = 1;
      expectedVideo.date_created = null;
      expectedVideo.date_modified = null;

      return supertest(app)
        .post('/api/videos')
        .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
        .send(video)
        .expect(201)
        .expect(res => {
          expect(res.body).to.be.a('object');
          expect(res.body).to.include.keys('id', 'title', 'link', 'description', 'date_created', 'average_comment_rating', 'user', 'number_of_interactions');
          expect(res.body.id).to.equal(expectedVideo.id);
          expect(res.body.user_id).to.equal(expectedVideo.user);
          expect(res.body.title).to.equal(expectedVideo.title);
          expect(res.body.link).to.equal(expectedVideo.link);
          expect(res.body.description).to.equal(expectedVideo.description);
        });
    }).timeout(15000);
  })

  describe('GET /api/videos/:video_id', () => {
    context('Given no videos', () => {

      beforeEach(() => helpers.seedUsers(db, testUsers));

      it('responds with 404', () => {
        const videoId = 2;
        return supertest(app)
          .get(`/api/videos/${videoId}`)
          .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
          .expect(404, { error: `Video doesn't exist`});
      });
    });

    context('Given there are videos in the database', () => {
      const { testUsers, testVideos, hydratedVideos, testInteractions } = helpers.makeVideosFixtures();

      beforeEach('insert users', () => {
        return db
          .into('openmic_users')
          .insert(testUsers);
      });

      beforeEach('insert videos', () => {
        return db
          .into('media')
          .insert(testVideos);
      });

      beforeEach('insert interactions', () => {
        return db
          .into('openmic_interactions')
          .insert(testInteractions);
      });

      const expectedVideoObject = {
        id: 2,
        title: 'Second test video',
        link: 'https://www.youtube.com/watch?v=qM_r-cJ-JZI',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum, exercitationem cupiditate dignissimos est perspiciatis, nobis commodi alias saepe atque facilis labore sequi deleniti. Sint, adipisci facere! Velit temporibus debitis rerum.',
        date_created: '2100-05-22T16:28:32.615Z',
        user: {},
        number_of_interactions: 0,
        average_comment_rating: 0
      }

      it('responds with 200 and the video', () => {
        const videoId = 2;
        return supertest(app)
          .get(`/api/videos/${videoId}`)
          .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
          .expect(200, expectedVideoObject);
      });
    })
  })

  describe('DELETE /api/videos/:video_id', () => {
    context('Given there are videos in the database', () => {
      beforeEach('insert videos', () => 
        helpers.seedMediaTable(
          db,
          testUsers,
          testVideos
        )
      );

      it('responds with 204', () => {
        const videoId = 1;
        const video = {
          id: 1
        };

        return supertest(app)
          .delete(`/api/videos/${videoId}`)
          .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
          .send(video)
          .expect(204)
      });
    });
  });

  describe('PATCH /api/videos/:video_id', () => {
    context('Given there are videos in the database', () => {
      beforeEach('insert videos', () => 
        helpers.seedMediaTable(
          db,
          testUsers,
          testVideos
        )
      );

      it('responds with 201 and patch video', () => {
        const videoId = 1;
        const video = {
          id: 1,
          title: 'patch title',
          description: 'patch description',
        };

        return supertest(app)
          .patch(`/api/videos/${videoId}`)
          .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
          .send(video)
          .expect(201)
      })
    })
  })
});