'use strict';

import { Message } from '../models/message.js';

function createMessage(request, response) {
	const { customer, template, scheduledAt, status, eventKind } = request.body;
	const newMessage = new Message({ customer, template, scheduledAt, status, eventKind, createdBy: request.headers.userId });

	newMessage
		.save()
		.then((message) => {
			response.status(201).send({ success: true, message: 'Message created successfully', data: message });
		})
		.catch((error) => {
			response.status(500).send({ success: false, message: 'Internal server error while creating message', error: error.message });
		});
}

function readMessage(request, response) {
	let filters = { ...request.query };

	Message.find(filters)
		.then((message) => {
			response.status(200).send({ success: true, message: 'Messages retrieved successfully', data: message });
		})
		.catch((error) => {
			response.status(500).send({ success: false, message: 'Failed to retrieve messages', error: error.message });
		});
}

function updateMessage(request, response) {
	const { messageId } = request.body;

	Message.findById(messageId)
		.then((messageFound) => {
			if (!messageFound) {
				return response.status(404).send({ success: false, message: 'Message not found' });
			}

			for (const field of Object.keys(request.body)) {
				if (field) {
					messageFound[field] = request.body[field];
				}
			}

			messageFound
				.save()
				.then((updatedMessage) => {
					response.status(201).send({ success: true, message: 'Message updated successfully', data: updatedMessage });
				})
				.catch((error) => {
					response.status(500).send({ success: false, message: 'Internal server error while updating message', error: error.message });
				});
		})
		.catch((error) => {
			response.status(500).send({ success: false, message: 'Internal server error while finding user', error: error.message });
		});
}

function deleteMessage(request, response) {
	const { messageId } = request.body;

	Message.findByIdAndDelete(messageId)
		.then((message) => {
			if (!message) {
				return response.status(404).send({ success: false, message: 'Message not found' });
			}

			response.status(200).send({ success: true, message: 'Message deleted successfully', data: message });
		})
		.catch((error) => {
			response.status(500).send({ success: false, message: 'Internal server error while deleting message', error: error.message });
		});
}

export { createMessage, readMessage, updateMessage, deleteMessage };
