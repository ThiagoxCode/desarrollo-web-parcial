'use strict';

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const Schema = new mongoose.Schema(
	{
		firstName: { type: String, required: [true, 'First name is required'] },
		lastName: { type: String, required: [true, 'Last name is required'] },
		phone: { type: String, required: [true, 'Phone is required'], unique: true },
		email: { type: String, required: [true, 'Email is required'], unique: true },
		password: { type: String, required: [true, 'Password is required'] },
		role: { type: String, enum: { values: ['administrator', 'employee'], message: '{VALUE} is not a valid role' }, default: 'employee' },
		status: { type: String, enum: { values: ['pending', 'active', 'inactive', 'suspended', 'archived'], message: '{VALUE} is not a valid status' }, default: 'pending' },
	},
	{ timestamps: true }
);

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

const User = mongoose.model('users', Schema);

export { User };
