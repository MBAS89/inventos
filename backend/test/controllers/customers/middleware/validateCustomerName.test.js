const request = require('supertest');
const app = require('../../../../index'); 

const APIURL = '/api/v1/store/customers/add';

describe('Validate Customer Name Middlware', () => {
    it('respond with an error message and 422 status code if cutomer name is missing from query', async () => {
        const response = await request(app)
            .post(APIURL)
            .set('Cookie', 'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7InN0b3JlX2lkIjoiMiIsInN0b3JlX25hbWUiOiJtYW5nbyIsImlkIjoiMiIsImVtYWlsIjoibW9lYmFkcmFuMkBnbWFpbC5jb20iLCJuYW1lIjoiTW9oYW1tZWQgQWJ1IFNpYW0iLCJyb2xlIjoib3duZXIiLCJkZXBhcnRtZW50cyI6IkFsbCJ9LCJpYXQiOjE3MDg5Mjc1NTYsImV4cCI6MTcwOTAxMzk1Nn0.lz5LPCq275hoetWOxigx4UiFHO6ezikrnhPygsOoKiI; Path=/; Secure; HttpOnly; Expires=Tue, 27 Feb 2024 06:05:56 GMT; HttpOnly')
            .field('email', 'johndoe@example.com');
        
        expect(response.status).toBe(422);
        expect(response.body).toHaveProperty('error', 'Customer Name Is required');
        expect(response.body).toHaveProperty('success', false);
    });

    it('respond with an error message and 406 status code if cutomer name is already exist in data base and that store ID', async () => {
        const response = await request(app)
            .post(APIURL)
            .set('Cookie', 'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7InN0b3JlX2lkIjoiMiIsInN0b3JlX25hbWUiOiJtYW5nbyIsImlkIjoiMiIsImVtYWlsIjoibW9lYmFkcmFuMkBnbWFpbC5jb20iLCJuYW1lIjoiTW9oYW1tZWQgQWJ1IFNpYW0iLCJyb2xlIjoib3duZXIiLCJkZXBhcnRtZW50cyI6IkFsbCJ9LCJpYXQiOjE3MDg5Mjc1NTYsImV4cCI6MTcwOTAxMzk1Nn0.lz5LPCq275hoetWOxigx4UiFHO6ezikrnhPygsOoKiI; Path=/; Secure; HttpOnly; Expires=Tue, 27 Feb 2024 06:05:56 GMT; HttpOnly')
            .query({ cutomerName: 'example customer 1' })
            .field('email', 'johndoe@example.com');
        
        expect(response.status).toBe(406);
        expect(response.body).toHaveProperty('error', 'Customer Already Exists. Please Use a Different Name');
        expect(response.body).toHaveProperty('success', false);
    });

});