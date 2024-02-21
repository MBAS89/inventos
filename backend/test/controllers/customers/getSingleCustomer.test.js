const request = require('supertest');
const app = require('../../..');

const APIURL = '/api/v1/store/customers/read/single';

describe('GET SINGLE CUSTOMER CONTROLLER', () => {
  it('should respond with single customer and 200 status code', async () => {
    const response = await request(app)
      .get(APIURL)
      .query({ storeId: 2, customerId: '7' }); 
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('customer');
    expect(response.body).toHaveProperty('invoices');
  });

  it('should respond with an error message and 400 status code if there is no customerId or storeId', async () => {
    const response = await request(app)
      .get(APIURL)
      .query({ storeId: '2' });
    
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'Customer ID and Store ID are required');
    expect(response.body).toHaveProperty('success', false);
  });

  it('should respond with an error message and 404 status code if no customer found', async () => {
    const response = await request(app)
      .get(APIURL)
      .query({ storeId: '2', customerId: '9999' }); // Assuming customerId doesn't exist
    
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('error', 'No Customer Found!');
    expect(response.body).toHaveProperty('success', false);
  });
});