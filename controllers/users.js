'use strict';

import bcrypt from 'bcryptjs';
import { User } from '../models/users.js';
import { generateToken } from '../helpers/auth.js';

function createUser(request, response) {
	const { firstName, lastName, phone, email, password, role, status } = request.body;
	const newUser = new User({ firstName, lastName, phone, email, password, role, status });

	User.findById(request.headers.userId)
		.then((userFound) => {
			if (userFound.role !== 'administrator') {
				return response.status(403).send({ success: false, message: 'Only administrators can create new users' });
			}

			newUser
				.save()
				.then((user) => {
					response.status(201).send({ success: true, message: 'User created successfully', data: user });
				})
				.catch((error) => {
					response.status(500).send({ success: false, message: 'Internal server error while creating user', error: error.message });
				});
		})
		.catch((error) => {
			response.status(500).send({ success: false, message: 'Internal server error while finding user', error: error.message });
		});
}

function readUser(request, response) {
	User.findById(request.headers.userId)
		.then((userFound) => {
			if (userFound.role !== 'administrator') {
				return response.status(403).send({ success: false, message: 'Only administrators can view users' });
			}

			let filters = { ...request.query };

			User.find(filters)
				.then((user) => {
					response.status(200).send({ success: true, message: 'Users retrieved successfully', data: user });
				})
				.catch((error) => {
					response.status(500).send({ success: false, message: 'Failed to retrieve users', error: error.message });
				});
		})
		.catch((error) => {
			response.status(500).send({ success: false, message: 'Internal server error while finding user', error: error.message });
		});
}

function updateUser(request, response) {
	const { userId = request.body.userId || request.headers.userId, role, status } = request.body;

	User.findById(request.headers.userId)
		.then((userFound) => {
			if (userFound.role !== 'administrator') {
				if (userId !== userFound.id) {
					return response.status(403).send({ success: false, message: 'Employees can only edit their own information' });
				}

				if (role || status) {
					return response.status(403).send({ success: false, message: 'Only administrators can change role or status' });
				}
			}

			if (userFound.role === 'administrator' && userId === userFound.id && role) {
				return response.status(400).send({ success: false, message: 'Administrators cannot change their own role' });
			}

			User.findById(userId)
				.then((user) => {
					for (const field of Object.keys(request.body)) {
						if (field) {
							user[field] = request.body[field];
						}
					}

					user
						.save()
						.then((updatedUser) => {
							console.log(user);
							response.status(201).send({ success: true, message: 'User updated successfully', data: updatedUser });
						})
						.catch((error) => {
							response.status(500).send({ success: false, message: 'Internal server error while updating user', error: error.message });
						});
				})
				.catch((error) => {
					response.status(500).send({ success: false, message: 'Internal server error while updating user', error: error.message });
				});
		})
		.catch((error) => {
			response.status(500).send({ success: false, message: 'Internal server error while finding user', error: error.message });
		});
}

function deleteUser(request, response) {
	const { userId } = request.body;

	User.findById(request.headers.userId)
		.then((userFound) => {
			if (userFound.role !== 'administrator') {
				return response.status(403).send({ success: false, message: 'Only administrators can delete users' });
			}

			if (userFound._id.toString() === userId.toString()) {
				return response.status(400).send({ success: false, message: 'Administrators cannot delete themselves' });
			}

			User.findByIdAndDelete(userId)
				.then((user) => {
					if (!user) {
						return response.status(404).send({ success: false, message: 'User not found' });
					}

					response.status(200).send({ success: true, message: 'User deleted successfully', data: user });
				})
				.catch((error) => {
					response.status(500).send({ success: false, message: 'Internal server error while deleting user', error: error.message });
				});
		})
		.catch((error) => {
			response.status(500).send({ success: false, message: 'Internal server error while finding user', error: error.message });
		});
}

function loginUser(request, response) {
	const { email, password } = request.body;

	User.findOne({ email })
		.then((user) => {
			if (!user) {
				return response.status(404).send({ success: false, message: 'User not found' });
			}

			if (!bcrypt.compareSync(password, user.password)) {
				return response.status(401).send({ success: false, message: 'Invalid credentials' });
			}

			response.status(200).send({ success: true, message: 'Login successful', data: { token: generateToken(user), user } });
		})
		.catch((error) => {
			response.status(500).send({ success: false, message: 'Internal server error while login', error: error.message });
		});
}

export { createUser, readUser, updateUser, deleteUser, loginUser };
