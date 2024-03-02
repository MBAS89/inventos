const request = require('supertest');
const app = require('../../..');
const fs = require('fs');
const path = require('path');
const sequelize = require('../../../config/database');
const Customers = require('../../../models/cutomers/cutomers');
const { deleteImage } = require('../../../utils/functions/cloudinary/cloudinaryUtils');
const CustomersTypes = require('../../../models/cutomers/customersTypes');


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


describe('ADD CUSTOMER CONTROLLER', () => {
    it('should add a new customer and respond with 201 status code', async () => {
        const filePath = path.resolve(__dirname, '../../image.jpeg');
        const fileStream = fs.createReadStream(filePath);

        const customerType = await CustomersTypes.create({
            store_id: storeData.store_id,
            type_name:'test customer type',
            discount_value:1
        })
        
        const response = await request(app)
            .post(APIURL)
            .set('Cookie', authCookie)
            .query({ cutomerName: 'test customer' })
            .field('folderName', 'customers')
            .field('full_name', 'test customer')
            .field('email', 'test@test.com')
            .field('phone_number', '00000000')
            .field('address', 'address')
            .field('cutomer_type', customerType.id)
            .attach('image', fileStream);
            
        
        
        await deleteImage(response.body.data.customer.image_id)

        
        await Customers.destroy({
            where: {
                id: response.body.data.customer.id
            }
        });

        await CustomersTypes.destroy({
            where: {
                id: customerType.id
            }
        })
    
        
        
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('status', 'success');
        expect(response.body).toHaveProperty('message', 'Cutomer Added');
        expect(response.body).toHaveProperty('results', 1);
        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toHaveProperty('customer');
        expect(response.body.data.customer).toHaveProperty('id');
    },20000);

    it('should respond with an error message and 422 status code if required fields are missing', async () => {
        const response = await request(app)
            .post(APIURL)
            .set('Cookie', authCookie)
            .field('full_name', 'test customer')
            .field('email', 'test@test.com');
        
        expect(response.status).toBe(422);
        expect(response.body).toHaveProperty('error');
    });

    it('should respond with an error message and 406 status code if email is invalid', async () => {
        const filePath = path.resolve(__dirname, '../../image.jpeg');
        const fileStream = fs.createReadStream(filePath);

        const customerType = await CustomersTypes.create({
            store_id: storeData.store_id,
            type_name:'test customer type',
            discount_value:1
        })

        const response = await request(app)
            .post(APIURL)
            .set('Cookie', authCookie)
            .query({ cutomerName: 'test customer'})
            .field('folderName', 'customers')
            .field('full_name', 'test customer')
            .field('email', 'notvalid')
            .field('phone_number', '00000000')
            .field('address', 'address')
            .field('cutomer_type', customerType.id)
            .attach('image', fileStream); 

        await CustomersTypes.destroy({
            where: {
                id: customerType.id
            }
        })

        expect(response.status).toBe(406);
        expect(response.body).toHaveProperty('error', 'Invalid email address');
    },20000);

    it('should respond with an error message and 500 status code if adding customer in database dose not work', async () => {
        const filePath = path.resolve(__dirname, '../../image.jpeg');
        const fileStream = fs.createReadStream(filePath);

        const response = await request(app)
            .post(APIURL)
            .set('Cookie', authCookie)
            .query({ cutomerName: 'test customer'})
            .field('folderName', 'customers')
            .field('full_name', 'test customer')
            .field('email', 'test@test.com')
            .field('phone_number', '00000000')
            .field('address', 'address')
            .field('cutomer_type', '0') //here i will put customer type that dose not exisit to simulate an error in postgress
            .attach('image', fileStream); 


        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error', 'Something Went Wrong');
        expect(response.body).toHaveProperty('success', false);
    },20000);

});