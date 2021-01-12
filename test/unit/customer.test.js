const models = require('../../models');
const controllers = require('../../routes/controllers/customer.ctrl');

const httpMocks = require('node-mocks-http');
const newCustomer = require('../data/new-customer.json');

const customerId = '1234';
const updateCustomer = {name: "update name", phone: "1234"};


models.twiliouser.create = jest.fn();
models.twiliouser.findAll = jest.fn();
models.twiliouser.findByPk = jest.fn();
models.twiliouser.update = jest.fn();
models.twiliouser.destroy = jest.fn();

let req, res, next
beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
});
//C
describe('Customer Controller writeCustomer test', () => {
    
    beforeEach(() => {
        req.body = newCustomer;
    })
    test('should function', async () => {
        expect(typeof controllers.writeCustomer).toBe('function');
    });
    test('should call model.twiliouser.create', async () => {
        await controllers.writeCustomer(req, res, next);
        expect(models.twiliouser.create).toBeCalledWith(newCustomer);
    })
    test('should handle errors', async () => {
        const errorMessage = { message: 'error'};
        const rejectedPromise = Promise.reject(errorMessage);
        models.twiliouser.create.mockReturnValue(rejectedPromise);
        await controllers.writeCustomer(req, res, next);
        expect(next).toBeCalledWith(errorMessage);
    })
})
//R
describe('Customer Controller Get', () => {
    test('should function', () => {
        expect(typeof controllers.findAllCustomer).toBe('function');
    })
    
    test('should call Customer find', () => {
        controllers.findAllCustomer(req, res, next);
        expect(models.twiliouser.findAll).toHaveBeenCalledWith({})
    })
    
})
//GetById
describe('should call findByPk', () => {
    test('should function', () => {
        expect(typeof controllers.findByPk).toBe('function');
    })
    test('should call customer findByPk', () => {
        req.params.id = customerId;
        controllers.findByPk(req, res, next);
        expect(models.twiliouser.findByPk).toBeCalledWith(customerId);
    })
    
    
})

//U
describe('shold call update', () => {
    test('should function', () => {
        expect(typeof controllers.updateCustomer).toBe('function');
    })
    test('should call model update', () => {
        req.params.id = customerId;
        req.body = updateCustomer;

        controllers.updateCustomer(req, res, next);
        expect(models.twiliouser.update).toHaveBeenCalledWith(
            updateCustomer,
            {where : {id: req.params.id}}
        )
    })
    
    
})

//D
describe('should delete', () => {
    test('should function', () => {
        expect(typeof controllers.deleteCustomer).toBe('function');
    })
    test('should delete', () => {
        req.params.id = customerId;
        controllers.deleteCustomer(req, res, next)
        expect(models.twiliouser.destroy).toBeCalledWith(
            {where: {id: req.params.id}}
        )

    })
    
    
})
