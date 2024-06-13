import { expect } from 'chai';
import { connectToDatabase, closeDatabaseConnection } from '../model/AuthSchema';

describe('Database tests', function() {
  let db;
  let collection;

  before(async function() {
    db = await connectToDatabase();
    collection = db.collection('testCollection');
  });

  after(async function() {
    await closeDatabaseConnection();
  });

  beforeEach(async function() {
    // Optional: Clear the collection before each test
    await collection.deleteMany({});
  });

  afterEach(async function() {
    // Optional: Clean up after each test
    await collection.deleteMany({});
  });

describe(' GET/registerPage', () => {
    it('should return the register page', async () => {
        const response = await request(app).get('/register');
        expect(response.status).to.equal(200);
    });
});

