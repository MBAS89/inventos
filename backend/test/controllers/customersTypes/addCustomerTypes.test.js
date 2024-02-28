const request = require('supertest');
const app = require('../../../index');

const  APIURL = '/api/v1/store/customers/types/add'
const Cookie = 'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7InN0b3JlX2lkIjoiNCIsInN0b3JlX25hbWUiOiJ0ZXN0IiwiaWQiOiI0IiwiZW1haWwiOiJzYWRhc0BnbWFpbC5jb20iLCJuYW1lIjoibXNhZCBhc2Rhc2QiLCJyb2xlIjoib3duZXIiLCJkZXBhcnRtZW50cyI6IkFsbCJ9LCJpYXQiOjE3MDkxMzY3MzgsImV4cCI6MTcwOTIyMzEzOH0.9ixdunkUTmphrIJnwEQeHiLRuyFo9xfBKmDnFerEDGY; Path=/; Secure; HttpOnly; Expires=Thu, 29 Feb 2024 16:12:18 GMT; HttpOnly'

describe('Add A CUSTOMER TYPES CONTROLLER ', () => {
    it('should create/add customer type and respond with and 201 status code', async () => {
      const response = await request(app)
        .post(APIURL)
        .set('Cookie', Cookie)
        .send({
            type_name: 'hello this is a type',
            discount_value: 2
        });
    
      expect(response.status).toBe(201)
      expect(response.body).toHaveProperty('status', 'success');
      expect(response.body).toHaveProperty('message', 'Customer Type Created');
      expect(response.body).toHaveProperty('data');
      expect(response.body.data).toHaveProperty('customerType');
    });

    it('should respond with an error message and 500 status code if add a customer types result in error', async () => {
        const response = await request(app)
            .post(APIURL)
            .set('Cookie', Cookie)
            .send({
                type_name: 'hello this is a type',
                discount_value: 'x'
            });
    
        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error', 'Something Went Wrong');
        expect(response.body).toHaveProperty('success', false);
    });
});
