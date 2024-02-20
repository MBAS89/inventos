const request = require('supertest');
const app = require('../../..');

const  APIURL = '/api/v1/store/customers/read'

describe('GET ALL CISTOMER CONTROLLER ', () => {
    it('should respond with all customers and 200 status code', async () => {
      const response = await request(app)
        .get(APIURL)
        .query({ page: 1, storeId: '2' }); // Ensure storeId is passed as a string
    
      expect(response.status).toBe(200)
      expect(response.body).toHaveProperty('totalCount');
      expect(response.body).toHaveProperty('totalPages');
      expect(response.body).toHaveProperty('currentPage');
      expect(response.body).toHaveProperty('customers');
    });

    it('should respond with an error message and 400 status code if there is no storeId or page number', async () => {
        const response = await request(app)
          .get(APIURL)
          .query({ page: 1 });
    
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error', 'Page Number and Store ID are required');
        expect(response.body).toHaveProperty('success', false);
    });

    it('should return customers filtered based on the searchQuery value', async () => {
        const response = await request(app)
          .get(APIURL)
          .query({ page: 1, storeId: 2, searchQuery: 'sadasd@gmail.com' });
    
        expect(response.status).toBe(200);
        expect(response.body.customers.length).toBeGreaterThan(1);
    });

    it('should return paginated results based on limit and page number', async () => {
        const response = await request(app)
          .get(APIURL)
          .query({ page: 2, limit: 5, storeId: 2 });
    
        expect(response.status).toBe(200);
        expect(response.body.currentPage).toBe(2);
        expect(response.body.customers.length).toBeLessThanOrEqual(5);
    });
});
