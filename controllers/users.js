'use strict';

import bcrypt from 'bcryptjs';
import { User } from '../models/users.js';
import { generateToken } from '../helpers/auth.js';

function createUser(request, response) {
	const { email, password, role } = request.body;
	const newUser = new User({ email, password, role });

	newUser
		.save()
		.then((user) => {
			response.status(201).send({ success: true, message: 'User created successfully', data: { id: user._id, email: user.email, password: user.password, role: user.role } });
		})
		.catch((error) => {
			response.status(500).send({ success: false, message: 'Internal server error while creating user', error: error.message });
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

			response.status(200).send({ success: true, message: 'Login successful', data: { token: generateToken(user), user: { id: user._id, email: user.email, role: user.role } } });
		})
		.catch((error) => {
			response.status(500).send({ success: false, message: 'Internal server error during login', error: error.message });
		});
}

export { createUser, loginUser };
