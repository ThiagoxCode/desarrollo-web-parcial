'use strict';

import mongoose from 'mongoose';

const Schema = new mongoose.Schema(
	{
		customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
		template: { type: mongoose.Schema.Types.ObjectId, ref: 'Template' },
		scheduledAt: { type: Date, required: [true, 'A date is required'] },
		status: { type: String, enum: { values: ['pending', 'queued', 'sent', 'delivered', 'failed', 'cancelled'], message: '{VALUE} is not a valid status' }, default: 'pending' },
		eventKind: { type: String, required: [true, 'Event kind is required'], enum: { values: ['appointment', 'payment', 'campaign'] } },
		createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	},
	{ timestamps: true }
);

const Message = mongoose.model('messages', Schema);

export { Message };
