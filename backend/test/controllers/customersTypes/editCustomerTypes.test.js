const request = require('supertest');
const app = require('../../../index');
const CustomersTypes = require('../../../models/cutomers/customersTypes');
const sequelize = require('../../../config/database');

const  APIURL = '/api/v1/store/customers/types/edit'

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

describe('EDIT A CUSTOMER TYPES CONTROLLER ', () => {
    it('should edit customer type and respond with and 201 status code', async () => {

        const customerType = await CustomersTypes.create({
            store_id: 4,
            type_name:'test customer type',
            discount_value:1
        })

        const response = await request(app)
            .put(APIURL + `/${customerType.dataValues.id}`)
            .set('Cookie', authCookie)
            .send({
                type_name: 'updated customer type',
                discount_value: 2
            });

        //delete customer type that we created in test
        await CustomersTypes.destroy({
            where: { id: customerType.id }
        });
        
        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty('status', 'success');
        expect(response.body).toHaveProperty('message', 'Customer Type Updated');
        expect(response.body).toHaveProperty('results');
    });

    it('should respond with an error message and 500 status code if edit a customer types result in error', async () => {

        const customerType = await CustomersTypes.create({
            store_id: storeData.store_id,
            type_name:'test customer type',
            discount_value:1
        })

        const response = await request(app)
            .put(APIURL + `/${customerType.dataValues.id}`)
            .set('Cookie', authCookie)
            .send({
                type_name: 'updated customer type',
                discount_value: 'x'
            });

        //delete customer type that we created in test
        await CustomersTypes.destroy({
            where: { id: customerType.id }
        });
    
        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error', 'Something Went Wrong');
        expect(response.body).toHaveProperty('success', false);
    });
});
