const request = require('supertest');
const app = require('../../../index');
const sequelize = require('../../../config/database');
const CustomersTypes = require('../../../models/cutomers/customersTypes');
const  APIURL = '/api/v1/store/customers/types/remove'

let authCookie; // Variable to store the authentication cookie
let storeData; //Variable to store the store data

beforeAll(async () => {
    await sequelize.sync({ alter: true }); 

    // Mock login to obtain the authentication cookie
    const loginResponse = await request(app)
    .post('/api/v1/stores/auth/login')
    .send({
        store_name: 'test',
        email: 'sadas@gmail.com',
        password: 'mbas2351',
    });

    // Extract the authentication cookie from the login response headers
    authCookie = loginResponse.headers['set-cookie'][0];

    //Extract store data from login reposnse body
    storeData = loginResponse.body
},20000);
  
afterAll(async () => {
    await sequelize.close();
},20000); 

describe('REMOVE A CUSTOMER TYPES CONTROLLER ', () => {
    it('should remove customer type and respond with and 201 status code', async () => {

        //create cutomer type
        const customerType = await CustomersTypes.create({
            store_id:storeData.store_id,
            type_name:'test customer type',
            discount_value:1
        })

        const response = await request(app)
            .delete(APIURL + `/${customerType.id}`)
            .set('Cookie', authCookie)
        
        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty('status', 'success');
        expect(response.body).toHaveProperty('message', 'Customer Type Deleted');
        expect(response.body).toHaveProperty('results');
    },20000);

    it('should respond with an error message and 406 status code if the customer ID is not found', async () => {

        const customerTypeId = '0'

        const response = await request(app)
            .delete(APIURL + `/${customerTypeId}`)
            .set('Cookie', authCookie)
        
        expect(response.status).toBe(406)
        expect(response.body).toHaveProperty('success', false);
        expect(response.body).toHaveProperty('error', 'Type ID Required OR Not Found!');
    });
});
