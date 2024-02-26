const request = require('supertest');
const app = require('../../..');

const APIURL = '/api/v1/store/customers/remove';

describe('REMOVE CUSTOMER CONTROLLER', () => {
    it('should remove the customer and respond with 200 status code', async () => {
        const customerId = '25'
        const response = await request(app)
            .delete(`${APIURL}/${customerId}`)
            .query({imageId: 'stores/mango/customers/vztts3jpacp34uawwc6s' })

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('status', 'success');
        expect(response.body).toHaveProperty('message', 'Customer Deleted');
        expect(response.body).toHaveProperty('cloudinary');
    })

    it('should respond with 404 status code if it did not find the customer with that id', async () => {
        const customerId = '26' //already deleted customer
        const response = await request(app)
            .delete(`${APIURL}/${customerId}`)
            .query({imageId: 'stores/mango/customers/vnopjeq1cwgmgdullhzt' })

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error', 'Customer Not Found');
        expect(response.body).toHaveProperty('success', false);
    })

    it('should respond with 500 status code if an error occurred while deleting a customer', async () => {
        const customerId = 'x' //a wrong id 
        const response = await request(app)
            .delete(`${APIURL}/${customerId}`)
            .query({imageId: 'example' })

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error', 'Something Went Wrong');
        expect(response.body).toHaveProperty('success', false);
    })
})