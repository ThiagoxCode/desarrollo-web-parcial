'use strict';

import { Movie } from '../models/movies.js';
import { User } from '../models/users.js';

function createMovie(request, response) {
	const { title, director, releaseYear, productionCompany, price } = request.body;
	const newMovie = new Movie({ title, director, releaseYear, productionCompany, price });

	User.findById(request.headers.userId)
		.then((userFound) => {
			if (userFound.role !== 'admin') {
				return response.status(403).send({ success: false, message: 'Only administrators can create movies' });
			}

			newMovie
				.save()
				.then((movie) => {
					response.status(201).send({ success: true, message: 'Movie created successfully', data: movie });
				})
				.catch((error) => {
					response.status(500).send({ success: false, message: 'Internal server error while creating movie', error: error.message });
				});
		})
		.catch((error) => {
			response.status(500).send({ success: false, message: 'Internal server error while finding user', error: error.message });
		});
}

function readMovie(request, response) {
	let filters;
	const params = { ...request.query };

	if (params.releaseYear && params.price) {
		filters = {
			releaseYear: { $gt: params.releaseYear },
			price: { $lte: params.price },
		};
	} else {
		filters = null;
	}

	Movie.find(filters)
		.then((movies) => {
			response.status(200).send({ success: true, message: 'Movies retrieved successfully', data: movies });
		})
		.catch((error) => {
			response.status(500).send({ success: false, message: 'Failed to retrieve movies', error: error.message });
		});
}

export { createMovie, readMovie };
