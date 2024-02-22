const request = require('supertest');
const app = require('../../..'); // Update the path to your Express application

const APIURL = '/api/v1/store/customers/add'; // Update the API URL

describe('ADD CUSTOMER CONTROLLER', () => {
  it('should add a new customer and respond with 201 status code', async () => {
    const response = await request(app)
      .post(APIURL)
      .field('store_id', '2')
      .field('full_name', 'John Doe')
      .field('email', 'johndoe@example.com')
      .field('phone_number', '1234567890')
      .field('address', '123 Main St')
      .field('cutomer_type', 'Regular')
      .attach('image', 'path/to/image.jpg'); // Attach image file
    
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('status', 'success');
    expect(response.body).toHaveProperty('message', 'Cutomer Added');
    expect(response.body).toHaveProperty('results', 1);
    expect(response.body).toHaveProperty('data');
    expect(response.body.data).toHaveProperty('customer');
    expect(response.body.data.customer).toHaveProperty('id');
  });

  it('should respond with an error message and 422 status code if required fields are missing', async () => {
    const response = await request(app)
      .post(APIURL)
      .field('store_id', '2')
      .field('full_name', 'John Doe')
      .field('email', 'johndoe@example.com');
    
    expect(response.status).toBe(422);
    expect(response.body).toHaveProperty('error');
  });

  it('should respond with an error message and 406 status code if email is invalid', async () => {
    const response = await request(app)
      .post(APIURL)
      .field('store_id', '2')
      .field('full_name', 'John Doe')
      .field('email', 'invalidemail')
      .field('phone_number', '1234567890')
      .field('address', '123 Main St')
      .field('cutomer_type', 'Regular')
      .attach('image', 'path/to/image.jpg');
    
    expect(response.status).toBe(406);
    expect(response.body).toHaveProperty('error', 'Invalid email address');
  });

});