const request = require('supertest');
const app = require('../../..');
const sequelize = require('../../../config/database');
const Customers = require('../../../models/cutomers/cutomers');
const { deleteImage } = require('../../../utils/functions/cloudinary/cloudinaryUtils');
const CustomersTypes = require('../../../models/cutomers/customersTypes');

const APIURL = '/api/v1/store/customers/read/single';

let authCookie; // Variable to store the authentication cookie
let storeData; //Variable to store the store data
let customer; //variable to store customer data
let customerType; //variable to store customer type data
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

  customerType = await CustomersTypes.create({
    store_id: storeData.store_id,
    type_name:'test customer type',
    discount_value:1
  })

  customer = await Customers.create({
    store_id:storeData.store_id,
    full_name:"test customer",
    image: "https://res.cloudinary.com/dagzd3ntq/image/upload/v1709387819/stores/test/customers/er0ejboenernoip0ope7.png",
    image_id: "stores/test/customers/er0ejboenernoip0ope7",
    email:"test@test.com",
    phone_number:"0000000",
    address:"address",
    cutomer_type:customerType.id
  });

},20000);
  
afterAll(async () => {

  await deleteImage(customer.image_id)

  await Customers.destroy({
    where: {
      id: customer.id
    }
  });

  await CustomersTypes.destroy({
    where: {
        id: customerType.id
    }
  })

  await sequelize.close();
},20000); 

describe('GET SINGLE CUSTOMER CONTROLLER', () => {
  it('should respond with single customer and 200 status code', async () => {

    const response = await request(app)
      .get(APIURL)
      .set('Cookie', authCookie)
      .query({ storeId: storeData.store_id, customerId: customer.id }); 
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('customer');
    expect(response.body).toHaveProperty('invoices');
  });

  it('should respond with an error message and 400 status code if there is no customerId or storeId', async () => {
    const response = await request(app)
      .get(APIURL)
      .set('Cookie', authCookie)
      .query({ storeId: storeData.store_id });
    
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'Customer ID and Store ID are required');
    expect(response.body).toHaveProperty('success', false);
  });

  it('should respond with an error message and 404 status code if no customer found', async () => {
    const response = await request(app)
      .get(APIURL)
      .set('Cookie', authCookie)
      .query({ storeId: storeData.store_id, customerId: '9999' }); // Assuming customerId doesn't exist
    
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('error', 'No Customer Found!');
    expect(response.body).toHaveProperty('success', false);
  });
});