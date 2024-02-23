const request = require('supertest');
const app = require('../../..'); // Update the path to your Express application
const fs = require('fs');
const path = require('path');
const APIURL = '/api/v1/store/customers/add'; // Update the API URL

describe('ADD CUSTOMER CONTROLLER', () => {
    it('should add a new customer and respond with 201 status code', async () => {
    const filePath = path.resolve(__dirname, '../../image.jpeg');
    const fileStream = fs.createReadStream(filePath);

    const response = await request(app)
      .post(APIURL)
      .set('Cookie', 'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7InN0b3JlX2lkIjoiMiIsInN0b3JlX25hbWUiOiJtYW5nbyIsImlkIjoiMiIsImVtYWlsIjoibW9lYmFkcmFuMkBnbWFpbC5jb20iLCJuYW1lIjoiTW9oYW1tZWQgQWJ1IFNpYW0iLCJyb2xlIjoib3duZXIiLCJkZXBhcnRtZW50cyI6IkFsbCJ9LCJpYXQiOjE3MDg5Mjc1NTYsImV4cCI6MTcwOTAxMzk1Nn0.lz5LPCq275hoetWOxigx4UiFHO6ezikrnhPygsOoKiI; Path=/; Secure; HttpOnly; Expires=Tue, 27 Feb 2024 06:05:56 GMT; HttpOnly')
      .query({ cutomerName: 'example customer 3' })
      .field('folderName', 'customers')
      .field('full_name', 'example customer 3')
      .field('email', '1@example.com')
      .field('phone_number', '00000000')
      .field('address', 'address')
      .field('cutomer_type', '2')
      .attach('image', fileStream); 
    
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('status', 'success');
    expect(response.body).toHaveProperty('message', 'Cutomer Added');
    expect(response.body).toHaveProperty('results', 1);
    expect(response.body).toHaveProperty('data');
    expect(response.body.data).toHaveProperty('customer');
    expect(response.body.data.customer).toHaveProperty('id');
  },10000);

  it('should respond with an error message and 422 status code if required fields are missing', async () => {
    const response = await request(app)
        .post(APIURL)
        .set('Cookie', 'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7InN0b3JlX2lkIjoiMiIsInN0b3JlX25hbWUiOiJtYW5nbyIsImlkIjoiMiIsImVtYWlsIjoibW9lYmFkcmFuMkBnbWFpbC5jb20iLCJuYW1lIjoiTW9oYW1tZWQgQWJ1IFNpYW0iLCJyb2xlIjoib3duZXIiLCJkZXBhcnRtZW50cyI6IkFsbCJ9LCJpYXQiOjE3MDg5Mjc1NTYsImV4cCI6MTcwOTAxMzk1Nn0.lz5LPCq275hoetWOxigx4UiFHO6ezikrnhPygsOoKiI; Path=/; Secure; HttpOnly; Expires=Tue, 27 Feb 2024 06:05:56 GMT; HttpOnly')
        .field('store_id', '2')
        .field('full_name', 'John Doe')
        .field('email', 'johndoe@example.com');
    
    expect(response.status).toBe(422);
    expect(response.body).toHaveProperty('error');
  });

  it('should respond with an error message and 406 status code if email is invalid', async () => {
    const filePath = path.resolve(__dirname, '../../image.jpeg');
    const fileStream = fs.createReadStream(filePath);

    const response = await request(app)
        .post(APIURL)
        .set('Cookie', 'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7InN0b3JlX2lkIjoiMiIsInN0b3JlX25hbWUiOiJtYW5nbyIsImlkIjoiMiIsImVtYWlsIjoibW9lYmFkcmFuMkBnbWFpbC5jb20iLCJuYW1lIjoiTW9oYW1tZWQgQWJ1IFNpYW0iLCJyb2xlIjoib3duZXIiLCJkZXBhcnRtZW50cyI6IkFsbCJ9LCJpYXQiOjE3MDg5Mjc1NTYsImV4cCI6MTcwOTAxMzk1Nn0.lz5LPCq275hoetWOxigx4UiFHO6ezikrnhPygsOoKiI; Path=/; Secure; HttpOnly; Expires=Tue, 27 Feb 2024 06:05:56 GMT; HttpOnly')
        .query({ cutomerName: 'example customer 2'})
        .field('store_id', '2')
        .field('folderName', 'customers')
        .field('full_name', 'example customer 2')
        .field('email', 'notvalid')
        .field('phone_number', '00000000')
        .field('address', 'address')
        .field('cutomer_type', '2')
        .attach('image', fileStream); 
    
    expect(response.status).toBe(406);
    expect(response.body).toHaveProperty('error', 'Invalid email address');
  });

});