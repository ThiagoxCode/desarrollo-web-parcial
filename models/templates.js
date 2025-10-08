'use strict';

import mongoose from 'mongoose';

const Schema = new mongoose.Schema(
	{
		name: { type: String, required: [true, 'Name is required'], unique: [true, 'A template with this name already exists'] },
		description: { type: String },
		content: { type: String, required: [true, 'Content is required'] },
		variables: [{ type: String }],
		createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	},
	{ timestamps: true }
);

const Template = mongoose.model('templates', Schema);

export { Template };
