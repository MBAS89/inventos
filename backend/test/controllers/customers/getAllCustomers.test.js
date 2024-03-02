const request = require('supertest');
const app = require('../../..');
const sequelize = require('../../../config/database');
const { deleteImage } = require('../../../utils/functions/cloudinary/cloudinaryUtils');
const Customers = require('../../../models/cutomers/cutomers');
const CustomersTypes = require('../../../models/cutomers/customersTypes');

const  APIURL = '/api/v1/store/customers/read'

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

describe('GET ALL CISTOMER CONTROLLER ', () => {
  it('should respond with all customers and 200 status code', async () => {
    const response = await request(app)
      .get(APIURL)
      .set('Cookie', authCookie)
      .query({ page: 1, storeId: storeData.store_id }); // Ensure storeId is passed as a string
  
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('totalCount');
    expect(response.body).toHaveProperty('totalPages');
    expect(response.body).toHaveProperty('currentPage');
    expect(response.body).toHaveProperty('customers');
  });

  it('should respond with an error message and 400 status code if there is no storeId or page number', async () => {
    const response = await request(app)
      .get(APIURL)
      .set('Cookie', authCookie)
      .query({ page: 1 });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'Page Number and Store ID are required');
    expect(response.body).toHaveProperty('success', false);
  });

  it('should return customers filtered based on the searchQuery value', async () => {

    const customerType = await CustomersTypes.create({
      store_id: storeData.store_id,
      type_name:'test customer type',
      discount_value:1
    })

    const customer = await Customers.create({
      store_id:storeData.store_id,
      full_name:"test customer",
      image: "https://res.cloudinary.com/dagzd3ntq/image/upload/v1709387819/stores/test/customers/er0ejboenernoip0ope7.png",
      image_id: "stores/test/customers/er0ejboenernoip0ope7",
      email:"test@test.com",
      phone_number:"0000000",
      address:"address",
      cutomer_type:customerType.id
    });

    const response = await request(app)
      .get(APIURL)
      .set('Cookie', authCookie)
      .query({ page: 1, storeId: storeData.store_id, searchQuery: 'test@test.com' });
      
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


    expect(response.status).toBe(200);
    expect(response.body.customers.length).toBeGreaterThanOrEqual(1);
  });

  it('should return paginated results based on limit and page number', async () => {

    const customerType = await CustomersTypes.create({
      store_id: storeData.store_id,
      type_name:'test customer type',
      discount_value:1
    })

    const customer = await Customers.create({
      store_id:storeData.store_id,
      full_name:"test customer",
      image: "https://res.cloudinary.com/dagzd3ntq/image/upload/v1709387819/stores/test/customers/er0ejboenernoip0ope7.png",
      image_id: "stores/test/customers/er0ejboenernoip0ope7",
      email:"test@test.com",
      phone_number:"0000000",
      address:"address",
      cutomer_type:customerType.id
    });

    const response = await request(app)
      .get(APIURL)
      .set('Cookie', authCookie)
      .query({ page: 2, limit: 5, storeId: storeData.store_id });

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
  
    expect(response.status).toBe(200);
    expect(response.body.currentPage).toBe(2);
    expect(response.body.customers.length).toBeLessThanOrEqual(5);
  });
});
