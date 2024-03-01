const request = require('supertest');
const app = require('../../../index');

const  APIURL = '/api/v1/store/customers/types/remove'
const Cookie = 'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7InN0b3JlX2lkIjoiNCIsInN0b3JlX25hbWUiOiJ0ZXN0IiwiaWQiOiI0IiwiZW1haWwiOiJzYWRhc0BnbWFpbC5jb20iLCJuYW1lIjoibXNhZCBhc2Rhc2QiLCJyb2xlIjoib3duZXIiLCJkZXBhcnRtZW50cyI6IkFsbCJ9LCJpYXQiOjE3MDkyNjY5MTEsImV4cCI6MTcwOTM1MzMxMX0.08naAIQAwUdFKNSdY936HpFi2cfqGU52RUCafNb1aF8; Path=/; Secure; HttpOnly; Expires=Sat, 02 Mar 2024 04:21:51 GMT; HttpOnly'

describe('REMOVE A CUSTOMER TYPES CONTROLLER ', () => {
    it('should remove customer type and respond with and 201 status code', async () => {

        const customerTypeId = '7'
        const response = await request(app)
            .delete(APIURL + `/${customerTypeId}`)
            .set('Cookie', Cookie)
        
        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty('status', 'success');
        expect(response.body).toHaveProperty('message', 'Customer Type Deleted');
        expect(response.body).toHaveProperty('results');
    });

    it('should respond with an error message and 406 status code if the customer ID is not found', async () => {

        const customerTypeId = '7' //already removed 
        const response = await request(app)
            .delete(APIURL + `/${customerTypeId}`)
            .set('Cookie', Cookie)
        
        expect(response.status).toBe(406)
        expect(response.body).toHaveProperty('success', false);
        expect(response.body).toHaveProperty('error', 'Type ID Required OR Not Found!');
    });

    it('should respond with an error message and 500 status code if removing a customer types result in error', async () => {

        const customerTypeId = '4'
        const response = await request(app)
            .delete(APIURL + `/${customerTypeId}`)
            .set('Cookie', Cookie)
    
        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error', 'Something Went Wrong');
        expect(response.body).toHaveProperty('success', false);
    });
});
