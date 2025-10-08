'use strict';

import mongoose from 'mongoose';

const Schema = new mongoose.Schema(
	{
		firstName: { type: String, required: [true, 'First name is required'] },
		lastName: { type: String, required: [true, 'Last name is required'] },
		phone: { type: String, required: [true, 'Phone is required'], unique: true },
		email: { type: String, unique: true },
		status: { type: String, enum: { values: ['new', 'active', 'inactive', 'prospect', 'archived'], message: '{VALUE} is not a valid status' }, default: 'new' },
		createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	},
	{ timestamps: true }
);

const Customer = mongoose.model('customers', Schema);

export { Customer };
