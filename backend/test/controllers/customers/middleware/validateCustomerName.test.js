const request = require('supertest');
const app = require('../../../../index'); 
const sequelize = require('../../../../config/database');
const Customers = require('../../../../models/cutomers/cutomers');
const { deleteImage } = require('../../../../utils/functions/cloudinary/cloudinaryUtils');

const APIURL = '/api/v1/store/customers/add';

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

describe('Validate Customer Name Middlware', () => {
    it('respond with an error message and 422 status code if cutomer name is missing from query', async () => {
        const response = await request(app)
            .post(APIURL)
            .set('Cookie', authCookie)
            .field('email', 'test@test.com');
        
        expect(response.status).toBe(422);
        expect(response.body).toHaveProperty('error', 'Customer Name Is required');
        expect(response.body).toHaveProperty('success', false);
    },10000);

    it('respond with an error message and 406 status code if cutomer name is already exist in data base and that store ID', async () => {
        const customer = await Customers.create({
            store_id:storeData.store_id,
            full_name:"test customer",
            image: "https://res.cloudinary.com/dagzd3ntq/image/upload/v1709387819/stores/test/customers/er0ejboenernoip0ope7.png",
            image_id: "stores/test/customers/er0ejboenernoip0ope7",
            email:"test@test.com",
            phone_number:"0000000",
            address:"address",
            cutomer_type:"2"
        });

        const response = await request(app)
            .post(APIURL)
            .set('Cookie', authCookie)
            .query({ cutomerName: customer.full_name })
            .field('email', 'johndoe@example.com');

        await deleteImage(customer.image_id)

        await Customers.destroy({
            where: {
            id: customer.id
            }
        });
        
        expect(response.status).toBe(406);
        expect(response.body).toHaveProperty('error', 'Customer Already Exists. Please Use a Different Name');
        expect(response.body).toHaveProperty('success', false);
    },10000);

});