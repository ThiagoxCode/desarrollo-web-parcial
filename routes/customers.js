'use strict';

import express from 'express';
import { createCustomer, readCustomer, updateCustomer, deleteCustomer } from '../controllers/customers.js';
import { valideToken } from '../helpers/auth.js';

const customerRouter = express.Router();

customerRouter.post('/api/customer/create', valideToken, createCustomer);
customerRouter.get('/api/customer/read', valideToken, readCustomer);
customerRouter.put('/api/customer/update', valideToken, updateCustomer);
customerRouter.delete('/api/customer/delete', valideToken, deleteCustomer);

export { customerRouter };
