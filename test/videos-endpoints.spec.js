const knex = require('knex');
const app = require('../src/app');
const { makeVideosArray, makeMaliciousVideo } = require('./videos.fixtures');

describe('Videos Endpoints', function () {
  let db;

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DATABASE_URL,
    });
    app.set('db', db);
  });

  after('disconnect from db', () => db.destroy());

  // before('clean table', () => db('media').truncate());

  before(() => db('media').del()); // *** Daniel suggested solution: do we create the table after this?
  
  // afterEach('cleanup', () => db('media').truncate());

  afterEach(() => db('media').del()); // Daniel's solution

  describe('GET /videos', () => {
    context('Given no videos', () => {
      it('responds with 200 and an empty array', () => {
        return supertest(app)
          .get('/videos')
          .expect(200, []);
      });
    });

    context('Given there are videos in the database', () => {
      const testVideos = makeVideosArray();

      beforeEach('insert videos', () => {
        return db
          .into('media')
          .insert(testVideos);
      });

      it('responds with 200 and all of the videos', () => {
        return supertest(app)
          .get('/videos')
          .expect(200, testVideos);
      });
    });
  });
});