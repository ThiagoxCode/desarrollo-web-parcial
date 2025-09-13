'use strict';

import express from 'express';
import { createMovie, readMovie } from '../controllers/movies.js';
import { valideToken } from '../helpers/auth.js';

const movieRouter = express.Router();

movieRouter.post('/api/movie/create', valideToken, createMovie);
movieRouter.get('/api/movie/read', valideToken, readMovie);

export { movieRouter };
