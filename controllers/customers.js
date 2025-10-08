'use strict';

import { Customer } from '../models/customers.js';

function createCustomer(request, response) {
	const { firstName, lastName, phone, email, status } = request.body;
	const newCustomer = new Customer({ firstName, lastName, phone, email, status, createdBy: request.headers.userId });

	newCustomer
		.save()
		.then((customer) => {
			response.status(201).send({ success: true, message: 'Customer created successfully', data: customer });
		})
		.catch((error) => {
			response.status(500).send({ success: false, message: 'Internal server error while creating customer', error: error.message });
		});
}

function readCustomer(request, response) {
	let filters = { ...request.query };

	Customer.find(filters)
		.then((customer) => {
			response.status(200).send({ success: true, message: 'Customers retrieved successfully', data: customer });
		})
		.catch((error) => {
			response.status(500).send({ success: false, message: 'Failed to retrieve customers', error: error.message });
		});
}

function updateCustomer(request, response) {
	const { customerId } = request.body;

	Customer.findById(customerId)
		.then((customerFound) => {
			if (!customerFound) {
				return response.status(404).send({ success: false, message: 'Customer not found' });
			}

			for (const field of Object.keys(request.body)) {
				if (field) {
					customerFound[field] = request.body[field];
				}
			}

			customerFound
				.save()
				.then((updatedCustomer) => {
					response.status(201).send({ success: true, message: 'Customer updated successfully', data: updatedCustomer });
				})
				.catch((error) => {
					response.status(500).send({ success: false, message: 'Internal server error while updating customer', error: error.message });
				});
		})
		.catch((error) => {
			response.status(500).send({ success: false, message: 'Internal server error while finding user', error: error.message });
		});
}

function deleteCustomer(request, response) {
	const { customerId } = request.body;

	Customer.findByIdAndDelete(customerId)
		.then((customer) => {
			if (!customer) {
				return response.status(404).send({ success: false, message: 'Customer not found' });
			}

			response.status(200).send({ success: true, message: 'Customer deleted successfully', data: customer });
		})
		.catch((error) => {
			response.status(500).send({ success: false, message: 'Internal server error while deleting customer', error: error.message });
		});
}

export { createCustomer, readCustomer, updateCustomer, deleteCustomer };
