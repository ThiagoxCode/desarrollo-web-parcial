'use strict';

import mongoose from 'mongoose';

const Schema = new mongoose.Schema({
	title: { type: String, required: [true, 'Title is required'] },
	director: { type: String, required: [true, 'Director is required'] },
	releaseYear: { type: Number, required: [true, 'Release year is required'], max: [2025, 'Release year must be before 2025'] },
	productionCompany: { type: String, required: [true, 'Production company is required'] },
	price: { type: Number, required: [true, 'Price is required'], min: [0, 'Price must be a positive number'] },
});

let Movie = mongoose.model('movies', Schema);

export { Movie };
