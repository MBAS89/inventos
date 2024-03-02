const request = require('supertest');
const app = require('../../..');
const Customers = require('../../../models/cutomers/cutomers');
const { deleteImage } = require('../../../utils/functions/cloudinary/cloudinaryUtils');
const sequelize = require('../../../config/database');
const CustomersTypes = require('../../../models/cutomers/customersTypes');

const APIURL = '/api/v1/store/customers/remove';

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
  await CustomersTypes.destroy({
    where: {
        id: customerType.id
    }
  })

  await sequelize.close();
},10000); 

describe('REMOVE CUSTOMER CONTROLLER', () => {
    it('should remove the customer and respond with 200 status code', async () => {

        const response = await request(app)
            .delete(`${APIURL}/${customer.id}`)
            .set('Cookie', authCookie)
            .query({imageId: customer.image_id })

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('status', 'success');
        expect(response.body).toHaveProperty('message', 'Customer Deleted');
        expect(response.body).toHaveProperty('cloudinary');
    })

    it('should respond with 404 status code if it did not find the customer with that id', async () => {

        await deleteImage(customer.image_id)

        await Customers.destroy({
          where: {
            id: customer.id
          }
        });

        
        const response = await request(app)
            .delete(`${APIURL}/${customer.id}`)
            .set('Cookie', authCookie)
            .query({imageId: customer.image_id })

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error', 'Customer Not Found');
        expect(response.body).toHaveProperty('success', false);
    })

    it('should respond with 500 status code if an error occurred while deleting a customer', async () => {
        const customerId = 'x' //a wrong type id 
        const response = await request(app)
            .delete(`${APIURL}/${customerId}`)
            .set('Cookie', authCookie)
            .query({imageId: 'example' })

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error', 'Something Went Wrong');
        expect(response.body).toHaveProperty('success', false);
    })
})