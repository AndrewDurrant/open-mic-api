const knex = require('knex');
const app = require('../src/app');
const helpers = require('./test-helpers');

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
  
  before(() => db.raw('TRUNCATE TABLE media, openmic_users CASCADE'));

  afterEach(() => db.raw('TRUNCATE TABLE media, openmic_users CASCADE'));


  describe('GET /api/videos', () => {
    context('Given no videos', () => {
      it('responds with 200 and an empty array', () => {
        return supertest(app)
          .get('/api/videos')
          .expect(200, []);
      });
    });

    context('Given there are videos in the database', () => {
      const testVideos = helpers.makeVideosArray();
      const testInteractions = helpers.makeInteractionsArray();

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

      it.skip('responds with 200 and all of the videos', () => {
        return supertest(app)
          .get('/api/videos')
          .expect(200, testVideos);
      });
    });
  });

});