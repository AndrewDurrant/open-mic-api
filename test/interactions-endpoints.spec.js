const knex = require('knex');
const app = require('../src/app');
const helpers = require('./test-helpers');
const { expect } = require('chai');
const { set } = require('../src/app');

describe('Interactions Endpoints', function () {
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


  describe('POST /api/interactions/comment', () => {
    beforeEach(() => helpers.seedMediaTable(db, testUsers, testVideos))


    context('If the submitted data is complete', () => {
      const testData = {
        video_id: 1,
        comment: 'test comment'
      }
      it('responds with 201 and the comment object', () => {
        return supertest(app)
          .post('/api/interactions/comment')
          .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
          .send(testData)
          .expect(201)
          .expect((res) => {
            expect(res.body).to.have.property('media_id');
            expect(res.body).to.have.property('comment');
          })
      })
    })
  })

  describe('POST /api/interactions/rating', () => {
    beforeEach(() => helpers.seedMediaTable(db, testUsers, testVideos))


    context('If the submitted data is complete', () => {
      const testData = {
        video_id: 1,
        rating: 2
      }
      it('responds with 201 and the rating object', () => {
        return supertest(app)
          .post('/api/interactions/rating')
          .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
          .send(testData)
          .expect(201)
          .expect((res) => {
            expect(res.body).to.have.property('media_id');
            expect(res.body).to.have.property('rating');
          })
      })
    })
  })
});