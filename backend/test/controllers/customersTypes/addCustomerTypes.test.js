const request = require('supertest');
const app = require('../../../index');
const sequelize = require('../../../config/database');
const CustomersTypes = require('../../../models/cutomers/customersTypes');

const  APIURL = '/api/v1/store/customers/types/add'

let authCookie; // Variable to store the authentication cookie

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
},10000);
  
afterAll(async () => {
    //delete customer type that we created in test
    await CustomersTypes.destroy({
        where: { type_name: 'test customer type' }
    });
    
    await sequelize.close();
},10000); 

  
describe('Add A CUSTOMER TYPES CONTROLLER ', () => {
    it('should create/add customer type and respond with and 201 status code', async () => {
      const response = await request(app)
        .post(APIURL)
        .set('Cookie', authCookie)
        .send({
            type_name: 'test customer type',
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
            .set('Cookie', authCookie)
            .send({
                type_name: 'test customer type',
                discount_value: 'x'
            });
        
        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error', 'Something Went Wrong');
        expect(response.body).toHaveProperty('success', false);
    });

});
