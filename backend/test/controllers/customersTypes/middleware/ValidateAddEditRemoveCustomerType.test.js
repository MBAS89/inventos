const request = require('supertest');
const app = require('../../../../index');
const sequelize = require('../../../../config/database');
const CustomersTypes = require('../../../../models/cutomers/customersTypes');

const  APIURLAdd = '/api/v1/store/customers/types/add'
const  APIURLEdit = '/api/v1/store/customers/types/edit'
const  APIURLRemove = '/api/v1/store/customers/types/remove'

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

  
describe('VALIDATE ADD/EDIT/REMOVE CUSTOMER TYPE MIDDLEWARE', () => {
    it('should respond with an error message and 422 status code if add a customer type name or discount value is missing', async () => {

        const response = await request(app)
            .post(APIURLAdd)
            .set('Cookie', authCookie)
            .send({
                type_name: '',
                discount_value: 2
            });
        
        expect(response.status).toBe(422);
        expect(response.body).toHaveProperty('error');
        expect(response.body).toHaveProperty('success', false);
    });

    it('should respond with an error message and 422 status code if edit a customer type name or discount value is missing', async () => {

        const customerType = await CustomersTypes.create({
            store_id:storeData.store_id,
            type_name: 'test type',
            discount_value:2
        })

        const response = await request(app)
            .put(APIURLEdit + `/${customerType.id}`)
            .set('Cookie', authCookie)
            .send({
                type_name: 'update test type',
                discount_value:''
            });

        //delete customer type that we created in test
        await CustomersTypes.destroy({
            where: { id: customerType.id }
        });
        
        expect(response.status).toBe(422);
        expect(response.body).toHaveProperty('error');
        expect(response.body).toHaveProperty('success', false);
    });

    it('should respond with an error message and 406 status code if edit a customer type ID is not found or missing', async () => {

        const typeId = '0' //non found type id 
        const response = await request(app)
            .put(APIURLEdit + `/${typeId}`)
            .set('Cookie', authCookie)
            .send({
                type_name: 'test type',
                discount_value: 4
            });
        
        expect(response.status).toBe(406);
        expect(response.body).toHaveProperty('error', 'Type ID Required OR Not Found!');
        expect(response.body).toHaveProperty('success', false);
    });

    it('should respond with an error message and 406 status code if remove a customer type ID is not found or missing', async () => {

        const typeId = '0' //non found type id 
        const response = await request(app)
            .delete(APIURLRemove + `/${typeId}`)
            .set('Cookie', authCookie)
            .send({
                type_name: 'test type',
                discount_value: 4
            });
        
        expect(response.status).toBe(406);
        expect(response.body).toHaveProperty('error', 'Type ID Required OR Not Found!');
        expect(response.body).toHaveProperty('success', false);
    });
});
