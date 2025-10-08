'use strict';

import { Template } from '../models/templates.js';
import { User } from '../models/users.js';

function createTemplate(request, response) {
	const { name, description, content, variables } = request.body;
	const newTemplate = new Template({ name, description, content, variables, createdBy: request.headers.userId });

	User.findById(request.headers.userId)
		.then((userFound) => {
			if (userFound.role !== 'administrator') {
				return response.status(403).send({ success: false, message: 'Only administrators can create new templates' });
			}

			newTemplate
				.save()
				.then((template) => {
					response.status(201).send({ success: true, message: 'Template created successfully', data: template });
				})
				.catch((error) => {
					response.status(500).send({ success: false, message: 'Internal server error while creating template', error: error.message });
				});
		})
		.catch((error) => {
			response.status(500).send({ success: false, message: 'Internal server error while finding user', error: error.message });
		});
}

function readTemplate(request, response) {
	let filters = { ...request.query };

	Template.find(filters)
		.then((template) => {
			response.status(200).send({ success: true, message: 'Templates retrieved successfully', data: template });
		})
		.catch((error) => {
			response.status(500).send({ success: false, message: 'Failed to retrieve templates', error: error.message });
		});
}

function updateTemplate(request, response) {
	const { templateId } = request.body;

	User.findById(request.headers.userId)
		.then((userFound) => {
			if (userFound.role !== 'administrator') {
				return response.status(403).send({ success: false, message: 'Only administrators can update templates' });
			}

			Template.findById(templateId)
				.then((templateFound) => {
					for (const field of Object.keys(request.body)) {
						if (field) {
							templateFound[field] = request.body[field];
						}
					}

					templateFound
						.save()
						.then((updatedTemplate) => {
							response.status(201).send({ success: true, message: 'Template updated successfully', data: updatedTemplate });
						})
						.catch((error) => {
							response.status(500).send({ success: false, message: 'Internal server error while updating template', error: error.message });
						});
				})
				.catch((error) => {
					response.status(500).send({ success: false, message: 'Internal server error while updating template', error: error.message });
				});
		})
		.catch((error) => {
			response.status(500).send({ success: false, message: 'Internal server error while finding user', error: error.message });
		});
}

function deleteTemplate(request, response) {
	const { templateId } = request.body;

	User.findById(request.headers.userId)
		.then((userFound) => {
			if (userFound.role !== 'administrator') {
				return response.status(403).send({ success: false, message: 'Only administrators can delete templates' });
			}

			Template.findByIdAndDelete(templateId)
				.then((template) => {
					if (!template) {
						return response.status(404).send({ success: false, message: 'Template not found' });
					}

					response.status(200).send({ success: true, message: 'Template deleted successfully', data: template });
				})
				.catch((error) => {
					response.status(500).send({ success: false, message: 'Internal server error while deleting template', error: error.message });
				});
		})
		.catch((error) => {
			response.status(500).send({ success: false, message: 'Internal server error while finding user', error: error.message });
		});
}

export { createTemplate, readTemplate, updateTemplate, deleteTemplate };
