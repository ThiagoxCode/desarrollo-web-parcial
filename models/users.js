'use strict';

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const Schema = new mongoose.Schema({
	email: { type: String, required: [true, 'Email is required'] },
	password: { type: String, required: [true, 'Password is required'] },
	role: { type: String, required: [true, 'Role is required'], enum: { values: ['admin', 'user'], message: '{VALUE} is not a valid role' } },
});

// Contraseña hasheada en el Schema por medio del middleware pre('save') para aplicar las validaciones de mongoose previas y evitar errores de bycript.
Schema.pre('save', function (next) {
	if (this.isModified('password')) {
		try {
			this.password = bcrypt.hashSync(this.password, 15);
		} catch (error) {
			return next(error);
		}
	}
	next();
});

let User = mongoose.model('users', Schema);

export { User };
