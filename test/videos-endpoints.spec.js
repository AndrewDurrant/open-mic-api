const knex = require('knex');
const app = require('../src/app');
const { makeVideosArray, makeMaliciousVideo } = require('./videos.fixtures');

describe('Videos Endpoints', function() {
  let db;

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL,
    });
    app.set('db', db);
  });

  after('disconnect from db', () => db.destroy());

  before('clean table', () => db('media').truncate());

  afterEach('cleanup', () => db('media').truncate());

  describe('GET /videos', () => {
    context('Given no videos', () => {
      it('responds with 200 and an empty list', () => {
        return supertest(app)
          .get('/videos')
          .expect(200, []);
      });
    });
  });

});