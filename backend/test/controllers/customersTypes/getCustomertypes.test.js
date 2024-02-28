const request = require('supertest');
const app = require('../../..');

const  APIURL = '/api/v1/store/customers/types/get'
const Cookie = 'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7InN0b3JlX2lkIjoiMiIsInN0b3JlX25hbWUiOiJtYW5nbyIsImlkIjoiMiIsImVtYWlsIjoibW9lYmFkcmFuMkBnbWFpbC5jb20iLCJuYW1lIjoiTW9oYW1tZWQgQWJ1IFNpYW0iLCJyb2xlIjoib3duZXIiLCJkZXBhcnRtZW50cyI6IkFsbCJ9LCJpYXQiOjE3MDg5Mjc1NTYsImV4cCI6MTcwOTAxMzk1Nn0.lz5LPCq275hoetWOxigx4UiFHO6ezikrnhPygsOoKiI; Path=/; Secure; HttpOnly; Expires=Tue, 27 Feb 2024 06:05:56 GMT; HttpOnly'
const testCookie = 'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7InN0b3JlX2lkIjoiNCIsInN0b3JlX25hbWUiOiJ0ZXN0IiwiaWQiOiI0IiwiZW1haWwiOiJzYWRhc0BnbWFpbC5jb20iLCJuYW1lIjoibXNhZCBhc2Rhc2QiLCJyb2xlIjoib3duZXIiLCJkZXBhcnRtZW50cyI6IkFsbCJ9LCJpYXQiOjE3MDg5NDYyOTMsImV4cCI6MTcwOTAzMjY5M30.IccwLaC8n8OvwctgCOUNLcEv52JnmTMOL_XtNyn0i_0; Path=/; Secure; HttpOnly; Expires=Tue, 27 Feb 2024 11:18:13 GMT; HttpOnly'

describe('GET ALL CUSTOMER TYPES CONTROLLER ', () => {
    it('should respond with all customers types and 200 status code', async () => {
      const response = await request(app)
        .get(APIURL)
        .set('Cookie', Cookie)
    
      expect(response.status).toBe(200)
      expect(response.body).toHaveProperty('status', 'success');
      expect(response.body).toHaveProperty('message', 'Customers Types Fetched');
      expect(response.body).toHaveProperty('data');
      expect(response.body.data).toHaveProperty('customersTypes');
    });

    it('should respond with an error message and 404 status code if there no customer types find in the store', async () => {
        const response = await request(app)
          .get(APIURL)
          .set('Cookie', testCookie)
    
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error', 'No Customers Types Found');
        expect(response.body).toHaveProperty('success', false);
    });

    it('should respond with an error message and 500 status code if feaching customer types did not work', async () => {
        const response = await request(app)
            .get(APIURL)
            .set('Cookie', testCookie)
  
        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error', 'Something Went Wrong');
        expect(response.body).toHaveProperty('success', false);
    });
});
