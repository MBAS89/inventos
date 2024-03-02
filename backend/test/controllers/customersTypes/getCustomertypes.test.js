const request = require('supertest');
const app = require('../../..');
const sequelize = require('../../../config/database');
const CustomersTypes = require('../../../models/cutomers/customersTypes');

const  APIURL = '/api/v1/store/customers/types/get'
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

describe('GET ALL CUSTOMER TYPES CONTROLLER ', () => {
  it('should respond with all customers types and 200 status code', async () => {
    //create cutomer type
    const customerType = await CustomersTypes.create({
      store_id:storeData.store_id,
      type_name:'test customer type',
      discount_value:1
    })


    const response = await request(app)
      .get(APIURL)
      .set('Cookie', authCookie)

    //delete customer type from database
      await CustomersTypes.destroy({
        where: { id: customerType.id }
    });
  
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('status', 'success');
    expect(response.body).toHaveProperty('message', 'Customers Types Fetched');
    expect(response.body).toHaveProperty('data');
    expect(response.body.data).toHaveProperty('customersTypes');
  });

  it('should respond with an error message and 404 status code if there no customer types find in the store', async () => {
    const response = await request(app)
      .get(APIURL)
      .set('Cookie', authCookie)

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('error', 'No Customers Types Found');
    expect(response.body).toHaveProperty('success', false);
  });

  it('should respond with an error message and 500 status code if feaching customer types did not work', async () => {
    await sequelize.close(); //simulate connection lost to db 
    const response = await request(app)
      .get(APIURL)
      .set('Cookie', authCookie)

    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty('error', 'Something Went Wrong');
    expect(response.body).toHaveProperty('success', false);
  });
});
