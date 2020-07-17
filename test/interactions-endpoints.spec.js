const knex = require('knex');
const app = require('../src/app');
const helpers = require('./test-helpers');

// describe('Interactions Endpoints', function () {
//   let db;

//   before('make knex instance', () => {
//     db = knex({
//       client: 'pg',
//       connection: process.env.TEST_DATABASE_URL,
//     });
//     app.set('db', db);
//   });

//   after('disconnect from db', () => db.destroy());
//   before('clean table', () => db('openmic_interactions').truncate());
//   afterEach('cleanup', () => db('openmic_interactions').truncate());